<template>
    <div>
        <el-form ref="form" :model="form" label-width="110px" labelPosition="left">
            <el-form-item label="关键字：" class="formSearchMargin ">
                <el-input class="rant-input inputWidth keyWFormParent" v-model="form.shortName"></el-input>
                <el-button type="primary" class="searchBtn keyWBtn" @click="getList">搜索</el-button>
            </el-form-item>
        </el-form>
        <div class="splitLine"></div>
        <el-button class="myplain-btn" style="margin: 3px 0px 18px 0px" @click="routeToadd">添加客户</el-button>

        <div >
            <div class="workerListBox" >
                <div
                        class="flexSafari"
                        v-for="item in tableData"

                >
        <span class="vw-left flexSafari leftdiv-width">
          <span class="vw-name">{{item.shortName}}</span>
          <span class="vw-sex clearfix">
            <span class="vw-fulllname">{{item.name}}</span>
          </span>
        </span>
                    <span class="vw-center flexSafari"></span>
                    <span class="vw-right flexSafari centerdiv-width">
          <span class="vw-right-t ">
            <span class="vw-right-t-tel floatLeft ">所在地：</span>
            <span class="vw-right-t-num floatLeft address-width text-overflow">

               <el-tooltip class="item" effect="dark" :content="item.provinceName+item.cityName+item.regionName+item.address" placement="top-start">
                    <span class="text-overflow">{{item.provinceName}}{{item.cityName}}{{item.regionName}}{{item.address}}</span>
                </el-tooltip></span>
          </span>
          <span class="vw-right-t">
            <span class="vw-right-t-tel floatLeft">联系人：</span>
            <span class="vw-right-t-num floatLeft">{{item.contactName}}</span>
          </span>
          <span class="vw-right-t">
            <span class="vw-right-t-tel floatLeft">联系电话：</span>
            <span class="vw-right-t-num floatLeft">{{item.phone2}}</span>
          </span>
        </span>
                    <span class="vw-center flexSafari"></span>
                    <span class="vw-right flexSafari">
          <span class="vw-right-t">
            <span class="vw-right-t-tel floatLeft">进行中任务数：</span>
            <span class="vw-right-t-num floatLeft">{{item.processingTaskCount}}</span>
          </span>
          <span class="vw-right-t">
            <span class="vw-right-t-tel floatLeft">添加时间：</span>
            <span class="vw-right-t-num floatLeft">{{item.createdAt | formatminDate}}</span>
          </span>
        </span>
                    <span class="wl-btnGroup flexSafari">
          <el-button class="wl-btn" @click="routeToDetail(item)">查看</el-button>
          <el-button
                  class="wl-btn"
                  @click="routeToEdit(item)"
          >编辑</el-button>

        </span>
                </div>
            </div>
            <div class="page-container">
                <el-pagination
                        class="pagebox"
                        background
                        layout="prev, pager, next"
                        :current-page="currentPage"
                        @current-change="handleCurrentChange"
                        :page-count="pageCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
  import util from "../../../common/util"

  export default {
    name: "",
    components: {
    },
    data() {
      return {
        form:{},
        currentPage:1,
        pageSize:20,
        pageCount:'',
        total:'',
        tableData: [],
        msg: "Hello Vue.js"
      }
    },
    watch:{

    },
    filters:{
      formatminDate(val){
        if(val){
          return util.minDate(val)
        }else{
          return ''
        }
      }
    },
    mounted(){
      this.getList()
    },
    methods: {
      handleCurrentChange(val){
        this.currentPage=val;
        this.getList();
      },
      formatStatus(row){
        let val = row.status;
        if(val==1){
          return '可用'
        }else if(val==2){
          return '冻结'
        }else{
          return ''
        }
      },
      handleCurrentChange(val){
        this.currentPage=val;
        this.getList();
      },
      routeToDetail(row){
        const { href } = this.$router.resolve({
          name: "customerDetail",
          params: {
            id: row.id,
          }
        });
        window.open(href, "_blank");
//        this.$router.push({name:'customerDetail',params:{id:row.id}})
      },
      routeToEdit(row){
        this.$router.push({name:'editCustomer',params:{id:row.id}})
      },
      routeToadd(){
        this.$router.push({name:'addCustomer'})
      },
      freeze(row){
        console.log(row)
        this.$confirm("确认冻结吗?", "谨慎操作", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error"
        }).then(() => {
          let id=row.id
          this.$api.freezeCustomer(id).then((response) => {
            this.$message.success('冻结成功')
            row.status=2
          }).catch((error) => {
            console.log(error);
          });
        })
    },
      unfreeze(row){
        this.$confirm("确认解冻吗?", "谨慎操作", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error"
        }).then(() => {
          let id=row.id
          this.$api.unfreezeCustomer(id).then((response) => {
            this.$message.success('解冻成功')
            row.status=1
          }).catch((error) => {
            console.log(error);
          });
        })
    },
      getList(){
        const params ={
          pageNum:this.currentPage,
          pageSize:this.pageSize,
          shortName:this.form.shortName
        }
        this.$api.getChildCus(params).then((response) => {
          const {
            data: {
              list,
              pages,
              total,
              pageNum,
            },
          } = response.data;
          this.tableData=list
          this.pageCount=pages
        }).catch((error) => {
          console.log(error);
        });
      }
    }
  }
</script>

<style scoped>
.vw-fulllname{
    font-family: PingFang-SC-Medium;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 24px;
    letter-spacing: 0px;
    color: #666666;
}
.centerdiv-width{
    min-width: 290px;
}
.leftdiv-width{
    width: 150px;
}
    .address-width{
        width: 184px;
    }
.workerListBox div{
    width:100%;
}
</style>