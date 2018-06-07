$(function() {

    var map = L.map('map').setView([51.505, -0.09], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    L.marker([51.5, -0.09]).addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();



    var mapstamen = L.map('mapstamen').setView([51.505, -0.09], 12);
    var Stamen_Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: 'abcd',
        minZoom: 1,
        maxZoom: 16,
        ext: 'png'
    }).addTo(mapstamen);

    var times = function(n) {
        return Array.apply(null, new Array(n));
      };
      
      var data = times(52).map(Math.random).reduce(function(data, rnd, index) {
        data.labels.push(index + 1);
        data.series.forEach(function(series) {
          series.push(Math.random() * 100)
        });
      
        return data;
      }, {
        labels: [],
        series: times(4).map(function() { return new Array() })
      });
      
      var options = {
        showLine: false,
        axisX: {
          labelInterpolationFnc: function(value, index) {
            return index % 13 === 0 ? 'W' + value : null;
          }
        }
      };
      
      var responsiveOptions = [
        ['screen and (min-width: 640px)', {
          axisX: {
            labelInterpolationFnc: function(value, index) {
              return index % 4 === 0 ? 'W' + value : null;
            }
          }
        }]
      ];
      
      new Chartist.Line('.ct-chart', data, options, responsiveOptions);
})

