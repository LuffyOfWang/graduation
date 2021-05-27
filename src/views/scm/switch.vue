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
      list: null,
      scmDataDTO: {},
      listLoading: false,
      value: true,
      value1: true,
      value2: true,
      value3: true,
      tableData: [{
        updateTime: '2016-05-02',
        temperature: '39.75',
        concentration: '39.75',
        intensity: '39.75',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        updateTime: '2016-05-04',
        temperature: '39.75',
        concentration: '39.75',
        intensity: '39.75',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        updateTime: '2016-05-01',
        temperature: '39.75',
        concentration: '39.75',
        intensity: '39.75',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        updateTime: '2016-05-03',
        temperature: '39.75',
        concentration: '39.75',
        intensity: '39.75',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        updateTime: '2016-05-03',
        temperature: '39.75',
        concentration: '39.75',
        intensity: '39.75',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        updateTime: '2016-05-03',
        temperature: '39.75',
        concentration: '39.75',
        intensity: '39.75',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        updateTime: '2016-05-03',
        temperature: '39.75',
        concentration: '39.75',
        intensity: '39.75',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        updateTime: '2016-05-03',
        temperature: '39.75',
        concentration: '39.75',
        intensity: '39.75',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        updateTime: '2016-05-03',
        temperature: '39.75',
        concentration: '39.75',
        intensity: '39.75',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        updateTime: '2016-05-03',
        temperature: '39.75',
        concentration: '39.75',
        intensity: '39.75',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
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
    },
    change2() {
      //todo 烟雾开关
    },
    change3() {
      //todo 光敏开关
    }
  }
}
</script>
