Highcharts.setOptions({
  chart: {
      style: {
          fontFamily: 'D-DIN Regular',
          color: "#F5F5F5"
      },
      backgroundColor: "#152238"

  },
  title: {
    style: {
       color: '#F5F5F5',
       font: 'bold 16px D-DIN Regular'
    }
  },
  plotOptions: {
    pie: {
      dataLabels: {
        color: "F5F5F5",
        style: { fontFamily: '\'D-DIN Regular\'', textShadow: false, textOutline: false }
      }
    }
  },
})

Highcharts.chart('nft_distribution_chart', {
    credits: {
        enabled: false
    },
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Distribution of 10,000 Unique The Bear Necessities NFTs'
    },
    tooltip: {
      pointFormat: '{point.percentage}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        showInLegend: false,
        cursor: 'pointer'
      }
    },
    series: [{
      name: 'Allocations',
      colorByPoint: true,
      data: [{
        name: 'Public Mint',
        y: 9500
      }, {
        name: 'Pre-Sale',
        y: 400
      }, {
        name: 'Giveaways',
        sliced: true,
        selected: true,
        y: 50
      }, {
        name: 'Team',
        y: 50
      }]
    }]
  });

  Highcharts.chart('proceed_distribution_chart', {
    credits: {
        enabled: false
    },
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
      
    },
    title: {
      text: 'Distribution of Proceeds'
    },
    tooltip: {
      pointFormat: '{point.percentage}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        showInLegend: false,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage}%'
        }
      }
    },
    series: [{
      name: 'Allocations',
      colorByPoint: true,
      data: [{
        name: 'Charity',
        y: 15
      }, {
        name: 'Community',
        y: 10,
        sliced: true,
        selected: true
      }, {
        name: 'Team',
        y: 75
      }]
    }]
  });

  