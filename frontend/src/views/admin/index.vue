<template>
  <div class="dashboard-container">
    <div class="dashboard-text">Hello {{ name }}</div>
    <el-card>
      <div slot="header" class="clearfix">
        CURRENT SERIES: <span>1</span>
      </div>
      <el-row>
        <el-button @click="startNewSeries">Start new series</el-button>
      </el-row>
    </el-card>
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
    startNewSeries() {
      console.log('starting new series')
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
