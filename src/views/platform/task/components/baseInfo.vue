<template>
    <div>
    <div class="box-body-item" v-if="showType == 'cus'">
        <!--<div class="box-body-item-title">基本信息</div>-->
        <!--<div class="line"></div>-->
        <div class="table-info info-item">
            <div class="table-info-col1"><span>任务名称</span></div>
            <div class="table-info-col2"><span>{{this.form.taskName}}</span></div>
            <div class="table-info-col1"><span>任务所属</span></div>
            <div class="table-info-col2">
                <span class="is-mylink" @click="RouteToBelong(form)">{{this.form.belongToName}}</span>
                </div>
            <div class="table-info-col1"><span>发布人</span></div>

            <div class="table-info-col2">
                <span class="is-mylink" @click="RouteToPublish(form)">{{this.form.publishName}}</span></div>
            <div class="table-info-col1"><span>开始时间</span></div>
            <div class="table-info-col2"><span>{{this.form.startTime | formatminDate}}</span></div>
            <div class="table-info-col1"><span>结束时间</span></div>
            <div class="table-info-col2 text-overflow">
                <span>{{this.form.endTime | formatminDate}}</span>
                <!--<el-tooltip class="item" effect="dark" :content="this.form.address" placement="top-start">-->
                    <!--<span show-overflow-tooltip>{{this.form.address}}</span>-->
                <!--</el-tooltip>-->
            </div>
            <div class="table-info-col1"><span>核定人数</span></div>
            <div class="table-info-col2"><span>{{this.form.authorizedNumber}}</span></div>

            <div class="table-info-col1"><span>工种价格上限控制</span></div>
            <div class="table-info-col2"><span>{{this.form.uppeLimit | formatuppeLimit}}</span></div>
            <div class="table-info-col1"><span>结算方式</span></div>
            <div class="table-info-col2"><span>{{this.form.settlementTypeName}}</span></div>
            <div class="table-info-col1"><span>任务单价</span></div>

            <div class="table-info-col2">
              <span>
                  <el-tooltip class="item" effect="dark" :content="content" placement="top-start">
                    <span class="text-overflow">
                        {{content}}
                    </span>
                  </el-tooltip>
              </span>
            </div>
            <div class="table-info-col1"><span>上班时间</span></div>
            <div class="table-info-col2"><span>{{this.form.workStartTime | formatTimeString}}</span></div>
            <div class="table-info-col1"><span>下班时间</span></div>
            <div class="table-info-col2 text-overflow">
                <span>{{this.form.endWorkType == 1 ? '当日' : '次日' }}{{this.form.workEndTime | formatTimeString}}</span>
            </div>
            <!--<div class="table-info-col2">-->
                <!--<el-button type="text" @click="visible=true" class="chakan">查看</el-button>-->
            <!--</div>-->
            <div class="table-info-col1"><span>工作地点</span></div>
            <div class="table-info-col2">
                <el-tooltip class="item" effect="dark" :content="this.form.workingPlace" placement="top-start">
                      <span>
                {{this.form.workingPlace}}
            </span>
                </el-tooltip>
              </div>

            <div class="table-info-col1"><span>性别要求</span></div>
            <div class="table-info-col2">
                <span> 男工{{this.form.maleNumber | formatNumber}}</span>、
                <span>  女工{{this.form.femaleNumber| formatNumber}}</span>
            </div>
            <div class="table-info-col1"><span>年龄要求</span></div>
            <div class="table-info-col2 text-overflow">
                <span>  {{this.form.ageLowerLimit}}到{{this.form.ageUpperLimit}}岁</span>
            </div>
            <!--<div class="table-info-col2">-->
                <!--<el-button type="text" @click="visible=true" class="chakan">查看</el-button>-->
            <!--</div>-->
            <div class="table-info-col1"><span>工种要求</span></div>
            <div class="table-info-col2">
              <el-tooltip
              class="item"
              effect="dark"
              :content="this.form.industryListName"
              placement="top-start"
            >
              <span show-overflow-tooltip>{{this.form.industryListName}}</span>
            </el-tooltip>
            </div>


            <div class="table-info-col1"><span>其他要求</span></div>
            <div class="table-info-col2">
                <el-tooltip class="item" effect="dark" :content="this.form.otherDemand" placement="top-start">
                <span show-overflow-tooltip>{{this.form.otherDemand?this.form.otherDemand:'无'}}</span>
            </el-tooltip>
            </div>
            <div class="table-info-col1"><span>创建时间</span></div>

            <div class="table-info-col2"><span>{{this.form.createdAt | formatminDate}}</span></div>
            <div class="table-info-col1"><span></span></div>
            <div class="table-info-col2"><span></span></div>

        </div>
    </div>

    <div class="box-body-item" v-if="showType == 'pro'">
        <!--<div class="box-body-item-title">基本信息</div>-->
        <!--<div class="line"></div>-->
        <div class="table-info info-item">
            <div class="table-info-col1"><span>任务名称</span></div>
            <div class="table-info-col2"><span>{{this.form.taskName}}</span></div>

            <div class="table-info-col1"><span>发布人</span></div>

            <div class="table-info-col2">
                <span class="is-mylink" @click="RouteToPublish(form)">{{this.form.publishName}}</span></div>
            <div class="table-info-col1"><span>所属排班</span></div>
            <div class="table-info-col2">
                <!--<span class="is-mylink" @click="RouteToBelong(form)">{{this.form.belongToName}}</span>-->
                <span>{{this.form.schedulingName}}</span>
            </div>
            <div class="table-info-col1"><span>结算方式</span></div>
            <div class="table-info-col2"><span>{{this.form.settlementTypeName}}</span></div>
            <div class="table-info-col1"><span>开始时间</span></div>
            <div class="table-info-col2"><span>{{this.form.startTime | formatminDate}}</span></div>
            <div class="table-info-col1"><span>结束时间</span></div>
            <div class="table-info-col2 text-overflow">
                <span>{{this.form.endTime | formatminDate}}</span>
                <!--<el-tooltip class="item" effect="dark" :content="this.form.address" placement="top-start">-->
                    <!--<span show-overflow-tooltip>{{this.form.address}}</span>-->
                <!--</el-tooltip>-->
            </div>
            <div class="table-info-col1"><span>核定人数</span></div>
            <div class="table-info-col2"><span>{{this.form.authorizedNumber}}</span></div>



            <!--<div class="table-info-col2">-->
                <!--<el-button type="text" @click="visible=true" class="chakan">查看</el-button>-->
            <!--</div>-->
            <div class="table-info-col1"><span>工作地点</span></div>
            <div class="table-info-col2">
                <el-tooltip class="item" effect="dark" :content="this.form.workingPlace" placement="top-start">
                      <span>
                {{this.form.workingPlace}}
            </span>
                </el-tooltip>
              </div>

            <div class="table-info-col1"><span>年龄要求</span></div>
            <div class="table-info-col2 text-overflow">
                <span>  {{this.form.ageLowerLimit}}到{{this.form.ageUpperLimit}}岁</span>
            </div>
            <!--<div class="table-info-col2">-->
                <!--<el-button type="text" @click="visible=true" class="chakan">查看</el-button>-->
            <!--</div>-->

            <div class="table-info-col1"><span>其他要求</span></div>
            <div class="table-info-col2">
                <el-tooltip class="item" effect="dark" :content="this.form.otherDemand" placement="top-start">
                <span show-overflow-tooltip>{{this.form.otherDemand?this.form.otherDemand:'无'}}</span>
            </el-tooltip>
            </div>
            <div class="table-info-col1"><span>创建时间</span></div>

            <div class="table-info-col2"><span>{{this.form.createdAt | formatminDate}}</span></div>
            <div class="table-info-col1"><span></span></div>
            <div class="table-info-col2">
            </div>


        </div>

        <div class="padding-table">
        <table class="setting-info-table"  cellspacing="0" cellpadding="0" >
            <tr class="header">
                <td width="25%">工种要求</td>
                <td width="25%">人数</td>
                <td width="25%">性别要求</td>
                <td width="25%" >单价</td>
            </tr>
            <tbody>
            <tr v-for="item in form.taskIndustryList">
                <td>{{item.industryName}}</td>
                <td>{{item.authorizedNumber}}</td>
                <td>{{item.sex | formatSex}}</td>
                <td>{{item.salary | forPrice}}</td>
            </tr>
            </tbody>
        </table>
        </div>
    </div>

        <div class="box-body-item" v-if="showType == 'prow'">
            <!--<div class="box-body-item-title">基本信息</div>-->
            <!--<div class="line"></div>-->
            <div class="table-info info-item">
                <div class="table-info-col1"><span>任务名称</span></div>
                <div class="table-info-col2"><span>{{this.form.taskName}}</span></div>
                <div class="table-info-col1"><span>发布人</span></div>

                <div class="table-info-col2">
                    <span class="is-mylink" @click="RouteToPublish(form)">{{this.form.publishName}}</span></div>
                <div class="table-info-col1"><span>所属排班</span></div>
                <div class="table-info-col2">
                    <!--<span class="is-mylink" @click="RouteToBelong(form)">{{this.form.belongToName}}</span>-->
                    <span >{{this.form.schedulingName}}</span>
                </div>
                <div class="table-info-col1"><span>结算方式</span></div>
                <div class="table-info-col2"><span>{{this.form.settlementTypeName}}</span></div>
                <div class="table-info-col1"><span>开始时间</span></div>
                <div class="table-info-col2"><span>{{this.form.startTime | formatminDate}}</span></div>
                <div class="table-info-col1"><span>结束时间</span></div>
                <div class="table-info-col2 text-overflow">
                    <span>{{this.form.endTime | formatminDate}}</span>
                    <!--<el-tooltip class="item" effect="dark" :content="this.form.address" placement="top-start">-->
                    <!--<span show-overflow-tooltip>{{this.form.address}}</span>-->
                    <!--</el-tooltip>-->
                </div>
                <div class="table-info-col1"><span>所需人数</span></div>
                <div class="table-info-col2"><span>{{this.form.authorizedNumber}}</span></div>
                <div class="table-info-col1"><span>工作地点</span></div>
                <div class="table-info-col2">
                    <el-tooltip class="item" effect="dark" :content="this.form.workingPlace" placement="top-start">
                      <span>
                {{this.form.workingPlace}}
            </span>
                    </el-tooltip>
                </div>

                <div class="table-info-col1"><span>年龄要求</span></div>
                <div class="table-info-col2 text-overflow">
                    <span>  {{this.form.ageLowerLimit}}到{{this.form.ageUpperLimit}}岁</span>
                </div>
                <!--<div class="table-info-col2">-->
                <!--<el-button type="text" @click="visible=true" class="chakan">查看</el-button>-->
                <!--</div>-->


                <div class="table-info-col1"><span>其他要求</span></div>
                <div class="table-info-col2">
                    <el-tooltip class="item" effect="dark" :content="this.form.otherDemand" placement="top-start">
                        <span show-overflow-tooltip>{{this.form.otherDemand?this.form.otherDemand:'无'}}</span>
                    </el-tooltip>
                </div>
                <div class="table-info-col1"><span>任务单价</span></div>

                <div class="table-info-col2">
              <span>
                  <el-tooltip class="item" effect="dark" :content="content" placement="top-start">
                    <span class="text-overflow">
                        {{content}}
                    </span>
                  </el-tooltip>
              </span>
                </div>
                <div class="table-info-col1"><span>创建时间</span></div>

                <div class="table-info-col2"><span>{{this.form.createdAt | formatminDate}}</span></div>


            </div>
        </div>
        <big-image @handleWrapperClick="handleWrapperClick" :image="this.form.businessLicense" :visible="visible"></big-image>
