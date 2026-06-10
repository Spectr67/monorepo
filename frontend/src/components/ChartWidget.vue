<script>
import {
  subscribeToSymbol,
  unsubscribeFromSymbol,
} from '@/api/tickerUpdater.js'
import { addSeriesToChart, createCustomChart } from '@/createChart.js'

export default {
  props: ['symbol'],

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
    this.chart = createCustomChart(this.$refs.chartContainer)
    this.lineSeries = addSeriesToChart(this.chart)
    subscribeToSymbol(this.symbol, candle => {
      if (candle) this.currentCandle = candle
      else this.currentCandle = null
    })
  },

  watch: {
    symbol(value, oldVal) {
      unsubscribeFromSymbol(oldVal)
      subscribeToSymbol(value, candle => {
        if (candle) this.currentCandle = candle
        else this.currentCandle = null
      })
    },

    currentCandle(value, oldVal) {
      if (oldVal && oldVal.c && value && value.c) {
        if (value.c > oldVal.c) this.priceDirection = '▲'
        if (value.c < oldVal.c) this.priceDirection = '▼'
      }
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
    startChartUpdates() {},
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
