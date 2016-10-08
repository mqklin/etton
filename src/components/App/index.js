import React, { Component } from 'react';
import styles from './styles.scss';
import { Input } from 'components';
import NoGame from './NoGame';
import ActiveGame from './ActiveGame';

type State = {
  game: {
    N: number,
  },
};

class App extends Component {
  state: State = {
    game: {
      N: 0,
    },
  };

  render() {
    const { state } = this;
    return (
      <div className={styles.root}>
        {state.game.N === 0
          ? <NoGame
              onGameStart={(N: number) => this.setState({ game: { N } })}
            />
          : <ActiveGame
              game={state.game}
              onGameClose={() => this.setState({ game: { N: 0 } })}
            />
        }
      </div>
    );
  }
}

export default App;
