<template>
    <div>
        <h5>1.弹窗模板</h5>
        <!--<el-button type="primary"  round @click="dialogVisible=true">主要按钮</el-button>-->
        <el-button type="primary" size="medium"  round @click="dialogVisible=true">主要按钮</el-button>
        <el-button type="primary" size="small" round @click="dialogVisible=true">主要按钮</el-button>
        <el-button type="primary" size="mini" round @click="dialogVisible=true">主要按钮</el-button>

        <el-dialog
                title=""
                :visible.sync="dialogVisible"
                width="30%"
                center
                :before-close="handleClose">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button round size="medium"  type="primary" @click="dialogVisible = false">确 定</el-button>
                <el-button round size="medium"  @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
        <h5>2.tab切换</h5>
        <div style="margin: 20px">

            <el-radio-group v-model="radio4">
                <el-radio-button label="1">111</el-radio-button>
                <el-radio-button label="2">222</el-radio-button>
                <el-radio-button label="3">333</el-radio-button>
                <el-radio-button label="4">444</el-radio-button>
            </el-radio-group>
            <hr class="el-radio-group-hr"/>
        </div>
        <h5>3.选择条件的单选按钮</h5>
        <el-form ref="form" :model="form" label-width="110px">

            <!--选择条件的单选按钮-->
            <el-form-item label="特殊资源:">
                <el-radio-group class="radio-search" v-model="form.resource">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                </el-radio-group>
            </el-form-item>
            <!--普通单选-->
            <h5>4.普通单选</h5>
            <el-form-item label="特殊资源:">
                <el-radio-group v-model="form.resource2">
                    <el-radio label="1">cggccf</el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                </el-radio-group>
            </el-form-item>
            <!--input-->
            <h5>5.input</h5>
            <el-form-item label="活动名称：">
                <el-input class="radius-input" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="活动名称：">
                <el-input class="rant-input" v-model="form.name"></el-input>
            </el-form-item>
        </el-form>

        <!--基本信息-->
        <h5>5.信息表格</h5>
        <div class="table-info" style="margin-left: 20px;">
            <div class="table-info-col1"><span>1</span></div>
            <div class="table-info-col2"><span>2</span></div>
            <div class="table-info-col1"><span>1</span></div>
            <div class="table-info-col2"><span>1</span></div>
            <div class="table-info-col1"><span>1</span></div>
            <div class="table-info-col2"><span>1</span></div>
            <div class="table-info-col1"><span>1</span></div>
            <div class="table-info-col2"><span>1</span></div>
            <div class="table-info-col1"><span>1</span></div>
            <div class="table-info-col2"><span>1</span></div>
            <div class="table-info-col1"><span>1</span></div>
            <div class="table-info-col2"><span>1</span></div>
        </div>
        <h5>6.表格</h5>
        <div  class="" style="margin: 20px;">
        <el-table
                class="table-outline"
                :data="tableData"
                >
            <el-table-column prop="date" label="日期" align="center" width="180">
            </el-table-column>
            <el-table-column prop="name" align="center" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="date" label="日期" align="center" width="180">
            </el-table-column>
            <el-table-column prop="name" align="center" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="date" label="日期" align="center" width="180">
            </el-table-column>
            <el-table-column prop="name" align="center" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="date" label="日期" align="center" width="180">
            </el-table-column>
            <el-table-column prop="name" align="center" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" align="center" show-overflow-tooltip label="地址">
            </el-table-column>
        </el-table>
            <div class="page-container">
            <el-pagination
                    class="pagebox"
                    background
                    layout="prev, pager, next"
                    :total="1000">
            </el-pagination>
            </div>
        </div>

        <h5>7.项目经理</h5>
        <div style="width: 100%;height: 20px;background-color: #e84518;margin: 20px;"></div>
        <div class="vp-table" style="margin: 20px;">
            <div class="vp-table-item">
                <div class="vp-table-header">张三</div>
                <div class="vp-table-info">
                    <span class="vp-table-infoitem vp-table-infoitem1">手机号:</span>
                    <span class="vp-table-infoitem vp-table-infoitem2">13155667788</span>
                    <span class="vp-table-infoitem vp-table-infoitem1">解绑发起时间:</span>
                    <span class="vp-table-infoitem vp-table-infoitem2">2018-08-08 23:59</span>
                </div>
                <div class="vp-table-info">
                    <span class="vp-table-infoitem vp-table-infoitem1">最近绑定时间:</span>
                    <span class="vp-table-infoitem vp-table-infoitem2">2018-08-08 23:59</span>
                    <span class="vp-table-infoitem vp-table-infoitem1">成功绑定时间:</span>
                    <span class="vp-table-infoitem vp-table-infoitem2">2018-08-08 23:59</span>
                </div>
                <!--<div class="vp-table-info2">-->
                    <!---->
                <!--</div>-->
            </div>
            <div class="vp-table-item">
                <div class="vp-table-header">张三</div>
                <div class="vp-table-info">
                    <span class="vp-table-infoitem vp-table-infoitem1">手机号:</span>
                    <span class="vp-table-infoitem vp-table-infoitem2">13155667788</span>
                    <span class="vp-table-infoitem vp-table-infoitem1">解绑发起时间:</span>
                    <span class="vp-table-infoitem vp-table-infoitem2">2018-08-08 23:59</span>
                </div>
                <div class="vp-table-info">
                    <span class="vp-table-infoitem vp-table-infoitem1">最近绑定时间:</span>
                    <span class="vp-table-infoitem vp-table-infoitem2">2018-08-08 23:59</span>
                    <span class="vp-table-infoitem vp-table-infoitem1">成功绑定时间:</span>
                    <span class="vp-table-infoitem vp-table-infoitem2">2018-08-08 23:59</span>
                </div>
                <!--<div class="vp-table-info2">-->
                    <!---->
                <!--</div>-->
            </div>
            <div class="vp-table-item">
                <div class="vp-table-header">张三</div>
                <div class="vp-table-info">
                    <span class="vp-table-infoitem vp-table-infoitem1">手机号:</span>
                    <span class="vp-table-infoitem vp-table-infoitem2">13155667788</span>
                    <span class="vp-table-infoitem vp-table-infoitem1">解绑发起时间:</span>
                    <span class="vp-table-infoitem vp-table-infoitem2">2018-08-08 23:59</span>
                </div>
                <div class="vp-table-info">
                    <span class="vp-table-infoitem vp-table-infoitem1">最近绑定时间:</span>
                    <span class="vp-table-infoitem vp-table-infoitem2">2018-08-08 23:59</span>
                    <span class="vp-table-infoitem vp-table-infoitem1">成功绑定时间:</span>
                    <span class="vp-table-infoitem vp-table-infoitem2">2018-08-08 23:59</span>
                </div>
                <!--<div class="vp-table-info2">-->
                    <!---->
                <!--</div>-->
            </div>
            <div class="vp-table-item">
                <div class="vp-table-header">张三</div>
                <div class="vp-table-info">
                    <span class="vp-table-infoitem vp-table-infoitem1">手机号:</span>
                    <span class="vp-table-infoitem vp-table-infoitem2">13155667788</span>
                    <span class="vp-table-infoitem vp-table-infoitem1">解绑发起时间:</span>
                    <span class="vp-table-infoitem vp-table-infoitem2">2018-08-08 23:59</span>
                </div>
                <div class="vp-table-info">
                    <span class="vp-table-infoitem vp-table-infoitem1">最近绑定时间:</span>
                    <span class="vp-table-infoitem vp-table-infoitem2">2018-08-08 23:59</span>
                    <span class="vp-table-infoitem vp-table-infoitem1">成功绑定时间:</span>
                    <span class="vp-table-infoitem vp-table-infoitem2">2018-08-08 23:59</span>
                </div>
                <!--<div class="vp-table-info2">-->
                    <!---->
                <!--</div>-->
            </div>

        </div>
        <div style="width: 100%">
        <h5>8.单独的box</h5>
        <div class="overflow-box" style="width:500px;" >
            <div class="box-title"><span>添加零工第一步</span></div>
            <div class="box-body">

            </div>
            <div class="box-footer">
                <el-button round size="medium"  type="primary" @click="dialogVisible = false">确 定</el-button>
                <el-button round size="medium"  @click="dialogVisible = false">取 消</el-button>
            </div>
        </div>
        </div>
    </div>
</template>

<style>
    h5 {
        margin: 20px;
    }
    .overflow-box{
        background-color: #ffffff;
        box-shadow: 0px 2px 21px 0px
        rgba(156, 156, 156, 0.35);
        border-radius: 8px;
        margin:0 auto;
        padding-bottom: 36px;
    }
    .box-title{
        text-align: center;
        padding-top: 35px;
        width: 100%;
        font-family: PingFang-SC-Medium;
        font-size: 24px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 24px;
        letter-spacing: 1px;
        color: #262626;
    }
    .box-title span{
        padding-bottom: 10px;
        border-bottom: 3px solid #e84518;
        border-radius: 1px;
    }
    .box-footer{
        text-align: center;
        margin-bottom: 40px;
    }
    .box-body{
        height: 300px;
    }
</style>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        radio4: 1,
        form: {
          resource: '1',
          resource2: '1',
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          desc: ''
        },
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {
            });
      }
    }
  };
</script>