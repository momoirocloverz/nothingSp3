<template>
    <div>
        <el-form
        ref="form"
        :model="form"
        label-width="110px"
      >
        <!--选择条件的单选按钮-->
        <!-- <el-form-item
          label="状态："
          class="formSearchMargin formSearchMarginTop"
        >
          <el-radio-group
            class="radio-search"
            v-model="form.status"
          >
            <el-radio label="">不限</el-radio>
            <el-radio label="1">待开票</el-radio>
            <el-radio label="2">已开票</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="开票方："
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
        </el-form-item> -->
        <el-form-item
          label="关键字："
          class="formSearchMargin parentPO"
        >
          <el-input
            placeholder="请输入收票方名称"
            v-model="form.keyWord"
            size="mini"
            class="input-with-select select-input"
          >
            <!--<el-select
              v-model="form.keyType"
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
            </el-select>-->
          </el-input>
          <el-button
            type="primary"
            class="searchBtn keyWBtn"
            @click="getList"
          >搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="splitLine"></div>
        <el-table class="table-outline" :data="tableData" empty-text="暂无相关信息">
            <el-table-column prop="invoiceOpenDate" :show-overflow-tooltip="true" :formatter="createdAt" label="开票时间" align="center" min-width="100">
            </el-table-column>
            <el-table-column prop="invoiceReceiver" :show-overflow-tooltip="true" label="收票方" align="center" min-width="100">
            </el-table-column>
            <el-table-column prop="amount" :show-overflow-tooltip="true" label="开票金额(元)" align="center" min-width="100">
            </el-table-column>
            <el-table-column prop="invoiceType" :show-overflow-tooltip="true" label="发票类型" align="center" min-width="100" :formatter="fortype">
            </el-table-column>
            <el-table-column prop="invoiceTax" :show-overflow-tooltip="true" label="发票税点（%）" align="center" min-width="100">
            </el-table-column>
            <el-table-column prop="createdAt" :formatter="createdAt" :show-overflow-tooltip="true" label="提交时间" align="center" min-width="100">
            </el-table-column>
            <el-table-column prop="invoiceName" :show-overflow-tooltip="true" label="发票内容" align="center" min-width="120">
            </el-table-column>
            <el-table-column prop="invoiceCategory" :show-overflow-tooltip="true" label="开票方" align="center" min-width="170">
              <template slot-scope="scope">
                <div style="width:100%;text-align:center;">
                  {{invoiceCategoryMap[scope.row.invoiceCategory]}}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="invoiceRecordNumberList" :show-overflow-tooltip="true" label="发票号码" align="center" min-width="140">
              <template slot-scope="scope">
                <div style="" v-for="it,i in scope.row.invoiceRecordNumberList?scope.row.invoiceRecordNumberList.split(','):[]" :key="i">
                  {{it}}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="expressCompany" :show-overflow-tooltip="true" label="物流公司" align="center" min-width="100">
            </el-table-column>
            <el-table-column prop="expressNumber" :show-overflow-tooltip="true" label="快递单号" align="center" min-width="100">
            </el-table-column>
             <el-table-column
          label="操作"
          width="270"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="info(scope.row)"
            >开票信息</el-button>
            <el-button
              type="text"
              size="small"
              @click="infoAddess(scope.row)"
            >收票地址</el-button>
            <el-button
              type="text"
              size="small"
              @click="handleEdit(scope.row)"
            >修改发票</el-button>
          </template>
        </el-table-column>
        </el-table>
        <div class="page-container">
            <el-pagination class="pagebox" @current-change="changePage" :current-page="currentPagePlat" :page-count="pageCountPlat" background layout="prev, pager, next">
            </el-pagination>
        </div>
        <el-dialog
                title=""
                :visible.sync="confirmDia"
                width="600px"
                center
        >
            <div class="dialog-head">
                <span>开票信息</span>
            </div>
            <div style="margin:40px auto 0"> 
                <el-form ref="form" :model="row" label-width="160px" label-position="left">
                    <el-form-item label="开票公司：" class="label">
                        {{row.customerName ? row.customerName : ''}}
                    </el-form-item>
                    <el-form-item label="统一社会信用代码：" class="label">
                        {{row.creditCode ? row.creditCode : ''}}
                    </el-form-item>
                    <el-form-item label="注册地址：" class="label">
                        {{row.registeAddress ? row.registeAddress : ''}}
                    </el-form-item>
                    <el-form-item label="注册电话：" class="label">
                        {{row.phone ? row.phone : ''}}
                    </el-form-item>
                    <el-form-item label="开户银行：" class="label">
                        {{row.bankName ? row.bankName : ''}}
                    </el-form-item>
                    <el-form-item label="银行账号：" class="label">
                        {{row.bankCard ? row.bankCard : ''}}
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
                @click="confirmDia = false"
        >确 认</el-button>
      </span>
        </el-dialog>
        <el-dialog
                title=""
                :visible.sync="confirmDiaAddess"
                width="600px"
                center
        >
            <div class="dialog-head">
                <span>收票地址</span>
            </div>
            <div style="margin:40px auto 0"> 
                <el-form ref="form" label-width="160px" label-position="left">
                    <el-form-item label="收货人：" class="label">
                        {{row.receiver ? row.receiver : ''}}
                    </el-form-item>
                    <el-form-item label="手机号码：" class="label">
                        {{row.mobile ? row.mobile : ''}}
                    </el-form-item>
                    <el-form-item label="地址：" class="label">
                        {{row.address ? row.address : ''}}
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
                @click="confirmDia = false"
        >确 认</el-button>
      </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name:'drawed',
        data () {
            return {
              invoiceCategoryMap:{
                  [1]:'平台使用费开票（万才科技开票）',
                  [2]:'外包费用开票（淳安万才开票）'
                },
                tableData:[],
                currentPagePlat:1,
                pageCountPlat:1,
                form: {
                    status: "",
                    keyWord: "",
                    keyType: 1,
                },
                options: [
                    {
                    label: "项目经理",
                    value: 1
                    },
                    {
                    label: "客户简称",
                    value: 2
                    },
                ],
                row:{},
                confirmDia:false,
                confirmDiaAddess: false
            }
        },
        methods: {
            handleEdit(row){
              this.$store.commit('SET_EDIT',row);
              this.$router.push({name:'drawing',params:{id:row.id},query:{edit:1}})
            },
            createdAt(row, column, cellValue){
              if(cellValue){
                return cellValue.substr(0,10)
              }else{
                return '无'
              }
            },
            changePage(val){
                this.currentPagePlat = val
                this.getList()
            },
            getList(){
                const params = {
                pageNum: this.currentPage,
                pageSize: 20,
                status: 2,
                invoiceReceiver: this.form.keyWord,
                // keyType: this.form.keyType
                };
                this.$api
            .ForDraw2(params)
            .then(response => {
              if (response.data.respCode == 0) {
                this.tableData = response.data.data.list;
                this.pageCountPlat=response.data.data.pages
              }
            })
            .catch(error => {
              console.log(error);
            });
            // console.log($data )
            // this.tableData = $data.data.list;
            //  this.pageCount=$data.data.pages
            },
            fortype(val){
              if(val.invoiceType == 1){
                return '普票'
              }else{
                return '专票'
              }
            },
            info(row){
              this.row = row
                this.confirmDia = true
                console.log(this.row)
            },
            infoAddess(row){
              this.row = row
              this.confirmDiaAddess = true
            },
        },
        mounted () {
          this.getList()
        }
    }
</script>

<style scoped>
.myplain-btn1 {
  padding: 10px 24px;
  color: #e84518;
  height: 32px;
  background-color: #ffffff;
  border: solid 1px #e84518;
  border-radius: 0;
  font-size: 12px !important;
}
.el-input  .el-select{
    width: 134px;
}
.select-input{
    width:396px;
    margin-right: 20px;
}
.keyWBtn{
        position: absolute;
    left: 410px;
    top: 7px;
}
</style>