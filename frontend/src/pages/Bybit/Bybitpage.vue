<script>
import { fetchMexcListings } from '@/api/apiMexc'

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
      try {
        this.coins = await fetchMexcListings(this.tokenList)
      } catch (err) {
        console.error('Load error:', err)
      } finally {
        this.loading = false
      }
    },
    formatPrice(val) {
      if (!val) return '0.00'
      return val < 0.01 ? val.toFixed(8) : val.toFixed(4)
    },
    getTrendClass(val) {
      if (!val) return 'trend-neutral'
      return val > 0 ? 'trend-up' : 'trend-down'
    },
  },
}
</script>
<template>
  <div class="mexc-dashboard">
    <header class="dashboard-header">
      <div class="header-main">
        <h1 class="title">MEXC Analytics</h1>
        <div class="status">
          <span class="status-dot"></span>
          <span class="status-text">Live Market</span>
        </div>
      </div>
      <button class="refresh-button" @click="loadData" :disabled="loading">
        <span v-if="loading" class="loader-sm"></span>
        {{ loading ? 'Syncing...' : 'Refresh' }}
      </button>
    </header>

    <div class="table-container">
      <table class="mexc-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Asset</th>
            <th>Listing Date</th>
            <th>Listing Price</th>
            <th>3D Change</th>
            <th>33D Change</th>
            <th>Current Price</th>
            <th class="text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(coin, index) in coins" :key="coin.tokenName">
            <td class="col-index">{{ index + 1 }}</td>
            <td class="col-asset">
              <span class="symbol">{{ coin.tokenName }}</span>
              <span class="pair">/USDT</span>
            </td>
            <td>{{ formatDate(coin.listingTime) }}</td>
            <td class="price">${{ formatPrice(coin.listingPrice) }}</td>

            <td>
              <div class="price-stack">
                <span class="secondary-price"
                  >${{ formatPrice(coin.price3d) }}</span
                >
                <span :class="['badge', getTrendClass(coin.change3d)]">
                  {{ formatPercent(coin.change3d) }}
                </span>
              </div>
            </td>

            <td>
              <div class="price-stack">
                <span class="secondary-price"
                  >${{ formatPrice(coin.price33d) }}</span
                >
                <span :class="['badge', getTrendClass(coin.change33d)]">
                  {{ formatPercent(coin.change33d) }}
                </span>
              </div>
            </td>

            <td>
              <div class="price-stack">
                <span class="main-price"
                  >${{ formatPrice(coin.currentPrice) }}</span
                >
                <span :class="['badge', getTrendClass(coin.changeNow)]">
                  {{ formatPercent(coin.changeNow) }}
                </span>
              </div>
            </td>

            <td class="text-right">
              <a :target="_blank" :href="coin.chartLink" class="btn-link"
                >View Chart</a
              >
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="loading && coins.length === 0" class="state-container">
        <div class="loader-lg"></div>
        <p>Fetching data from MEXC...</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Переменные */
:offset {
  --bg-main: #0b0e11;
  --bg-card: #181a20;
  --bg-hover: #1e2329;
  --text-main: #eaecef;
  --text-muted: #848e9c;
  --accent: #f0b90b;
  --green: #2ebd85;
  --red: #f6465d;
  --border: #2b3139;
}

.mexc-dashboard {
  background-color: #0b0e11;
  color: #eaecef;
  min-height: 100vh;
  padding: 2rem;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Header Styles */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto 2rem auto;
}

.title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(to right, #f0b90b, #f8d33a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.status {
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #2ebd85;
  border-radius: 50%;
  margin-right: 8px;
  box-shadow: 0 0 10px #2ebd85;
}

.status-text {
  font-size: 0.8rem;
  color: #848e9c;
}

/* Refresh Button */
.refresh-button {
  background-color: #f0b90b;
  color: #000;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: opacity 0.2s;
}

.refresh-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Table Styles */
.table-container {
  background-color: #181a20;
  border-radius: 8px;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  border: 1px solid #2b3139;
}

.mexc-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.mexc-table th {
  background-color: #1e2329;
  padding: 1rem;
  font-size: 0.75rem;
  color: #848e9c;
  text-transform: uppercase;
  border-bottom: 1px solid #2b3139;
}

.mexc-table td {
  padding: 1rem;
  border-bottom: 1px solid #2b3139;
  vertical-align: middle;
}

.mexc-table tr:hover {
  background-color: #1e2329;
}

.symbol {
  font-weight: 700;
  color: #fff;
  font-size: 1.1rem;
}
.pair {
  color: #848e9c;
  font-size: 0.8rem;
}

.price-stack {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.secondary-price {
  font-size: 0.9rem;
  color: #eaecef;
}
.main-price {
  font-size: 1rem;
  font-weight: 700;
  color: #2ebd85;
}

/* Badges */
.badge {
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
  width: fit-content;
  font-weight: 600;
}

.badge.up {
  background: rgba(46, 189, 133, 0.15);
  color: #2ebd85;
}
.badge.down {
  background: rgba(246, 70, 93, 0.15);
  color: #f6465d;
}
.badge.neutral {
  background: rgba(132, 142, 156, 0.1);
  color: #848e9c;
}

.btn-link {
  color: #f0b90b;
  text-decoration: none;
  font-size: 0.85rem;
  border: 1px solid #f0b90b;
  padding: 4px 10px;
  border-radius: 4px;
}

.btn-link:hover {
  background: rgba(240, 185, 11, 0.1);
}

.text-right {
  text-align: right;
}

/* Loaders */
.loader-sm {
  width: 14px;
  height: 14px;
  border: 2px solid #000;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  animation: rotation 1s linear infinite;
  margin-right: 8px;
}

.state-container {
  padding: 4rem;
  text-align: center;
  color: #848e9c;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
