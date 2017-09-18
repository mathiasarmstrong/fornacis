import Highcharts from 'highcharts';

export const line = {

  title: {
    text: 'Solar Employment Growth by Sector, 2010-2016'
  },

  subtitle: {
    text: 'Source: thesolarfoundation.com'
  },

  yAxis: {
    title: {
      text: 'Number of Employees'
    }
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle'
  },

  plotOptions: {
    series: {
      pointStart: 2010
    }
  },

  series: [{
    name: 'Installation',
    data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
  }, {
    name: 'Manufacturing',
    data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
  }, {
    name: 'Sales & Distribution',
    data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
  }, {
    name: 'Project Development',
    data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
  }, {
    name: 'Other',
    data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
  }]

};

export const heatmap = {

  chart: {
    type: 'heatmap',
    marginTop: 40,
    marginBottom: 80,
    plotBorderWidth: 1
  },


  title: {
    text: 'Sales per employee per weekday'
  },

  xAxis: {
    categories: ['Alexander', 'Marie', 'Maximilian', 'Sophia', 'Lukas', 'Maria', 'Leon', 'Anna', 'Tim', 'Laura']
  },

  yAxis: {
    categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    title: null
  },

  colorAxis: {
    min: 0,
    minColor: '#FFFFFF',
    maxColor: '#000000'
  },

  legend: {
    align: 'right',
    layout: 'vertical',
    margin: 0,
    verticalAlign: 'top',
    y: 25,
    symbolHeight: 280
  },

  tooltip: {
    formatter() {
      return `<b>${ this.series.xAxis.categories[this.point.x] }</b> sold <br><b>${
        this.point.value }</b> items on <br><b>${ this.series.yAxis.categories[this.point.y] }</b>`;
    }
  },

  series: [{
    name: 'Sales per employee',
    borderWidth: 1,
    data: [[0, 0, 10], [0, 1, 19], [0, 2, 8], [0, 3, 24], [0, 4, 67], [1, 0, 92], [1, 1, 58], [1, 2, 78], [1, 3, 117], [1, 4, 48], [2, 0, 35], [2, 1, 15], [2, 2, 123], [2, 3, 64], [2, 4, 52], [3, 0, 72], [3, 1, 132], [3, 2, 114], [3, 3, 19], [3, 4, 16], [4, 0, 38], [4, 1, 5], [4, 2, 8], [4, 3, 117], [4, 4, 115], [5, 0, 88], [5, 1, 32], [5, 2, 12], [5, 3, 6], [5, 4, 120], [6, 0, 13], [6, 1, 44], [6, 2, 88], [6, 3, 98], [6, 4, 96], [7, 0, 31], [7, 1, 1], [7, 2, 82], [7, 3, 32], [7, 4, 30], [8, 0, 85], [8, 1, 97], [8, 2, 123], [8, 3, 64], [8, 4, 84], [9, 0, 47], [9, 1, 114], [9, 2, 31], [9, 3, 48], [9, 4, 91]],
    dataLabels: {
      enabled: true,
      color: '#000000'
    }
  }]

};

export const stackedBarChart = {
  chart: {
    type: 'column'
  },
  title: {
    text: 'Volume Share'
  },
  xAxis: {
    categories: ['8/25/2017', '8/26/2017', '8/27/2017', '8/28/2017', '8/29/2017', '8/30/2017']
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Total Volume'
    }
  },
  tooltip: {
    pointFormat:
      `<span>
        <span style="color:{series.color};">
        •
        </span>{series.name}
      </span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>`,
    shared: true
  },
  plotOptions: {
    column: {
      stacking: 'percent'
    }
  },
  series: [{
    name: 'Ampush Hubble',
    data: [158, 173, 184, 147, 172, 155],
    color: '#FDBF63'
  }, {
    name: 'Insider Envy',
    data: [23, 16, 23, 28, 22, 22],
    color: '#FED598'
  }]
};
export const stackedGroupedBarChart = {

  chart: {
    type: 'column'
  },

  title: {
    text: 'Total fruit consumtion, grouped by gender'
  },

  xAxis: {
    categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
  },

  yAxis: {
    allowDecimals: false,
    min: 0,
    title: {
      text: 'Number of fruits'
    }
  },

  tooltip: {
    formatter() {
      return `<b>${ this.x }</b><br/>${
        this.series.name }: ${ this.y }<br/>` +
                `Total: ${ this.point.stackTotal}`;
    }
  },

  plotOptions: {
    column: {
      stacking: 'normal'
    }
  },

  series: [{
    name: 'John',
    data: [5, 3, 4, 7, 2],
    stack: 'male'
  }, {
    name: 'Joe',
    data: [3, 4, 4, 2, 5],
    stack: 'male'
  }, {
    name: 'Jane',
    data: [2, 5, 6, 2, 1],
    stack: 'female'
  }, {
    name: 'Janet',
    data: [3, 0, 4, 4, 3],
    stack: 'female'
  }]
};

export const barAndLine = {
  chart: {
    zoomType: 'xy'
  },
  title: {
    text: 'Purchase vs APM'
  },
  subtitle: {
    text: ''
  },
  xAxis: [{
    categories: ['25-Aug-17', '26-Aug-17', '27-Aug-17', '28-Aug-17', '29-Aug-17', '30-Aug-17'],
    crosshair: true
  }],
  yAxis: [{ // Primary yAxis
    labels: {
      style: {
        color: Highcharts.getOptions().colors[0]
      }
    },
    title: {
      text: 'Purchases',
      style: {
        color: Highcharts.getOptions().colors[0]
      }
    }
  }, { // Secondary yAxis
    title: {
      text: 'APM',
      style: {
        color: Highcharts.getOptions().colors[1]
      }
    },
    min: 0,
    labels: {
      style: {
        color: Highcharts.getOptions().colors[1]
      }
    },
    opposite: true
  }],
  tooltip: {
    shared: true
  },
  legend: {
    layout: 'vertical',
    align: 'left',
    x: 50,
    verticalAlign: 'top',
    y: 50,
    floating: true,
    backgroundColor: Highcharts.theme && Highcharts.theme.legendBackgroundColor || '#FFFFFF'
  },
  series: [{
    name: 'Purchases',
    type: 'column',
    data: [181, 189, 207, 175, 194, 177]
  }, {
    name: 'APM',
    type: 'line',
    yAxis: 1,
    data: [18.046, 16.772, 19.153, 16.391, 15.484, 19.732]
  }]
};
