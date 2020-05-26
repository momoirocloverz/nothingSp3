<template>
    <div>
        <el-form
        ref="form"
        :model="form"
        label-width="110px"
      >
        <!--选择条件的单选按钮-->
        <el-form-item
          label="服务状态："
          class="formSearchMargin formSearchMarginTop"
        >
          <el-radio-group
            class="radio-search"
            v-model="form.status"
          >
            <el-radio label="">不限</el-radio>
            <el-radio label="1">服务中</el-radio>
            <el-radio label="2">停止服务</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="剩余服务期限："
          class="formSearchMargin"
        >
          <el-radio-group
            class="radio-search"
            v-model="form.dateRange"
          >
            <el-radio label="">不限</el-radio>
            <el-radio label="30">30天内</el-radio>
            <el-radio label="7">7天内</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="关键字："
          class="formSearchMargin parentPO"
        >
          <el-input
            placeholder="输入关键字搜索"
            v-model="form.keyWord"
            size="mini"
            class="input-with-select select-input"
          >
            <el-select
              v-model="form.select"
              slot="prepend"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-input>
          <el-button
            type="primary"
            class="searchBtn keyWBtn"
            @click="getList"
          >搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="splitLine"></div>
      <el-button
        class="myplain-btn1"
        style="margin: 8px 14px 18px 14px"
        @click="addNew"
      >添加自有个体工商户</el-button>
      <div class="recordNum">符合查询条件的记录{{total}}条</div>
      <el-table
        class="table-outline"
        :data="tableData"
        empty-text="暂无相关个体工商户信息"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="经营场所" class="form_p">
                <span class="text">{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="注册日期">
                <span class="text">{{ props.row.recordDate }}</span>
              </el-form-item>
              <el-form-item label="开户银行">
                <span class="text">{{ props.row.bankName }}</span>
              </el-form-item>
              <el-form-item label="户名">
                <span class="text">{{ props.row.accountHolder }}</span>
              </el-form-item>
              <el-form-item label="银行账号">
                <span class="text">{{ props.row.bankCard }}</span>
              </el-form-item>
              <el-form-item label="每月最大开票金额">
                <span class="text">{{ props.row.taxAmount}}元</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span class="text">{{ props.row.createdAt }}</span>
                </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="customerNameAlias"
          :show-overflow-tooltip="true"
          label="所属客户"
          align="center"
          min-width="110"
        >
          <template scope="scope">
            <span class="is-mylink" @click="goManager(scope.row)">
                {{scope.row.customerNameAlias}}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          :show-overflow-tooltip="true"
          label="字号名称"
          align="center"
          min-width="100"
        >
        </el-table-column>
        <el-table-column
          prop="legalPerson"
          :show-overflow-tooltip="true"
          label="经营者姓名"
          align="center"
          min-width="100"
        >
        </el-table-column>
        <!-- <el-table-column
          prop="address"
          :show-overflow-tooltip="true"
          label="经营场所"
          align="center"
          min-width="180"
        >
        </el-table-column> -->
        <el-table-column
          prop="creditCode"
          :show-overflow-tooltip="true"
          label="统一社会信用代码"
          align="center"
          min-width="130"
        >
        </el-table-column>
        <el-table-column
          prop="totalPayAmount"
          :show-overflow-tooltip="true"
          label="已交年费（元）"
          align="center"
          min-width="110"
        >
        </el-table-column>
        <el-table-column
          prop="endTime"
          label="服务截止日期"
          :show-overflow-tooltip="true"
          align="center"
          min-width="130"
        >
        </el-table-column>
        <el-table-column
          prop="serversType"
          :show-overflow-tooltip="true"
          label="服务状态"
          align="center"
          min-width="100"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          :show-overflow-tooltip="true"
          label="状态"
          :formatter="forPType"
          align="center"
          min-width="100"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="240"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              v-if="scope.row.status != 3"
              size="small"
              @click="payCharge(scope.row)"
            >续费</el-button>
            <el-button
              type="text"
              size="small"
              @click="editOwnPrivately(scope.row)"
            >编辑</el-button>
            <el-button
              @click="viewRecord(scope.row)"
              type="text"
              size="small"
            >查看交费记录</el-button>
            <el-button
              @click="cancelShow(scope.row)"
              type="text"
              v-if="scope.row.status != 3"
              size="small"
            >注销</el-button>

          </template>
        </el-table-column>
      </el-table>
      <div class="page-container">
        <el-pagination
          class="pagebox"
          @current-change="changePage"
          :current-page="currentPage"
          :page-count="pageCount"
          background
          layout="prev, pager, next"
        >
        </el-pagination>
      </div>
      <el-dialog
      title=""
      :visible.sync="lastFeeDia"
      width="600px"
      center
    >
      <div class="dialog-head">
        <span>自有个体工商户续费</span>
      </div>
      <div class="bodyDiv">
        <el-form
          ref="form1"
          :model="feeForm"
          label-width="110px"
          label-position="left"
          :rules="feerules"
        >
          <el-form-item label="所属项目经理：">
            {{feeCustomerName}}
          </el-form-item>
          <el-form-item
            label="字号名称："
            class="mTop2"
          >
            {{feeName}}
          </el-form-item>
          <el-form-item
            label="经营者姓名："
            class="mTop2"
          >
            {{feeLegalPerson}}
          </el-form-item>
          <el-form-item
            label="续费金额："
            prop="yearFee"
          >
            <el-input
              class="radius-input workerInp"
              placeholder=""
              size="medium"
              type="number"
              v-model="feeForm.yearFee"
            ></el-input>
            <span class="yuan">元</span>
          </el-form-item>
          <el-form-item
            label="交费日期："
            prop="paidDate"
          >
            <el-date-picker
              class="radius-input dateWidth"
              v-model="feeForm.paidDate"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item
            label="续费年数："
            prop="year"
          >
            <el-input
              class="radius-input workerInp"
              placeholder=""
              size="medium"
              maxlength="2"
              v-model="feeForm.year"
            ></el-input>
            <span class="yuan">年</span>
          </el-form-item>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          round
          size="medium"
          type="primary"
          @click="payFee"
        >保 存</el-button>
        <el-button
          round
          size="medium"
          @click="lastFeeDia = false"
        >取 消</el-button>
      </span>
    </el-dialog>
    </div>
</template>

<script>
    export default {
        name:"CPrivately",
        data () {
          let _this = this;
    let checkNum = (rule, value, callback) => {
      if (value) {
        if (value < 0) {
          callback(new Error("请输入大于0的数字"));
        } else {
           _this.feeForm.yearFee =  value.toString().replace(/^(([1-9]\d{0,7})(\.\d{1,2})?|0\.[1-9]{1,2})$/);
          _this.feeForm.yearFee = value.toString().replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
          _this.feeForm.yearFee = value.toString().replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的  
          _this.feeForm.yearFee = value.toString().replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
          _this.feeForm.yearFee = value.toString().replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数  
          callback();
        }
      } else {
        callback(new Error("续费金额不能为空"));
      }
    };
            return {
                form: {
                status: "",
                dateRange: "",
                manager: "不限",
                tag: "不限",
                keyWord: "",
                keyWord2: "",
                keyWord3: "",
                select: 1
                },
                currentPage: 1,
                pageCount: 1,
                tableData:[],
                options: [
                    {
                    label: "客户简称",
                    value: 1
                    },
                    {
                    label: "经营者姓名",
                    value: 2
                    },
                    {
                    label: "字号名称",
                    value: 3
                    }
                ],
                lastFeeDia:false,
                feeForm: {
                  year: "",
                  paidDate: "",
                  yearFee: ""
                },
                feerules: {
                  yearFee: [
                    {
                      required: true,
                      // message: "续费金额不能为空",
                      trigger: "change",
                      validator: checkNum
                    },
                  ],
                  paidDate: [
                    {
                      required: true,
                      message: "交费日期不能为空",
                      trigger: "change"
                    }
                  ],
                  year: [
                    {
                      required: true,
                      message: "续费年数不能为空",
                      trigger: "blur"
                      // validator: checkAccount
                    },
                    {
                      pattern: /^[1-9][0-9]*$/,
                      message: "请输入正整数"
                    }
                  ]
                },
                feeCustomerId: "",
                feeId: "",
                feeCustomerName: "",
                feeName: "",
                feeLegalPerson: "",
            }
        },
        methods: {
            addNew(row) {
              this.$router.push({ name: "newCusPrivately"});
            },
            editOwnPrivately(row){
              this.$router.push({ name: "editPrivately",params:{id:row.id, isSelf: 3} });
            },
            getList() {
            const params = {
              pageNum: this.currentPage,
              pageSize: 10,
              isSelf: 3,
              customerName: this.form.select == 1 ? this.form.keyWord : '',
              companyName: this.form.select == 3 ? this.form.keyWord : '',
              legalPersonName: this.form.select == 2 ? this.form.keyWord : '',
              endTimeDays: parseInt(this.form.dateRange),
              serversType: parseInt(this.form.status)
            };
            this.$api
              .CPrivatelyList(params)
              .then(response => {
                if (response.data.respCode == 0) {
                  this.tableData = response.data.data.list;
                  this.pageCount = response.data.data.pages;
                  this.total = response.data.data.total;
                }
              })
              .catch(error => {
                console.log(error);
              });
          },
          viewRecord(row) {
            const { href } = this.$router.resolve({
              name: "viewRecordC",
              params: {
                id: row.id,
                customerId: row.customerId,
                cuntomerName: row.customerNameAlias,
                legalPerson: row.legalPerson,
                name: row.name
              }
            });
            window.open(href, "_blank");
          },
          payCharge(row) {
            this.lastFeeDia = true;
            this.feeId = row.id;
            this.feeCustomerId = row.customerId;
            this.feeCustomerName = row.customerNameAlias;
            this.feeName = row.name;
            this.feeLegalPerson = row.legalPerson;
          },
          payFee() {
            this.$refs.form1.validate(valid => {
              if (valid) {
                const params = {
                  customerId: this.feeCustomerId,
                  financeCustomerId: this.feeId,
                  payAmount: this.feeForm.yearFee,
                  payDate: this.feeForm.paidDate,
                  years: this.feeForm.year
                };
                this.$api
                  .PrivatelyPayCharge(params)
                  .then(response => {
                    if (response.data.respCode == 0) {
                      this.getList();
                      this.lastFeeDia = false;
                      this.$message.success("续费成功");
                      this.feeForm.yearFee = ''
                      this.feeForm.paidDate = ''
                      this.feeForm.year = ''
                    }
                  })
                  .catch(error => {
                    console.log(error);
                  });
              } else {
                console.log("error submit!!");
                return false;
              }
            });
          },
          cancelShow(row){
            this.$confirm("确认注销吗?", "谨慎操作", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "error"
              }).then(() => {
                let id=row.id
              this.$api.CancelItem({id}).then((response) => {
                  this.$message.success('注销成功')
                  row.status = 3
                }).catch((error) => {
                  console.log(error);
                });
              })
          },
          forPType(row){
            if(row.status == 3){
              return '已注销'
            }else{
              return '正常'
            }
          },
          changePage(val){
            this.currentPage = val
            this.getList()
          }
        },
        mounted () {
            this.getList()
        },
        watch: {
          "form.dateRange": function(val, old) {
            if (val != old) {
              this.currentPage=1
              this.getList();
            }
          },
          "form.dateRange": function(val, old) {
            if (val != old) {
              this.currentPage=1
              this.getList();
            }
          },
          "form.select": function(val, old) {
            this.form.keyWord = "";
          },
          "form.status": function(val, old) {
            if (val != old) {
              this.currentPage=1
              this.getList();
            }
          },
        }
    }
</script>

<style scoped>
.keyWBtn{
        position: absolute;
    left: 410px;
    top: 7px;
}
.select-input{
    width:396px;
    margin-right: 20px;
}
.parentPO {
  position: relative;
}
.input-with-select {
  width: 352px;
}
.el-input  .el-select{
    width: 134px;
}
.select-input{
    width:396px;
    margin-right: 20px;
}
.myplain-btn1 {
  padding: 10px 12px;
  color: #e84518;
  width: 150px;
  height: 32px;
  background-color: #ffffff;
  border: solid 1px #e84518;
  border-radius: 0;
  font-size: 12px !important;
}
.workerInp{
  width:400px
}
.dateWidth{
  width:400px
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
  .text{
    font-size: 12px
  }
</style>