<script>
import { getTickerBySymbol } from '@/api/tickerUpdater.js'
import { addSeriesToChart, createCustomChart } from '@/createChart.js'

export default {
  data() {
    return {
      lineSeries: null,
      interval: null,
      currentPrice: null,
      oldPrice: null,
      priceClass: '',
      priceDirection: '',
    }
  },

  async mounted() {
    const chart = createCustomChart(this.$refs.chartContainer)
    this.lineSeries = addSeriesToChart(chart)

    await this.pricePerTick()

    this.interval = setInterval(() => {
      this.pricePerTick()
    }, 15000)
  },
  methods: {
    async pricePerTick() {
      const price = await getTickerBySymbol('BTCUSDT')
      const timestamp = Math.floor(Date.now() / 1000)
      if (this.currentPrice) {
        this.oldPrice = this.currentPrice
        if (price > this.oldPrice) {
          this.priceClass = 'price-up'
          this.priceDirection = '▲'
        }
        if (price < this.oldPrice) {
          this.priceClass = 'price-down'
          this.priceDirection = '▼'
        }
      }
      this.currentPrice = price
      this.lineSeries.update({
        time: timestamp,
        value: price,
      })
    },
  },
}
</script>
<template>
  <div class="crypto-container">
    <div class="price-board">
      <h2>Bitcoin (BTC/USDT)</h2>
      <div class="current-price" :class="priceClass">
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
