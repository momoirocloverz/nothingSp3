import Axios from './http'
import {
    gets,
    get,
    deletes
} from './http'

let baseURL = 'http://test.api.10000rc.com';
if (process.env.NODE_ENV == 'production') {
    if (process.env.VUE_APP_TITLE == 'pre') {
        baseURL = 'http://pre.api.10000rc.com/pre';
    } else if (process.env.VUE_APP_TITLE == 'test') {
        baseURL = 'http://test.api.10000rc.com';
//     baseURL = 'http://192.168.8.82:8180'; 
    } else {
        baseURL = 'http://www.10000rc.com/2.0';
    }
}
const publicURL = baseURL + '/public';
const bizURL = baseURL + '/biz';
const financeURL = baseURL + '/finance';
const userURL = baseURL + '/user';

export default {
    // 公共模块
    groupDetail: (param) => {
        return Axios.post(`${baseURL}/admin/login/submit`, param)
    },
    //获取字典列表
    getDicList: (code, value) => {
        return Axios.get(`${publicURL}/dictionary/getSonNodeByCodeAndValue?code=${code}&value=${value}`)
    },
    getDicList2: (code, value) => {
        return Axios.get(`${publicURL}/dictionary/getByCodeAndLevel?code=${code}&level=${value}`)
    },    
    reGroupGetByCodeAndLevel:(params)=>{
        return get(`${publicURL}/dictionary/getByCodeAndLevel`, params)
    },      
    empListsExport:(params)=>{
        return Axios.post(`${bizURL}/talent/platform/emp/lists/export`, params)
    },  
    //获取qiuniuToken
    getToken: () => {
        return Axios.get(`${publicURL}/qiniu/token`)
    },

    // 经纪人
    agentList: (param) => { //零工收入明细调整项删除
        return Axios.post(`${bizURL}/broker/page`, param)
    },
    agentFreeze: (params) => {
        return get(`${userURL}/user/freezeOrThaw/${params.userId}`, params)
    },
    emptyFunSwitch: (params) => { //零工收入明细调整项删除
        return Axios.post(`${bizURL}/customer/emptyFunSwitch`, params)
    },
    // 平台招聘管理---劳务机会（职位列表）获取所有项目经理接口
    getManagerList: (params) => {
        return get(`${bizURL}/jobInfoSupport/allPlatformManagerList`, params)
    },
    // 平台招聘管理---劳务机会（职位列表）获取全部工种接口
    getCodeAndLevel: (params) => {
        return get(`${publicURL}/dictionary/getByCodeAndLevel?code=industry&level=2`, params)
    },
    jobInfoList: (params) => { // 招聘职位列表接口
        return Axios.post(`${bizURL}/jobInfo/list`, params)
    },
    getJobInfoDetail: (params) => { // 职位详情列表接口
        return get(`${bizURL}/jobInfo/detail`, params)
    },
    jobList: (params) => { // 招聘支出明细接口
        // return get(`${bizURL}/jobFeeDetail/detailList`, params)
        return Axios.post(`${bizURL}/jobFeeDetail/detailList`, params)
    },

    // 客户模块
    getCustomerList: (params) => {
        return Axios.post(`${bizURL}/customer/list`, params)
    },
    addCustomer: (params) => {
        return Axios.post(`${bizURL}/customer/add`, params)
    },
    checkFullName: (params) => {
        return get(`${bizURL}/customer/checkFullName`, params)
    },
    checkShortName: (params) => {
        return get(`${bizURL}/customer/checkShortName`, params)
    },
    checkAccount: (params) => {
        return get(`${bizURL}/customer/checkAccount`, params)
    },
    checkCreditCode: (params) => {
        return get(`${bizURL}/customer/checkCreditCode`, params)
    },
    editCustomer: (params) => {
        return Axios.post(`${bizURL}/customer/update`, params)
    },
    detailCustomer: (params) => {
        return get(`${bizURL}/customer/detail`, params)
    },
    detailCusAccount: (params) => {
        return get(`${bizURL}/customer/adminAccountDetail`, params)
    },
    freezeCustomer: (id) => {
        return Axios.post(`${bizURL}/customer/freeze?id=${id}`)
    },
    unfreezeCustomer: (id) => {
        return Axios.post(`${bizURL}/customer/unfreeze?id=${id}`)
    },
    updateCusPwd: (params) => {
        return Axios.post(`${bizURL}/customer/adminAccountUpdatePwd`, params)
    },
    updateCusPhone: (params) => {
        return Axios.post(`${bizURL}/customer/adminAccountUpdateMobile`, params)
    },

    //客户-管理费
    setManagerFee: (params) => {
        return Axios.post(`${bizURL}/customer/setManagerFee`, params)
    },
    //付款手续费
    setPayFee: (params) => {
        return Axios.post(`${bizURL}/customer/setPayFee`, params)
    },
    //客户-开票服务费
    setBillServerRate: (params) => {
        return Axios.post(`${bizURL}/customer/setBillServerRate`, params)
    },
    //客户-零工收费
    setCustomerFee: (params) => {
        return Axios.post(`${bizURL}/customer/setCustomerFee`, params)
    },
    //客户-零工收费
    getCustomerFee: (params) => {
        return get(`${bizURL}/customer/getCustomerFee`, params)
    },
    //平台后台保单明细列表
    insuList: (params) => {
        return Axios.post(`${bizURL}/insu/insuList`, params)
    },
    //平台后台保单出现记录
    activeList: (params) => {
        return Axios.post(`${bizURL}/insu/activeList`, params)
    },
    //平台后台保单修改记录
    activeInsu: (params) => {
        return Axios.post(`${bizURL}/insu/active`, params)
    },
    //平台后台保单详情
    insuDetail: (params) => {
        return get(`${bizURL}/insu/insuDetail`, params)
    },
    //平台后台保单明细列表导出
    insuListExport: (params) => {
        return Axios.post(`${bizURL}/insu/insuList/export`, params)
    },
    //平台后台保单汇总列表
    platInsuSummaryList: (params) => {
        return Axios.post(`${bizURL}/insu/platInsuSummaryList`, params)
    },
    //平台后台保单汇总列表导出
    platInsuSummaryExport: (params) => {
        return Axios.post(`${bizURL}/insu/platInsuSummaryList/export`, params)
    },
    // 经理人模块
    getPmList: (params) => {
        return Axios.post(`${bizURL}/manager/platformManagerList`, params)
    },
    getPmListCus: (params) => {
        return Axios.post(`${bizURL}/manager/customerManagerList`, params)
    },
    pmCheckFail: (params) => {
        return Axios.post(`${bizURL}/manager/checkFail`, params)
    },
    pmCheckPass: (params) => {
        return Axios.post(`${bizURL}/manager/checkPass`, params)
    },
    detailPm: (params) => {
        return get(`${bizURL}/manager/detail`, params)
    },
    freezePm: (id) => {
        return Axios.post(`${bizURL}/manager/freeze?managerId=${id}`)
    },
    unfreezePm: (id) => {
        return Axios.post(`${bizURL}/manager/unfreeze?managerId=${id}`)
    },
    updatePm: (params) => {
        return Axios.post(`${bizURL}/manager/updateAuthInfo`, params)
    },
    rechargePm: (params) => {
        return Axios.post(`${financeURL}/account/recharge`, params)
    },
    //工商户
    addPrivately: (param) => { //添加自有个体工商户
        return Axios.post(`${financeURL}/individualBusiness/personal/addX`, param)
    },
    addCusPrivately: (param) => { //添加客户自有个体工商户
        return Axios.post(`${financeURL}/individualBusiness/personal/addA`, param)
    },
    addPrivatelyPlat: (param) => { //添加平台个体工商户
        return Axios.post(`${financeURL}/individualBusiness/platform/add`, param)
    },
    updatePrivately: (param) => { //编辑个体工商户
        return Axios.post(`${financeURL}/individualBusiness/update`, param)
    },
    PrivatelyViewRecord: (param) => { //自有个体工商户交费记录
        return Axios.post(`${financeURL}/individualBusiness/recharge/search`, param)
    },
    PViewRecord: (param) => { //平台服务费记录
        return Axios.post(`${financeURL}/individualBusiness/gRunningAccount`, param)
    },
    PrivatelyPayCharge: (param) => { //自有个体工商户续费
        return Axios.post(`${financeURL}/individualBusiness/recharge`, param)
    },
    PrivatelyList: (param) => { //自有个体工商户列表
        return Axios.post(`${financeURL}/individualBusiness/manager/lists`, param)
    },
    CPrivatelyList: (param) => { //客户自有个体工商户列表
        return Axios.post(`${financeURL}/individualBusiness/customer/lists`, param)
    },
    PlatPrivatelyList: (param) => { //平台个体工商户列表
        return Axios.post(`${financeURL}/individualBusiness/platform/lists`, param)
    },
    Recycle: (param) => { //平台回收
        return Axios.post(`${financeURL}/individualBusiness/recycle`, param)
    },
    Allocation: (param) => { //分配
        return Axios.post(`${financeURL}/individualBusiness/allocation`, param)
    },
    AllocationRow: (param) => { //分配
        return Axios.post(`${financeURL}/individualBusiness/adjust`, param)
    },
    PrivatelyOwnDetail: (param) => { //个体户详情
        return Axios.post(`${financeURL}/individualBusiness/detail`, param)
    },
    CheckPriName: (param) => { //校验字号
        return Axios.post(`${financeURL}/individualBusiness/personal/check`, param)
    },
    CheckCode: (param) => { //统一社会信用代码已存在
        return Axios.post(`${financeURL}/individualBusiness/personal/check`, param)
    },
    CancelItem: (param) => { //注销
        return Axios.post(`${financeURL}/individualBusiness/writtenOff`, param)
    },

    faceInfoSupplement: (param) => { //添加权限
        return Axios.post(`${userURL}/user/faceInfoSupplement`, param)
    },

    //系统
    AddPermission: (param) => { //添加权限
        return Axios.post(`${userURL}/permission/add`, param)
    },
    EditPermission: (param) => { //编辑权限
        return Axios.post(`${userURL}/permission/update`, param)
    },
    ViewPermission: (param) => { //查看权限
        return Axios.post(`${userURL}/permission/info`, param)
    },
    TreePermission: (param) => { //权限树
        return Axios.post(`${userURL}/permission/treelist`, param)
    },
    DeletePermission: (param) => { //删除权限
        return deletes(`${userURL}/permission/delete`, param)
    },

    UserList: (params) => { //用户列表
        return Axios.post(`${userURL}/user/list`, params)
    },
    AddUser: (param) => { //用户添加
        return Axios.post(`${userURL}/user/add`, param)
    },
    EditUser: (param) => { //编辑用户
        return Axios.post(`${userURL}/user/update`, param)
    },
    RoleDetail: (param) => { //用户详情
        return get(`${userURL}/user/detail`, param)
    },
    ViewUser: (params) => { //查看用户
        return get(`${userURL}/user/info`, params)
    },

    RoleList: (params) => { //角色列表
        return Axios.post(`${userURL}/role/list`, params)
    },
    AddRole: (param) => { //角色添加
        return Axios.post(`${userURL}/role/add`, param)
    },
    EditRole: (param) => { //编辑角色
        return Axios.post(`${userURL}/role/update`, param)
    },
    ViewRole: (params) => { //查看角色
        return get(`${userURL}/role/detail`, params)
    },

    ParamsList: (params) => { //参数列表
        return get(`${publicURL}/sysparam/list`, params)
    },
    ParamsInfo: (params) => { //参数详情
        return get(`${publicURL}/sysparam/info`, params)
    },
    ParamsInfoString: (params) => { //参数详情
        return get(`${publicURL}/sysparam/info/string`, params)
    },
    AddParams: (param) => { //参数添加
        return Axios.post(`${publicURL}/sysparam/add`, param)
    },
    EditParams: (param) => { //编辑参数
        return Axios.post(`${publicURL}/sysparam/update`, param)
    },
    DeleteParams: (params) => { //删除参数
        return deletes(`${publicURL}/sysparam/delete`, params)
    },

    DictionaryListByPid: (params) => { //字典列表
        return get(`${publicURL}/dictionary/getSonNodeByParentId`, params)
    },
    AddDictionary: (param) => { //字典添加
        return Axios.post(`${publicURL}/dictionary/add`, param)
    },
    EditDictionary: (param) => { //编辑字典
        return Axios.post(`${publicURL}/dictionary/update`, param)
    },
    // DeleteDictionary: (params) => {//删除字典
    //   return deletes.get(`${publicURL}/dictionary/delete`,params)
    // },

    login: (param) => { //登录
        return Axios.post(`${userURL}/user/login`, param)
    },
    LoginOut: () => { //登录
        return get(`${userURL}/user/logout`)
    },
    getSmsCode: (params) => { //获取短信验证码
        return get(`${publicURL}/sms/code`, params)
    },
    UpdateUserInfo: (param) => { //更新个人信息
        return Axios.post(`${userURL}/user/update`, param)
    },
    UpdateUserPassword: (param) => { //更新密码
        return Axios.post(`${userURL}/user/updatePassword`, param)
    },
    UpdateUserPwd: (param) => { //客户更新密码
        return Axios.post(`${userURL}/user/webupdatepassword`, param)
    },
    UpdateUserTel: (param) => { //客户更新手机
        return Axios.post(`${userURL}/user/webupdatedmobile`, param)
    },
    //获取账号信息
    getUserInfo: (param) => {
        return get(`${userURL}/user/loginname`, param)
    },
    checkUsername: (param) => {
        return Axios.post(`${userURL}/user/check/username`, param)
    },

    //获取零工列表
    getWorkerList: (param) => {
        return Axios.post(`${bizURL}/talent/platform/emp/lists`, param)
    },
    //获取零工列表customer
    getWorkerListcustomer: (param) => {
        return Axios.post(`${bizURL}/talent/customer/emp/lists`, param)
    },
    //获取经理人零工列表
    getmanagerEmpList: (param) => {
        return Axios.post(`${bizURL}/talent/manager/empList`, param)
    },
    //获取经理人零工标签
    getmanagerSkill: (param) => {
        return get(`${bizURL}/talent/manager/getSkillTags`, param)
    },
    //获取客户零工标签
    getcustomerSkill: (param) => {
        return get(`${bizURL}/talent/customer/getSkillTags`, param)
    },
    //获取标签列表
    getSkillTags: (param) => {
        return get(`${bizURL}/talent/customer/getSkillTags`, param)
    },
    //零工基本信息
    getWorkerDetail: (param) => {
        return Axios.post(`${bizURL}/talent/platform/emp/detail`, param)
    },
    getWorkerDetailcustomer: (param) => {
        return Axios.post(`${bizURL}/talent/customer/emp/detail`, param)
    },
    //平台员工冻结
    freezeUser: (param) => {
        return Axios.post(`${bizURL}/talent/platform/freeze`, param)
    },
    //平台员工解冻
    unfreezeUser: (param) => {
        return Axios.post(`${bizURL}/talent/platform/unfreeze`, param)
    },
    mainTaskList: (param) => { //6001主任务列表
        return Axios.post(`${bizURL}/task/taskList`, param)
    },
    receiveTaskList: (param) => { //6002任务接收列表
        return Axios.post(`${bizURL}/task/receiveList`, param)
    },
    getBelongtoList: (param) => { //6011客户后台查询任务列表时，任务所属 项的查询条件集合
        return get(`${bizURL}/task/support/belongToList`, param)
    },
    TaskDetail: (param) => { //任务详情
        return get(`${bizURL}/task/detail`, param)
    },
    getPrimaryKey: (param) => { //任务详情
        return get(`${bizURL}/task/support/getPrimaryKey`, param)
    },


    //子客户模块
    getChildCus: (param) => { //子客户列表
        return Axios.post(`${bizURL}/customer/sub/list`, param)
    },
    addChildCus: (param) => { //子客户添加
        return Axios.post(`${bizURL}/customer/sub/add`, param)
    },
    checkFullNameChild: (param) => { //检查客户全称唯一性
        return get(`${bizURL}/customer/sub/checkFullName`, param)
    },
    checkShortNameChild: (param) => { //检查客户简称唯一性
        return get(`${bizURL}/customer/sub/checkShortName`, param)
    },
    checkCreditCodeChild: (param) => { //检查统一社会信用代码唯一性
        return get(`${bizURL}/customer/sub/checkCreditCode`, param)
    },
    ChildCusDetail: (param) => { //子客户详情
        return get(`${bizURL}/customer/sub/getById`, param)
    },
    ChildCusupdate: (param) => { //子客户详情
        return get(`${bizURL}/customer/sub/update`, param)
    },
    getByCreditCode: (param) => { //子客户详情
        return get(`${bizURL}/customer/sub/getByCreditCode`, param)
    },
    taskSalaryList: (param) => { //任务详情
        return get(`${bizURL}/taskSalary/list`, param)
    },
    //排班
    scheduleList: (param) => { //任务详情
        return Axios.post(`${bizURL}/scheduling/platform/lists`, param)
    },
    scheduleSetting: (param) => { //任务详情
        return get(`${bizURL}/scheduling/platform/setting`, param)
    },
    scheduleWorker: (param) => { //排班人员
        return Axios.post(`${bizURL}/scheduling/platform/employee`, param)
    },
    scheindustryList: (param) => { //排班人员
        return get(`${bizURL}/scheduling/platform/employee/industry`, param)
    },
    //考勤
    attendanceList: (param) => { //排班人员
        return Axios.post(`${bizURL}/attendance/list`, param)
    },
    attendanceUpdate: (param) => { // 修改考勤信息
        return Axios.post(`${bizURL}/attendance/update`, param)
    },
    scheCustomer: (param) => { //获取客户
        return get(`${bizURL}/scheduling/platform/customer`, param)
    },
    ForDraw: (param) => { //待开票记录
        return Axios.post(`${financeURL}/invoice/stay/list`, param)
    },
    ForDraw2: (param) => { //待开票记录2
        return Axios.post(`${financeURL}/invoice/list/platform`, param)
    },
    AlreadyDrawed: (param) => { //已开票记录
        return Axios.post(`${financeURL}/invoice/already/list`, param)
    },
    ForDrawAction: (param) => { //待开票
        return Axios.post(`${financeURL}/invoice/customer/invoice/stay/list`, param)
    },
    AlreadyDrawedAction: (param) => { //已开票
        return Axios.post(`${financeURL}/invoice/customer/invoice/already/list`, param)
    },
    ToDraw: (param, id) => { //开票
        return get(`${financeURL}/invoice/invoice/` + id, param)
    },
    ToDraw2: (param) => { //开票2
        return Axios.post(`${financeURL}/invoice/open`, param)
    },
    invoiceUpdate: (param) => { //开票2
        return Axios.post(`${financeURL}/invoice/update`, param)
    },
    needPayList: (param) => { //应付项目列表
        return Axios.post(`${financeURL}/project/needPayList`, param)
    },
    batchSetPaid: (param) => { //批量设置项目为已付状态
        return Axios.post(`${financeURL}/project/batchSetPaid`, param)
    },
    taskSchedulingList: (param) => { //应付项目对应的排班列表
        return Axios.post(`${financeURL}/project/taskSchedulingList`, param)
    },
    taskSchedulingListCus: (param) => { //应付项目对应的排班列表
        return Axios.post(`${financeURL}/project/taskSchedulingListCustomer`, param)
    },
    taskSchedulingListPro: (param) => { //应付项目对应的排班列表
        return Axios.post(`${financeURL}/project/taskSchedulingListManager`, param)
    },
    salarySheet: (param) => { //应付项目对应的排班列表
        return get(`${financeURL}/salary/customer/salarySheet`, param)
    },
    batchNumberList: (param) => { //应付零工
        return Axios.post(`${financeURL}/salary/customer/batchNumber/list`, param)
    },
    batchNumberSummary: (param) => { //零工结算汇总
        return Axios.post(`${financeURL}/salary/customer/settlement/summary`, param)
    },
    batchNumberTotalData: (params) => { //零工结算-汇总-合计
        return Axios.post(`${financeURL}/salary/customer/settlement/summary/total`, params)
    },
    batchNumberSummaryDetail: (param) => { //零工结算明细
        return Axios.post(`${financeURL}/salary/customer/settlement/summary/detail`, param)
    },
    batchNumberDetailTotal: (param) => { //零工结算明细-汇总
        return Axios.post(`${financeURL}/salary/customer/settlement/summary/detail/total`, param)
    },
    batchNumberDetail: (param) => { //薪资批次详情列表
        return Axios.post(`${financeURL}/salary/customer/batchNumber/Detail`, param)
    },
    profitAllList: (param) => { //项目经理利润总列表
        return Axios.post(`${financeURL}/project/profit/batchNumberSummary`, param)
    },
    profitAllDetail: (param) => { //项目经理利润总列表
        return Axios.post(`${financeURL}/project/profit/batchNumberDetail`, param)
    },
    tableDetail: (param) => { //项目经理利润明细表详情（收入，支出，调整项等）
        return get(`${financeURL}/project/profit/tableDetail`, param)
    },
    adjustdelete: (param) => { //利润调整项删除
        return deletes(`${financeURL}/project/adjust/profit/delete`, param)
    },
    profitadjustList: (param) => { //利润调整项列表
        return get(`${financeURL}/project/adjust/profit/list`, param)
    },
    salaryDetailList: (param) => { //零工收入明细
        return Axios.post(`${financeURL}/salary/talent/salary/detail`, param)
    },
    adjustDelete: (param) => { //零工收入明细调整项删除
        return deletes(`${financeURL}/adjustment/delete`, param)
    },
    privateDetailList: (param) => { //零工收入明细调整项删除
        return Axios.post(`${financeURL}/automaticAllocation/use/detail`, param)
    },

    //账户
    AccountDetail: () => { //账户信息
        return Axios.post(`${financeURL}/account/detail`)
    },

    AccountRunning: (params) => { //流水
        return Axios.post(`${financeURL}/account/record/runningAccount`, params)
    },
    NewAccountRunning: (params) => { //平台账户交易记录列表
        return Axios.post(`${financeURL}/new/account/record/platform/list`, params)
    },
    NewAccountSummaryData: (params) => { //平台账户交易明细汇总数据
        return Axios.post(`${financeURL}/new/account/record/platform/summaryData`, params)
    },
    NewAccountExport: (params) => { //导出平台账户交易明细列表excel
        return Axios.post(`${financeURL}/new/account/record/platform/account/export`, params)
    },
    NewAccountSummaryExport: (params) => { //导出平台账户交易明细汇总列表excel
        return Axios.post(`${financeURL}/new/account/record/platform/summary/account/export`, params)
    },
    NewAccountCashFlowList: (params) => { //资金流列表
        return Axios.post(`${financeURL}/new/account/record/accountCashFlowList`, params)
    },
    NewAccountCashFlowSummary: (params) => { //资金流列表汇总数据
        return Axios.post(`${financeURL}/new/account/record/accountCashFlowSummary`, params)
    },
    NewCashFlowSummaryExport: (params) => { //导出资金流列表excel
        return Axios.post(`${financeURL}/new/account/record/accountCashFlowList/export`, params)
    },
    AccountExport: (params) => { //导出
        return Axios.post(`${financeURL}/account/record/runningAccount/export`, params)
    },
    AccountSettlementExport: (params) => { //零工结算汇总导出excel
        return Axios.post(`${financeURL}/salary/customer/settlement/summary/export`, params)
    },
    AccountDetailExport: (params) => { //零工结算明细导出excel
        return Axios.post(`${financeURL}/salary/customer/settlement/summary/detail/export`, params)
    },
    downBG: (param) => { //下载被调模板
        return get(`${bizURL}/talent/platform/download/uploadingBackgroundSurvey`, param)
    },
    accountLaborRecordList: (params) => { // 劳务费列表查询
        return Axios.post(`${financeURL}/account/record/accountRecordList`, params)
    },
    accountRecordList: (params) => { // 提现记录列表查询
        return Axios.post(`${financeURL}/account/record/accountRecordList`, params)
    },
    accountLaborSummary: (params) => {
        return Axios.post(`${financeURL}/account/record/accountRecordSummary`, params)
    },
    accountWithdrawSummary: (params) => {
        return Axios.post(`${financeURL}/account/record/accountRecordSummary`, params)
    },
    accountCustomerList: () => {
        return Axios.post(`${bizURL}/customer/list`, {})
    },
    getOtherAccountList: (param) => { // 其他账户汇总列表
        return Axios.post(`${financeURL}/new/account/record/otherAccount/list`, param)
    },
    getOtherAccountSummary: (param) => { // 其他账户汇总列表汇总数据
        return Axios.post(`${financeURL}/new/account/record/otherAccount/summaryData`, param)
    },
    getOtherAccountDetailList: (param) => { // 其他账户明细列表
        return Axios.post(`${financeURL}/new/account/record/other/account/list`, param)
    },
    getOtherAccountDetailSummary: (param) => { // 其他账户明细列表汇总数据
        return Axios.post(`${financeURL}/new/account/record/other/account/summaryData`, param)
    },
    exportOtherAccountDetail: (param) => { // 导出其他账户明细
        return Axios.post(`${financeURL}/new/account/record/other/account/export`, param)
    },
    exportOtherAccountSummary: (param) => { // 导出其他账户汇总
        return Axios.post(`${financeURL}/new/account/record/otherAccount/list/export`, param)
    },
    reservationList: (param) => { // 官网预约
        return Axios.post(`${bizURL}/appointmentRecord/page`, param)
    },
    //对经理人进行充值操作
    accountRecharge: (param) => { // 导出其他账户汇总
        return Axios.post(`${financeURL}/account/recharge`, param)
    },
    //易宝转账记录
    getRemitRecord: (param) => {
        return get(`${financeURL}/yeePay/remitRecord`, param)
    },
    //资金回退至钱包
    getRollbackRecord: (param) => {
        return get(`${financeURL}/yeePay/rollbackRecord`, param)
    },
    //getExport
    getExport: (param) => {
        return get(`${financeURL}/yeePay/remitRecord/export`, param)
    },
    xfdAccountShow: (param) => {
        return get(`${financeURL}/xfd/account/show`, param)
    },
    xfdOperation: (param) => {
        return Axios.post(`${financeURL}/xfd/account/operation?status=${param.status}&customerId=${param.customerId}&reason=${param.reason}&rate=${param.rate}&minMoney=${param.minMoney}&financePhone=${param.financePhone}`)
    },
    getManagerLimit: (params) => {
        return get(`${bizURL}/customer/getManagerLimit`, params)
    },
    setManagerLimit: (param) => {
        return get(`${bizURL}/customer/setManagerLimit`, param)
    },
//    setUserAgreement: (params) => { 
//        return Axios.post(`${bizURL}/agreement/userAgreement`, params)
//    },    
    setUserAgreement: (params) => {
        return Axios.post(`${bizURL}/agreement/add`, params)
    },
    getUserAgreement: (params) => {
        return get(`${bizURL}/agreement/getByTitle`, params)
    },
    getXfdOrderList: (params) => {
        return get(`${financeURL}/xfd/account/allOrders`, params)
    },
    getXfdOrderDetails: (params) => {
        return get(`${financeURL}/xfd/account/details`, params)
    },
    getReviewList: (params) => {
        return get(`${bizURL}/customer/reviewList`, params)
    },
    setExamine: (params) => {
        return Axios.post(`${bizURL}/customer/examine`, params)
    },
    //3.0.7
    htAccountList: (params) => {
        return get(`${financeURL}/myBank/account/list`, params)
    },
    htAccountOperation: (params) => {
        return Axios.post(`${financeURL}/myBank/account/operation?id=${params.id}&rate=${params.rate}&cusRate=${params.cusRate}`, params)
    },
    setWsBank: (params) => {
        return Axios.post(`${bizURL}/customer/setWsBank?customerId=${params.customerId}`)
    },
    wsAccountList: (params) => {
        return get(`${bizURL}/customer/wsAccountList`, params)
    },
    manageFeeList: (params) => {
        return get(`${bizURL}/customer/manageFeeList`, params)
    },
    htOrders: (param) => { //取得当前账户的汉唐信通
        return get(`${financeURL}/ht/account/orders`, param)
    },
    backOrders: (param) => { //取得当前账户的退款记录
        return get(`${financeURL}/ht/account/backOrders`, param)
    },
    operOrders: (param) => { //退票处理
        return Axios.post(`${financeURL}/ht/account/operOrders`, param)
    },
    htOrdersDetails: (param) => { //取得当前账户的汉唐信通
        return get(`${financeURL}/ht/account/detail`, param)
    },
    classManagerList: (params) => {
        return get(`${bizURL}/manager/list`, params)
    },
    classManagerSwitchStatus: (params) => {
        return get(`${bizURL}/manager/switchStatus`, params)
    },
    getMyAccountDetail: (param) => {
        return Axios.post(`${baseURL}/finance/account/record/accountDetail`, param)
    },
    selectSumAccountDetail: (param) => {
        return Axios.post(`${baseURL}/finance/account/record/selectSumAccountDetail`, param)
    },
    assmList: (param) => {
        return Axios.post(`${baseURL}/finance/deposit/record/assmList`, param)
    },
    ctList: (param) => {
        return Axios.post(`${baseURL}/finance/deposit/record/ctList`, param)
    },
    recordList: (param) => {
        return get(`${baseURL}/finance/deposit/record/list`, param)
    },
    transaction: (param) => {
        return Axios.post(`${baseURL}/finance/ht/account/details/transaction`, param)
    },
    htRetry: (param) => {
        return get(`${baseURL}/finance/ht/account/details/retry`, param)
    },
}