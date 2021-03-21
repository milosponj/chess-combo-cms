<template>
  <div class="app-container">
    <el-row>
      <el-button type="success" round @click="redirectToEditPlayer">Add new</el-button>
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
      <el-table-column label="First Name">
        <template slot-scope="scope">
          {{ scope.row.firstName }}
        </template>
      </el-table-column>
      <el-table-column label="First Name">
        <template slot-scope="scope">
          {{ scope.row.lastName }}
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ (new Date(scope.row.dateOfBirth)).toDateString("mmmm dS, yyyy") }}</span>
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
import { getPlayersList } from '@/api/players'

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
      getPlayersList().then((response) => {
        this.list = response
        this.listLoading = false
      })
    },
    redirectToEditPlayer() {
      this.$router.push(`/editPlayer`)
    },
    editRow(id) {
      console.log('editing player with id ', id)
    }
  }
}
</script>