</div>
</template>

<script>
  import BigImage from "../../../../components/bigImage.vue";
  import ElButton from "../../../../../node_modules/element-ui/packages/button/src/button.vue";
  import util from '../../../../common/util'

  export default {
    name: "",
    components: {
      ElButton,
      BigImage},
    data() {
      return {
        showType:'',
        form:{},
        visible:false,
        msg: "Hello Vue.js",
        reveiveId:'',
        publishId:'',
        price:{},
      content:''
      }
    },

    filters:{
      formatTimeString(val){
        if(val){
          return val.substring(0,5)
        }else{
          return ''
        }
      },
      formatminDate(val){
        return util.minDate(val)
      },
      formatSex(val){
        if(val==1){
          return '男'
        }else if(val==2){
          return '女'
        }else{
          return '不限'
        }
      },
      formatuppeLimit(val){
        if(val==1){
          return '启用'
        }else if(val==2){
          return '关闭'
        }else{
          return ''
        }
      },
      formatNumber(val){
        if(val==null){
          return '不限'
        }else{
          return val+'人';
        }
      },
      formatUnit(val){
        if(val==1){
          return '件'
        }else if(val==2){
          return '吨';
        }
      },
      formatAccountStatus(val){

      },
      forPrice(val){
        console.log(val)
          let data = JSON.parse(val)
          console.log(data)
          let price = JSON.parse(val).price[0]
          let content = ''
          if(data.valuationType == 1){
            return `${price.countTime}元/小时`
          }else if(data.valuationType == 2){
            if(data.unit == 1){
              return `${price.countSettle}元/件`
            }else if(data.unit == 2){
               return `${price.countDai}元/袋`
            }else if(data.unit == 3){
               return `${price.countChe}元/车`
            }else{
              return `${price.countDun}元/吨`
            }
          }else if(data.valuationType == 3){
            let varUnit
            if(data.unit == 1){
              varUnit = '件'
            }else if(data.unit == 2){
               varUnit = '袋'
            }else if(data.unit == 3){
               varUnit = '车'
            }else{
              varUnit = '吨'
            }
            content += `${(price.ladderObj)[0].count}${varUnit}以下（含），${(price.ladderObj)[0].unit}元/${varUnit}`
            for(let i in price.ladderObj){
              if(i > 0 && i != (price.ladderObj.length - 1)){
                content += `；${(Number((price.ladderObj)[i-1].count)) + 1}至${(price.ladderObj)[i].count}${varUnit}（含），${(price.ladderObj)[i].unit}元/${varUnit}`
                
              }
            }
            content += `；${(price.ladderObj)[price.ladderObj.length-2].count}${varUnit}以上，${(price.ladderObj)[price.ladderObj.length-1].overUnit}元/${varUnit}`
            return content
          }else if(data.valuationType == 4){
            if(price.countSettle){
              content += `${price.countSettle}元/件,`
            } if(price.countDai){
               content += `${price.countDai}元/袋,`
            } if(price.countChe){
               content += `${price.countChe}元/车,`
            } if(price.countDun){
              content += `${price.countDun}元/吨`
            }
            return content
          }else if(data.valuationType == 5){
            content += `${price.countTime}元/小时,`
            if(data.unit == 1){
              content += `${price.countSettle}元/件；`
            }else if(data.unit == 2){
               content += `${price.countDai}元/袋；`
            }else if(data.unit == 3){
               content += `${price.countChe}元/车；`
            }else{
              content += `${price.countDun}元/吨；`
            }
            return content
          }else if(data.valuationType == 6){
            content += `${price.countTime}元/小时,`
            let varUnit
            if(data.unit == 1){
              varUnit = '件'
            }else if(data.unit == 2){
               varUnit = '袋'
            }else if(data.unit == 3){
               varUnit = '车'
            }else{
              varUnit = '吨'
            }
            content += `${(price.ladderObj)[0].count}${varUnit}以下（含），${(price.ladderObj)[0].unit}元/${varUnit}`
            for(let i in price.ladderObj){
              if(i > 0 && i != (price.ladderObj.length - 1)){
                content += `；${(Number((price.ladderObj)[i-1].count)) + 1}至${(price.ladderObj)[i].count}${varUnit}（含），${(price.ladderObj)[i].unit}元/${varUnit}`
                
              }
            }
            content += `；${(price.ladderObj)[price.ladderObj.length-2].count}${varUnit}以上，${(price.ladderObj)[price.ladderObj.length-1].overUnit}元/${varUnit}`
            return content
          }else {
            content += `${price.countTime}元/小时；`
            if(price.countSettle){
              content += `${price.countSettle}元/件；`
            } if(price.countDai){
               content += `${price.countDai}元/袋；`
            } if(price.countChe){
               content += `${price.countChe}元/车；`
            } if(price.countDun){
              content += `${price.countDun}元/吨；`
            }
            return content
          }
          // this.content = content
      }
    },

    created(){

    },
    mounted(){
      this.getDetail()
    },
    methods: {
      RouteToReceive(row){
        const params = {
          userId:row.receiveUserId,
          type:row.taskType,
        }
        this.$api.getPrimaryKey(params).then(response => {
          console.log(response)
          if(response.respCode==0){
            this.reveiveId=response.data
            if(row.receiveUserType==1 ){
              const { href } = this.$router.resolve({
                name: "pmDetail",
                params: {
                  id: this.reveiveId,
                }
              });
              window.open(href, "_blank");
            }else if(row.receiveUserType==2){
              const { href } = this.$router.resolve({
                name: "workerDetail",
                params: {
                  id: this.reveiveId,
                }
              });
              window.open(href, "_blank");
            }
          }else {
            this.$message.error(response.errorMsg)
          }
        })
            .catch(error => {
              console.log(error);
            });
      },
      RouteToPublish(row){
        const params = {
          userId:row.createdBy,
          type:(row.taskType==1 || row.taskType==2)?1:2,
        }
        this.$api.getPrimaryKey(params).then(response => {
          console.log(response)
          if(response.respCode==0){
            this.publishId=response.data
            if(row.taskType==1 || row.taskType==2){
              const { href } = this.$router.resolve({
                name: "customerDetail",
                params: {
                  id: this.publishId,
                }
              });
              window.open(href, "_blank");
            }else if(row.taskType==3){
              console.log('333333')
              const { href } = this.$router.resolve({
                name: "pmDetail",
                params: {
                  id: this.publishId,
                }
              });
              window.open(href, "_blank");
            }
          }else {
            this.$message.error(response.errorMsg)
          }
        })
            .catch(error => {
              console.log(error);
            });
      },
      RouteToBelong(row){
        if(row.taskType==3){
          const { href } = this.$router.resolve({
            name: "TaskDetail",
            params: {
              id: row.belongTo,
            }
          });
          window.open(href, "_blank");
        }else if(row.taskType==2){
          const { href } = this.$router.resolve({
            name: "subCustomerDetail",
            params: {
              id: row.belongTo,
            }
          });
          window.open(href, "_blank");
        }else if(row.taskType==1){
          const { href } = this.$router.resolve({
            name: "customerDetail",
            params: {
              id: row.belongTo,
            }
          });
          window.open(href, "_blank");
        }

      },
      getDetail(){
        const params = {
          id:this.$route.params.id,
        }
        this.$api.TaskDetail(params).then((response) => {
          console.log(response)
          this.form=response.data;
          let taskType = this.form.taskType
          let receiptType = this.form.receiptType
          if(taskType==1 || taskType==2){
            this.showType = 'cus'
          }else if(taskType==3 && receiptType==1){
            console.log('sdfdsfsdf')
            this.showType = 'pro'
          }else if(taskType==3 && receiptType==2){
            this.showType = 'prow'
          }
          this.price = JSON.parse(this.form.price)
        }).catch((error) => {
          console.log(error);
        });
      },
      handleWrapperClick(){
        this.visible=false
      },
    },
    watch: {
      price:{//深度监听，可监听到对象、数组的变化
          handler(val, oldVal){
            let price = val.price[0]
          let content = ''
          if(val.valuationType == 1){
            content = `${price.countTime}元/小时`
          }else if(val.valuationType == 2){
            if(val.unit == 1){
              content = `${price.countSettle}元/件`
            }else if(val.unit == 2){
               content = `${price.countDai}元/袋`
            }else if(val.unit == 3){
               content = `${price.countChe}元/车`
            }else{
              content = `${price.countDun}元/吨`
            }
          }else if(val.valuationType == 3){
            let varUnit
            if(val.unit == 1){
              varUnit = '件'
            }else if(val.unit == 2){
               varUnit = '袋'
            }else if(val.unit == 3){
               varUnit = '车'
            }else{
              varUnit = '吨'
            }
            content += `${(price.ladderObj)[0].count}${varUnit}以下（含），${(price.ladderObj)[0].unit}元/${varUnit}`
            for(let i in price.ladderObj){
              if(i > 0 && i != (price.ladderObj.length - 1)){
                content += `；${(Number((price.ladderObj)[i-1].count)) + 1}至${(price.ladderObj)[i].count}${varUnit}（含），${(price.ladderObj)[i].unit}元/${varUnit}`
                
              }
            }
            content += `；${(price.ladderObj)[price.ladderObj.length-2].count}${varUnit}以上，${(price.ladderObj)[price.ladderObj.length-1].overUnit}元/${varUnit}`
          }else if(val.valuationType == 4){
            if(price.countSettle){
              content += `${price.countSettle}元/件,`
            } if(price.countDai){
               content += `${price.countDai}元/袋,`
            } if(price.countChe){
               content += `${price.countChe}元/车,`
            } if(price.countDun){
              content += `${price.countDun}元/吨`
            }
          }else if(val.valuationType == 5){
            content += `${price.countTime}元/小时,`
            if(val.unit == 1){
              content += `${price.countSettle}元/件`
            }else if(val.unit == 2){
               content += `${price.countDai}元/袋`
            }else if(val.unit == 3){
               content += `${price.countChe}元/车`
            }else{
              content += `${price.countDun}元/吨`
            }
          }else if(val.valuationType == 6){
            content += `${price.countTime}元/小时,`
            let varUnit
            if(val.unit == 1){
              varUnit = '件'
            }else if(val.unit == 2){
               varUnit = '袋'
            }else if(val.unit == 3){
               varUnit = '车'
            }else{
              varUnit = '吨'
            }
            content += `${(price.ladderObj)[0].count}${varUnit}以下（含），${(price.ladderObj)[0].unit}元/${varUnit}`
            for(let i in price.ladderObj){
              if(i > 0 && i != (price.ladderObj.length - 1)){
                content += `；${(Number((price.ladderObj)[i-1].count)) + 1}至${(price.ladderObj)[i].count}${varUnit}（含），${(price.ladderObj)[i].unit}元/${varUnit}`
                
              }
            }
            content += `；${(price.ladderObj)[price.ladderObj.length-2].count}${varUnit}以上，${(price.ladderObj)[price.ladderObj.length-1].overUnit}元/${varUnit}`
          }else {
            content += `${price.countTime}元/小时,`
            if(price.countSettle){
              content += `${price.countSettle}元/件,`
            } if(price.countDai){
               content += `${price.countDai}元/袋,`
            } if(price.countChe){
               content += `${price.countChe}元/车,`
            } if(price.countDun){
              content += `${price.countDun}元/吨`
            }
          }
            this.content = content
          },
          deep:true
      }
    }
  }
</script>

<style scoped>
    .info-item{
        box-sizing: border-box;
        margin: 20px 0px;
    }
    .box-body-item-title{
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #262626;
        line-height: 40px;
    }
    .box-body-item{
        margin-top:40px;
    }
    .line{
        /*height: 2px;*/
        /*background-color: #e5e5e5;*/
        /*width:100%;*/
    }
    table{
        border-right:solid 1px #e4e4e4;
        border-bottom:solid 1px #e4e4e4;
        font-size: 14px;
    }
    td{
        border-left:solid 1px #e4e4e4;
        border-top:solid 1px #e4e4e4;
        height: 70px;
    }
    .header{
        background-color: #f6f6f6;
        font-family: MicrosoftYaHei;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #262626;
    }
    .header td{
        height: 40px;
    }
    .setting-info-table{
        /*padding: 20px 25px;*/
        /*border: solid 1px #eeeeee;*/
        width:100%;
        text-align: center;

    }
    .padding-table{
        padding: 20px 34px;
        border: solid 1px #eeeeee
    }
</style>