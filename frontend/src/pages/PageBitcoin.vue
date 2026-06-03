<script>
import { wrap } from '@/api/tickerUpdater.js'
import { addSeriesToChart, createCustomChart } from '@/createChart.js'

export default {
  data() {
    return {
      lineSeries: null,
      currentPrice: null,
      priceDirection: '',
    }
  },

  mounted() {
    const chart = createCustomChart(this.$refs.chartContainer)
    this.lineSeries = addSeriesToChart(chart)
    wrap(x => (this.currentPrice = x))
  },

  watch: {
    currentPrice(newVal, oldVal) {
      if (newVal > oldVal) this.priceDirection = '▲'
      if (newVal < oldVal) this.priceDirection = '▼'
      const timestamp = Math.floor(Date.now() / 1000)
      this.lineSeries.update({
        time: timestamp,
        value: newVal,
      })
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
