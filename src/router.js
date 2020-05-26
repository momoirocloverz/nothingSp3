import Vue from "vue";
import Router from "vue-router";
const Home = () => import( /* webpackChunkName: 'home' */ './views/Home.vue')
const Login = () => import( /* webpackChunkName: 'home' */ './views/Login.vue')
const FindPwd = () => import( /* webpackChunkName: 'home' */ './views/FindPwd.vue')

//零工

const WorkerDetail = () => import( /* webpackChunkName: 'worker' */ './views/platform/worker/WorkerDetail.vue')
const Import = () => import( /* webpackChunkName: 'worker' */ './views/platform/worker/Import.vue')



//账号管理
const EditPsw = () => import( /* webpackChunkName: 'account' */ './views/platform/accountID/EditPsw.vue')
const BindPhone = () => import( /* webpackChunkName: 'account' */ './views/platform/accountID/BindPhone.vue')
Vue.use(Router);


//平台
//零工
const PWorkerList = () => import( /* webpackChunkName: 'privately' */ './views/platform/worker/WorkerList.vue')
//个体工商户
const PrivatelyList = () => import( /* webpackChunkName: 'privately' */ './views/platform/privately/PrivatelyList.vue')
const NewPrivately = () => import( /* webpackChunkName: 'privately' */ './views/platform/privately/NewPrivately.vue')
const ViewRecord = () => import( /* webpackChunkName: 'privately' */ './views/platform/privately/ViewRecord.vue')
const ViewRecordC = () => import( /* webpackChunkName: 'privately' */ './views/platform/privately/ViewRecordC.vue')
const ViewRecordP = () => import( /* webpackChunkName: 'privately' */ './views/platform/privately/ViewRecordP.vue')
//客户模块
const customerList = () => import( /* webpackChunkName: 'customer' */ './views/platform/customer/List.vue')

const classManagerList = () => import( /* webpackChunkName: 'classManage' */ '@/views/platform/classManager/List.vue')


const customerCheckList = () => import( /* webpackChunkName: 'customer' */ './views/platform/customer/checkList.vue')
const addCustomer = () => import( /* webpackChunkName: 'customer' */ './views/platform/customer/AddCustomer.vue')
const newAddCus = () => import( /* webpackChunkName: 'customer' */ './views/platform/customer/newAddCus.vue')
const customerDetail = () => import( /* webpackChunkName: 'customer' */ './views/platform/customer/detail.vue')
const editPwd = () => import( /* webpackChunkName: 'customer' */ './views/platform/customer/EditPsw.vue')
const editPhone = () => import( /* webpackChunkName: 'customer' */ './views/platform/customer/EditPhone.vue')
const cusworker = () => import( /* webpackChunkName: 'customer' */ './views/platform/customer/cusworker.vue')
//经理人
const pmList = () => import( /* webpackChunkName: 'projectmanager' */ './views/platform/projectmanager/List.vue')
const pmDetail = () => import( /* webpackChunkName: 'projectmanager' */ './views/platform/projectmanager/detail.vue')
const pmEdit = () => import( /* webpackChunkName: 'projectmanager' */ './views/platform/projectmanager/edit.vue')
//保险
const insuranceList = () => import( /* webpackChunkName: 'projectmanager' */ './views/platform/insurance/ListDetail.vue')
const collectDetails = () => import( /* webpackChunkName: 'projectmanager' */ './views/platform/insurance/collect_details.vue')
//经纪人
const agList = () => import( /* webpackChunkName: 'projectmanager' */ './views/platform/agent/AgentList.vue')
const agDetails = () => import( /* webpackChunkName: 'projectmanager' */ './views/platform/agent/AgentDetails.vue')

//招聘管理---职位
const jobList = () => import( /* webpackChunkName: 'projectmanager' */ './views/platform/recruitment/job/JobList.vue')
const jobInfo = () => import( /* webpackChunkName: 'projectmanager' */ './views/platform/recruitment/jobInfo.vue')

