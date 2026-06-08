<script>
import TokenChart from '@/components/TokenChart.vue'
import { getAllTokens } from '../api/tickerUpdater.js'

export default {
  components: { TokenChart },
  data() {
    return {
      selectedSymbol: '',
      coins: [],
      isLoading: true,
    }
  },

  mounted() {
    this.fetchAllUsdtPairs()
  },

  methods: {
    async fetchAllUsdtPairs() {
      this.isLoading = true
      this.coins = await getAllTokens()
      const hasBitcoin = this.coins.some(c => c.value === 'BTCUSDT')
      this.selectedSymbol = hasBitcoin ? 'BTCUSDT' : this.coins[0]?.value || ''
      this.isLoading = false
    },
  },
}
</script>

<template>
  <div class="selector-page">
    <div class="controls">
      <label for="coin-select">Select Coin: </label>

      <select
        id="coin-select"
        v-model="selectedSymbol"
        class="crypto-select"
        :disabled="isLoading"
      >
        <option v-if="isLoading" value="">Загрузка списка монет...</option>

        <option v-for="coin in coins" :key="coin.value" :value="coin.value">
          {{ coin.name }}
        </option>
      </select>
    </div>

    <TokenChart v-if="selectedSymbol && !isLoading" :symbol="selectedSymbol" />
  </div>
</template>

<style scoped>
.selector-page {
  padding: 30px;
  font-family: sans-serif;
  max-width: 800px;
  margin: 0 auto;
}
.controls {
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
label {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}
.crypto-select {
  width: 100%;
  max-width: 400px;
  padding: 14px 20px;
  font-size: 18px;
  font-weight: 500;
  color: #2c3e50;
  background-color: #f8f9fa;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;
}
.crypto-select:hover:not(:disabled) {
  border-color: #cbd5e1;
}
.crypto-select:focus {
  border-color: #3b82f6;
  background-color: #fff;
}
.crypto-select:disabled {
  background-color: #e2e8f0;
  cursor: not-allowed;
  color: #a0aec0;
}
</style>
