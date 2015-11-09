var Tabs = React.createClass({
  getInitialState: function() {
    return {activeIdx: 0};
  },

  setNewActiveContent: function (event) {
    var newActiveIdx = parseInt(event.target.getAttribute("data-idx"));
    this.setState({activeIdx: newActiveIdx});
  },

  render: function() {
    var activeIdx = this.state.activeIdx;
    var activeContent = this.props.content[activeIdx];

    return (
      <div>
        <ul>
          {
            this.props.titles.map( function(title, idx) {
              return (
                <button key={idx}
                  data-idx={idx}
                  onClick={this.setNewActiveContent}>
                  {title}
                </button>
              );
            }.bind(this))
          }
        </ul>

        <article>
          {activeContent}
        </article>
      </div>
    )
  }
});
