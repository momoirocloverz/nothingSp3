<template>
  <div>
    <el-dialog title="佣金详情" :visible.sync="YJXQ_Visible" width="540px" center :before-close="handleClose">
      <div class="dialog-head">
        <div>
          <span>条件1：</span>
          <span>入职10天给付200元</span>&nbsp;&nbsp;&nbsp;<label style="color:#008000">达成</label>
        </div>
        <div>
          <span>条件2：</span>
          <span>入职10天给付200元</span>&nbsp;&nbsp;&nbsp;<label style="color:#FF0000">失败</label>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button round size="medium" type="primary" @click="closeBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      YJXQ_Visible: true
    };
  },
  components: {},
  computed: {},
  mounted() { },
  methods: {
    handleClose(done) {
      this.$emit('sessionFalse', false)
      done()
    },
    closeBtn() {
      this.YJXQ_Visible = false
      this.$emit('sessionFalsed', false)
    }
  }
}
</script>
<style scoped>
</style>