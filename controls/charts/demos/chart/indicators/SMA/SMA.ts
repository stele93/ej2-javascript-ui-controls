/**
 * SMA Indicator
 */
import { Chart, CandleSeries, Category, LineSeries, Tooltip, Crosshair, Legend, DateTime } from '../../../../src/chart/index';
import { SmaIndicator } from '../../../../src/chart/technical-indicators/sma-indicator';
Chart.Inject(CandleSeries, LineSeries, Category, Tooltip, Crosshair, SmaIndicator, Legend, DateTime);
import { chartData } from '../indicatordata';

let chart: Chart = new Chart({
    primaryXAxis: {
        title: 'Months',
        valueType: 'DateTime',
        intervalType: 'Months'
    },
    primaryYAxis: {
        title: 'Price (Million Dollars)',
        minimum: 30, maximum: 180, interval: 30,
        majorGridLines: { width: 0 }
    },
    axes: [{ name: 'secondary', minimum: 50, maximum: 160, interval: 15, opposedPosition: true }],
    series: [{
        dataSource: chartData, width: 2,
        xName: 'x', yName: 'y', low: 'low', high: 'high', close: 'close', volume: 'volume', open: 'open',
        name: 'Apple Inc',
        //Series type as RangeColumn
        type: 'Candle', animation: { enable: true }
    }],
    indicators: [{
        type: 'Sma', field: 'Close', seriesName: 'Apple Inc', fill: 'blue',
        period: 3, animation: { enable: true }
    }],
    tooltip: {
        enable: true, shared: true,
    },
    crosshair: { enable: true },
    title: 'Online trading'
}, '#container');
