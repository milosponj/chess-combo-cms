<template>
  <div class="app-container">
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="First Name" prop="firstName">
        <el-input
          v-model="form.firstName"
        />
      </el-form-item>
      <el-form-item label="Last Name" prop="lastName">
        <el-input
          v-model="form.lastName"
        />
      </el-form-item>
      <el-form-item label="Date of Birth">
        <el-col :span="11">
          <el-date-picker
            v-model="form.dateOfBirth"
            type="date"
            placeholder="Pick a date"
            style="width: 100%"
            format="dd-MMM-yyyy"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="Place of Birth">
        <el-col :span="11">
          <el-input
          v-model="form.placeOfBirth"
        />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createPlayer } from '@/api/players'

export default {
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        dateOfBirth: null
      },
      rules: {
        pgn: [
          {
            required: true,
            message: 'Please input the PGN',
            trigger: 'blur'
          },
          {
            validator: this.validatePgn,
            trigger: 'blur'
          }
        ]
      },
      chess: null
    }
  },
  mounted() {},
  methods: {
    onSubmit() {
      createPlayer(this.form).then(response => {
        if (this.form.dateOfBirth.length === 0) {
          this.form.dateOfBirth = null
        }
        this.$router.push('/content/players')
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

