var AutoComplete = React.createClass({
  getInitialState: function() {
    return {nameStr: ""};
  },

  matchNames: function (event) {
    this.setState({nameStr: event.target.value});

  },

  render: function() {
    // var listNames = this.props.listNames;
    var nameStr = this.state.nameStr;
    var matchedNames = [];
    this.props.namesList.forEach( function(name) {
      if (name.match(nameStr)) {
        matchedNames.push(name);
      }
    });
    return (
      <div classname="auto-complete">
        <h2>Auto Complete</h2>
        <input type="text" value={nameStr} onChange={this.matchNames}/>
        <ul>
          {
            matchedNames.map( function(name, idx) {
              return <li key={idx} >{name}</li>
            })
          }

        </ul>
      </div>
    );
  }
});
