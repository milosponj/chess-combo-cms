<template>
  <div>
    <g id="dexc">
      <rect x="24.333" fill="#9AE6B4" width="15.667" height="17.083" />
      <g>
        <path
          fill="#FFFFFF"
          d="M31.281,11.022c-0.006,0.246-0.203,0.447-0.433,0.447h-1.681c-0.229,0-0.426-0.201-0.433-0.447
			l-0.736-8.23c-0.007-0.246,0.179-0.447,0.407-0.447h3.091c0.23,0,0.414,0.201,0.408,0.447L31.281,11.022z"
        />
        <path
          fill="#FFFFFF"
          d="M31.27,13.036v1.568c0,0.245-0.191,0.448-0.421,0.448h-1.681c-0.229,0-0.42-0.203-0.42-0.448v-1.568
			c0-0.243,0.19-0.446,0.42-0.446h1.681C31.078,12.59,31.27,12.793,31.27,13.036z"
        />
      </g>
      <g>
        <path
          fill="#FFFFFF"
          d="M36.488,11.022c-0.006,0.245-0.203,0.447-0.433,0.447h-1.681c-0.229,0-0.427-0.202-0.433-0.447
			l-0.736-8.23c-0.007-0.246,0.178-0.447,0.407-0.447h3.091c0.229,0,0.414,0.202,0.408,0.447L36.488,11.022z"
        />
        <path
          fill="#FFFFFF"
          d="M36.476,13.036v1.568c0,0.246-0.19,0.448-0.42,0.448h-1.681c-0.229,0-0.421-0.203-0.421-0.448v-1.568
			c0-0.243,0.191-0.446,0.421-0.446h1.681C36.285,12.59,36.476,12.793,36.476,13.036z"
        />
      </g>
    </g>
    <div :id="fen" class="chess-board" />
    
  </div>
</template>

<script>
import { Chessboard, MARKER_TYPE } from 'cm-chessboard'
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
    this.board = new Chessboard(document.getElementById(this.fen), {
      position: this.fen,
      responsive: true,
      style: { aspectRatio: 0.9, showCoordinates: true, showBorder: true },
      sprite: {
        url: this.chessPieces, // pieces and markers are stored as svg in the sprite
        grid: 40 // the sprite is tiled with one piece every 40px
      }
    })
    this.board.addMarker('e4', MARKER_TYPE.circle)
    console.log('added circle on e4')
    this.board.addMarker('d1', {
      class: 'doubleExclamation',
      slice: 'dexc'
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
<style>

.doubleExclamation {
  z-index: 10000;
  stroke: #000000;
  stroke-width: 0.5px;
  
}

</style>
