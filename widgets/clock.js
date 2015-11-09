var Clock = React.createClass({
  getInitialState: function () {
    return {date: new Date()};
  },

  increment: function () {
    this.setState({date: new Date()});

  },

  componentDidMount: function () {
    this.intervalId = setInterval(this.increment, 500);
  },

  componentWillUnmount: function () {
    clearInterval(this.intervalId);
    this.intervalId = 0;
  },

  render: function () {
    var date = this.state.date;
    return (
      <h3>{date.toString()}</h3>
    );
  }

});
