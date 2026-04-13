<script>
export default {
  data() {
    return {
      coins: [],
      loading: false,
      tokenList: ['SONIC', 'AI16Z', 'AIXBT', 'BOME', 'MEW', 'POPCAT', 'RENDER'],
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    async loadData() {
      this.loading = true
      this.coins = []

      const tokens = this.tokenList.join(',')
      const res = await fetch(`http://localhost:3000?tokens=${tokens}`)
      this.coins = await res.json()

      this.loading = false
    },
    formatPrice(val) {
      if (!val) return '—'
      if (val === 0) return '0.00'
      return val < 0.01 ? val.toFixed(8) : val.toFixed(4)
    },
    getChangeClass(val) {
      if (val > 0) return 'text-success'
      if (val < 0) return 'text-danger'
      return 'text-muted'
    },
  },
}
</script>

<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="text-light mb-0">MEXC Listing Analysis</h2>
        <small class="text-muted">Spot Market Data (USDT)</small>
      </div>
      <button
        @click="loadData"
        :disabled="loading"
        class="btn btn-outline-primary btn-sm"
      >
        {{ loading ? 'Processing...' : 'Refresh MEXC' }}
      </button>
    </div>

    <div class="table-responsive rounded shadow shadow-lg">
      <table class="table table-dark table-hover align-middle mb-0">
        <thead>
          <tr class="text-uppercase small text-muted">
            <th>#</th>
            <th>Coin</th>
            <th>Listing Date</th>
            <th>Listing Price</th>
            <th>3 Days</th>
            <th>33 Days</th>
            <th>Current</th>
            <th class="text-center">Link</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(coin, index) in coins" :key="coin.tokenName">
            <td>{{ index + 1 }}</td>
            <td class="fw-bold text-success">{{ coin.tokenName }}</td>
            <td>{{ new Date(coin.listingTime).toLocaleDateString() }}</td>
            <td class="text-warning">${{ formatPrice(coin.listingPrice) }}</td>

            <td :class="getChangeClass(coin.change3d)">
              <div class="small text-light">
                ${{ formatPrice(coin.price3d) }}
              </div>
              {{ coin.change3d != null ? coin.change3d + '%' : '—' }}
            </td>

            <td :class="getChangeClass(coin.change33d)">
              <div class="small text-light">
                ${{ formatPrice(coin.price33d) }}
              </div>
              {{ coin.change33d != null ? coin.change33d + '%' : '—' }}
            </td>

            <td :class="getChangeClass(coin.changeNow)">
              <div class="small text-light">
                ${{ formatPrice(coin.currentPrice) }}
              </div>
              {{ coin.changeNow != null ? coin.changeNow + '%' : '—' }}
            </td>

            <td class="text-center">
              <a
                :href="coin.chartLink"
                target="_blank"
                class="btn btn-sm btn-outline-secondary"
                >Mexc Chart</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="loading" class="text-center p-4">
      <div class="spinner-border text-success" role="status"></div>
      <div class="mt-2 text-muted small">Reading MEXC orderbook...</div>
    </div>
  </div>
</template>

<style scoped>
.table {
  background-color: #121416;
  font-size: 0.85rem;
}
.text-success {
  color: #00ffa3 !important;
}
.text-danger {
  color: #ff4b5c !important;
}
thead th {
  border-top: none;
  padding: 12px;
}
</style>
