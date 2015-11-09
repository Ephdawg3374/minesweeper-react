var MinesweeperUI = React.createClass({

  getInitialState: function (){
    return {
        board: new Minesweeper.Board(
          this.props.gridSize,
          this.props.numBombs
        ),
        isBoardWon: false,
        isGameOver: false
    };
  },

  resetBoard: function() {
    this.setState({
      board: new Minesweeper.Board(
        this.props.gridSize,
        this.props.numBombs
      ),
      isBoardWon: false,
      isGameOver: false
    });
  },

  updateGame: function (tile, revealed) {
    if (revealed) {
      tile.explore();
    } else {
      tile.toggleFlag();
    }

    this.setState({
      isGameOver : this.state.board.lost(),
      isBoardWon : this.state.board.won()
    });

    if (this.state.isBoardWon || this.state.isGameOver ) {
      if (this.state.isBoardWon) {
        alert("Won!");
      } else if (this.state.isGameOver) {
        alert("Dead!");
      }
      this.resetBoard();
    }

  },

  render: function () {
    return (
      <MinesweeperBoard
        board={this.state.board}
        updateGame={this.updateGame}
      />
    );
  }

});

var MinesweeperBoard = React.createClass({

  // getInitialState: function () {
  //
  // },

  render: function() {
    var thisComponent = this;

    return (
      <div>
        {
          thisComponent.props.board.grid.map( function (row, rowIdx) {
            return (
              <div className="row group" key={rowIdx}>
              {
                row.map( function (tile, colIdx) {
                  var pos = [rowIdx, colIdx];
                  var tile = thisComponent.props.board.grid[rowIdx][colIdx];
                  var tileKey = pos.toString();
                  return (
                    <MinesweeperTile
                      gameTile={tile}
                      updateGame={thisComponent.props.updateGame}
                      key={tileKey}
                    />
                  );
                })
              }
              </div>
            )
          })
        }
      </div>
    )
  }
});

var MinesweeperTile = React.createClass({

  handleClick: function (event) {
    this.props.updateGame(this.props.gameTile, !event.altKey);
  },

  render: function () {
    var tileStr = "";
    var classStr = "tile ";

    if (this.props.gameTile.bombed && this.props.gameTile.explored) {
      tileStr = "💩";
      classStr += "bombed";
    } else if (this.props.gameTile.flagged) {
      tileStr = "\u2691";
      classStr += "flagged";
    } else if (this.props.gameTile.explored) {
      if (this.props.gameTile.adjacentBombCount() > 0) {
        tileStr = this.props.gameTile.adjacentBombCount();
      } else {
        tileStr = " ";
      }
      classStr += "explored";
    }

    return (
      <div className={classStr} onClick={this.handleClick}>
        <p>{tileStr}</p>
      </div>
    )
  }
});

React.render(<MinesweeperUI gridSize={15} numBombs={25} />,
    document.getElementById('minesweeper'));
