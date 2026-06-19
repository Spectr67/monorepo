<script>
import ChartWidget from '@/components/ChartWidget.vue'
import { getSymbolsAll } from '../api/tickerUpdater.js'

export default {
  components: { ChartWidget },
  data() {
    return {
      selectedSymbol: 'BTCUSDT',
      availableSymbols: [],
      isLoading: true,
      intervals: [
        { value: '1s', label: '1 second' },

        { value: '1m', label: '1 minute' },
        { value: '5m', label: '5 minutes' },
        { value: '15m', label: '15 minutes' },
        { value: '30m', label: '30 minutes' },
        { value: '1h', label: '1 hour' },
        { value: '2h', label: '2 hours' },
        { value: '4h', label: '4 hours' },
        { value: '1d', label: '1 day' },
      ],
      selectedInterval: '1s',
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
      this.firstSorting()
    },

    firstSorting() {
      const findedIndex = this.availableSymbols.findIndex(c => c === 'BTCUSDT')
      if (findedIndex === -1) return
      const [selectedSymbol] = this.availableSymbols.splice(findedIndex, 1)
      this.availableSymbols.unshift(selectedSymbol)
      this.selectedSymbol = selectedSymbol
    },
  },
}
</script>

<template>
  <div class="selector-page">
    <div class="controls">
      <label for="coin-select">Select Coin:</label>
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
          {{ symbol.replace('USDT', '') + ' / ' + 'USDT' }}
        </option>
      </select>

      <label for="interval-select" style="margin-left: 15px">Interval:</label>
      <select
        id="interval-select"
        v-model="selectedInterval"
        class="crypto-select"
        :disabled="isLoading"
      >
        <option v-for="int in intervals" :key="int.value" :value="int.value">
          {{ int.label }}
        </option>
      </select>
    </div>

    <ChartWidget
      v-if="selectedSymbol && !isLoading"
      :symbol="selectedSymbol"
      :interval="selectedInterval"
    />
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
