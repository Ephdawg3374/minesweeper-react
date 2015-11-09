var Weather = React.createClass({
  getInitialState: function () {
    return {
      weather: ""
    };
  },

  componentDidMount: function () {
    var thisComponent = this;

    var weatherRequest = function (pos) {
      // currentPos = pos;
      var longitude = pos.coords.longitude;
      var latitude = pos.coords.latitude;

      var xmlhttp;

          if (window.XMLHttpRequest) {
              // code for IE7+, Firefox, Chrome, Opera, Safari
              xmlhttp = new XMLHttpRequest();
          } else {
              // code for IE6, IE5
              xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
          }

          xmlhttp.onreadystatechange = function() {
              if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
                 if(xmlhttp.status == 200){
                    //  weatherResponse = xmlhttp.responseText;
                    thisComponent.setState({weather: xmlhttp.responseText});
                 }
                 else if(xmlhttp.status == 400) {
                    alert('There was an error 400');
                 }
                 else {
                     alert('something else other than 200 was returned');
                 }
              }
          };
          var urlStr = "http://api.openweathermap.org/data/2.5/weather?lat=" +
                        latitude + "&lon=" + longitude +
                        "&APPID=0bb014204cbf72f53128fa312c0aebf0";
          xmlhttp.open("GET", urlStr, true);
          xmlhttp.send();
        };
    setTimeout(function () {
      navigator.geolocation.getCurrentPosition(weatherRequest);
      // console.log(weatherResponse)
      // this.setState({weather: weatherResponse});
    }, 0);
  },

  componentWillUnmount: function () {

  },

  render: function () {
    // var weather = this.state.weather;
    // console.log(this.state.weather)
    return (
      <p>{this.state.weather}</p>
    );
  }
});
