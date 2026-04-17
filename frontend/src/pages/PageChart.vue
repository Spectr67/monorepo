<script>
import { AreaSeries, createChart, LineSeries } from 'lightweight-charts'

export default {
  data() {
    return {
      x: 42,
    }
  },

  created() {
    console.log(this.x)
    console.log(document.querySelector('#elDiv'))
  },

  mounted() {
    console.log(this.x)
    console.log(document.querySelector('#elDiv'))
    console.log(window.elDiv)
    console.log(document.querySelector('#elDiv') === window.elDiv)
    const chart = createChart(window.elDiv, { width: 800, height: 300 })
    const lineSeries = chart.addSeries(AreaSeries, {
      lineColor: '#2962FF',
      topColor: '#2962FF',
      bottomColor: 'rgba(41, 98, 255, 0.28)',
    })
    lineSeries.setData([
      { time: '2019-04-10', value: 80.01 },
      { time: '2019-04-11', value: 80.01 },
      { time: '2019-04-12', value: 96.63 },
      { time: '2019-04-13', value: 76.64 },
      { time: '2019-04-14', value: 81.89 },
      { time: '2019-04-15', value: 74.43 },
      { time: '2019-04-16', value: 80.01 },
      { time: '2019-04-17', value: 96.63 },
      { time: '2019-04-18', value: 76.64 },
      { time: '2019-04-19', value: 81.89 },
      { time: '2019-04-20', value: 74.43 },
      { time: '2019-04-21', value: 74.43 },
    ])
  },
}
</script>

<template>
  <h1>Chart</h1>
  <div id="elDiv"></div>
  <h2>end chart</h2>
</template>
