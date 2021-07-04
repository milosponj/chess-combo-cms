<template>
  <div class="app-container">
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="Game" />
      <el-row type="flex" justify="center">
        <el-col :span="12" justify="center">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-select
                v-model="form.gameId"
                filterable
                style="width: 100%"
                placeholder="Please select a game"
                @change="getGame"
              >
                <el-option
                  v-for="item in games"
                  :key="item.id"
                  :label="
                    item.whitePlayerName + ' vs ' + item.blackPlayerName + ' '
                  "
                  :value="item.id"
                  :command="item.id"
                />
              </el-select>
            </div>
            <el-row>
              <span v-if="turnColor">It is {{ turnColor }}'s turn.</span>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="24">
                <Chessboard :fen="currentFen" />
              </el-col>
            </el-row>
            <el-slider
              v-model="combinationRange"
              :disabled="game == null"
              range
              show-stops
              :max="gameLength"
              @change="changeRange"
              ref="sliderRange"
            />
          </el-card>
        </el-col>

        <!-- The moves description form -->

        <el-col :offset="1" :span="12" justify="center">
          <el-card class="box-card">
            <el-row type="flex" justify="center">
              <el-col>
                <el-row type="flex" justify="center">
                  <el-button-group>
                    <el-button type="primary" @click="traverseRow(false)"
                      >&lt;</el-button
                    >
                    <el-button type="primary" @click="traverseRow(true)"
                      >&GT;</el-button
                    >
                  </el-button-group>
                </el-row>
                <el-row>
                  <el-table
                    ref="movesTable"
                    :data="combination"
                    border
                    style="width: 100%"
                    height="320"
                    highlight-current-row
                  >
                  <el-table-column
                      prop="number"
                      label="Nr."
                      width="50"
                    />
                    <el-table-column
                      prop="annotation"
                      label="Move"
                      width="80"
                    />
                    <el-table-column prop="sign" label="Sign" width="90">
                      <template slot-scope="scope">
                        <el-select v-model="scope.row.sign" placeholder="">
                          <el-option label="!" value="!" />
                          <el-option label="!!" value="!!" />
                          <el-option label="?" value="?" />
                          <el-option label="??" value="??" />
                          <el-option label="!?" value="!?" />
                          <el-option label="?!" value="?!" />
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column prop="remark" label="Remark">
                      <template slot-scope="scope">
                        <el-input
                          v-model="scope.row.remark"
                          type="textarea"                         
                        />
                      </template>
                    </el-table-column>
                  </el-table>
                </el-row>
                <el-row>
                  <label> Combination Description </label>
                  <el-input
                    v-model="form.description"
                    rows="3"
                    type="textarea"
                  />
                </el-row>
                <el-row v-if="game">
                  <label> Combination owner </label>
                  <el-radio-group v-model="form.playerId">
                    <el-radio :label="game.whitePlayer.id" border>
                      {{
                        game.whitePlayer.firstName +
                          " " +
                          game.whitePlayer.lastName +
                          " (white)"
                      }}
                    </el-radio>
                    <el-radio :label="game.blackPlayer.id" border>
                      {{
                        game.blackPlayer.firstName +
                          " " +
                          game.blackPlayer.lastName +
                          " (black)"
                      }}
                    </el-radio>
                  </el-radio-group>
                </el-row>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <span> Maybe some overview here </span>
      </el-row>
      <el-row>
        <el-form-item>
          <el-button v-if="!form.id" type="primary" @click="onSubmit"
            >Create Combination</el-button
          >
          <el-button v-else type="primary" @click="updateCombination"
            >Update Combination</el-button
          >
          <el-button type="secondary" @click="onCancel">Cancel</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import Chess from 'chess.js'
import { getGame, getGamesList } from '@/api/games'
import {
  createCombination,
  getCombination,
  updateCombination
} from '@/api/combinations'
import Chessboard from '@/components/Chessboard'

