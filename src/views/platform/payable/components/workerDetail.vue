<template>
  <div v-loading="exportCollectLoading" element-loading-text="正在导出excel">
    <el-form ref="form" :model="form" label-position="left" label-width="90px">
      <el-form-item label="结算方式：" class="formSearchMargin">
        <el-radio-group class="radio-search" v-model="form.settlementType">
          <el-radio label="">不限</el-radio>
          <el-radio label="2">月结</el-radio>
          <el-radio label="4">周结</el-radio>
          <el-radio label="1">日结</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="日期范围：" class="formSearchMargin">
        <el-date-picker class="margin_left10" size="mini" v-model="form.begin" type="date" value-format="yyyy-MM-dd" placeholder="选择开始时间">
        </el-date-picker>
        &nbsp; ——
        <el-date-picker class="margin_left10" size="mini" v-model="form.end" type="date" value-format="yyyy-MM-dd" placeholder="选择结束时间">
        </el-date-picker>
        <el-button type="primary" class="searchBtn" @click="btn_true" style="margin-left:8px">确定</el-button>
      </el-form-item>
      <el-form-item label="关键字：" class="formSearchMargin ">
        <el-input placeholder="输入关键字搜索" v-model="inputTxt" size="mini" class="input-with-select select-input">
          <el-select v-model="selectTxt" slot="prepend" placeholder="请选择" style="width:100px">
            <el-option label="零工姓名" value="1"></el-option>
            <el-option label="任务名称" value="2"></el-option>
          </el-select>
        </el-input>
        <el-button type="primary" class="searchBtn" @click="getList">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-button class="myplain-btn" style="margin: 8px 14px 18px 0px" @click="exportCollect" :disabled="isDisabled">导出</el-button>
    <div style="margin: 10px 0;">
      总计<strong style="color:#e84518">{{total || 0}}</strong>条记录、
      总工时<strong style="color:#e84518">{{moreTotal.totalWorkHours || 0}}</strong>、
      总计件量<strong style="color:#e84518">{{moreTotal.totalJian || 0}}</strong>、
      总计袋量<strong style="color:#e84518">{{moreTotal.totalDai || 0}}</strong>、
      总计吨量<strong style="color:#e84518">{{moreTotal.totalDun || 0}}</strong>、
      总计车量<strong style="color:#e84518">{{moreTotal.totalChe || 0}}</strong>、
      总金额<strong style="color:#e84518">{{moreTotal.ttotalAmount || 0}}</strong>
    </div>
    <el-table class="table-outline" :data="tableData" emptyText="暂无相关信息" style="width: 100%;">
      <el-table-column prop="realNameAlias" label="姓名" align="center" min-width="80">
      </el-table-column>
      <el-table-column prop="sexName" align="center" label="性别" min-width="80">
      </el-table-column>
      <el-table-column prop="taskName" label="任务" align="center" min-width="80">
      </el-table-column>
      <el-table-column prop="industryName" label="工种" align="center" min-width="80" :formatter="industryNameFiliters">
      </el-table-column>
      <el-table-column prop="settlementTypeName" label="结算方式" align="center" min-width="80">
      </el-table-column>
      <el-table-column prop="recordDate" label="日期" align="center" min-width="80">
      </el-table-column>
      <el-table-column prop="workStartTime" label="上班时间" align="center" min-width="80" :formatter="industryNameFiliters">
      </el-table-column>
      <el-table-column prop="workEndTime" label="下班时间" align="center" min-width="80" :formatter="industryNameFiliters">
      </el-table-column>
      <el-table-column prop="workHours" label="工时" align="center" min-width="80" :formatter="industryNameFiliters">
      </el-table-column>
      <el-table-column label="计件量" align="center" min-width="80">
        <template v-slot="scope">
          <span>
            {{scope.row.jian ? scope.row.jian + '件' : '0' + '件'}}
            {{scope.row.dai ? scope.row.dai + '袋' : '0' + '袋'}}
            {{scope.row.che ? scope.row.che + '车' : '0' + '车'}}
            {{scope.row.dun ? scope.row.dun + '吨' : '0' + '吨'}}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="salary" label="单价" align="center" min-width="80" :formatter="forPrice">
        <!-- <template scope="scope">
          {{scope.row.salaryPlan | formataskSalary}}
        </template> -->
      </el-table-column>
      <el-table-column prop="amount" label="金额" align="center" min-width="80">
      </el-table-column>
      <el-table-column prop="typeName" label="类型" align="center" min-width="80">
      </el-table-column>
      <el-table-column prop="batchNumber" label="批次" align="center" min-width="80">
      </el-table-column>
    </el-table>
    <div class="page-container">
      <el-pagination class="pagebox" background layout="prev, pager, next" :current-page="currentPage" @current-change="handleCurrentChange" :page-count="pageCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
