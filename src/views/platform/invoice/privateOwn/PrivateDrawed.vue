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
        <el-table class="table-outline" :data="tableData" empty-text="暂无相关信息">
            <el-table-column prop="invoiceName" :show-overflow-tooltip="true" label="开票方" align="center" min-width="120">
            </el-table-column>
            <el-table-column prop="applyUserName" :show-overflow-tooltip="true" label="收票方" align="center" min-width="140">
            </el-table-column>
            <el-table-column prop="amount" :show-overflow-tooltip="true" label="开票金额(元)" align="center" min-width="140">
            </el-table-column>
            <el-table-column prop="invoiceType" :show-overflow-tooltip="true" label="发票类型" align="center" min-width="140" :formatter="fortype">
            </el-table-column>
            <el-table-column prop="invoiceContext" :show-overflow-tooltip="true" label="发票项目" :formatter="formatStatus" align="center" min-width="140">
                </el-table-column>
            <el-table-column prop="invoiceNumber" :show-overflow-tooltip="true" label="发票号码" :formatter="formatStatus" align="center" min-width="140">
            </el-table-column>
            <el-table-column prop="createdAt" :show-overflow-tooltip="true" label="提交时间" align="center" min-width="180">
            </el-table-column>
        </el-table>
        <div class="page-container">
            <el-pagination class="pagebox" @current-change="changePage" :current-page="currentPagePlat" :page-count="pageCountPlat" background layout="prev, pager, next">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name:'PrivateDrawed',
        data () {
            return {
                tableData:[],
                currentPagePlat:1,
                pageCountPlat:1,
                form: {
                    status: "",
                    dateRannamege: "",
                    select: 1
                },
                options: [
                    {
                    label: "项目经理",
                    value: 1
                    },
                    {
                    label: "客户",
                    value: 2
                    },
                ],
            }
        },
        methods: {
            changePage(val){
                this.currentPagePlat = val
                this.getList()
            },
            getList(){
                const params = {
                pageNum: this.currentPagePlat,
                pageSize: 20,
                applyUserType:3,
                invoiceToCustomerName:this.form.keyWord
                };
                this.$api
            .AlreadyDrawedAction(params)
            .then(response => {
              if (response.data.respCode == 0) {
                this.tableData = response.data.data.list;
                this.total = response.data.data.total;
                this.pageCountPlat=response.data.data.pages
              }
            })
            .catch(error => {
              console.log(error);
            });
            },
            fortype(val){
              if(val == 1){
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
}
</style>