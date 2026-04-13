<script>
// import { getListingData } from '../functions/analyzeTokenBybit'

export default {
  data() {
    return {
      coins: [],
      loading: false,
      tokenList: [
        'SONIC',
        'AI16Z',
        'AIXBT',
        'JAMBO',
        'GPS',
        'SOLV',
        'PLUME',
        'N3',
        'ANIME',
        'PINEYE',
        'BERA',
        'AVL',
        'B3',
        'DIAM',
        'IP',
        'G7',
        'OM',
        'ROAM',
        'RED',
        'BMT',
        'AMI',
        'WAL',
        'PARTI',
        'CORN',
        'KILO',
        'PUMP',
        'BABY1',
        'XAUT',
        'FHE',
        'WCT',
        'VET',
        'VTHO',
        'EPT',
        'Hyper',
        'INIT',
        'CAMP',
        'AVNT',
        'HOLO',
        'ZKC',
        'XAN',
        'MET',
        'EAT',
      ],
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    async loadData() {
      this.loading = true
      this.coins = []
      await getListingData(this.tokenList, updatedList => {
        this.coins = updatedList
      })

      this.loading = false
    },
    formatPrice(val) {
      if (!val) return '—'
      return val < 1 ? val.toFixed(6) : val.toFixed(2)
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
      <h2 class="text-light">Listing Analysis</h2>
      <button
        @click="loadData"
        :disabled="loading"
        class="btn btn-outline-primary btn-sm"
      >
        {{ loading ? 'Processing...' : 'Refresh Data' }}
      </button>
    </div>

    <div class="table-responsive rounded shadow shadow-lg">
      <table class="table table-dark table-hover align-middle mb-0">
        <thead>
          <tr class="text-uppercase small text-muted">
            <th>#</th>
            <th>Coin</th>
            <th>Listing Date</th>
            <th>Base Price</th>
            <th>3 Days</th>
            <th>33 Days</th>
            <th>Current</th>
            <th class="text-center">Bybit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(coin, index) in coins" :key="coin.tokenName">
            <td>{{ index + 1 }}</td>
            <td class="fw-bold text-info">{{ coin.tokenName }}</td>
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
                class="btn btn-sm btn-dark border-secondary"
                >Chart</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="loading" class="text-center p-4">
      <div class="spinner-grow text-primary" role="status"></div>
      <div class="mt-2 text-muted small">Fetching next token...</div>
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
