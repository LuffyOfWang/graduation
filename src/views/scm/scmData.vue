<template>
  <div class="app-container">
    <div class="block" style="float: left">
      <span class="demonstration">日期：</span>
      <el-date-picker
        size="small"
        v-model="date"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        format="yyyy 年 MM 月 dd 日"
        end-placeholder="结束日期"
        value-format="timestamp"
        :picker-options="pickerOptions">
      </el-date-picker>
    </div>
    <div style="padding-left: 60px;float: left">
      <el-button @click="fetchData(1)" icon="el-icon-thumb" size="small" type="primary">查询</el-button>
    </div>
    <div style="padding-left: 20px;float: left">
      <el-button @click="fetchData(1,true)" icon="el-icon-refresh"  size="small" type="primary">刷新</el-button>
    </div>
  <el-table
    v-loading="listLoading"
    :data="list"
    @selection-change="handleSelectionChange"
    style="width: 100%;padding-top: 40px">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
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
      width="280">
      <template slot-scope="scope">
        <i class="el-icon-sunny"></i>
        <span style="margin-left: 10px">{{ scope.row.intensity }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-popconfirm
          style="padding-left: 20px"
          confirmButtonText='好的'
          cancelButtonText='不用了'
          @onConfirm="handleDelete(scope.row.id)"
          icon="el-icon-info"
          iconColor="red"
          title="确定要删除该条数据吗？">
          <el-button size="mini"
                     type="danger" slot="reference">删除</el-button>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    background
    :page-size="size"
    :current-page="page"
    layout="total, prev, pager, next, jumper"
    :total="total"
    style="padding-top: 40px"
    @current-change="fetchData">
  </el-pagination>
  </div>
</template>

<script>
import { deleteScmById, getScmList } from '@/api/table'

export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      date: null,
      list: null,
      page: 1,
      size: 10,
      total: 0,
      scmDataDTO: {},
      listLoading: false,
      deleteList:[]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleDelete(id) {
      deleteScmById(id).then(response => {
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.fetchData(1,true)
      }).catch(reason => {
        this.$message.error(reason.data.errorMessage);
      })
    },
    fetchData(page,clear) {

      if (page) {
        this.page = page;
      }
      if (clear) {
        this.page = 1;
        this.date = null;
        this.scmDataDTO = {};
      }
      if(this.date) {
        this.scmDataDTO.begin = this.date[0];
        this.scmDataDTO.end = this.date[1];
      }
      this.scmDataDTO.page = this.page;
      this.scmDataDTO.size = this.size;
      this.listLoading = true;
      getScmList(this.scmDataDTO).then(response => {
        this.list = response.data.scmList
        this.total = response.data.totalCount
        this.listLoading = false
      })
    },
    handleSelectionChange(val) {
      for (let i = 0; i < val.length; i++) {
        if (this.deleteList.indexOf(val[i].id) === -1) {
          this.deleteList.push(val[i].id)
        }
      }
    }
  }
}
</script>
