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

      <el-table-column align="center" prop="created_at" label="Birthdate" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span v-if="scope.row.dateOfBirth">{{ (new Date(scope.row.dateOfBirth)).toDateString("mm dd, yyyy").split(' ').slice(1).join(' ') }}</span>
          <span v-else>Unknown</span>
        </template>
      </el-table-column>
      <el-table-column label="Birthplace">
        <template slot-scope="scope">
          {{ scope.row.placeOfBirth }}
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
      getPlayersList().then(response => {
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
