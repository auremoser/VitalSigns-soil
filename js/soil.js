var categories = [],
    acidifiedCarbonSeries = [],
    totalCarbonSeries = [],
    totalNitrogenSeries = [];

var options = {
    colors: [
        // colors taken from the palette on this site: http://vitalsigns.org/
         '#FFCC33', '#4E733D', '#C04420', '#6E9962', '#9DCBDA', '#FBD8DB', '#fc8d59'
    ],
	title: {
        text: 'Soil Data'
    },
    chart: {
        renderTo: 'container',
        defaultSeriesType: 'bar',
    },
    xAxis: {
        categories: [],
        title: {
            text: 'Plot Treatment'
        },
    },
    yAxis: {
        title: {
            text: 'Percentage'
        },
        opposite: true
    },
    tooltip: {
        valueSuffix: '%'
    },
    series: [],
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 100,
        floating: true,
        borderWidth: 1,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor || '#FFFFFF'),
        shadow: true
    }
};

$.get('data/soil_data/soil-carbon-nitrogen-lab-tests.csv', function(data) {

    var lines = data.split('\n');

    $.each(lines, function(lineNo, line) {
        var items = line.split(',');

        if (lineNo > 0) {
            categories.push(items[3]);
            acidifiedCarbonSeries.push(parseFloat(items[9]));
            totalCarbonSeries.push(parseFloat(items[10]));
            totalNitrogenSeries.push(parseFloat(items[11]));
        }
    });

    options.xAxis.categories = categories;
    options.series = [{
        name: 'Acidified Carbon',
        data: acidifiedCarbonSeries
    }, {
        name: 'Total Carbon',
        data: totalCarbonSeries
    }, {
        name: 'Total Nitrogen',
        data: totalNitrogenSeries
    }];

    var chart = new Highcharts.Chart(options);

});