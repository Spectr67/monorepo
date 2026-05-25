<script>
import { AreaSeries, createChart, LineSeries } from 'lightweight-charts'

const rand = () => Math.trunc(Math.random() * 100)

// new Date().toLocaleDateString().split('.').toReversed().join('-')

function makeLine() {
  return { time: Date.now(), value: rand() }
}

export default {
  data() {
    return {
      lineSeries: null,
      lineData: [
        { time: 1642598122, value: 80 },
        { time: 1642598132, value: 90 },
        { time: 1642598142, value: 70 },
      ],
    }
  },

  computed: {
    lineDataLength() {
      return this.lineData.length + 4
    },
  },

  mounted() {
    const chart = createChart(window.elDiv, { width: 800, height: 300 })
    this.lineSeries = chart.addSeries(AreaSeries, {
      lineColor: '#2962FF',
      topColor: '#2962FF',
      bottomColor: 'rgba(41, 98, 255, 0.28)',
    })
    this.lineSeries.setData(this.lineData)
  },

  methods: {
    handleAddLine() {
      this.lineData.push(makeLine())
    },
  },

  watch: {
    lineData: {
      deep: true,
      handler(newVal, oldVal) {
        console.log('??', newVal === oldVal)
        this.lineSeries.setData(newVal)
      },
    },
  },
}
</script>

<template>
  <h1>Chart</h1>
  <div id="elDiv"></div>
  <button @click="handleAddLine">Add Line</button>
  <button @click="lineData = 4">Set number</button>
  <p>{{ lineData }}</p>
  <h2>end chart</h2>
  <h3>{{ lineDataLength }}</h3>
  <h4>{{ lineData.length }}</h4>
</template>