//系统
const SystemList = () => import( /* webpackChunkName: 'system' */ './views/platform/system/SystemList.vue')
const AddUser = () => import( /* webpackChunkName: 'system' */ './views/platform/system/user/AddUser.vue')
const AddRole = () => import( /* webpackChunkName: 'system' */ './views/platform/system/role/AddRole.vue')

//任务
const TaskList = () => import( /* webpackChunkName: 'task' */ './views/platform/task/TaskList.vue')
const TaskDetail = () => import( /* webpackChunkName: 'task' */ './views/platform/task/TaskDetail.vue')

const subCustomerDetail = () => import( /* webpackChunkName: 'task' */ './views/platform/childcustomer/detail.vue')
//子客户

//考勤
const AttendenceList = () => import( /* webpackChunkName: 'attendence' */ './views/platform/attendence/AttendenceList.vue')

//排班
const SchedulingList = () => import( /* webpackChunkName: 'scheduling' */ './views/platform/scheduling/SchedulingList.vue')
const schedulingDetail = () => import( /* webpackChunkName: 'scheduling' */ './views/platform/scheduling/schedulingDetail.vue')

//发票
const InvoiceList = () => import( /* webpackChunkName: 'invoice' */ './views/platform/invoice/InvoiceList.vue')
const Drawing = () => import( /* webpackChunkName: 'invoice' */ './views/platform/invoice/Drawing.vue')
const ManagerDrawed = () => import( /* webpackChunkName: 'invoice' */ './views/platform/invoice/manager/ManagerDrawed.vue')
const ManagerDrawList = () => import( /* webpackChunkName: 'invoice' */ './views/platform/invoice/manager/ManagerDrawList.vue')
const PrivateDrawList = () => import( /* webpackChunkName: 'invoice' */ './views/platform/invoice/privateOwn/PrivateDrawList.vue')
const MDrawing = () => import( /* webpackChunkName: 'invoice' */ './views/platform/invoice/manager/Drawing.vue')

//应付
const payableList = () => import( /* webpackChunkName: 'payable' */ './views/platform/payable/List.vue')
const payableDetail = () => import( /* webpackChunkName: 'payable' */ './views/platform/payable/workerPays/detail.vue')
const salaryBill = () => import( /* webpackChunkName: 'payable' */ './views/platform/payable/workerPays/salaryBill.vue')
const salaryDetail = () => import( /* webpackChunkName: 'payable' */ './views/platform/payable/workerPays/salaryDetail.vue')
const projectPayDetail = () => import( /* webpackChunkName: 'payable' */ './views/platform/payable/projectPays/detail.vue')
const profitTable = () => import( /* webpackChunkName: 'payable' */ './views/platform/payable/managerProfit/profitTable.vue')
const wokerprivateDetail = () => import( /* webpackChunkName: 'payable' */ './views/platform/payable/workerPays/wokerprivateDetail.vue')
const profitDetail = () => import( /* webpackChunkName: 'payable' */ './views/platform/payable/managerProfit/profitDetail.vue')
const privateDetail = () => import( /* webpackChunkName: 'payable' */ './views/platform/payable/managerProfit/privateDetail.vue')

//我的账户
const AccountList = () => import( /* webpackChunkName: 'account' */ './views/platform/account/AccountList.vue')
const Recharge = () => import( /* webpackChunkName: 'account' */ './views/platform/account/Recharge.vue')
const exportAccount = () => import( /* webpackChunkName: 'account' */ './views/platform/account/export.vue')
const RecordList = () => import( /* webpackChunkName: 'account' */ './views/platform/account/RecordList.vue')
const ExternalTotal = () => import( /* webpackChunkName: 'account' */ './views/platform/account/ExternalTotal.vue')
const ExternalDetail = () => import( /* webpackChunkName: 'account' */ './views/platform/account/ExternalDetail.vue')

// 资金流
const CapitalFlow = () => import( /* webpackChunkName: 'account' */ './views/platform/capitalFlow.vue')

