export default {
  chart: {
    backgroundColor: null,
    borderWidth: 0,
    type: 'area',
    margin: [2, 0, 2, 0],
    width: 120,
    height: 20,
    style: {
      overflow: 'visible'
    },

    // small optimalization, saves 1-2 ms each sparkline
    skipClone: true
  },
  title: {
    text: ''
  },
  credits: {
    enabled: false
  },
  xAxis: {
    labels: {
      enabled: false
    },
    title: {
      text: null
    },
    startOnTick: false,
    endOnTick: false,
    tickPositions: []
  },
  yAxis: {
    endOnTick: false,
    startOnTick: false,
    labels: {
      enabled: false
    },
    title: {
      text: null
    },
    tickPositions: [0]
  },
  legend: {
    enabled: false
  },
  tooltip: {
    backgroundColor: 'white',
    borderWidth: 1,
    hideDelay: 0,
    shared: true,
    padding: 8,
    borderColor: 'silver',
    borderRadius: 3,
    positioner(w, h, point) {
      return {x: point.plotX - w / 2, y: point.plotY - h};
    }
  },
  plotOptions: {
    series: {
      animation: false,
      lineWidth: 1,
      shadow: false,
      states: {
        hover: {
          lineWidth: 1
        }
      },
      marker: {
        radius: 1,
        states: {
          hover: {
            radius: 2
          }
        }
      },
      fillOpacity: 0.25
    },
    column: {
      negativeColor: '#910000',
      borderColor: 'silver'
    }
  },

  series: [{
    data: [1, 2, 3]
  }]
};
