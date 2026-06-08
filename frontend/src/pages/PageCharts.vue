<script>
import TokenChart from '@/components/ChartWidget.vue'
import { getSymbolsAll } from '../api/tickerUpdater.js'

export default {
  components: { TokenChart },
  data() {
    return {
      selectedSymbol: 'BTCUSDT',
      availableSymbols: [],
      isLoading: true,
      quoteAsset: 'USDT',
    }
  },

  mounted() {
    this.getSymbolsAll()
  },

  watch: {
    availableSymbols(newVal) {
      //
    },
  },

  methods: {
    async getSymbolsAll() {
      this.isLoading = true
      this.availableSymbols = await getSymbolsAll()
      this.isLoading = false
      // this.firstSorting()
    },

    firstSorting() {
      const findedIndex = this.availableSymbols.findIndex(c => c === 'BTCUSDT')
      if (findedIndex === -1) return
      this.selectedSymbol = this.availableSymbols.splice(1, findedIndex)
      this.availableSymbols.unshift(this.selectedSymbol)
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

        <option
          v-for="symbol of availableSymbols"
          :key="symbol"
          :value="symbol"
        >
          {{ symbol.replace(quoteAsset, '') + ' / ' + quoteAsset }}
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
