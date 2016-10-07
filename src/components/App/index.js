import React, { Component } from 'react';
import styles from './styles.scss';
import { Input } from 'components';
import NoGame from './NoGame';
import ActiveGame from './ActiveGame';

class App extends Component {
  static propTypes = {};
  static defaultProps = {};

  componentWillMount() {
    this.setState({
      game: null,
    });
  }
  render() {
    const { game } = this.state;
    return (
      <div className={styles.root}>
        {!game
          ? <NoGame
              onGameStart={({ N }) => this.setState({ game: { N } })}
            />
          : <ActiveGame
              game={game}
              onGameClose={() => this.setState({ game: null })}
            />
        }
      </div>
    );
  }
}

export default App;
