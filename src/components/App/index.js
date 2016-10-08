import React, { Component } from 'react';
import styles from './styles.scss';
import { ActiveGame, NoGame } from 'components';

type Props = {};
type State = {
  game: ?{
    N: number,
    activePlayer: 'x' | 'o',
    field: ['' | 'x' | 'o'],
    winChain: ?[number],
  },
};

class App extends Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    const game = localStorage.getItem('game');
    this.state = {
      game: game ? JSON.parse(game) : null,
    };
  }

  startGame = (N: number) => {
    const newState = {
      game: {
        N,
        activePlayer: 'x',
        field: Array(N * N).fill(''),
        winChain: null,
      },
    };
    localStorage.setItem('game', JSON.stringify(newState.game));
    this.setState(newState);
  };

  render() {
    const { state } = this;
    return (
      <div className={styles.root}>
        {state.game === null
          ? <NoGame
              onGameStart={this.startGame}
            />
          : <ActiveGame
              game={state.game}
              onGameClose={() => this.setState({ game: null })}
            />
        }
      </div>
    );
  }
}

export default App;
