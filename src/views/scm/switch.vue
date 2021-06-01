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
      width="60"
      @change="change"
      style="height: 100px;"
      active-text="总开关">
    </el-switch>
    <el-switch
      v-model="value1"
      width="60"
      @change="change1"
      style="height: 100px;padding-left: 280px"
      active-text="温度开关">
    </el-switch>

    <el-switch
      v-model="value2"
      width="60"
      @change="change2"
      style="height: 100px;padding-left: 250px"
      active-text="烟雾开关" >
    </el-switch>

    <el-switch
      v-model="value3"
      width="60"
      @change="change3"
      style="height: 100px;padding-left: 270px"
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
    this.fetchData()
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
      this.value1 = this.value;
      this.value2 = this.value;
      this.value3 = this.value;
    },
    change1() {
      //todo 温度开关
      this.send("Temperature")
    },
    change2() {
      //todo 烟雾开关
      this.send("Smog")
    },
    change3() {
      //todo 光敏开关
      this.send("illumination")
    },
    init: function () {
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
    open: function () {
      console.log("socket连接成功")
    },
    error: function () {
      console.log("连接错误")
    },
    getMessage: function (msg) {
      console.log(msg.data)
    },
    send: function (params) {
      this.socket.send(params)
    },
    close: function () {
      console.log("socket已经关闭")
    }
  },
  destroyed () {
    // 销毁监听
    this.socket.onclose = this.close
  }
}
</script>
