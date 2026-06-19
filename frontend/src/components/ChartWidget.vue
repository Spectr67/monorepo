<script>
import {
  subscribeToSymbol,
  unsubscribeFromSymbol,
} from '@/api/tickerUpdater.js'
import { addSeriesToChart, createCustomChart } from '@/createChart.js'

export default {
  props: ['symbol', 'interval'],

  data() {
    return {
      lineSeries: null,
      chart: null,
      priceDirection: '',
      currentCandle: {
        o: 0,
        h: 0,
        l: 0,
        c: 0,
        t: 0,
      },
    }
  },

  mounted() {
    this.initChartAndSubscribe(this.symbol, this.interval)
  },
  beforeUnmount() {
    unsubscribeFromSymbol(this.symbol, this.interval)
    this.chart.remove()
  },
  watch: {
    symbol(value, oldVal) {
      unsubscribeFromSymbol(oldVal, this.interval)
      this.chart.remove()
      this.priceDirection = ''

      this.initChartAndSubscribe(value, this.interval)
    },
    interval(value, oldVal) {
      unsubscribeFromSymbol(this.symbol, oldVal)
      this.chart.remove()
      this.priceDirection = ''

      this.initChartAndSubscribe(this.symbol, value)
    },

    currentCandle(value, oldVal) {
      if (oldVal && oldVal.c && value && value.c) {
        if (value.c > oldVal.c) this.priceDirection = '▲'
        if (value.c < oldVal.c) this.priceDirection = '▼'
      }
      if (!value) return
      const data = {
        open: value.o,
        high: value.h,
        low: value.l,
        close: value.c,
        time: value.t,
      }
      this.lineSeries.update(data)
    },
  },

  methods: {
    initChartAndSubscribe(symbolName, intervalDuration) {
      this.chart = createCustomChart(this.$refs.chartContainer)
      this.lineSeries = addSeriesToChart(this.chart)

      subscribeToSymbol(symbolName, intervalDuration, candle => {
        if (candle) this.currentCandle = candle
        else this.currentCandle = null
        console.log(`свеча обновилась для ${symbolName} (${intervalDuration})`)
      })
    },
  },
}
</script>

<template>
  <div class="crypto-container">
    <div class="price-board">
      <h2>{{ symbol }}</h2>

      <div
        class="current-price"
        :class="{
          'price-up': priceDirection === '▲',
          'price-down': priceDirection === '▼',
        }"
      >
        ${{ currentCandle?.c ?? 'Загрузка...' }}
        <span class="direction-arrow">{{ priceDirection }}</span>
      </div>
    </div>

    <div ref="chartContainer" class="chart-box"></div>
  </div>
</template>
<style scoped>
.price-up {
  color: #26a69a;
}
.price-down {
  color: #ef5350;
}
.direction-arrow {
  margin-left: 5px;
  font-size: 0.8em;
}
.chart-box {
  height: 450px;
  width: 100%;
}
</style>
