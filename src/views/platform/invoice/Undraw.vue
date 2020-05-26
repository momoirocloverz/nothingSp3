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
            v-model="form.name"
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
            <el-table-column prop="invoiceReceiver" :show-overflow-tooltip="true" label="收票方" align="center" min-width="120">
            </el-table-column>
            
            <el-table-column prop="amount" :show-overflow-tooltip="true" label="开票金额(元)" align="center" min-width="120">
            </el-table-column>
            <el-table-column prop="invoiceType" :show-overflow-tooltip="true" label="发票类型" align="center" min-width="140" :formatter="fortype">
            </el-table-column>
            <el-table-column prop="invoiceTax" :show-overflow-tooltip="true" label="发票税点（%）" align="center" min-width="140">
            </el-table-column>
            <el-table-column prop="createdAt" :formatter="createdAt" :show-overflow-tooltip="true" label="提交时间" align="center" min-width="140">
            </el-table-column>
             <el-table-column prop="invoiceName" :show-overflow-tooltip="true" label="发票内容" align="center" min-width="140">
            </el-table-column>
            <el-table-column prop="invoiceCategory" :show-overflow-tooltip="true" label="开票方" align="center" min-width="140">
              <template slot-scope="scope">
                <div>
                  {{invoiceCategoryMap[scope.row.invoiceCategory]}}
                </div>
              </template>
            </el-table-column>
            <el-table-column
          label="操作"
          width="180"
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
              @click="addNew(scope.row)"
            >开票</el-button>
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
                :visible.sync="confirmDia"
                width="600px"
                center
        >
            <div class="dialog-head">
                <span>开票信息</span>
            </div>
            <div style="margin:40px auto 0"> 
                <el-form ref="form" :model="dia" label-width="160px" label-position="left">
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
        name:'Drawing',
        data () {
            return {
                invoiceCategoryMap:{
                  [1]:'平台使用费开票（万才科技开票）',
                  [2]:'外包费用开票（淳安万才开票）'
                },
                tableData:[],
                form: {
                    status: "",
                    keyWord: "",
                    keyType: 1
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
                currentPage:1,
                pageCount:1,
                total: 0,
                dia:{

                },
                confirmDia:false,
                confirmDiaAddess: false,
                row:{}
            }
        },
        methods: {
            matterReceiveTime(row, column, cellValue){
              if(cellValue){
                return cellValue.substr(0,10)
              }else{
                return '无'
              }
            },
            changePage(val){
                this.currentPage = val
                this.getList()
            },
            createdAt(row, column, cellValue){
              if(cellValue){
                return cellValue.substr(0,10)
              }else{
                return '无'
              }
            },
            getList(){
                const params = {
                pageNum: this.currentPage,
                pageSize: 20,
                status: 1,
                invoiceReceiver: this.form.keyWord,
                // keyType: this.form.keyType
                };
                this.$api
            .ForDraw2(params)
            .then(response => {
              console.log(response)
              if (response.data.respCode == 0) {
                this.tableData = response.data.data.list;
                // this.total = response.data.data.total;
                this.pageCount=response.data.data.pages
              }
            })
            .catch(error => {
              console.log(error);
            });
            // const $data = JSON.parse(`{"respCode":0,"data":{"pageNum":1,"pageSize":20,"size":15,"startRow":1,"endRow":15,"total":15,"pages":1,"list":[{"id":1,"applyId":1,"applyUserType":2,"applyUserName":"吴跃进","invoiceType":1,"invoiceCategory":0,"invoiceContext":"服务费","amount":100.00,"creditCode":"123456789012345678","registeAddress":"高德置地广场","phone":"13918599501","bankName":"中国农业银行","bankCard":"23358443684235845","status":1,"invoiceTax":3,"createdAt":"2019-02-24 07:01:19","createdBy":0,"updatedAt":"2019-02-24 07:01:19"},{"id":2,"applyId":1,"applyUserType":2,"applyUserName":"吴跃进","invoiceType":1,"invoiceCategory":0,"invoiceContext":"服务费","amount":8.00,"creditCode":"123456789012345678","registeAddress":"高德置地广场","phone":"13918599501","bankName":"中国农业银行","bankCard":"23358443684235845","status":1,"invoiceTax":3,"createdAt":"2019-02-24 07:01:19","createdBy":0,"updatedAt":"2019-02-24 07:01:19"},{"id":4,"applyId":1,"applyUserType":2,"applyUserName":"吴跃进","invoiceType":1,"invoiceCategory":0,"invoiceContext":"服务费","amount":8.00,"creditCode":"123456789012345678","registeAddress":"高德置地广场","phone":"13918599501","bankName":"中国农业银行","bankCard":"23358443684235845","status":1,"invoiceTax":3,"createdAt":"2019-03-26 16:28:02","createdBy":0,"updatedAt":"2019-03-26 16:28:02"},{"id":5,"applyId":1,"applyUserType":2,"applyUserName":"吴跃进","invoiceType":1,"invoiceCategory":0,"invoiceContext":"服务费","amount":6.00,"creditCode":"123456789012345678","registeAddress":"高德置地广场","phone":"13918599501","bankName":"中国农业银行","bankCard":"23358443684235845","status":1,"invoiceTax":3,"createdAt":"2019-04-11 18:16:08","createdBy":0,"updatedAt":"2019-04-11 18:16:08"},{"id":6,"applyId":1,"applyUserType":1,"applyUserName":"万才物流","invoiceType":1,"invoiceCategory":0,"invoiceContext":"服务费","amount":5.00,"creditCode":"91330109MA27WA3T59","registeAddress":"萧山区萧山经济开发区启迪路198号C-505室","phone":"0571-86850115","bankName":"杭州银行滨江支行","bankCard":"3301040160003918276","status":1,"invoiceTax":3,"createdAt":"2019-06-10 16:44:51","createdBy":0,"updatedAt":"2019-06-10 16:44:51"},{"id":7,"applyId":1,"applyUserType":3,"applyUserName":"吴跃进","invoiceType":2,"invoiceCategory":0,"amount":8.00,"customerName":"公司以","creditCode":"123456789123456","registeAddress":"哇","phone":"达达","bankName":"xnsnq","bankCard":"123","receiver":"菜场","mobile":"13788881111","address":"喜欢小孩子上课","status":1,"invoiceTax":6,"createdAt":"2019-06-20 15:50:22","createdBy":507,"updatedAt":"2019-06-20 15:49:32","updatedBy":507},{"id":8,"applyId":1,"applyUserType":3,"applyUserName":"吴跃进","invoiceType":1,"invoiceCategory":0,"amount":2.64,"customerName":"公司以","creditCode":"123456789123456","registeAddress":"哇","phone":"达达","bankName":"xnsnq","bankCard":"123","receiver":"菜场","mobile":"13788881111","address":"喜欢小孩子上课","status":1,"invoiceTax":3,"createdAt":"2019-06-20 15:52:36","createdBy":507,"updatedAt":"2019-06-20 15:49:32","updatedBy":507},{"id":9,"applyId":76,"applyUserType":3,"applyUserName":"金金","invoiceType":1,"invoiceCategory":0,"amount":0.00,"customerName":"测试公司名","creditCode":"123456789987654321","registeAddress":"123","phone":"12345678900","bankName":"123","bankCard":"123","receiver":"测试地址","mobile":"12345678900","address":"123","status":1,"invoiceTax":6,"createdAt":"2019-06-20 16:04:33","createdBy":2868,"updatedAt":"2019-06-20 16:04:21","updatedBy":2868},{"id":10,"applyId":76,"applyUserType":3,"applyUserName":"金金","invoiceType":1,"invoiceCategory":0,"amount":0.00,"customerName":"测试公司名","creditCode":"123456789987654321","registeAddress":"123","phone":"12345678900","bankName":"123","bankCard":"123","receiver":"测试地址","mobile":"12345678900","address":"123","status":1,"invoiceTax":6,"createdAt":"2019-06-20 16:05:51","createdBy":2868,"updatedAt":"2019-06-20 16:04:21","updatedBy":2868},{"id":11,"applyId":76,"applyUserType":3,"applyUserName":"金金","invoiceType":2,"invoiceCategory":0,"amount":0.00,"customerName":"1","creditCode":"123456789123456789","registeAddress":"1","phone":"12345678900","bankName":"1","bankCard":"1","receiver":"2","mobile":"12345678900","address":"1","status":1,"invoiceTax":3,"createdAt":"2019-06-20 16:09:57","createdBy":2868,"updatedAt":"2019-06-20 16:09:53","updatedBy":2868},{"id":12,"applyId":76,"applyUserType":3,"applyUserName":"金金","invoiceType":1,"invoiceCategory":0,"amount":0.00,"customerName":"1","creditCode":"123456789123456789","registeAddress":"1","phone":"12345678900","bankName":"1","bankCard":"1","receiver":"测试地址","mobile":"12345678900","address":"123","status":1,"invoiceTax":3,"createdAt":"2019-06-20 16:10:17","createdBy":2868,"updatedAt":"2019-06-20 16:04:21","updatedBy":2868},{"id":13,"applyId":1,"applyUserType":3,"applyUserName":"吴跃进","invoiceType":1,"invoiceCategory":0,"amount":52.00,"customerName":"公司以","creditCode":"123456789123456","registeAddress":"哇","phone":"达达","bankName":"xnsnq","bankCard":"123","receiver":"菜场","mobile":"13788881111","address":"喜欢小孩子上课","status":1,"invoiceTax":3,"createdAt":"2019-06-25 16:14:31","createdBy":507,"updatedAt":"2019-06-20 15:49:32","updatedBy":507},{"id":14,"applyId":1,"applyUserType":3,"applyUserName":"吴跃进","invoiceType":2,"invoiceCategory":0,"amount":1.00,"customerName":"公司以","creditCode":"123456789123456","registeAddress":"哇","phone":"达达","bankName":"xnsnq","bankCard":"123","receiver":"菜场","mobile":"13788881111","address":"喜欢小孩子上课","status":1,"invoiceTax":3,"createdAt":"2019-07-03 14:57:54","createdBy":507,"updatedAt":"2019-06-20 15:49:32","updatedBy":507},{"id":15,"applyId":76,"applyUserType":3,"applyUserName":"金金","invoiceType":1,"invoiceCategory":0,"amount":0.00,"customerName":"1","creditCode":"123456789123456789","registeAddress":"1","phone":"12345678900","bankName":"1","bankCard":"1","receiver":"2","mobile":"12345678900","address":"1","status":1,"invoiceTax":6,"createdAt":"2019-07-03 15:34:23","createdBy":2868,"updatedAt":"2019-06-20 16:09:53","updatedBy":2868},{"id":16,"applyId":1,"applyUserType":2,"applyUserName":"万才物流","invoiceType":2,"invoiceCategory":1,"invoiceName":"技术服务费","amount":5.00,"customerName":"测试开票流程","creditCode":"123456789123459","registeAddress":"测试","phone":"13938560490","bankName":"测试测试","bankCard":"658895645896452","receiver":"测试","mobile":"13938560499","address":"测试测试","status":1,"invoiceTax":6,"createdAt":"2019-08-01 16:45:42","createdBy":505,"updatedAt":"2019-08-01 16:45:42","updatedBy":505}],"prePage":0,"nextPage":0,"isFirstPage":true,"isLastPage":true,"hasPreviousPage":false,"hasNextPage":false,"navigatePages":8,"navigatepageNums":[1],"navigateFirstPage":1,"navigateLastPage":1,"firstPage":1,"lastPage":1}}`);
            // console.log($data)
            //  this.tableData = $data.data.list;
            //  this.pageCount=$data.data.pages
            },
            addNew(row){
                this.$router.push({name:'drawing',params:{id:row.id}})
            },
            info(row){
              this.row = row
              this.confirmDia = true
            },
            infoAddess(row){
              this.row = row
              this.confirmDiaAddess = true
            },
            fortype(val){
              if(val.invoiceType == 1){
                return '普票'
              }else{
                return '专票'
              }
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