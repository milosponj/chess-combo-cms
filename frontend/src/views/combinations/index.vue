<template>
  <div class="app-container">
    <el-row>
      <el-button type="success" round @click="redirectToEditCombination">Add new</el-button>
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
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column label="White" >
        <template slot-scope="scope">
          {{ scope.row.whitePlayerName }}
        </template>
      </el-table-column>
      <el-table-column label="Black">
        <template slot-scope="scope">
          <span>{{ scope.row.blackPlayerName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Description">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Moves" width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.numberOfMoves }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Game Date" width="100">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.gameDate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Actions" width="100">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="editRow(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getCombinationsList } from '@/api/combinations'

export default {
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
      getCombinationsList().then(response => {
        this.list = response
        this.listLoading = false
      })
    },
    redirectToEditCombination() {
      this.$router.push(`/editCombination`)
    },
    editRow(id) {
      this.$router.push(`/editCombination?id=${id}`)
    }
  }
}
</script>
