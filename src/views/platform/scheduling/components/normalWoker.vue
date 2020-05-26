<template>
  <div>
    <el-form ref="form" :model="form" label-width="100px" labelPosition="left">
      <!--选择条件的单选按钮-->
      <el-form-item label="工种：" class="formSearchMargin formSearchMarginTop">
        <el-radio-group class="radio-search" v-model="form.industry">
          <el-radio label="">不限</el-radio>
          <el-radio :label="item.industry" v-for="item in industryList">{{item.industryName}}</el-radio>
          <!--<el-radio label="3">已结束</el-radio>-->
        </el-radio-group>
      </el-form-item>
      <el-form-item label="结算方式：" class="formSearchMargin">
        <el-radio-group class="radio-search" v-model="form.settlementType">
          <el-radio label="">不限</el-radio>
          <!--<el-radio :label="item.dicVal" v-for="item in settlementTypeList" >{{item.dicName}}</el-radio>-->
          <el-radio label="2">月结</el-radio>
          <el-radio label="4">周结</el-radio>
          <el-radio label="1">日结</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="关键字：" class="formSearchMargin ">
        <el-input class="rant-input inputWidth keyWFormParent" v-model="form.realNameAlias" placeholder="输入姓名搜索"></el-input>
        <el-button type="primary" class="searchBtn keyWBtn" @click="getList">搜索</el-button>
      </el-form-item>
    </el-form>
    <div class="splitLine"></div>
    <div>
      <el-table class="table-outline" :data="tableData" empty-text="暂无相关信息">
        <el-table-column type="expand">
          <template v-slot="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="性别">
                <span> {{props.row.sexName }}</span>
              </el-form-item>
              <el-form-item label="年龄">
                <span> {{props.row.age}}</span>
              </el-form-item>
              <el-form-item label="来源">
                <span v-if="props.row.type==1">
                  排班
                </span>
                <span class="is-link" @click="RouteToTask(props.row)" v-if="props.row.type==2">
                  {{props.row.sourceTaskName}}
                </span>
              </el-form-item>
              <el-form-item label="考勤图片" v-if="hasPhoto==2">
                <el-button size="small" type="text" @click="routeToImg( props.row)">查看</el-button>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="realNameAlias" label="姓名" align="center" min-width="100">
        </el-table-column>
        <el-table-column prop="industryName" label="工种" show-overflow-tooltip align="center" min-width="100px">
        </el-table-column>
        <el-table-column prop="settlementTypeName" label="结算方式" show-overflow-tooltip align="center" min-width="100">
        </el-table-column>
        <el-table-column prop="workStartTime" label="上班打卡(零工)" align="center" min-width="100">
          <template v-slot="scope">
            <span v-if="scope.row.workStartTime">{{scope.row.workStartDate==scope.row.schedulingDate?'当日':'次日'}}{{scope.row.workStartTime | formatTimeString}}</span>
            <span v-else>{{scope.row.workStartTime | formatTimeString}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="endTimeTrue" label="下班打卡(零工)" align="center" show-overflow-tooltip min-width="100">
          <template v-slot="scope">
            <span v-if="scope.row.workEndTime">{{scope.row.workEndDate==scope.row.schedulingDate?'当日':'次日'}}{{scope.row.workEndTime | formatTimeString}}</span>
            <span v-else>{{scope.row.workEndTime | formatTimeString}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="customerPiece" label="计件量(零工)" align="center" min-width="100">
          <template v-slot="scope">
            {{scope.row.pieceSize | formatPieces}}
            {{scope.row.pieceState | formatpieceState}}
          </template>
        </el-table-column>
        <el-table-column prop="workStartTime" label="上班打卡(客户)" align="center" min-width="100" :formatter="forTypeStart">
        </el-table-column>
        <el-table-column prop="endTimeTrue" label="下班打卡(客户)" align="center" show-overflow-tooltip min-width="100" :formatter="forType">
        </el-table-column>
        <el-table-column label="操作" align="left" min-width="160">
          <template v-slot="scope">
            <el-button size="small" type="text" @click="handleEdit(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-container">
        <el-pagination class="pagebox" background layout="prev, pager, next" :current-page="currentPage" @current-change="handleCurrentChange" :page-count="pageCount">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="" :visible.sync="ImageVisible" width="500px" center>
      <div class="">
        <span class="img-label">上班考勤图片</span>
        <img :src="selected.startPhoto" style="width: 100%" />
        <span class="img-label">下班考勤图片</span>
        <img :src="selected.endPhoto" style="width: 100%" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button round size="large" class="dialog-large-button" type="primary" @click="ImageVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改考勤" :visible.sync="isShowEdit" width="750px" center>
      <el-form label-width="160px">
        <el-form-item label="姓名">
          <el-input v-model="attendenceItem.realNameAlias" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="考勤日期">
          <el-input v-model="attendenceItem.schedulingDate" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="工种">
          <el-input v-model="attendenceItem.industryName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="上班打卡（零工）">
          <el-select v-model="editItem.startType" placeholder="请选择">
            <el-option key="1" label="当日" value="1">
            </el-option>
            <el-option key="2" label="次日" value="2">
            </el-option>
          </el-select>
          <el-time-select placeholder="上班时间" v-model="editItem.startTime" :picker-options="{start: '00:00',step: '00:30',end: '23:59'}">
          </el-time-select>
        </el-form-item>
        <el-form-item label="下班打卡（零工）">
          <el-select v-model="editItem.endType" placeholder="请选择">
            <el-option key="1" label="当日" value="1">
            </el-option>
            <el-option key="2" label="次日" value="2">
            </el-option>
          </el-select>
          <el-time-select placeholder="下班时间" v-model="editItem.endTime" :picker-options="{start: '00:00',step: '00:30',end: '23:59'}">
          </el-time-select>
        </el-form-item>
        <el-form-item label="计件量（零工）">
          <el-input v-model="editItem.pieceSize.jian" type="number" min="0"><template slot="append">件</template></el-input>
          <el-input v-model="editItem.pieceSize.dai" type="number" min="0"><template slot="append">袋</template></el-input>
          <el-input v-model="editItem.pieceSize.che" type="number" min="0"><template slot="append">车</template></el-input>
          <el-input v-model="editItem.pieceSize.dun" type="number" min="0"><template slot="append">吨</template></el-input>
        </el-form-item>
      </el-form>

      <div style="text-align: center;">
        <el-button type="primary" size="large" @click="confirmSave">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import util from '../../../../common/util'
export default {
  components: {},
  name: "Unbound",
  component: {
    //someComponent
  },
  data() {
    return {
      hasPhoto: '',
      selected: {},
      ImageVisible: false,
      industryList: [],
      DeleteVisible: false,
      currentPage: 1,
      pageSize: 10,
      pageCount: '',
      settlementTypeList: '',
      belongtoList: '',
      input5: '',
      select: '',
      tableData: [],
      form: {
        industry: '',
        taskStatus: '',
        belongtoItem: '',
        settlementType: "",
        publishType: "",
      },
      attendenceItem: {
        realNameAlias: '', // 姓名
        industryName: '',  // 工种
        schedulingDate: ''  // 考勤日期
      },
      editItem: {
        startType: '1',
        startTime: '',
        endType: '1',
        endTime: '',
        pieceSize: {
          jian: '',
          dai: '',
          che: '',
          dun: ''
        }
      },
      mineItem: {},
      reveiveId: '',
      publishId: '',
      isShowEdit: false
    }
  },
  filters: {
    formatPieces(val) {
      if (val) {
        return util.formatPieceSize(val)
      }
    },
    formatCusTimeString(val) {
      if (val) {
        return val.substring(0, 5)
      } else {
        return '无'
      }
    },
    formatpieceState(val) {
      if (val == 1) {
        return '(待审核)'
      } else {
        return ''
      }
    },
    formatTimeString(val) {
      if (val) {
        return val.substring(0, 5)
      } else {
        return '未打卡'
      }
    },
    formatminDate(val) {
      return util.minDate(val)
    },
    formatStatus(val) {
      if (val == 1) {
        return '待领取'
      } else if (val == 2) {
        return '进行中'
      } else if (val == 3) {
        return '已结束'
      } else {
        return ''
      }
      return util.minDate(val)
    }
  },
  mounted() {
    //      this.getsettlement();
    this.getIndustryList();
    this.getList();
    this.hasPhoto = this.$route.params.hasPhoto
  },
  watch: {
    'form.industry': function (val, oldval) {
      this.currentPage = 1
      this.getList();
    },
    'form.belongtoItem': function (val, oldval) {
      this.currentPage = 1
      this.getList();
    },
    'form.settlementType': function (val, oldval) {
      this.currentPage = 1
      this.getList();
    },
  },
  methods: {
    refresh() {
      this.getIndustryList();
      this.getList();
      this.hasPhoto = this.$route.params.hasPhoto
    },
    routeToImg(row) {
      this.selected = row;
      this.ImageVisible = true
    },
    handleEdit(row) {
      this.isShowEdit = true
      this.attendenceItem = Object.assign({}, row)
      this.editItem.endTime = this.attendenceItem.workEndTime
      this.editItem.startTime = this.attendenceItem.workStartTime
      if (!this.attendenceItem.workStartDate) {
        this.editItem.startType = '1'
      } else {
        this.editItem.startType = this.attendenceItem.workStartDate == this.attendenceItem.schedulingDate ? '1' : '2'
      }
      if (!this.attendenceItem.workEndDate) {
        this.editItem.endType = '1'
      } else {
        this.editItem.endType = this.attendenceItem.workEndDate == this.attendenceItem.schedulingDate ? '1' : '2'
      }
      if (this.attendenceItem.pieceSize) {
        this.editItem.pieceSize = JSON.parse(this.attendenceItem.pieceSize)
      } else {
        this.editItem.pieceSize = { jian: '', dai: '', che: '', dun: '' }
      }
    },
    // 保存修改
    confirmSave() {
      if (!this.editItem.startTime || !this.editItem.endTime) {
        this.$message({ message: '上下班时间都不能为空', type: 'error' })
        return
      }
      if (this.editItem.startType == this.editItem.endType) {
        if (this.editItem.endTime < this.editItem.startTime) {
          this.$message({ message: '下班时间必须晚于上班时间', type: 'error' })
          return
        }
      } else if (this.editItem.startType == '2' && this.editItem.endType == '1') {
        this.$message({ message: '下班时间必须晚于上班时间', type: 'error' })
        return
      }
      let params = {
        schedulingEmpId: this.attendenceItem.id,
        punchId: this.attendenceItem.punchId,
        schedulingId: this.attendenceItem.schedulingId,
        startTime: this.editItem.startTime.length < 7 ? this.editItem.startTime + ':00' : this.editItem.startTime,
        startType: this.editItem.startType,
        endTime: this.editItem.endTime.length < 7 ? this.editItem.endTime + ':00' : this.editItem.endTime,
        endType: this.editItem.endType,
        pieceSize: JSON.stringify(this.editItem.pieceSize)
      }
      this.$api.attendanceUpdate(params)
        .then(res => {
          this.isShowEdit = false
          this.refresh()
        })
        .catch(err => {
          this.$message({ message: err.errMsg, type: 'error' })
        })
    },
    RouteToTask(row) {
      const { href } = this.$router.resolve({
        name: "TaskDetail",
        params: {
          id: row.taskId,
        }
      });
      window.open(href, "_blank");
    },
    getList() {
      const params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        settlementType: this.form.settlementType,
        realNameAlias: this.form.realNameAlias,
        industry: this.form.industry,
        schedulingId: this.$route.params.id,
        talentType: 1,
      }
      console.log(params)

      this.$api.scheduleWorker(params).then((response) => {
        const {
          data: {
            list,
            pages,
            total,
            pageNum,
          },
        } = response.data;
        this.tableData = list
        this.pageCount = pages
      }).catch((error) => {
        console.log(error);
      });
    },
    getIndustryList() {
      const params = {
        schedulingId: this.$route.params.id
      }
      console.log(params)

      this.$api.scheindustryList(params).then((response) => {
        if (response.respCode == 0) {
          this.industryList = response.data
        }
        this.pageCount = pages
      }).catch((error) => {
        console.log(error);
      });
    },
    getsettlement() {
      this.$api
        .getDicList("settlementType", 0)
        .then(response => {
          this.settlementTypeList = response.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getbelongtoList() {
      this.$api
        .getBelongtoList()
        .then(response => {
          this.belongtoList = response.data;
          console.log(this.belongtoList)
        })
        .catch(error => {
          console.log(error);
        });
    },
    routeToDetail(row) {
      const { href } = this.$router.resolve({
        name: "TaskDetail",
        params: {
          id: row.id,
        }
      });
      window.open(href, "_blank");
    },
    routeToEdit(row) {
      this.$router.push({ name: 'editTask', params: { id: row.id } })
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    formatbindingStatus(row) {
      let val = row.bindingStatus
      if (val == 1) {
        return '服务中'
      } else if (val == 2) {
        return '待项目经理同意解绑'
      } else if (val == 3) {
        return '待客户同意解绑'
      } else if (val == 4) {
        return '已解绑'
      } else {
        return ''
      }
    },
    routeTowoker() {
      this.$router.push({ name: 'myworker' })
    },
    handleClose() {

    },
    addNew() {
      this.$router.push({ name: 'addTask' })
    },
    forType(val) {
      if (val.customerEndTime) {
        if (val.customerEndDate == val.schedulingDate) {
          return `当日${val.customerEndTime.substring(0, 5)}`
        } else {
          return `次日${val.customerEndTime.substring(0, 5)}`
        }
      } else {
        return '无'
      }
    },
    forTypeStart(val) {
      if (val.customerStartTime) {
        if (val.customerStartDate == val.schedulingDate) {
          return `当日${val.customerStartTime.substring(0, 5)}`
        } else {
          return `次日${val.customerStartTime.substring(0, 5)}`
        }
      } else {
        return '无'
      }
    },
  }
}
</script>

<style scoped>
.el-input .el-select {
  width: 100px;
}
.select-input {
  width: 396px;
  margin-right: 20px;
}
.img-label {
  font-family: PingFang-SC-Heavy;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 50px;
  letter-spacing: 0px;
  color: #3b3b3b;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
