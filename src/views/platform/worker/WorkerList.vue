<template>
  <div class="workerListsCon">
    <el-form ref="form"  :model="form" label-width="110px">
        <el-form-item label="行业："   class="formSearchMargin opennessLabel">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="不限" name="noLimit"></el-tab-pane>
                <template v-for="(item,index) in tabLists">
                    <el-tab-pane :key="item.id" :label="item.dicName" :name="String(item.id)"></el-tab-pane>
                </template>
            </el-tabs>
        </el-form-item>
        <el-form-item v-show="activeName != 'noLimit' " label="标签：" class="formSearchMargin">
            <el-radio-group class="radio-search"  v-model="form.tag" @change="tagChange">
                <el-radio :label="item.dicName" v-for="(item,index) in skillList" :key="index">{{item.dicName}}</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="关键字：" class="formSearchMargin parentPO">
            <el-input placeholder="输入关键字搜索" v-model="form.keyWord" size="mini" class="input-with-select select-input">
                <el-select v-model="form.select" slot="prepend" placeholder="请选择" @change="selectChange">
                    <el-option v-for="item in options"  :key="item.value" :label="item.label"  :value="item.value"></el-option>
                </el-select>
            </el-input>
            <el-button type="primary"  class="searchBtn"  @click="search">搜索</el-button>
        </el-form-item>
    </el-form>
    <div class="splitLine"></div>
    <div class="recordNum">符合查询条件的记录{{total}}条</div>
    <div class="flexCon">
        <el-button size="small" class="myplain-btn" @click="test"  style="margin-bottom:20px">批量上传背调信息</el-button>
        <el-button :disabled="!total"  size="small" @click="exportExcel" class="myplain-btn" style="margin-bottom:20px">导出银行卡信息</el-button>
    </div>
    <el-table class="table-outline" :data="tableData"  empty-text="暂无相关零工信息">
      <el-table-column  prop="realNameAlias" label="姓名" align="center"  min-width="80"></el-table-column>
      <el-table-column prop="sexName" align="center" label="性别" min-width="50"></el-table-column>
      <el-table-column prop="mobile" align="center" label="手机号" min-width="100"></el-table-column>
      <el-table-column prop="talentSkills" label="标签" align="center" :formatter="formatTag" min-width="160"></el-table-column>
      <el-table-column prop="backgroundSurvey" align="center"  label="背调信息"  min-width="140"></el-table-column>
      <el-table-column prop="paltFormStatus" align="center"  show-overflow-tooltip label="状态" min-width="80"></el-table-column>
      <el-table-column label="操作" min-width="130">
        <template slot-scope="scope">
          <el-button type="text" size="small"  @click="view(scope.row)">查看</el-button>
          <el-button  type="text" size="small" @click="freeze(scope.row)"  v-if="scope.row.type == 1">冻结</el-button>
          <el-button type="text" size="small" @click="unfreeze(scope.row)" v-if="scope.row.type == 2">解冻</el-button>
          <el-button type="text" size="small" @click="upLoadImgs(scope.row)">上传图片</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-container">
      <el-pagination class="pagebox"  background  layout="prev, pager, next" @current-change="changePage" :current-page="currentPage" :total="total"></el-pagination>
    </div>
    <el-dialog title="上传图片" :visible.sync="upLoadImg" v-if="upLoadImg" width="450px" center>
      <div class="dialog-head">
          <el-input v-model="bestFrame" style="display: none;width: 330px"></el-input>
          <el-upload class="upload-demo" action="//upload.qiniu.com/" :on-remove="handleRemove" :before-upload="beforeAvatarUpload" :limit="1" :on-exceed="handleExceed" :on-success="handleAvatarScucess2" :file-list="fileList" :data="upload_form">
              <el-button size="small" class="btnborder" round>上传</el-button>&nbsp;
              <span slot="tip" class="el-upload__tip" style="font-size:13px;">请确保零工自拍照清晰，以免打卡时系统无法识别</span>
          </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button round size="medium" type="primary" @click="upLoadImg_btn" :disabled="this.bestFrame == ''?true:false">确 认</el-button>
      </span>
    </el-dialog>
    <el-dialog title="" :visible.sync="confirmDia" width="600px" center>
      <div class="dialog-head">
        <span v-if="num == 1">确认冻结零工{{name}}吗？</span>
        <span v-if="num == 2">确认解冻零工{{name}}吗？</span>
      </div>
      <span slot="footer"  class="dialog-footer">
        <el-button  round size="medium" type="primary" @click="freezeItem" v-if="num == 1">确 认</el-button>
        <el-button round size="medium" type="primary" v-if="num == 2" @click="unfreezeItem">确 认</el-button>
        <el-button round size="medium" @click="confirmDia = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "WorkerList",
  data() {
    return {
        activeName:'noLimit',
        form: {
            tag: "",
            keyWord: "",
            select: 1
        },
        options: [{ label: "零工姓名", value: 1}],
        currentPage: 1,
        total: 0,
        confirmDia: false,
        upLoadImg: false,
        num: 1,
        name: "",
        id: "",
        tableData: [],
        skillList: [],
        fileList: [],
        upload_form: {},
        bestFrame: '',
        id_s: '',
        tabLists:[],
    };
  },
    mounted() {        
        this.getToken();
        this.getSkill();
        this.getList();
    },
  methods: {
      tagChange(){
          this.search();
      },
      selectChange(){
          this.form.keyWord = '';
      },
      handleClick(tab, event) {
          this.getSkill();
          if( this.activeName == 'noLimit' ){
              this.skillList = [];
              this.form.tag = '';
              this.search();
          }
      },
      exportExcel(){
          const params = {
              pageNum: this.currentPage,
              pageSize: 10,
              skill: this.form.tag,
              keyWord: this.form.select == 1 ? this.form.keyWord : '',
          };
          const loading = this.$loading({
              lock: true,
              text: '正在导出excel表...',
              spinner: 'el-icon-loading',
              background: 'rgba(255, 255, 255, 0.9)'
          });
          this.$api.empListsExport(params).then(res => {
              let { data:layer1 } = res;
              let { respCode,data } = layer1;
              if( respCode === 0 ){
                  loading.close();
                  window.open(data)
              }else{
                  loading.close();
              }
          }).catch(err=>{
              loading.close();
              console.log('err',err);
          })
      },
        handleRemove(file, fileList) {
            this.bestFrame = "";
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG && !isPNG) {
                this.$message.error('上传图片只能是 JPG 或PNG格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
            }
            return isLt2M && (isPNG || isJPG);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`请删除当前文件再重新上传！`);
        },
        handleAvatarScucess2(res, file) {
            const key = res.key;
            const img = `http://${this.bucketHost}/${key}`;
            this.bestFrame = img;
            this.getToken()
            // this.$refs.uploadimg.clearValidate()
        },
      search(){
          this.currentPage = 1
          this.getList()
      },
    getList() {
        const params = {
            pageNum: this.currentPage,
            pageSize: 10,
            skill: this.form.tag,
            keyWord: this.form.select == 1 ? this.form.keyWord : '',
        };
        this.$api.getWorkerList(params).then(res => {
            let { data:layer1 } = res;
            let { respCode,data } = layer1;
            if( respCode === 0 ){
                if( data && data.list ){
                    this.tableData = data.list;
                }else{
                    this.tableData = [];
                }
                this.total = data.total;
            }
        }).catch(error => {
            console.log(error);
        });
    },
    view(row) {
        const { href } = this.$router.resolve({
            name: "workerDetail",
            params: {
                id: row.id,
                managerId: row.managerId==undefined?' ':row.managerId
            }
        });
        window.open(href, "_blank");
    },
    freeze(row) {
        this.confirmDia = true;
        this.num = 1;
        this.name = row.realNameAlias;
        this.id = row.id;
    },
    unfreeze(row) {
        this.confirmDia = true;
        this.num = 2;
        this.name = row.realNameAlias;
        this.id = row.id;
    },
    upLoadImgs(row){
        this.upLoadImg = true;
        this.id_s = row.id;
        this.bestFrame = '';
    },
    upLoadImg_btn(){
        const params = {
            id: this.id_s,
            bestFrame: this.bestFrame
        }
        this.$api.faceInfoSupplement(params).then(res => {
            if(res.data.respCode == 0){
                this.$message.success('上传成功')
                this.upLoadImg = false
                this.getList()
            }
        }).catch(err=>{
            console.log('err',err);
        })
    },
    freezeItem() {
        const params = {
            talentId: this.id
        };
        this.$api.freezeUser(params).then(res => {
            this.getList();
            this.$message.success("冻结成功");
            this.confirmDia = false;
        }).catch(error => {
            console.log(error);
        });
    },
    unfreezeItem() {
      const params = {
          talentId: this.id
      };
      this.$api.unfreezeUser(params).then(res => {
          this.getList();
          this.$message.success("解冻成功");
          this.confirmDia = false;
      }).catch(error => {
          console.log(error);
      });
    },
    getSkill() {        
        let params = {
            code:'industry',
            level:1
        };
        this.$api.reGroupGetByCodeAndLevel(params).then(res=>{
            let { respCode,data } = res;
            if( respCode === 0 ){
                if( data && data.length ){
                    this.tabLists = data;  
                    if( this.activeName == 'noLimit' ){
                        
                    }else{
                        let param1 = {
                            pId:this.activeName
                        };
                        this.$api.DictionaryListByPid(param1).then(res=>{                        
                            let { respCode,data } = res;
                            if( respCode === 0 ){
                                if( data ){
                                    this.skillList = data;
                                }else{
                                    this.skillList = [];
                                }                                
                            }else{
                                this.skillList = [];
                            }   
                        }).catch(err=>{
                            console.log('err',err);
                        });
                    }
                }else{
                    this.skillList = [];
                }
            }
        }).catch(err=>{
           console.log('err',err); 
        });
    },
    changePage(val) {
        this.currentPage = val;
        this.getList();
    },
    handleAvatarScucess(res, file) {
        const key = res.key;
        const img = `http://${this.bucketHost}/${key}`;
        // this.form.businessLicense = img;
        this.getToken();
        // this.$refs.uploadimg.clearValidate();
    },
    getToken() {
        this.$api.getToken().then(res => {
            let { data:layer1 } = res;
            let { respCode,data } = layer1;
            if( respCode === 0 ){
                this.upload_form = {
                    key: data.fileName,
                    token: data.upToken
                };
            }            
        }).catch(err=>{
            console.log('err',err); 
        });
    },
    test(){
        const { href } = this.$router.resolve({
            name: "bgImport",
        });
        window.open(href, "_blank");
    },
      formatTag(row){
          if( row.talentSkills ){
              let tag =[]
              for(let i in row.talentSkills){
                  tag.push(row.talentSkills[i].skillName)
              }
              return tag.join(',');
          }else{
              return '无';
          }
      },
  },
};
</script>
<style scoped lang="scss">
.input-with-select {
  width: 352px;
}
    .parentPO {
        margin-top: 15px;
    }
.el-input  .el-select{
    width: 134px;
}
.select-input{
    width:396px;
    margin-right: 20px;
}
    .flexCon {
        display: flex;
        justify-content: space-between;
        align-content: center;
        align-items: center;        
    }
</style>
<style lang="scss">
    .workerListsCon {
        .el-form-item__content {
            line-height: inherit;
        }
        .el-form-item__label {
            line-height: inherit;
        }
        .parentPO {
            .el-form-item__label {
                line-height: 30px;
            }
        }
        .el-tabs__header {
            margin-bottom: 0;
        }
        .opennessLabel {
            margin-bottom: 15px;
            .el-form-item__label {
                line-height: 40px;
            }
        }
    }    
</style>