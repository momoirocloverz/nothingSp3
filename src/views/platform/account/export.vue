<template>
  <div>
    <div class="head">
      <div class="overflow-box pwd-box" style="margin: 40px auto;padding: 40px" v-if="firstStep">
        <div class="box-title"><span>导出交易明细</span></div>
        <div class="box-body">
          <div>
            <el-form ref="form" :model="form" label-width="110px" :rules="rules">
              <el-form-item label="">
                <el-radio-group v-model="form.type" style="margin-left: -100px">
                  <el-radio label="1">本月数据</el-radio>
                  <el-radio label="2">上月数据</el-radio>
                  <el-radio label="3">自定义时段</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="开始时间：" prop="startDate" v-if="form.type==3">
                <el-date-picker class="radius-input workerInp" v-model="form.startDate" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" :picker-options="pickerOptions1" placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="结束时间：" prop="endDate" v-if="form.type==3">
                <el-date-picker class="radius-input workerInp" v-model="form.endDate" value-format="yyyy-MM-dd" format="yyyy-MM-dd" :picker-options="pickerOptions0" type="date" placeholder="选择日期">
                </el-date-picker>
                <div style="color:#666">每次最多只能导一个月的数据</div>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="box-footer">
          <el-button round size="medium" type="primary" @click="handleSubmit">导 出</el-button>
          <el-button round size="medium" @click="$router.go(-1)">取 消</el-button>
        </div>
      </div>
    </div>
  </div>
  <!--<someComponent></someComponent>-->
</template>

<script>
import util from '../../../common/util'

export default {
  name: "",
  components: {},
  data() {
    let that = this
    return {
      pickerOptions1: {
        disabledDate(time) {
          let endDate = that.form.endDate
          if (endDate) {
            const one = 30 * 24 * 3600 * 1000
            const minTime = new Date(that.form.endDate).getTime() - one
            return time.getTime() < minTime || time.getTime() > new Date(endDate).getTime()
          }

        }
      },
      pickerOptions0: {
        disabledDate(time) {
          let startTime = that.form.startDate
          if (startTime) {
            const one = 30 * 24 * 3600 * 1000
            const minTime = new Date(that.form.startDate).getTime() + one
            return time.getTime() > minTime || time.getTime() < new Date(startTime).getTime()
          }

        }
      },
      currentMonth: '',
      preMonth: '',
      time: 3,
      wating: 60,
      getcoding: false,
      buttonText: '获取验证码',
      rules: {
        endDate: [
          { required: true, message: '结束时间不能为空', trigger: 'blur' },
        ],
        startDate: [
          { required: true, message: '结束时间不能为空', trigger: 'blur' },
        ],
      },
      firstStep: true,
      agreeVisible: false,
      form: {
        type: '1',
        startDate: '',
        endDate: '',
      },
      msg: "Hello Vue.js"
    }
  },
  filters: {
    formatMobile(val) {
      if (val) {
        return val.substr(0, 3) + "****" + val.substr(7);
      }
    }
  },
  mounted() {
    this.currentMonth = util.formatDate(new Date())
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let month = []
          if (this.form.type == 1) {
            month = this.currentMonth
          } else if (this.form.type == 2) {
            month = this.getPreMonth(this.currentMonth)
          } else {
            month = ''
          }
          const params = {
            objectType: 1,
            startDate: this.form.type == 3 ? this.form.startDate : '',
            month: month,
            endDate: this.form.type == 3 ? this.form.endDate : '',
          };
          this.$api
            .AccountExport(params)
            .then(response => {
              if (response.data.respCode == 0) {
                window.open(response.data.data)
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      });


    },
    getPreMonth(date) {
      var arr = date.split('-');
      var year = arr[0]; //获取当前日期的年份
      var month = arr[1]; //获取当前日期的月份
      var day = arr[2]; //获取当前日期的日
      var days = new Date(year, month, 0);
      days = days.getDate(); //获取当前日期中月的天数
      var year2 = year;
      var month2 = parseInt(month) - 1;
      if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
      }
      var day2 = day;
      var days2 = new Date(year2, month2, 0);
      days2 = days2.getDate();
      if (day2 > days2) {
        day2 = days2;
      }
      if (month2 < 10) {
        month2 = '0' + month2;
      }
      var t2 = year2 + '-' + month2 + '-' + day2;
      return t2;
    }
  }
}
</script>


<style scoped>
.charge-label {
  display: inline-block;
  font-family: PingFang-SC-Medium;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 24px;
  letter-spacing: 0px;
  color: #666666;
}

.dialog-head h4 {
  color: #262626;
}

.msgText {
  display: inline-block;
  width: 64%;
}

.msg-btn {
  display: inline-block;
  padding: 12px 8px;
  margin-left: 5px;
  height: 40px;
}

.pwd-box {
  width: 424px;
  height: 446px;
}

.pwd-box-body {
  height: 150px;
  margin: 0 40px;
}

.pwd-box-body {
  height: 150px;
  margin: 0 40px;
}

.overflow-box {
  background-color: #ffffff;
  box-shadow: 0px 2px 21px 0px rgba(156, 156, 156, 0.35);
  border-radius: 8px;
  margin: 0 auto;
  padding-bottom: 30px;
}

.box-title {
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

.box-title span {
  padding-bottom: 10px;
  border-bottom: 3px solid #e84518;
  border-radius: 1px;
}

.box-footer {
  text-align: center;
}

.box-body {
  display: flex;
  display: -webkit-flex; /* Safari */
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 300px;
  margin-top: 60px;
}
.workerInp {
  width: 246px;
}
</style>