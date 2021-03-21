<template>
  <div class="app-container">
    <el-row>
      <el-button
        class="m-4"
        type="success"
        round
        @click="redirectToEditGame"
      >Add new</el-button>
    </el-row>
    <br>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="45">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="White">
        <template slot-scope="scope">
          {{ scope.row.whitePlayerName }}
        </template>
      </el-table-column>
      <el-table-column label="Black" align="center">
        <template slot-scope="scope">
          {{ scope.row.blackPlayerName }}
        </template>
      </el-table-column>
      <el-table-column label="Description" align="center">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="Game Date"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ (new Date(scope.row.date)).toDateString("mmmm dS, yyyy") }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Actions" width="100">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="editRow(scope.row.id)"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getGamesList } from '@/api/games'

export default {
  name: 'Games',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getGamesList().then((response) => {
        this.list = response
        this.listLoading = false
      })
    },
    redirectToEditGame() {
      this.$router.push(`/editGame`)
    },
    editRow(id) {
      this.$router.push(`/editGame?gameId=${id}`)
    }
  }
}
</script>
