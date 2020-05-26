<template>
  <div class="customerSubListCon">
<!--    <el-button class="myplain-btn" style="margin: 8px 0px" @click="routeToadd">添加客户</el-button>-->
    <div>
      <el-table :data="tableData" empty-text="暂无相关客户信息">
        <el-table-column prop="shortName" label="简称" show-overflow-tooltip align="left" min-width="150">
        </el-table-column>
        <!--<el-table-column prop="name" label="全称"  align="left" show-overflow-tooltip min-width="250">-->
        <!--</el-table-column>-->
        <el-table-column prop="industryName" label="行业" align="left" min-width="100">
        </el-table-column>
<!--
        <el-table-column prop="" label="所在地" show-overflow-tooltip align="left" min-width="250">
          <template scope="scope">
            {{scope.row.provinceName}}{{scope.row.cityName}}{{scope.row.regionName}}{{scope.row.address}}
          </template>
        </el-table-column>
-->
        <el-table-column prop="customerContact.contactName" show-overflow-tooltip label="联系人" align="left" min-width="120">
        </el-table-column>
        <el-table-column prop="customerContact.phone" label="联系电话" align="left" min-width="130">
        </el-table-column>
        <el-table-column prop="status" label="状态" :formatter="formatStatus" align="left" min-width="80">
        </el-table-column>
        <el-table-column prop="createdAt" label="注册时间" align="left" min-width="150">-->
        <template scope="scope">
          {{scope.row.createdAt |formatminDate }}
        </template>
        </el-table-column>
        <el-table-column label="操作" align="left" min-width="160">
          <template scope="scope">
            <el-button size="small" type="text" @click="routeToDetail( scope.row)">查看</el-button>
            <!--<el-button size="small" type="text" @click="routeToEdit(scope.row)">编辑</el-button>-->
            <el-button size="small" v-if="scope.row.status==1" type="text" @click="freeze( scope.row)">冻结</el-button>
            <el-button size="small" v-if="scope.row.status==2" type="text" @click="unfreeze(scope.row)">解冻</el-button>
            <el-button size="small" type="text" @click="handleRecharge( scope.row)">充值</el-button>
            <!--<el-button size="small" type="text">会员管理</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <el-dialog class="chargeCon" title="经理人充值" :visible.sync="isShowRecharge">
        <el-form label-width="70px" ref="chargeForm" :model="chargeForm" :rules="rules">
            <el-form-item label="金额" prop="amount">
                <el-input placeholder="请输入金额" v-model.number="chargeForm.amount" @input="amountInput('chargeForm','amount')" ></el-input>
            </el-form-item>
            <div class="formBtnCon">
                <el-button type="primary"  size="large" @click="confirmRecharge('chargeForm')">确认</el-button>
                <el-button @click="cancelRecharge('chargeForm')">取消</el-button>
            </div>
        </el-form>
    </el-dialog>
      <div class="page-container">
        <el-pagination class="pagebox" background layout="prev, pager, next" :current-page="currentPage" @current-change="handleCurrentChange" :page-count="pageCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import util from '../../../common/util'
export default {
  data() {
      let validateAmount =  (rule, value, callback) => {
        if (value === '') {
          callback(new Error('充值金额不能为空'));
        } else {
            if(  !Number.isInteger(this.chargeForm.amount) ) {
                callback(new Error('请填写正确的充值金额'));
            }else{
                 if(this.chargeForm.amount>this.limitAmount){
                     callback();
                 }else{
                     callback(new Error(`充值金额必须大于${this.limitAmount}元`));
                 }
            } 
        }
      };
    return {
      currentPage: 1,
      pageSize: 10,
      pageCount: 1,
      total: '',
      tableData: [],
      customerId:null,
      isShowRecharge: false,
        chargeForm:{
            amount:'',
        },
        rules:{
            amount:[
                { validator:validateAmount,trigger: 'blur' },
            ],
        },
        limitAmount:'',
    }
  },
  filters: {
    formatminDate(val) {
      if (val) {
        return util.minDate(val)
      } else {
        return ''
      }
    }
  },
  mounted() {
    this.getCustomerList();    
    this.getAmountLimit();
  },
  methods: {
      getAmountLimit(){
          let params = {
                paramName:'recharge'
            };
            this.$api.ParamsInfoString(params).then(res=>{
                let { respCode,data } = res;
                if( respCode === 0 ){
                    this.limitAmount = Number(data);
                }
            }).catch(err=>{
                console.log( 'err',err );
            });
      },
      amountInput(form,item){          
          let isNumber = toString.call(this[form][item]) === '[object Number]';
          if( isNumber ){
             let judge = Number.isInteger(this[form][item]);
              if( judge ){
              }else{
                 this[form][item] = '';
              }
          }else{
              this[form][item] = '';
          }
      },
      cancelRecharge(formName){
          this.$refs[formName].resetFields();
          this.isShowRecharge = false;
      },
    confirmRecharge(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
              let params = {
                balance: this.chargeForm.amount,
                customerId: this.customerId
              };
              this.$api.accountRecharge(params).then(res => {
                  let { data:layer1 } =  res;
                  let { respCode,errorMsg } = layer1;
                  if( respCode === 0 ){
                      this.isShowRecharge = false;
                      this.getCustomerList();
                      this.$message({
                        message: '充值成功',
                        type: 'success'
                      });
                      this.$refs[formName].resetFields();
                  }               
                })
                .catch(err => {
                  this.$message.error('网络异常');
                })
          } else {            
            return false;
          }
        });
    },
    handleRecharge(row){
      this.customerId = row.id;
      this.isShowRecharge = true
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getCustomerList();
    },
    formatStatus(row) {
      let val = row.status;
      if (val == 1) {
        return '可用'
      } else if (val == 2) {
        return '冻结'
      } else {
        return ''
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getCustomerList();
    },
    routeToDetail(row) {
      const { href } = this.$router.resolve({
        name: "customerDetail",
        params: {
          id: row.id,
          needManagerFee: row.needManagerFee,
          managerFee: row.managerFee,
          double: row.billServerRate
        }
      });
      window.open(href, "_blank");
      //        this.$router.push({name:'customerDetail',params:{id:row.id}})
    },
    routeToEdit(row) {
      this.$router.push({ name: 'editCustomer', params: { id: row.id } })
    },
    routeToadd() {
      this.$router.push({ name: 'addCustomer' })
    },
    freeze(row) {
      console.log(row)
      this.$confirm(`确认冻结客户${row.shortName}吗?`, "谨慎操作", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      }).then(() => {
        let id = row.id
        this.$api.freezeCustomer(id).then((response) => {
          this.$message.success('冻结成功')
          row.status = 2
        }).catch((error) => {
          console.log(error);
        });
      })
    },
    unfreeze(row) {
      this.$confirm(`确认解冻客户${row.shortName}吗?`, "谨慎操作", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      }).then(() => {
        let id = row.id
        this.$api.unfreezeCustomer(id).then((response) => {
          this.$message.success('解冻成功')
          row.status = 1
        }).catch((error) => {
          console.log(error);
        });
      })
    },
    getCustomerList() {
      const params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      this.$api.getCustomerList(params).then((response) => {
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
    }
  }
}
</script>
<style scoped lang="scss">
    .customerSubListCon {
        .formBtnCon {
            text-align: center;
        }
    }
</style>
<style lang="scss">
   .customerSubListCon {
        .chargeCon {
            .el-dialog {
                width: 450px;                
            }
            .el-dialog__header {
                text-align: center;
                padding-top: 3px;
                padding-bottom: 3px;
            }
            .el-dialog__body {
                padding-top: 10px;
            }
        }
    } 
</style>