<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      currentFen: 'rnbqkbnr/p4p1p/1pppp3/6p1/3KP3/3P1PN1/PPP3PP/RNBQ1B1R'
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  methods: {
    setPosition() {
      this.currentFen = '8/pbrqkprp/nppppn1b/6p1/3KP3/RPNP1PN1/PBPQBRPP/8'
    },
    setPosition2() {
      this.currentFen = 'rnbqkbnr/p4p1p/1pppp3/6p1/3KP3/3P1PN1/PPP3PP/RNBQ1B1R'
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