// import util from '../../../../common/util.js'
export default {
  name: '',
  data() {
    return {
      form: {
        settlementType: '',
        begin: '',
        end: ''
      },
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      pageCount: 0,
      total: 0,
      isDisabled: false,
      inputTxt: '',
      selectTxt: '',
      moreTotal: {},
      exportCollectLoading: false
    };
  },
  components: {},
  computed: {},
  mounted() {
    this.getDataListDetail()
    this.getDetailList()
  },
  watch: {
    'form.settlementType': function (newval, oldval) {
      this.currentPage = 1
      this.getDataListDetail()
      this.getDetailList()
    }
  },
  methods: {
    getDataListDetail() {
      let params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        settlementType: this.form.settlementType,
        begin: this.form.begin,
        end: this.form.end,
        talentName: this.selectTxt == 1 ? this.inputTxt : '',
        taskName: this.selectTxt == 2 ? this.inputTxt : ''
      }
      this.$api.batchNumberSummaryDetail(params)
        .then(res => {
          console.log(res)
          if (res.data.respCode == 0) {
            if (res.data.data) {
              const {
                data: {
                  list,
                  pages,
                  total,
                  pageNum
                }
              } = res.data
              this.tableData = list
              this.pageCount = pages
              this.total = total
            } else {
              this.tableData = []
              this.pageCount = 0
              this.total = 0
            }
            if (this.total) {
              this.isDisabled = false
            } else {
              this.isDisabled = true
            }
          }
        })
        .catch()
    },
    getDetailList() {
      let params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        settlementType: this.form.settlementType,
        begin: this.form.begin,
        end: this.form.end,
        talentName: this.selectTxt == 1 ? this.inputTxt : '',
        taskName: this.selectTxt == 2 ? this.inputTxt : ''
      }
      this.$api.batchNumberDetailTotal(params)
        .then(res => {
          console.log(res)
          if (res.data.respCode == 0) {
            if (res.data.data) {
              this.moreTotal = res.data.data
            } else {
              this.moreTotal = {}
            }
          }
        })
        .catch()
    },
    btn_true() {
      // console.log('时间范围搜索')
      if (this.form.begin == '' || this.form.end == '') {
        this.$message({
          message: '结束日期或者开始日期都不能为空！',
          type: 'error'
        })
        return
      } else if (this.form.begin > this.form.end) {
        this.$message({
          message: '结束日期不能早于开始日期',
          type: 'error'
        })
        return
      } else {
        this.currentPage = 1
        this.getDataListDetail()
        this.getDetailList()
      }

    },
    getList() {
      // console.log('关键字搜索')
      // if (this.form.talentName == '') {
      //   this.$message({
      //     message: '关键字不能为空！',
      //     type: 'error'
      //   })
      //   return
      // } else {
      this.currentPage = 1
      this.getDataListDetail()
      this.getDetailList()
      // }

    },
    exportCollect() {
      // console.log('导出')
      let params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        settlementType: this.form.settlementType,
        begin: this.form.begin,
        end: this.form.end,
        talentName: this.selectTxt == 1 ? this.inputTxt : '',
        taskName: this.selectTxt == 2 ? this.inputTxt : ''
      }
      this.exportCollectLoading = true
      this.$api.AccountDetailExport(params)
        .then(res => {
          // console.log(res)
          if (res.data.respCode == 0) {
            setTimeout(() => {
              this.exportCollectLoading = false
            }, 2000)
            if (res.data.data) {
              window.open(res.data.data)
            }
          }
        }).catch()
    },
    handleCurrentChange(val) {
      // console.log(val)
      this.currentPage = val
      this.getDataListDetail()
    },
    industryNameFiliters(row, column, cellValue) {
      if (cellValue) {
        return cellValue
      } else {
        return '无'
      }
    },
    forPrice(val) {
      if (val.salary) {
        let salary = JSON.parse(val.salary)
        let type = val.settlementType == 4 ? 1 : val.settlementType
        for (let i in salary) {
          if (salary[i].settlementType == type) {
            for (let j in salary[i].price) {
              if (((salary[i].price)[j]).sex == val.sex) {
                console.log((salary[i].price)[j])
                let item = (salary[i].price)[j]
                let content = ''
                if (salary[i].valuationType == 1) {
                  content = `${item.countTime}元/小时`
                } else if (salary[i].valuationType == 2) {
                  if (salary[i].unit == 1) {
                    content = `${item.countSettle}元/件`
                  } else if (salary[i].unit == 2) {
                    content = `${item.countDai}元/袋`
                  } else if (salary[i].unit == 3) {
                    content = `${item.countChe}元/车`
                  } else {
                    content = `${item.countDun}元/吨`
                  }
                } else if (salary[i].valuationType == 3) {
                  let varUnit
                  if (salary[i].unit == 1) {
                    varUnit = '件'
                  } else if (salary[i].unit == 2) {
                    varUnit = '袋'
                  } else if (salary[i].unit == 3) {
                    varUnit = '车'
                  } else {
                    varUnit = '吨'
                  }
                  content += `${(item.ladderObj)[0].count}${varUnit}以下（含），${(item.ladderObj)[0].unit}元/${varUnit}`
                  for (let z in item.ladderObj) {
                    if (z > 0 && z != (item.ladderObj.length - 1)) {
                      content += `；${(Number((item.ladderObj)[z - 1].count)) + 1}至${(item.ladderObj)[z].count}${varUnit}（含），${(item.ladderObj)[z].unit}元/${varUnit}`

                    }
                  }
                  content += `；${(item.ladderObj)[item.ladderObj.length - 2].count}${varUnit}以上，${(item.ladderObj)[item.ladderObj.length - 1].overUnit}元/${varUnit}`
                } else if (salary[i].valuationType == 4) {
                  if (item.countSettle) {
                    content += `${item.countSettle}元/件,`
                  } if (item.countDai) {
                    content += `${item.countDai}元/袋,`
                  } if (item.countChe) {
                    content += `${item.countChe}元/车,`
                  } if (item.countDun) {
                    content += `${item.countDun}元/吨`
                  }
                } else if (salary[i].valuationType == 5) {

                  if (salary[i].unit == 1) {
                    content += `${item.countSettle}元/件，`
                  } else if (salary[i].unit == 2) {
                    content += `${item.countDai}元/袋，`
                  } else if (salary[i].unit == 3) {
                    content += `${item.countChe}元/车，`
                  } else {
                    content += `${item.countDun}元/吨，`
                  }
                  content += `${item.countTime}元/小时`
                } else if (salary[i].valuationType == 6) {
                  content += `${item.countTime}元/小时,`
                  let varUnit
                  if (salary[i].unit == 1) {
                    varUnit = '件'
                  } else if (salary[i].unit == 2) {
                    varUnit = '袋'
                  } else if (salary[i].unit == 3) {
                    varUnit = '车'
                  } else {
                    varUnit = '吨'
                  }
                  content += `${(item.ladderObj)[0].count}${varUnit}以下（含），${(item.ladderObj)[0].unit}元/${varUnit}`
                  for (let z in item.ladderObj) {
                    if (z > 0 && z != (item.ladderObj.length - 1)) {
                      content += `；${(Number((item.ladderObj)[z - 1].count)) + 1}至${(item.ladderObj)[z].count}${varUnit}（含），${(item.ladderObj)[z].unit}元/${varUnit}`

                    }
                  }
                  content += `；${(item.ladderObj)[item.ladderObj.length - 2].count}${varUnit}以上，${(item.ladderObj)[item.ladderObj.length - 1].overUnit}元/${varUnit}`
                } else {

                  if (item.countSettle) {
                    content += `${item.countSettle}元/件,`
                  } if (item.countDai) {
                    content += `${item.countDai}元/袋,`
                  } if (item.countChe) {
                    content += `${item.countChe}元/车,`
                  } if (item.countDun) {
                    content += `${item.countDun}元/吨,`
                  }
                  content += `${item.countTime}元/小时`
                }
                return content
              }
            }

          }
        }
      } else {
        return '无'
      }
    },
  }
}
</script>
<style scoped>
</style>