export default {
  name: 'EditCombination',
  components: { Chessboard },
  created() {
    window.addEventListener('keydown', e => {
      if (e.key == 'ArrowLeft') {
        this.traverseRow(false)
      }
      if (e.key == 'ArrowRight') {
        this.traverseRow(true)
      }
    })
  },
  data() {
    return {
      currentFen: 'start',
      currentMove: 0,
      currentRow: 0,
      combinationRange: [0, 0],
      gameLength: 0,
      movesUndo: [],
      gameMoves: [],
      combination: [],
      game: null,
      turnColor: '',
      games: [],
      form: {
        gameId: '',
        combination: [],
        description: '',
        playerId: ''
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
  async mounted() {
    this.chess = new Chess()
    this.games = await getGamesList()
    if (this.$route.query.id) {
      const c = await getCombination(this.$route.query.id)
      console.log('backend returned combination', c)
      this.form.gameId = c.gameId
      this.getGame(c.gameId)
      this.form.description = c.description
      this.form.playerId = c.playerId
      // remove the initial move
      c.moves.shift()
      this.combination = c.moves
      this.form.combination = c.moves
      this.form.id = c.id
      const startRange = c.moves[0].number
      const endRange = c.moves[c.moves.length - 1].number
      setTimeout(() => {
        this.combinationRange = [startRange, endRange]
        while (this.currentMove > startRange) {
          this.traverseMove(false)
        }
      }, 100)
    }
  },
  methods: {
    getGame(gameId) {
      this.combination = []
      this.description = ''
      this.form.description = null
      this.form.playerId = null
      getGame(gameId)
        .then(res => {
          if (this.chess.load_pgn(res.pgn)) {
            this.game = res
            this.gameLength = this.chess.history().length
            this.combinationRange = [this.gameLength, this.gameLength]
            this.currentMove = this.chess.history().length
            this.currentRow = 0

            var allMoves = this.chess.history()
            var chessTemp = new Chess()
            var gameMovesObj = []
            for (var move in this.chess.history()) {
              chessTemp.move(allMoves[move])
              gameMovesObj.push({
                annotation: allMoves[move],
                number: move,
                fen: chessTemp.fen()
              })
            }
            this.gameMoves = gameMovesObj
            this.currentFen = this.chess.fen()
            this.movesUndo = []
            this.turnColor = ''
          }
        })
        .catch(err => console.log(err))
    },
    setCurrentMove(row) {
      this.$refs.movesTable.setCurrentRow(row)
    },
    traverseRow(isForward) {
      if (isForward) {
        if (this.currentRow < this.combination.length) {
          this.currentRow++
          this.traverseMove(true)
        }
      } else {
        if (this.currentRow > 0) {
          this.currentRow--
          this.traverseMove(false)
        }
      }

      this.setCurrentMove(this.combination[this.currentRow - 1])
    },
    traverseMove(isForward) {
      if (isForward) {
        if (this.movesUndo.length > 0) {
          this.chess.move(this.movesUndo.pop())
          this.currentFen = this.chess.fen()
          this.currentMove += 1
        }
      } else {
        if (this.currentMove > 0) {
          this.movesUndo.push(this.chess.undo())
          this.currentFen = this.chess.fen()
          this.currentMove -= 1
        }
      }
    },
    changeRange(newRange) {
      while (this.currentMove > newRange[0]) {
        this.traverseMove(false)
      }
      while (this.currentMove < newRange[0]) {
        this.traverseMove(true)
      }
      this.currentRow = 0
      this.setTurn(this.chess.turn())

      const newCombination = this.gameMoves
        .map((currElement, index) => {
          const previousMove = this.combination.find(
            c => c.number === index + 1
          )

          const rObj = {}
          rObj['annotation'] = currElement.annotation
          rObj['number'] = index + 1
          rObj['remark'] = previousMove?.remark
          rObj['sign'] = previousMove?.sign
          rObj['fen'] = currElement.fen
          return rObj
        })
        .slice(newRange[0], newRange[1])
      this.combination = newCombination
      this.setCurrentMove(this.combination[0])
    },
    setTurn(color) {
      if (color === 'b') {
        this.turnColor = 'Black'
      }
      if (color === 'w') {
        this.turnColor = 'White'
      }
    },
    updateCombination() {
      this.prepareForm()
      updateCombination(this.form).then(response => {
        this.$router.push('content/combinations')
      })
    },
    onSubmit() {
      this.prepareForm()

      createCombination(this.form).then(response => {
        this.$router.push('content/combinations')
      })
    },
    prepareForm() {
      this.form.combination = this.combination.slice(0)

      // Add the starting position move to the combination
      const initialPosition = this.gameMoves[this.combinationRange[0] - 2]
      this.form.combination.unshift({
        annotation: initialPosition.annotation,
        number: this.combinationRange[0] - 1,
        fen: initialPosition.fen,
        remark: 'Initial Position',
        sign: null
      })
    },
    checkPgn() {
      const isPgnValid = this.chess.load_pgn(this.form.pgn)
      console.log('is pgn valid ', isPgnValid)
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
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.el-radio {
  margin:12px;
}
</style>
