<template>
  <div>
    <div>
      <el-radio-group v-model="radio4" @change="TabClick">
        <el-radio-button label="1">经理人</el-radio-button>
        <el-radio-button label="2">认证申请处理</el-radio-button>
      </el-radio-group>
      <hr class="el-radio-group-hr" />

    </div>
    <!--<el-button class="myplain-btn" style="margin: 8px 0px" @click="routeToadd">添加客户</el-button>-->
    <el-form ref="form" :model="form" label-width="110px" class="formSearchMarginTop">
      <!--选择条件的单选按钮-->
      <el-form-item label="审核状态：" class="formSearchMargin " v-if="secondShow">
        <el-radio-group class="radio-search" v-model="form.managerStatus">
          <el-radio label="1">待审核</el-radio>
          <el-radio label="2">已通过</el-radio>
          <el-radio label="3">已驳回</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="关键字：" class="formSearchMargin ">
        <el-input class="rant-input inputWidth keyWFormParent" placeholder="输入项目经理姓名搜索" v-model="form.nameAlias"></el-input>
        <el-button type="primary" class="searchBtn keyWBtn" @click="getPmList">搜索</el-button>
      </el-form-item>
    </el-form>
    <div class="margintop20">
      <el-table v-show="firstShow" class="table-outline" :data="tableData" empty-text="暂无相关经理人信息">
        <el-table-column prop="nameAlias" label="姓名" align="center" min-width="100">
        </el-table-column>
        <el-table-column prop="accountMobile" label="手机号" align="center" min-width="130">
        </el-table-column>
        <el-table-column prop="address" label="所在位置" show-overflow-tooltip align="center" min-width="180">
        </el-table-column>
        <el-table-column prop="feeStatus" label="管理费状态" align="center" :formatter="formatFeeStatus" min-width="120">
        </el-table-column>
        <!--<el-table-column prop="individualBusinessCount" label="个体工商户数量" align="center" min-width="140">-->
        <!--</el-table-column>-->
        <el-table-column prop="accountStatus" label="状态" :formatter="formataccountStatus" align="center" min-width="80">
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="120">
          <template v-slot="scope">
            <el-button size="small" type="text" @click="routeToDetail( scope.row)">查看</el-button>
            <el-button size="small" type="text" @click="handleRecharge( scope.row)">充值</el-button>
            <!--<el-button size="small" type="text" @click="routeToEdit(scope.row)">编辑</el-button>-->
            <el-button size="small" v-if="scope.row.accountStatus==1" type="text" @click="freeze( scope.row)">冻结</el-button>
            <el-button size="small" v-if="scope.row.accountStatus==2" type="text" @click="unfreeze(scope.row)">解冻</el-button>
          </template>

        </el-table-column>

      </el-table>
      <el-table v-show="secondShow" class="table-outline" :data="tableData" empty-text="暂无相关认证信息">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="所在位置">
                <span>{{ props.row.address }}</span>
              </el-form-item>

              <el-form-item label="统一社会信用代码">
                <span v-if=" props.row.financeCustomer">{{ props.row.financeCustomer.creditCode }}</span>
              </el-form-item>
              <el-form-item label="注册地址">
                <span v-if=" props.row.financeCustomer">{{ props.row.financeCustomer.registeAddress }}</span>
              </el-form-item>
              <el-form-item label="注册电话">
                <span v-if=" props.row.financeCustomer">{{ props.row.financeCustomer.phone }}</span>
              </el-form-item>
              <el-form-item label="开户银行">
                <span v-if=" props.row.financeCustomer">{{ props.row.financeCustomer.bankName }}</span>
              </el-form-item>
              <el-form-item label="银行账号">
                <span v-if=" props.row.financeCustomer">{{ props.row.financeCustomer.bankCard }}</span>
              </el-form-item>
              <el-form-item label="营业执照">
                <el-button size="small" type="text" @click="handleBigImg(props.row)">查看</el-button>
              </el-form-item>

              <el-form-item label="驳回原因" v-if="form.managerStatus==3">
                <span>{{ props.row.refuseReason}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="nameAlias" label="姓名" align="center" min-width="100">
        </el-table-column>
        <el-table-column prop="accountMobile" label="手机号" align="center" min-width="120">
        </el-table-column>
        <el-table-column prop="idCard" label="身份证号" align="center" min-width="160">
        </el-table-column>
        <el-table-column prop="financeCustomer.name" show-overflow-tooltip label="公司名称" align="center" min-width="150">
        </el-table-column>
        <!--<el-table-column prop="financeCustomer.creditCode" show-overflow-tooltip label="统一社会信用代码"  align="center"  min-width="180">-->
        <!--</el-table-column>-->
        <!--<el-table-column prop="financeCustomer.registeAddress" label="注册地址" show-overflow-tooltip  align="center"  min-width="180">-->
        <!--</el-table-column>-->
        <!--<el-table-column prop="financeCustomer.phone" label="注册电话"  align="center"  min-width="130">-->
        <!--</el-table-column>-->
        <!--<el-table-column prop="financeCustomer.bankName" label="开户银行"  align="center"  min-width="130">-->
        <!--</el-table-column>-->
        <!--<el-table-column prop="financeCustomer.bankCard" label="银行账号" show-overflow-tooltip  align="center"  min-width="160">-->
        <!--</el-table-column>-->
        <!--<el-table-column prop="financeCustomer.businessLicense" label="营业执照"  align="center"  min-width="80">-->
        <!--<template scope="scope" >-->
        <!--<el-button size="small" type="text" @click="handleBigImg(scope.row)">查看</el-button>-->
        <!--</template>-->
        <!--</el-table-column>-->

        <el-table-column label="操作" align="center" min-width="160" v-if="form.managerStatus=='1'">
          <template v-slot="scope">
            <!--<el-button size="small" type="text" @click="routeToEdit(scope.row)">编辑</el-button>-->
            <el-button size="small" type="text" @click="checkPass( scope.row)">通过</el-button>
            <el-button size="small" type="text" @click="checkUnPass(scope.row)">驳回</el-button>
            <el-button size="small" type="text" @click="routeToEdit( scope.row)">编辑</el-button>
          </template>

        </el-table-column>

      </el-table>
      <div class="page-container">
        <el-pagination class="pagebox" background layout="prev, pager, next" @current-change="handleCurrentChange" :page-count="pageCount">
        </el-pagination>
      </div>
      <big-image @handleWrapperClick="handleWrapperClick" :image="imgSrc" :visible="visible"></big-image>
    </div>

    <el-dialog :visible.sync="isShowRecharge" width="450px">
      <el-form label-width="100px">
        <el-form-item label="金额">
          <el-input type="number" placeholder="金额" v-model="amount" min="5"></el-input>
        </el-form-item>
        <div style="text-align: center;">
          <el-button type="primary" size="large" @click="confirmRecharge">确认</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import bigImage from '../../../components/bigImage.vue'
export default {
  name: "",
  components: {
    bigImage: bigImage
  },
  data() {
    return {
      visible: false,
      imgSrc: '',
      managerStatus: '',
      firstShow: true,
      secondShow: false,
      isShowRecharge: false,
      currentPmId: 0,  // 待修改经理id
      amount: 0,  // 充值金额
      radio4: '1',
      form: {
        managerStatus: ''
      },
      currentPage: 1,
      pageSize: 10,
      pageCount: '',
      total: '',
      tableData: [],
      msg: "Hello Vue.js"
    }
  },
  watch: {
    'form.managerStatus': function (val, oldval) {
      this.currentPage = 1
      this.getPmList()
    }
  },
  mounted() {
    //      this.getPmList()
  },
  methods: {
    handleWrapperClick() {
      this.visible = false
    },
    handleRecharge(item) {
      this.currentPmId = item.userId
      this.isShowRecharge = true
    },
    confirmRecharge() {
      if (Number.parseFloat(this.amount) < 5) {
        this.$message({ message: '充值金额不能小于5', type: 'error' })
        return
      }
      let params = {
        balance: Number.parseFloat(this.amount),
        userId: this.currentPmId
      }

      this.$api.rechargePm(params)
        .then(res => {
          this.isShowRecharge = false
          this.getPmList()
        })
        .catch(err => {
          this.$message({ message: err.errMsg, type: 'error' })
        })
    },
    handleBigImg(row) {
      if (row.financeCustomer.businessLicense) {
        let watermark = sessionStorage.getItem('watermark')
        this.imgSrc = row.financeCustomer.businessLicense + watermark
        this.visible = true;
      }

    },
    freeze(row) {
      console.log(row)
      this.$confirm(`确认冻结项目经理${row.name}吗?`, "谨慎操作", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      }).then(() => {
        let id = row.id
        this.$api.freezePm(id).then((response) => {
          if (response.data.respCode == 0) {
            this.$message.success('冻结成功')
            row.accountStatus = 2
          }
        }).catch((error) => {
          console.log(error);
        });
      })
    },
    unfreeze(row) {
      this.$confirm(`确认解冻项目经理${row.name}吗?`, "谨慎操作", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      }).then(() => {
        let id = row.id
        this.$api.unfreezePm(id).then((response) => {
          if (response.data.respCode == 0) {
            this.$message.success('解冻成功')
            row.accountStatus = 1
          }
        }).catch((error) => {
          console.log(error);
        });
      })
    },

    formatHas(row) {
      let val = row.hasCompany
      if (val == 1) {
        return '无'
      } else if (val == 2) {
        return '有'
      } else {
        return ''
      }
    },
    formatFeeStatus(row) {
      let val = row.feeStatus
      if (val == 1) {
        return '未开通'
      } else if (val == 2) {
        return '免费试用'
      } else if (val == 3) {
        return '正常'
      } else if (val == 4) {
        return '欠费'
      } else {
        return ''
      }
    },
    formataccountStatus(row) {
      let val = row.accountStatus
      if (val == 1) {
        return '可用'
      } else if (val == 2) {
        return '冻结'
      } else {
        return ''
      }
    },
    formatManagerStatus(row) {
      let val = row.managerStatus
      if (val == 1) {
        return '待认证'
      } else if (val == 2) {
        return '已认证'
      } else if (val == 3) {
        return '认证失败'
      } else {
        return ''
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPmList();
    },
    TabClick() {
      this.firstShow = false;
      this.secondShow = false;
      if (this.radio4 == 1) {
        this.firstShow = true
      } else if (this.radio4 == 2) {
        this.secondShow = true;
        this.form.managerStatus = '1'
      }
      this.getPmList()
    },
    getPmList() {
      const params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        managerStatus: this.firstShow == true ? 2 : this.form.managerStatus,
        nameAlias: this.form.nameAlias,
      }
      this.$api.getPmList(params).then((response) => {
        if (response.data.respCode == 0) {
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
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    routeToDetail(row) {
      const { href } = this.$router.resolve({
        name: "pmDetail",
        params: {
          id: row.id
        }
      });
      window.open(href, "_blank");
      //        this.$router.push({name:'pmDetail',params:{id:row.id}})
    },
    routeToEdit(row) {
      this.$router.push({ name: 'pmEdit', params: { id: row.id } })
    },
    routeToadd() {
      this.$router.push({ name: 'addCustomer' })
    },
    checkPass(row) {
      console.log(row)
      this.$confirm(`确认通过项目经理${row.name}的认证审核吗？`, "谨慎操作", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      }).then(() => {
        const params = {
          managerId: row.id
        }
        let id = row.id
        this.$api.pmCheckPass(params).then((response) => {
          if (response.data.respCode == 0) {
            this.$message.success('审核通过！')
            this.getPmList();
          }


        }).catch((error) => {
          console.log(error);
        });
      })
    },
    checkUnPass(row) {
      console.log(row)
      this.$prompt('驳回原因', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S+/,
        inputErrorMessage: '驳回原因不能为空'
      }).then(({ value }) => {
        const params = {
          managerId: row.id,
          refuseReason: value
        }
        this.$api.pmCheckFail(params).then((response) => {
          if (response.data.respCode == 0) {
            this.$message.success('审核不通过！')
            this.getPmList();
          }

        }).catch((error) => {
          console.log(error);
        });
      })
    },

  },
  beforeRouteEnter(to, form, next) {
    next(vm => {
      if (form.name == 'pmEdit') {
        vm.radio4 = 2
        vm.firstShow = false
        vm.secondShow = true
        vm.form.managerStatus = '1'
        vm.getPmList()
      } else {
        vm.radio4 = 1
        vm.firstShow = true
        vm.secondShow = false
        vm.getPmList()
      }
    })
  }
}
</script>

<style scoped>
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