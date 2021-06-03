<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      style="width: 100%">
      <el-table-column
        label="日期"
        width="380">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="温度"
        width="380">
        <template slot-scope="scope">
          <i class="el-icon-key"></i>
          <span style="margin-left: 10px">{{ scope.row.temperature }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="烟雾浓度"
        width="380">
        <template slot-scope="scope">
          <i class="el-icon-cloudy-and-sunny"></i>
          <span style="margin-left: 10px">{{ scope.row.concentration }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="光照强度"
        width="380">
        <template slot-scope="scope">
          <i class="el-icon-sunny"></i>
          <span style="margin-left: 10px">{{ scope.row.intensity }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-switch
      v-model="value"

      @change="change"
      style="height: 100px;"
      active-text="总开关">
    </el-switch>
    <el-switch
      v-model="value1"

      @change="change1"
      style="height: 100px;padding-left: 290px"
      active-text="温度开关">
    </el-switch>

    <el-switch
      v-model="value2"

      @change="change2"
      style="height: 100px;padding-left: 280px"
      active-text="烟雾开关" >
    </el-switch>

    <el-switch
      v-model="value3"

      @change="change3"
      style="height: 100px;padding-left: 280px"
      active-text="光敏开关">
    </el-switch>
  </div>
</template>

<script>
import { scheduleGetScmList } from '@/api/table'

export default {
  data() {
    return {
      path:"ws://localhost:8888/",
      socket:"",
      list: null,
      scmDataDTO: {},
      listLoading: false,
      value: true,
      value1: true,
      value2: true,
      value3: true,
      timeout: 0
    }
  },
  created() {
    this.fetchData();
    this.init();
  },
  mounted() {
    this.timeout= setInterval(() => {
      this.fetchData()
    }, 1000 * 3);
  },
  beforeDestroy () {
    clearInterval(this.timeout)
  },
  methods: {
    fetchData() {
      this.listLoading = true
      scheduleGetScmList(10).then(response => {
        this.list = response.data.list
        this.listLoading = false
      })
    },
    change() {

      if (this.value !== this.value1) {
        this.value1 = this.value;
        this.change1();
      }
      if (this.value !== this.value2) {
        this.value2 = this.value;
        this.change2();
      }
      if (this.value !== this.value3) {
        this.value3 = this.value;
        this.change3();
      }

    },
    change1() {
      //温度开关
      if (this.value1 === true) {
        this.send("1")
      } else {
        this.send("2")
      }

    },
    change2() {
      //烟雾开关
      if (this.value2 === true) {
        this.send("3")
      } else {
        this.send("4")
      }
    },
    change3() {
      //光敏开关
      if (this.value3 === true) {
        this.send("5")
      } else {
        this.send("6")
      }
    },
    init() {
      if(typeof(WebSocket) === "undefined"){
        alert("您的浏览器不支持socket")
      }else{
        // 实例化socket
        this.socket = new WebSocket(this.path)
        // 监听socket连接
        this.socket.onopen = this.open
        // 监听socket错误信息
        this.socket.onerror = this.error
        // 监听socket消息
        this.socket.onmessage = this.getMessage
      }
    },
    open() {
      console.log("socket连接成功")
    },
    error() {
      console.log("连接错误")
    },
    getMessage(msg) {
      console.log(msg.data)
    },
    send(params) {
      this.socket.send(params)
    },
    close() {
      console.log("socket已经关闭")
    }
  },
  destroyed () {
    // 销毁监听
    this.socket.onclose = this.close
  }
}
</script>
