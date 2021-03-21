<template>
  <div class="app-container">
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="PGN" prop="pgn">
        <el-input
          v-model="form.pgn"
          :autosize="{ minRows: 17 }"
          type="textarea"
        />
      </el-form-item>
      <el-form-item label="Description" prop="description">
        <el-input v-model="form.description" />
      </el-form-item>
      <el-form-item label="Game date">
        <el-col :span="11">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="Pick a date"
            style="width: 100%"
            value-format="yyyy-MM-dd"
          />
        </el-col>
      </el-form-item>
      <el-form-item v-if="players" label="White player" prop="whitePlayerId">
        <el-select
          v-model="form.whitePlayerId"
          filterable
          placeholder="Select white player"
        >
          <el-option
            v-for="item in players"
            :key="item.id"
            :label="item.firstName + ' ' + item.lastName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item v-if="players" label="Black player" prop="blackPlayerId">
        <el-select
          v-model="form.blackPlayerId"
          filterable
          placeholder="Select black player"
        >
          <el-option
            v-for="item in players"
            :key="item.id"
            :label="item.firstName + ' ' + item.lastName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        
        <el-button v-if="!form.id" type="primary" @click="createGame">Create</el-button>
        <el-button v-else type="primary" @click="updateGame">Update</el-button>

        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Chess from 'chess.js'
import { createGame, getGame, updateGame } from '@/api/games'
import { getPlayersList } from '@/api/players'

export default {
  data() {
    return {
      players: [],
      form: {
        pgn: '',
        date: '',
        description: '',
        whitePlayerId: null,
        blackPlayerId: null
      },
      rules: {
        pgn: [
          {
            required: true,
            message: 'Please input valid PGN.',
            trigger: 'blur'
          },
          {
            validator: this.validatePgn,
            trigger: 'blur'
          }
        ],
        whitePlayerId: [{ validator: this.validateId }],
        blackPlayerId: [{ validator: this.validateId }],
        description: [{ required: true }]
      },
      chess: null
    }
  },
  async mounted() {
    this.chess = new Chess()
    this.players = await getPlayersList()
    if (this.$route.query.gameId) {
      var g = await getGame(this.$route.query.gameId)
      console.log('g', g)
      this.form.pgn = g.pgn
      this.form.date = g.date
      this.form.whitePlayerId = g.whitePlayerId
      this.form.blackPlayerId = g.blackPlayerId
      this.form.id = g.id
      this.form.description = g.description
    }
  },
  methods: {
    validateId(rule, value, callback) {
      if (!value) {
        return callback(new Error('Please select player'))
      } else {
        callback()
      }
    },
    validatePgn(rule, value, callback) {
      if (!this.chess.load_pgn(value)) {
        callback(new Error('Please input valid PGN!'))
      } else {
        callback()
      }
    },
    async createGame() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          createGame(this.form).then((response) => {
            this.$router.push('/content/games')
          })
        } else {
          this.$message('Invalid request! Please fill data and try again.')
        }
      })
    },
    async updateGame() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          console.log('updating')
          updateGame(this.form).then((response) => {
            this.$router.push('/content/games')
          })
        } else {
          this.$message('Invalid request! Please fill data and try again.')
        }
      })
    },
    onCancel() {
      this.$router.push('/content/games')
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

