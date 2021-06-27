<template>
  <div id="board" class="chess-board" />
</template>

<script>
import { Chessboard } from 'cm-chessboard'
import Chess from 'chess.js'
import 'cm-chessboard/styles/cm-chessboard.css'
import chesspieces from '@/assets/chessboard-sprite-staunty.svg'

export default {
  name: 'Chessboard',
  props: {
    fen: {
      type: String,
      default: 'start'
    }
  },
  data() {
    return {
      game: null,
      board: null,
      chessPieces: chesspieces
    }
  },
  watch: {
    fen: function(newFen) {
      this.fen = newFen
      this.board.setPosition(this.fen)
    }
  },
  mounted() {
    this.game = new Chess()
    console.log(this.game.fen())
    this.board = new Chessboard(document.getElementById('board'), {
      position: this.fen,
      responsive: true,
      style: { aspectRatio: 0.9, showCoordinates: true, showBorder: true },
      sprite: {
        url: this.chessPieces, // pieces and markers are stored as svg in the sprite
        grid: 40 // the sprite is tiled with one piece every 40px
      }
    })
  },
  methods: {
    toggleClick() {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style scoped>
.chess-board {
  max-width: 100vh;
}
</style>
