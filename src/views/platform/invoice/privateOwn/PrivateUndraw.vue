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
            <el-table-column prop="amount" :show-overflow-tooltip="true" label="开票金额(元)" align="center" min-width="100">
            </el-table-column>
            <el-table-column prop="invoiceType" :show-overflow-tooltip="true" label="发票类型" align="center" min-width="100" :formatter="fortype">
            </el-table-column>
            <el-table-column prop="invoiceContext" :show-overflow-tooltip="true" label="发票项目" align="center" min-width="140">
            </el-table-column>
            <el-table-column prop="createdAt" :show-overflow-tooltip="true" label="提交时间" align="center" min-width="100">
            </el-table-column>
            <el-table-column
            label="操作"
            width="140">
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">开票信息</el-button>
                <el-button type="text" size="small" @click="addNew(scope.row)">开票</el-button>
            </template>
            </el-table-column>
        </el-table>
        <div class="page-container">
        <el-pagination
          class="pagebox"
          @current-change="changePage"
          :current-page="currentPagePlat"
          :page-count="currentPagePlat"
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
                <el-form ref="form" :model="dia" label-width="160px" label-position="left" :rules="rules">
                    <el-form-item label="开票公司：" class="label">
                        {{row.invoiceName ? row.invoiceName : ''}}
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
    </div>
</template>

<script>
    export default {
        name:'PrivateUndraw',
        data () {
            return {
                tableData:[],
                currentPagePlat:1,
                currentPagePlat:1,
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
                confirmDia:false,
                row:{}
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
            .ForDrawAction(params)
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
            handleClick(row){
                this.row = row
                this.confirmDia = true
            },
            addNew(row){
                this.$router.push({name:'drawing',params:{id:row.id}})
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