// 官网
const OfficalReservation = () => import( /* webpackChunkName: 'offical' */ './views/platform/offical/OfficalReservation.vue')
//易宝转账记录
const TransferList = () => import( /* webpackChunkName: 'transferList' */ './views/platform/transfer/transferList.vue');
const agreement = () => import('./views/platform/agreementAdmin/agreement.vue');

//薪福多管理
const PendingFudo = () => import('./views/platform/fuFudo/pendingFudo.vue');
const OpenList = () => import('./views/platform/fuFudo/openList.vue');
const FudoOrderList = () => import('./views/platform/fuFudo/fudoOrderList.vue');
const OrderDetail = () => import('./views/platform/fuFudo/orderDetail.vue');
const OrderResult = () => import('./views/platform/fuFudo/orderResult.vue');
//管理费账户
const ManagerAccountList = () => import('./views/platform/managerAccount/managerAccountList.vue');
const MananerFlow = () => import('./views/platform/managerAccount/managerflow.vue');
const BusinessRecord = () => import('./views/platform/managerAccount/businessRecord.vue');
//汉唐信通管理
const HantanList = () => import('./views/platform/hanTan/hantanList.vue');
const PayRecordList = () => import('./views/platform/hanTan/payRecordList.vue');
const HantanOrderList = () => import('./views/platform/hanTan/hantanOrderList.vue');
const HantanOrderDetail = () => import('./views/platform/hanTan/hantanDetail.vue');


const marketListCon = () => import('./views/platform/market/listCon.vue');



