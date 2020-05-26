<template>
  <div>
    <div>
      <!--<el-radio-group v-model="fudoName">-->
        <!--<el-radio-button label="1">待审核</el-radio-button>-->
        <!--<el-radio-button label="2">待开户</el-radio-button>-->
        <!--<el-radio-button label="3">申请失败</el-radio-button>-->
      <!--</el-radio-group>-->
      <div class="list-router">
      <span v-for="(item,index) in breadList" :to="item.path" :key="index">
      \ {{item.meta.breadName}}</span>
      </div>
      <hr class="el-radio-group-hr" />
      <List v-if="activeName == 1" />
    </div>
  </div>
</template>

<script>
import List from './components/list.vue'
export default {
  name: 'hantanList',
  data() {
    return {
      activeName: '1',
      breadList:[]
    };
  },
  components: {
    List,
  },
  computed: {},
  mounted() {
    this.breadList = this.$route.matched;
  },
  methods: {}
}
</script>
<style scoped>
  .list-router{
    position: relative;
    line-height: 2;
    outline: none;
    font-size: 15px;
    color: #999;
  }
</style>