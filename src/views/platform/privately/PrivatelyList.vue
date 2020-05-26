<template>
  <div>
    <div>
      <el-radio-group v-model="radio4">
        <el-radio-button label="2">平台所有</el-radio-button>
        <el-radio-button label="1">项目经理自有</el-radio-button>
        <el-radio-button label="3">客户自有</el-radio-button>
        
      </el-radio-group>
      <hr class="el-radio-group-hr" />
    </div>
    <!-- 个体工商户列表-项目经理 -->
    <div v-show="radio4 == 1">
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
                <span class="text">{{ props.row.taxAmount }}元</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span class="text">{{ props.row.createdAt }}</span>
                </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="managerNameAlias"
          :show-overflow-tooltip="true"
          label="所属项目经理"
          align="center"
          min-width="100"
        >
          <template scope="scope">
            <span class="is-mylink" @click="goManager(scope.row)">
                {{scope.row.managerNameAlias}}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          :show-overflow-tooltip="true"
          label="字号名称"
          align="center"
          min-width="110"
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
          min-width="100"
        >
        </el-table-column>
        <el-table-column
          prop="endTime"
          label="服务截止日期"
          :show-overflow-tooltip="true"
          align="center"
          min-width="100"
        >
        </el-table-column>
        <!-- <el-table-column
          prop="createdAt"
          :show-overflow-tooltip="true"
          label="创建时间"
          align="center"
          min-width="140"
        >
        </el-table-column> -->
        <el-table-column
          prop="serversType"
          :show-overflow-tooltip="true"
          label="服务状态"
          align="center"
          min-width="80"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          :show-overflow-tooltip="true"
          label="状态"
          align="center"
          :formatter="forPType"
          min-width="60"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="240"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="editOwnPrivately(scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              size="small"
              v-if="scope.row.status != '3'"
              @click="payCharge(scope.row)"
            >续费</el-button>
            
            <el-button
              @click="viewRecord(scope.row)"
              type="text"
              size="small"
            >查看交费记录</el-button>
            <el-button
              type="text"
              size="small"
              v-if="scope.row.status != 3"
              @click="cancelShow(scope.row)"
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
    </div>
    <!-- 个体工商户列表-平台 -->
    <div v-show="radio4 == 2">
      <el-form
        ref="form"
        :model="formPlat"
        label-width="110px"
      >
        <!--选择条件的单选按钮-->
        <el-form-item
          label="状态："
          class="formSearchMargin formSearchMarginTop"
        >
          <el-radio-group
            class="radio-search"
            v-model="formPlat.status"
          >
            <el-radio label="">不限</el-radio>
            <el-radio label="1">正常</el-radio>
            <el-radio label="3">已注销</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="关键字："
          class="formSearchMargin parentPO"
        >
        <el-input
            placeholder="输入关键字搜索"
            v-model="formPlat.keyWord"
            size="mini"
            class="input-with-select select-input"
          >
            <el-select
              v-model="formPlat.select"
              slot="prepend"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-input>
          <!-- <el-select
            v-model="formPlat.select"
            placeholder="请选择"
            class="selectManager"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-input
            class="rant-input inputWidth inputAb"
            v-model="formPlat.keyWord1"
            v-if="formPlat.select == 1 || formPlat.select == ''"
          ></el-input>
          <el-input
            class="rant-input inputWidth inputAb"
            v-model="formPlat.keyWord2"
            v-if="formPlat.select == 2"
          ></el-input>
          <el-input
            class="rant-input inputWidth inputAb"
            v-model="formPlat.keyWord3"
            v-if="formPlat.select == 3"
          ></el-input> -->
          <el-button
            type="primary"
            @click="getPlatList"
            class="searchBtn keyWBtn"
          >搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="splitLine"></div>
      <!-- <el-button
        class="myplain-btn1"
        style="margin: 8px 14px 18px 14px"
        @click="newLanuch"
        :disabled="isLanuch"
      >分配项目经理</el-button> -->
      <el-button
        class="myplain-btn1"
        style="margin: 8px 14px 18px 14px"
        @click="addNewPlat"
      >添加平台个体工商户</el-button>
      <div class="recordNum">符合查询条件的记录{{totalPlat}}条</div>
      <el-table
        class="table-outline"
        :data="tableDataPlat"
      
        empty-text="暂无相关个体工商户信息"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="经营场所" class="form_p">
                <span class="text">{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="注册日期" class="form_p">
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
                <span class="text">{{ props.row.taxAmount }}元</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span class="text">{{ props.row.createdAt }}</span>
                </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="managerName"
          :show-overflow-tooltip="true"
          label="当前使用项目经理"
          align="center"
          min-width="130"
        >
        </el-table-column> -->
        <el-table-column
          prop="name"
          :show-overflow-tooltip="true"
          label="字号名称"
          align="center"
          min-width="130"
        >
        </el-table-column>
        <el-table-column
          prop="legalPerson"
          :show-overflow-tooltip="true"
          label="经营者姓名"
          align="center"
          min-width="120"
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
          label="累计服务费(元)"
          align="center"
          min-width="120"
        >
        </el-table-column>
        <!-- <el-table-column
          prop="totalPayAmount"
          :show-overflow-tooltip="true"
          label="所有项目经理累计支付服务费"
          align="center"
          min-width="180"
        >
        </el-table-column> -->
        <!-- <el-table-column
          prop="allocationTime"
          :show-overflow-tooltip="true"
          label="最近分配时间"
          align="center"
          min-width="100"
        >
        </el-table-column> -->
        <el-table-column
          prop="status"
          :show-overflow-tooltip="true"
          label="状态"
          :formatter="forPType"
          align="center"
          min-width="60"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="180"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="confirmDiaShow(scope.row)"
            >查看</el-button>
            <el-button
              type="text"
              size="small"
              @click="editPlatPrivately(scope.row)"
            >编辑</el-button>
            
            <el-button
              type="text"
              size="small"
              v-if="scope.row.status != 3"
              @click="cancelShow(scope.row)"
            >注销</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-container">
        <el-pagination
          class="pagebox"
          @current-change="changePagePlat"
          :current-page="currentPagePlat"
          :page-count="pageCountPlat"
          background
          layout="prev, pager, next"
        >
        </el-pagination>
      </div>
    </div>
    <CPrivately v-show="radio4 == 3"></CPrivately>
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
          :rules="rules"
        >
          <el-form-item label="所属项目经理：">
            {{feeManagerName}}
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
    <el-dialog
      title=""
      :visible.sync="lanuchManDia"
      width="600px"
      center
    >
      <div class="dialog-head">
        <span>分配项目经理</span>
      </div>
      <div class="bodyDiv">
        <el-form
          ref="formManger"
          :model="managerForm"
          label-width="160px"
          label-position="left"
          :rules="managerFormrules"
        >
          <el-form-item
            label="所属项目经理："
            style="margin-top:40px"
            prop="manager"
          >
            <el-select
              v-model="managerForm.manager"
              class="radius-input "
              style="width: 80%;"
              placeholder="请选择"
            >
              <el-option
                v-for="item in managerList"
                :key="item.value"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
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
          @click="lanuchItem"
          v-if="adjustNum == 1"
        >保 存</el-button>
        <el-button
          round
          size="medium"
          type="primary"
          @click="lanuchItemRow"
          v-if="adjustNum == 2"
        >保 存</el-button>
        <el-button
          round
          size="medium"
          @click="lanuchManDia = false"
        >取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title=""
      :visible.sync="confirmDia"
      width="600px"
      center
    >
      <div class="dialog-head">
        <span>确认收回分配给{{managerName}}的{{singPerson}}吗？</span>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          round
          size="medium"
          type="primary"
          @click="recycleItem"
        >确 认</el-button>
        <el-button
          round
          size="medium"
          @click="confirmDia = false"
        >取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import CPrivately from './CPrivately'
export default {
  name: "PrivatelyList",
  components: {
    CPrivately
  },
  data() {
    let _this = this;
    let checkNum = (rule, value, callback) => {
      if (value) {
        
        if (value <= 0) {
          callback(new Error("请输入大于0的数字"));
        } else {
        console.log(value)
          _this.feeForm.yearFee =  value.toString().replace(/^(([1-9]\d{0,7})(\.\d{1,2})?|0\.[1-9]{1,2})$/);
          _this.feeForm.yearFee = value.toString().replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
          _this.feeForm.yearFee = value.toString().replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的  
          _this.feeForm.yearFee = value.toString().replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
          _this.feeForm.yearFee = value.toString().replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数  
          // if(value.indexOf(".")< 0 && value !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
          //     _this.feeForm.yearFee= parseFloat(value); 
          // } 
          callback();
        }
      } else {
        callback(new Error("续费金额不能为空"));
      }
    };
    let checkAccount = (rule, value, callback) => {
      // console.log(value)
      // _this.form.acountId = value.replace(/^(0+)|[^\d]+/g,'')
      if (value) {
        if (value.length == 1) {
          _this.form.acountId = value.replace(/[^1-9]/g, "");
          callback();
        } else {
          _this.form.acountId = value.replace(/\D/g, "");
          callback();
        }
      } else {
        callback(new Error("续费年数不能为空"));
      }
    };
    return {
      radio4: "",
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
      formPlat: {
        status: "",
        keyWord: "",
        keyWord2: "",
        keyWord3: "",
        select: 2
      },
      lastFeeDia: false,
      // feeForm: {
      //     year: "1",
      //     paidDate: "2018-01-01",
      //     yearFee: "100"
      // },
      feeForm: {
        year: "",
        paidDate: "",
        yearFee: ""
      },
      tableData: [],
      rules: {
        yearFee: [
          {
            required: true,
            // message: "续费金额不能为空",
            trigger: "change",
            validator: checkNum
          },
          // {
          //           pattern: /^(([1-9]\d{0,7})(\.\d{1,2})?|0\.[1-9]{1,2})$/,
          //           message: "请输入大于0的数字"
          //       }
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
            // message: "续费年数不能为空",
            trigger: "blur",
            validator: checkAccount
          },
          // {
          //   pattern: /^[1-9][0-9]*$/,
          //   message: "续费年数必须全为数字"
          // }
        ]
      },
      managerFormrules: {
        manager: [
          {
            required: true,
            message: "所属项目经理不能为空",
            trigger: "change"
          }
        ]
      },
      lanuchManDia: false,
      managerForm: {
        manager: ""
      },
      managerList: [],
      confirmDia: false,
      currentPage: 1,
      pageCount: 1,
      currentPagePlat: 1,
      pageCountPlat: 1,
      total: 0,
      options: [
        {
          label: "项目经理",
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
      options1: [
        {
          label: "经营者姓名",
          value: 2
        },
        {
          label: "字号名称",
          value: 3
        }
      ],
      tableDataPlat: [],
      selected: [],
      recyleId: "",
      recyleManagerId: "",
      recyleMFC: "",
      managerName: "",
      adjustNum: "",
      adjustManagerId: "",
      adjustId: "",
      feeManagerId: "",
      feeId: "",
      feeManagerName: "",
      feeName: "",
      feeLegalPerson: "",
      isLanuch: true,
      totalPlat: 0,
      singPerson:''
    };
  },
  methods: {
    getList() {
      const params = {
        pageNum: this.currentPage,
        pageSize: 10,
        isSelf: 1,
        managerName: this.form.select == 1 ? this.form.keyWord : '',
        companyName: this.form.select == 3 ? this.form.keyWord : '',
        legalPersonName: this.form.select == 2 ? this.form.keyWord : '',
        endTimeDays: parseInt(this.form.dateRange),
        serversType: parseInt(this.form.status)
      };
      this.$api
        .PrivatelyList(params)
        .then(response => {
          if (response.data.respCode == 0) {
            this.tableData = response.data.data.list;
            this.total = response.data.data.total;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getPlatList() {
      const params = {
        pageNum: this.currentPagePlat,
        pageSize:10,
        isSelf: 2,
        managerName: this.formPlat.select == 1 ? this.formPlat.keyWord : '',
        companyName: this.formPlat.select == 3 ? this.formPlat.keyWord : '',
        legalPersonName: this.formPlat.select == 2 ? this.formPlat.keyWord : '',
        status: parseInt(this.formPlat.status)
      };
      this.$api
        .PlatPrivatelyList(params)
        .then(response => {
          if (response.data.respCode == 0) {
            this.tableDataPlat = response.data.data.list;
            this.totalPlat = response.data.data.total;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    addNew() {
      this.$router.push({ name: "newPrivately" });
      // this.$router.go(-1)
    },
    viewRecord(row) {
      const { href } = this.$router.resolve({
        name: "viewRecord",
        params: {
          id: row.id,
          managerId: row.managerId,
          managerName: row.managerName,
          legalPerson: row.legalPerson,
          name: row.name
        }
      });
      window.open(href, "_blank");
    },
    editOwnPrivately(row) {
      this.$router.push({
        name: "editPrivately",
        params: { id: row.id, isSelf: 1}
      });
    },
    addNewPlat() {
      this.$router.push({ name: "newPlatPrivately" });
    },
    newLanuch() {
      this.getManagerList();
      this.adjustNum = 1;
      this.lanuchManDia = true;
    },
    payCharge(row) {
      this.lastFeeDia = true;
      this.feeId = row.id;
      this.feeManagerId = row.managerId;
      this.feeManagerName = row.managerName;
      this.feeName = row.name;
      this.feeLegalPerson = row.legalPerson;
    },
    payFee() {
      this.$refs.form1.validate(valid => {
        if (valid) {
          const params = {
            managerId: this.feeManagerId,
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
    changePage(val) {
      this.currentPage = val;
      this.getList();
    },
    changePagePlat(val) {
      this.currentPagePlat = val;
      this.getPlatList();
    },
    recycleItem() {
      const params = {
        managerId: this.recyleManagerId,
        financeCustomerId: this.recyleId,
        managerFinanceCustomerId: this.recyleMFC
        // financeCustomerId: this.selected[0].id,
      };
      this.$api
        .Recycle(params)
        .then(response => {
          if (response.data.respCode == 0) {
            this.$message.success("收回成功");
            this.radio4 = "2";
            this.getPlatList();
            this.confirmDia = false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    lanuchItem() {
      this.$refs.formManger.validate(valid => {
        if (valid) {
          let id = []
          for(let i in this.selected){
            id.push(this.selected[i].id)
          }
          const params = {
            managerId: this.managerForm.manager,
            financeCustomerIds: id
          };
          this.$api
            .Allocation(params)
            .then(response => {
              if (response.data.respCode == 0) {
                this.$message.success("分配成功");
                this.radio4 = "2";
                this.getPlatList();
                this.lanuchManDia = false;
                this.managerForm.manager = "";
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
    lanuchItemRow() {
      this.$refs.formManger.validate(valid => {
        if (valid) {
          const params = {
            managerId: this.managerForm.manager,
            financeCustomerId: this.adjustId
          };
          this.$api
            .AllocationRow(params)
            .then(response => {
              if (response.data.respCode == 0) {
                this.$message.success("调整成功");
                this.radio4 = "2";
                this.getPlatList();
                this.lanuchManDia = false;
                this.managerForm.manager = "";
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
    handleSelectionChange(val) {
      this.selected = val;
      console.log(val);
      if (this.selected.length != 0) {
        for(let i in this.selected){
          if(this.selected[i].managerName){
            this.isLanuch = true;
            break
          }else{
            this.isLanuch = false;
          }
        }
      } else {
        this.isLanuch = true;
      }
      // if (this.selected.length == 1) {
      //   if (this.selected[0].managerName) {
      //     this.isLanuch = true;
      //   } else {
      //     this.isLanuch = false;
      //   }
      // } else {
      //   this.isLanuch = true;
      // }
    },
    editPlatPrivately(row) {
      this.$router.push({
        name: "editPrivately",
        params: { id: row.id, isSelf: 2 }
      });
    },
    confirmDiaShow(row) {
      // this.managerName = row.managerName;
      // this.singPerson = row.name;
      // this.confirmDia = true;
      // this.recyleId = row.id;
      // this.recyleMFC = row.managerFinanceCustomerId;
      // this.recyleManagerId = row.useManagerId;
      // console.log(row)
      const { href } = this.$router.resolve({
              name: "viewRecordP",
              params: {
                id: row.id,
                legalPerson: row.legalPerson,
                name: row.name
              }
            });
            window.open(href, "_blank");
    },
    adjust(row) {
      this.$message.error('暂未开放')
      // this.getManagerList();
      // this.lanuchManDia = true;
      // this.adjustNum = 2;
      // this.adjustManagerId = row.managerId;
      // this.adjustId = row.id;
    },
    getManagerList() {
      const params = {
        pageNum: 1,
        pageSize: 10000,
        managerStatus: 2
      };
      this.$api
        .getPmList(params)
        .then(response => {
          if (response.data.respCode == 0) {
            this.managerList = response.data.data.list;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    goManager(row){
      const { href } = this.$router.resolve({
        name: "pmDetail",
        params: {
          id: row.managerId,
        }
      });
      window.open(href, "_blank");
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
    }
  },
  mounted() {
    this.getList();
    this.getPlatList();
    if(this.$route.query.isSelf){
      if(this.$route.query.isSelf == 1){
        this.radio4 = 1
      }
    }
  },
  watch: {
    "form.select": function(val, old) {
      this.form.keyWord = "";
    },
    "formPlat.select": function(val, old) {
      this.formPlat.keyWord = "";
    },
    "form.status": function(val, old) {
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
    "formPlat.status": function(val, old) {
      if (val != old) {
        this.currentPage=1
        this.getPlatList();
      }
    },
    "form.yearFee": function(val, old) {
      console.log(val)
    },
  },
  beforeRouteEnter(to,form,next){
    next(vm=>{
      if(form.name=='privatelyList'){
        vm.radio4=2
      }else if(form.name=='newPrivately'){
        vm.radio4=1
      }else if(form.name=='newCusPrivately'){
        vm.radio4=3
      }else{
        // vm.radio4 = 2
        console.log(vm.$route.query.isSelf)
        if(vm.$route.query.isSelf){
          if(vm.$route.query.isSelf == 1){
            vm.radio4=1
          }else if(vm.$route.query.isSelf == 2){
            vm.radio4=2
          }else{
            vm.radio4=3
          }
        }else{
          vm.radio4=2
        }
      }
    })
  }
};
</script>
<style scoped>
.input-with-select {
  width: 352px;
}
.parentPO {
  position: relative;
}
.inputAb {
  position: absolute;
  left: 216px;
}
.selectManager .el-input__inner {
  position: absolute;
  left: 0;
  height: 26px;
  width: 150px;
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
.mTop2 {
  margin-top: -16px;
}
.yuan {
  position: absolute;
  right: -20px;
}
.workerInp {
  position: relative;
}
.inputWidth {
  width: 300px;
}
.selectManager .el-input__inner {
  height: 26px;
}
.bodyDiv {
  padding: 0 26px;
}
.dateWidth {
  width: 388px;
  height: 36px !important;
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

