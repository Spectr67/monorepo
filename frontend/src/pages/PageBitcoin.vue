<script>
import { priceUpdater, priceUpdater2 } from '@/api/tickerUpdater.js'
import { addSeriesToChart, createCustomChart } from '@/createChart.js'

export default {
  data() {
    return {
      lineSeries: null,
      currentPrice: null,
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
    const chart = createCustomChart(this.$refs.chartContainer)
    this.lineSeries = addSeriesToChart(chart)
    priceUpdater2(candle => (this.currentCandle = candle))
  },

  watch: {
    currentCandle(value, oldVal) {
      if (value > oldVal) this.priceDirection = '▲'
      if (value < oldVal) this.priceDirection = '▼'
      const data = {
        open: value.o,
        high: value.h,
        low: value.l,
        close: value.c,
        time: value.t,
      }
      console.log(data)
      this.lineSeries.update(data)
    },
    currentPrice(value, oldVal) {
      if (value > oldVal) this.priceDirection = '▲'
      if (value < oldVal) this.priceDirection = '▼'
      const time = Math.floor(Date.now() / 1000)
      const data = {
        open: value - 1,
        high: value + 2,
        low: value - 2,
        close: value + 1,
        time,
      }
      this.lineSeries.update(data)
    },
  },
}
</script>

<!-- 

:class="{'price-up': priceDirection === '▲', 'price-down': priceDirection ===
'▼'}

:class="priceDirection === '▲' ? 'price-up' : 'price-down'" 

-->

<template>
  <div class="crypto-container">
    <div class="price-board">
      <h2>Bitcoin (BTC/USDT)</h2>
      <div
        class="current-price"
        :class="priceDirection === '▲' ? 'price-up' : 'price-down'"
      >
        ${{ currentPrice }}
        <span class="direction-arrow">{{ priceDirection }}</span>
      </div>
    </div>

    <div ref="chartContainer" class="chart-box"></div>
  </div>
</template>

<style scoped>
.crypto-container {
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #1e222d;
  padding: 20px;
  border-radius: 8px;
  width: 800px;
  margin: 0 auto;
  color: #ffffff;
}

.price-board {
  margin-bottom: 15px;
}

h2 {
  margin: 0 0 5px 0;
  font-size: 1.2rem;
  color: #848e9c;
}

.current-price {
  font-size: 2.5rem;
  font-weight: bold;
  font-family: monospace;
  transition: color 0.3s ease;
  color: #ffffff;
}

.price-up {
  color: #0ecb81;
}

.price-down {
  color: #f6465d;
}

.direction-arrow {
  font-size: 1.5rem;
  margin-left: 5px;
  vertical-align: middle;
}

.chart-box {
  border-radius: 4px;
  overflow: hidden;
}
</style>
