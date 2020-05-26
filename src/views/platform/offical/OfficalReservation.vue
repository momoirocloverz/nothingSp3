<template>
  <div class="offical-reservation">
    <el-table class="table-outline" :data="tableData" empty-text="暂无相关信息">
      <el-table-column prop="name" label="姓名" show-overflow-tooltip align="center" min-width="150px"></el-table-column>
      <el-table-column prop="mobile" label="电话" show-overflow-tooltip align="center" min-width="150px"></el-table-column>
      <el-table-column prop="demand" label="需求" :formatter="demandFormatter" show-overflow-tooltip align="center" min-width="150px"></el-table-column>
    </el-table>
    <div class="page-container">
      <el-pagination class="pagebox" background layout="prev, pager, next" :current-page="currentPage" @current-change="handleCurrentChange" :page-count="pageCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OfficalReservation',
  components: {},
  data() {
    return {
      pageSize: 200,
      currentPage: 1,
      pageCount: 1,
      tableData: [],
    };
  },

  computed: {},

  mounted() {
    this.getList()
  },
  methods: {
    demandFormatter(row, column, cellValue, index) {
      if (Number(cellValue) === 1) {
        return '使用系统'
      } else if (Number(cellValue) === 2) {
        return '项目外包'
      } else {
        return ''
      }
    },
    getList() {
      // 还有两个参数是name和mobile,暂时先用不到
      let param = {
        pageSize: this.pageSize,
        pageNum: this.currentPage,
      }

      this.$api.reservationList(param)
        .then(res => {
          if (res.data.respCode == 0) {
            if (res.data.data) {
              this.tableData = res.data.data.list
              this.pageCount = res.data.data.pages
            } else {
              this.tableData = []
              this.pageCount = 1
            }
          }
        })
        .catch(err => {
          console.log('get offical reservation list fail', err)
        })
    },
    handleCurrentChange(val) {
      this.currentPage = val
    }
  },
}
</script>
<style lang='scss' scoped>
</style>