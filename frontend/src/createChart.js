import {
  createChart,
  AreaSeries,
  LineSeries,
  CandlestickSeries,
} from 'lightweight-charts'

export function createCustomChart(el) {
  return createChart(el, {
    width: 800,
    height: 350,
    layout: {
      background: { color: '#131722' },
      textColor: '#d1d4dc',
    },
    grid: {
      vertLines: { color: 'rgba(42, 46, 57, 0.5)' },
      horzLines: { color: 'rgba(42, 46, 57, 0.5)' },
    },
    timeScale: {
      timeVisible: true,
      secondsVisible: true,
    },
  })
}

export function addSeriesToChart(chart) {
  const candlestickSeries = chart.addSeries(CandlestickSeries, {
    upColor: '#26a69a',
    downColor: '#ef5350',
    borderVisible: false,
    wickUpColor: '#26a69a',
    wickDownColor: '#ef5350',
  })

  // candlestickSeries.setData(data)

  return candlestickSeries

  return chart.addSeries(LineSeries, { color: '#2962FF' })

  return chart.addSeries(AreaSeries, {
    lineColor: '#2962FF',
    topColor: 'rgba(41, 98, 255, 0.9)',
    // topColor: 'rgba(41, 98, 255, 0.3)',
    bottomColor: 'rgba(41, 98, 255, 0.0)',
    lineWidth: 3,
  })
}
