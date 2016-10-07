import React, { Component } from 'react';
import styles from './styles.scss';
import { Input } from 'components';
import NoGame from './NoGame';
import ActiveGame from './ActiveGame';

class App extends Component {
  static propTypes = {};
  static defaultProps = {};

  state = {
    game: {
      N: 0,
    },
  };

  render() {
    const { game } = this.state;
    return (
      <div className={styles.root}>
        {game.N === 0
          ? <NoGame
              onGameStart={({ N }) => this.setState({ game: { N } })}
            />
          : <ActiveGame
              game={game}
              onGameClose={() => this.setState({ game: { N: 0 } })}
            />
        }
      </div>
    );
  }
}

export default App;