export default new Router({
  routes: [
    //公共模块
    // {
    //   path: "/home",
    //   name: "home",
    //   component: Home,
    //   alias: '首页',
    //   meta: {
    //     isShow: true,
    //     breadName: '首页',
    //   }
    // },
    {
      path: "/",
      name: "login",
      component: Login,
      alias: '登录',
      meta: {
        isShow: false,
        isRequireAuth: false,
      }
    },
    {
      path: "/findpwd",
      name: "FindPwd",
      component: FindPwd,
      alias: '找回密码',
      meta: {
        isShow: false,
        isRequireAuth: false,
      }
    },
    {
      path: "/accountID",
      name: "accountID",
      component: Home,
      alias: '账号管理',
      meta: {
        isShow: false,
        breadName: '账号管理',
        isCustomer: true,
      },
      children: [{
        path: "editPsw",
        name: "editPsw",
        component: EditPsw,
        alias: '修改密码',
        meta: {
          isShow: true,
          breadName: '修改密码'
        }
      },
      {
        path: "bindPhone",
        name: "bindPhone",
        component: BindPhone,
        alias: '更换绑定手机号',
        meta: {
          isShow: true,
          breadName: '更换绑定手机号'
        }
      },
      ]
    },
    //平台模块
      
    {
      path: "/customer",
      component: Home,
      alias: '经理人管理',
        meta: {
        isShow: true,
        breadName: '客户',
        isCustomer: true,
      },
      children: [{
        path: '',
        redirect: 'List',
        component: customerList
      },
        {
          path: "List",
          name: "customerList",
          component: customerList,
          meta: {
            breadName: '经理人列表'
          }
        },
        {
          path: "customerCheckList",
          name: "customerCheckList",
          component: customerCheckList,
          meta: {
            breadName: '待审核经理人'
          }
        },
        {
          path: "newAddCus",
          name: "newAddCus",
          component: newAddCus,
            hidden:true,
          meta: {
            isEdit: false,
            breadName: '添加客户',
          }
        },         
                 
                 
                 
                 
        {
          path: "add",
          name: "addCustomer",
          component: addCustomer,
            hidden:true,
          meta: {
            isEdit: false,
            breadName: '添加客户',
          }
        },
        {
          path: "edit/:id",
          name: "editCustomer",
          component: addCustomer,
            hidden:true,
          meta: {
            isEdit: true,
            breadName: '编辑客户',
          }
        },
        {
          path: "detail/:id/:needManagerFee/:managerFee/:double",
          name: "customerDetail",
          component: customerDetail,
            hidden:true,
          meta: {
            breadName: '客户详情',
          }
        },
        {
          path: "workerDetail/:customerId/:id",
          name: "customerworkerDetail",
          component: WorkerDetail,
            hidden:true,
          alias: '零工详情',
          meta: {
            isShow: true,
            breadName: '零工详情',
          }
        },
        {
          path: "editPwd/:id",
          name: "editPwd",
          component: editPwd,
            hidden:true,
          meta: {
            breadName: '修改密码',
          }
        },
        {
          path: "editPhone/:userId",
          name: "editPhone",
          component: editPhone,
            hidden:true,
          meta: {
            breadName: '修改密码',
          }
        },
        {
          path: "cusworker/:id",
          name: "cusworker",
          component: cusworker,
            hidden:true,
          meta: {
            breadName: '查看分配的零工'
          }
        },
      ],      
    },      
      
    {
      path: "/fuFudo",
      name: "fuFudo",
      component: Home,
      alias: '薪福多管理',
      meta: {
        isShow: true,
        breadName: '薪福多管理',
        isCustomer: false,
      },
      children: [{
        path: '',
        redirect: 'pendingFudo',
        component: PendingFudo
      },
        {
          path: 'pendingFudo',
          name: 'pendingFudo',
          component: PendingFudo,
          alias: '待开户列表',
          meta: {
            isShow: true,
            breadName: '待开户列表'
          }
        },
        {
          path: "openList",
          name: "openList",
          component:OpenList,
          alias: '开户成功列表',
          meta: {
            isShow: true,
            breadName: '开户成功列表'
          }
        },
        {
          path: "fudoOrderList",
          name: "fudoOrderList",
          component: FudoOrderList,
          alias: '薪福多订单',
          meta: {
            isShow: true,
            breadName: '薪福多订单'
          }
        },
        {
          path: "orderDetail",
          name: "orderDetail",
          component: OrderDetail,
          alias: '薪福多订单详情',
          hidden:true,
          meta: {
            isShow: false,
            breadName: '薪福多订单详情'
          }
        },
        {
          path: "orderResult",
          name: "orderResult",
          component: OrderResult,
          alias: '查看发放结果',
          hidden:true,
          meta: {
            isShow: false,
            breadName: '查看发放结果'
          }
        },
      ]
    },
    {
      path: "/managerAccount",
      name: "managerAccount",
      component: Home,
      alias: '管理费账户',
      meta: {
        isShow: true,
        breadName: '管理费账户',
        isCustomer: false,
      },
      children: [{
        path: '',
        redirect: 'managerAccountList',
        component: ManagerAccountList
      },
        {
          path: 'managerAccountList',
          name: 'managerAccountList',
          component: ManagerAccountList,
          alias: '管理费账户列表',
          meta: {
            isShow: true,
            breadName: '管理费账户列表'
          }
        },
        {
          path: 'mananerflow',
          name: 'mananerflow',
          component: MananerFlow,
          alias: '管理费流水',
          meta: {
            isShow: true,
            breadName: '管理费流水'
          }},
        {
          path: 'businessRecord',
          name: 'businessRecord',
          component: BusinessRecord,
          alias: '网商扣费记录',
          meta: {
            isShow: true,
            breadName: '网商扣费记录'
          }
        }
      ]
    },

    {
      path: "/hantan",
      name: "hantan",
      component: Home,
      alias: '汉唐信通管理',
      meta: {
        isShow: true,
        breadName: '汉唐信通管理',
        isCustomer: false,
      },
      children: [{
        path: '',
        redirect: 'hantanList',
        component: HantanList
      },
        {
          path: "hantanList",
          name: "hantanList",
          component:HantanList,
          alias: '开户列表',
          meta: {
            isShow: true,
            breadName: '开户列表'
          }
        },
        {
          path: "hantanOrderList",
          name: "hantanOrderList",
          component: HantanOrderList,
          alias: '汉唐信通订单',
          meta: {
            isShow: true,
            breadName: '汉唐信通订单'
          }
        },
        {
          path: "hantanOrderDetail",
          name: "hantanOrderDetail",
          component: HantanOrderDetail,
          alias: '查看发放结果',
          hidden:true,
          meta: {
            isShow: false,
            breadName: '查看发放结果'
          }
        },{
          path: "payRecordList",
          name: "payRecordList",
          component: PayRecordList,
          alias: '付款记录',
          hidden:false,
          meta: {
            isShow: false,
            breadName: '付款记录'
          }
        },
      ]
    },
//     {
//       path: "/pm",
//       component: Home,
//       alias: '经理人管理',
//       children: [{
//         path: '',
//         redirect: 'List',
//         component: pmList
//       },
//       {
//         path: "List",
//         name: "pmList",
//         component: pmList,
//         meta: {
//           breadName: '经理人列表'
//         }
//       },
//       // { path: "add", name: "addCustomer", component: addCustomer,  meta: {
//       //   isEdit:false,
//       //   breadName:'添加经理人'
//       // }},
//       {
//         path: "edit/:id",
//         name: "pmEdit",
//         component: pmEdit,
//         meta: {
//           isEdit: true,
//           breadName: '编辑经理人认证信息'
//         }
//       },
//       {
//         path: "detail/:id",
//         name: "pmDetail",
//         component: pmDetail,
//         meta: {
//           breadName: '经理人详情'
//         }
//       },
//       ],
//       meta: {
//         isShow: true,
//         breadName: '经理人管理',
//         isCustomer: true,
//       }
//     },
    {
      path: "/insuranceList",
      component: Home,
      alias: '保险',
      children: [{
        path: '',
        redirect: 'insuranceList',
        component: insuranceList
      },
      {
        path: "insuranceList",
        name: "insuranceList",
        component: insuranceList,
        meta: {
          breadName: '保险'
        }
      },           
      {
        path: "collectDetails/:date",
        name: "collectDetails",
        component: collectDetails,
        meta: {
          breadName: '保单汇总明细'
        }
      }
    ],
      meta: {
        isShow: true,
        breadName: '保险',
        isCustomer: true,
      }
    },
      {
      path: "/marketListC",
      component: Home,
      alias: '接发单市场',
      children: [{
        path: '',
        redirect: 'marketListCon',
        component: marketListCon
      },
      {
        path: "marketListCon",
        name: "marketListCon",
        component: marketListCon,
        meta: {
          breadName: '接发单市场'
        }
      },    
    ],
      meta: {
        isShow: true,
        breadName: '接发单市场',
        isCustomer: true,
      }
    },
      
    {
      path: "/agent",
      component: Home,
      alias: '经纪人管理',
      children: [{
        path: '',
        redirect: 'agList',
        component: agList
      },
      {
        path: "agList",
        name: "agList",
        component: agList,
        meta: {
          breadName: '经纪人列表'
        }
      },
      {
        path: "agDetails/:id",
        name: "agDetails",
        component: agDetails,
        meta: {
          breadName: '经纪人详情'
        }
      }
      ],
      meta: {
        isShow: true,
        breadName: '经纪人管理',
        isCustomer: true,
      }
    },
    {
      path: "/job",
      component: Home,
      alias: '招聘管理',
      children: [{
        path: '',
        redirect: 'jobList',
        component: jobList
      },
      {
        path: "jobList",
        name: "jobList",
        component: jobList,
        meta: {
          breadName: '职位列表'
        }
      },
      {
        path: "jobInfo/:id",
        name: "jobInfo",
        component: jobInfo,
        meta: {
          breadName: '职位详情'
        }
      }
      ],
      meta: {
        isShow: true,
        breadName: '招聘管理',
        isCustomer: true,
      }
    },
    {
      path: "/pworker",
      component: Home,
      alias: '零工管理',
      children: [{
        path: '',
        redirect: 'pWorkerList',
        component: PWorkerList
      },
      {
        path: "pWorkerList",
        name: "pWorkerList",
        component: PWorkerList,
        meta: {
          breadName: '零工列表'
        }
      },
      {
        path: "workerDetail/:id/:managerId",
        name: "workerDetail",
        component: WorkerDetail,
        alias: '零工详情',
        meta: {
          isShow: true,
          breadName: '零工详情'
        }
      },
      {
        path: "bgImport",
        name: "bgImport",
        component: Import,
        meta: {
          breadName: '上传背调信息'
        }
      },
      ],
      meta: {
        isShow: true,
        breadName: '零工管理',
        isCustomer: false,
      }
    },
    // {
    //   path: "/privately",
    //   component: Home,
    //   alias: '个体工商户管理',
    //   children: [
    //     { path: '', redirect: 'privatelyList', component: PrivatelyList },
    //     {
    //       path: "privatelyList", name: "privatelyList", component: PrivatelyList, meta: {
    //         breadName: '个体工商户列表'
    //       }
    //     },
    //     {
    //       path: "newPrivately", name: "newPrivately", component: NewPrivately, meta: {
    //         breadName: '添加自有个体工商户'
    //       }
    //     },
    //     {
    //       path: "newCusPrivately", name: "newCusPrivately", component: NewPrivately, meta: {
    //         breadName: '添加客户自有个体工商户'
    //       }
    //     },
    //     {
    //       path: "newPlatPrivately", name: "newPlatPrivately", component: NewPrivately, meta: {
    //         breadName: '添加平台个体工商户'
    //       }
    //     },
    //     {
    //       path: "viewRecord/:id/:managerId/:name/:legalPerson/:managerName", name: "viewRecord", component: ViewRecord, meta: {
    //         breadName: '查看交费记录'
    //       }
    //     },
    //     {
    //       path: "viewRecordC/:id/:customerId/:name/:legalPerson/:cuntomerName", name: "viewRecordC", component: ViewRecordC, meta: {
    //         breadName: '查看交费记录'
    //       }
    //     },
    //     {
    //       path: "viewRecordP/:id/:name/:legalPerson", name: "viewRecordP", component: ViewRecordP, meta: {
    //         breadName: '查看服务费记录'
    //       }
    //     },
    //     {
    //       path: "editPrivately/:id/:self", name: "editPrivately", component: NewPrivately, meta: {
    //         breadName: '编辑自有个体工商户'
    //       }
    //     },
    //   ],
    //   meta: {
    //     isShow: true,
    //     breadName: '个体工商户管理',
    //     isCustomer: false,
    //   }
    // },
    {
      path: "/system",
      component: Home,
      alias: '系统管理',
      children: [{
        path: '',
        redirect: 'systemList',
        component: SystemList
      },
      {
        path: "systemList",
        name: "systemList",
        component: SystemList,
        meta: {
          breadName: '系统'
        },
      }, {
        path: "addUser",
        name: "addUser",
        component: AddUser,
        meta: {
          breadName: '新增系统用户',
          isEdit: true,
        }
      }, {
        path: "addRole",
        name: "addRole",
        component: AddRole,
        meta: {
          breadName: '新增角色',
          isEdit: false,
        }
      }, {
        path: "editRole/:id",
        name: "editRole",
        component: AddRole,
        meta: {
          breadName: '编辑角色',
          isEdit: true,
        }
      },
      {
        path: "editUser/:id",
        name: "editUser",
        component: AddUser,
        meta: {
          breadName: '编辑系统用户',
          isEdit: true,
        }
      }
      ],
      meta: {
        isShow: true,
        breadName: '系统管理',
        isCustomer: false,
      }
    },
    {
      path: "/task",
      component: Home,
      alias: '任务管理',
      children: [{
        path: '',
        redirect: 'TaskList',
        component: TaskList
      },
      {
        path: "TaskList",
        name: "TaskList",
        component: TaskList,
        meta: {
          breadName: '任务列表'
        },
      },
      {
        path: "subCusDetail/:id",
        name: "subCustomerDetail",
        component: subCustomerDetail,
        meta: {
          breadName: '子客户详情'
        }
      },
      {
        path: "TaskDetail/:id",
        name: "TaskDetail",
        component: TaskDetail,
        meta: {
          breadName: '任务详情',
        }
      },
      ],
      meta: {
        isShow: true,
        breadName: '任务管理',
        isCustomer: false,
      }
    },
    {
      path: "/attendence",
      component: Home,
      alias: '考勤管理',
      children: [{
        path: '',
        redirect: 'AttendenceList',
        component: AttendenceList
      },
      {
        path: "attendenceList",
        name: "AttendenceList",
        component: AttendenceList,
        meta: {
          breadName: '考勤列表'
        },
      },
      ],
      meta: {
        isShow: true,
        breadName: '考勤管理',
        isCustomer: false,
      }
    },
    {
      path: "/scheduling",
      component: Home,
      alias: '排班管理',
      children: [{
        path: '',
        redirect: 'SchedulingList',
        component: SchedulingList
      },
      {
        path: "SchedulingList",
        name: "SchedulingList",
        component: SchedulingList,
        meta: {
          breadName: '排班列表'
        },
      },
      {
        path: "schedulingDetail/:id/:hasPhoto",
        name: "schedulingDetail",
        component: schedulingDetail,
        meta: {
          breadName: '排班详情表'
        },
      },
      ],
      meta: {
        isShow: true,
        breadName: '排班管理',
        isCustomer: false,
      }
    },
    {
      path: "/invoice",
      component: Home,
      alias: '开票管理',
      children: [{
        path: '',
        redirect: 'invoiceList',
        component: InvoiceList
      },
      {
        path: "invoiceList",
        name: "invoiceList",
        component: InvoiceList,
        meta: {
          breadName: '平台开票'
        }
      },
      {
        path: "drawing/:id",
        name: "drawing",
        component: Drawing,
        hidden: true,
        meta: {
          breadName: '开票'
        }
      },
        // {
        //   path: "ManagerDrawList", name: "ManagerDrawList", component: ManagerDrawList, meta: {
        //     breadName: '项目经理开票'
        //   }
        // },
        // {
        //   path: "privateDrawList", name: "privateDrawList", component: PrivateDrawList, meta: {
        //     breadName: '个体户开票'
        //   }
        // },
      ],
      meta: {
        isShow: true,
        breadName: '开票管理',
        isCustomer: true,
      }
    },
    {
      path: "/payable",
      component: Home,
      alias: '结算',
      children: [{
        path: '',
        redirect: 'payableList',
        component: payableList
      },
      {
        path: "payableList",
        name: "payableList",
        component: payableList,
        meta: {
          breadName: '应付列表'
        },
      },
      {
        path: "payableDetail/:batchNumber/:settlementType/:payAboutType/:id",
        name: "payableDetail",
        component: payableDetail,
        meta: {
          breadName: '应付零工详情'
        },
      },
      {
        path: "salaryBill/:id/:talentType/:isSocialSecurity/:name/:settlementType",
        name: "salaryBill",
        component: salaryBill,
        meta: {
          breadName: '零工收入条'
        },
      },
      {
        path: "projectPayDetail/:id/:name/:payerType",
        name: "projectPayDetail",
        component: projectPayDetail,
        meta: {
          breadName: '排班查看-项目结算'
        },
      },
      {
        path: "profitTable/:id/:batchNumber/:managerId/:name",
        name: "profitTable",
        component: profitTable,
        meta: {
          breadName: '利润表'
        },
      },
      {
        path: "wokerprivateDetail/:batchNumber/:settlementType",
        name: "wokerprivateDetail",
        component: wokerprivateDetail,
        meta: {
          breadName: '个体户明细'
        },
      },
      {
        path: "profitDetail/:batchNumber",
        name: "profitDetail",
        component: profitDetail,
        meta: {
          breadName: '项目经理利润明细'
        },
      },
      {
        path: "privateDetail",
        name: "privateDetail",
        component: privateDetail,
        meta: {
          breadName: '个体户明细'
        },
      },
      {
        path: "salaryDetail/:talentId/:settlementType/:batchNumber/:realNameAlias/:id",
        name: "salaryDetail",
        component: salaryDetail,
        meta: {
          breadName: '收入明细'
        },
      },
        // {
        //   path: "salaryDetail/:talentId/:settlementType/:batchNumber/:name/:id",
        //   name: "salaryDetail",
        //   component: salaryDetail,
        //   meta: {
        //     breadName: '收入明细'
        //   },
        // },
      ],
      meta: {
        isShow: true,
        breadName: '结算管理',
        isCustomer: false,
      }
    },
    {
      path: "/account",
      name: "account",
      component: Home,
      alias: '账户管理',
      meta: {
        isShow: true,
        breadName: '账户管理',
        isCustomer: false,
      },
      children: [{
        path: '',
        redirect: 'accountList',
        component: AccountList
      },
      {
        path: 'Recharge',
        name: 'Recharge',
        component: Recharge,
        hidden: true,
        alias: '充值',
        meta: {
          isShow: false,
          breadName: '充值'
        }
      },
      {
        path: 'recordlist',
        name: 'recordlist',
        component: RecordList,
        hidden: true,
        alias: '记录列表',
        meta: {
          isShow: false,
          breadName: '记录列表'
        }
      },
      {
        path: 'export',
        name: 'export',
        component: exportAccount,
        hidden: true,
        alias: '导出明细',
        meta: {
          isShow: false,
          breadName: '导出明细'
        }
      },
      {
        path: "accountList",
        name: "accountList",
        component: AccountList,
        alias: '我的账户',
        meta: {
          isShow: true,
          breadName: '我的账户'
        }
      },
      {
        path: "capitalFlow",
        name: "capitalFlow",
        component: CapitalFlow,
        alias: '资金流',
        meta: {
          isShow: false,
          isRequireAuth: false,
          breadName: '资金流'
        }
      },
      {
        path: "externaltotal",
        name: "externaltotal",
        component: ExternalTotal,
        alias: '其他账户汇总',
        meta: {
          // isShow: true,
          breadName: '其他账户汇总'
        }
      },
      {
        path: "externaldetail",
        name: "externaldetail",
        component: ExternalDetail,
        alias: '其他账户明细',
        meta: {
          // isShow: true,
          breadName: '其他账户明细'
        }
      },
      ]
    },
    {
      path: "/transfer",
      name: "transfer",
      component: Home,
      alias: '易宝转账记录',
      meta: {
        isShow: true,
        breadName: '易宝转账记录',
        isCustomer: false,
      },
      children: [{
        path: '',
        redirect: 'transferList',
        component: TransferList
      }, {
        path: "transferList",
        name: "transferList",
        component: TransferList,
        meta: {
          breadName: '易宝转账记录'
        },
      }]
    },
    {
      path: "/offical",
      name: "offical",
      component: Home,
      alias: '官网预约',
      meta: {
        isShow: true,
        breadName: '官网预约',
        isCustomer: false,
      },
      children: [{
        path: '',
        component: OfficalReservation
      }, ]
    },
      {
          path: "/agreementAdmin",
          name: "agreementAdmin",
          component: Home,
          alias: '用户协议管理',
          meta: {
              isShow: true,
              breadName: '用户协议管理',
              isCustomer: false,
          },
          children: [
              {
                  path: '',
                  component: agreement
              }, 
          ]
      },
      {
          path: "/classManager",
          component: Home,
          alias: '班务经理管理',
          meta: {
              isShow: true,
              breadName: '客户',
              isCustomer: true,
          },
          children: [
              {
                  path: '',
                  redirect: 'List',
                  component: classManagerList
              },
              {
                  path: "List",
                  name: "classManagerList",
                  component: classManagerList,
                  meta: {
                      breadName: '班务经理列表'
                  }
              }
          ]
        },
  ]
});
