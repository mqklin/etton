import React, { Component } from 'react';
import styles from './styles.scss';
import { Input } from 'components';
import NoGame from './NoGame';
import ActiveGame from './ActiveGame';

class App extends Component {
  componentWillMount() {
    this.setState({
      game: null,
    });
  }d
  render() {
    const { game } = this.state;
    return (
      <div className={styles.root}>
        {game
          ? <NoGame onGameStart={({ N }) => this.setState({ game: { N } })}/>
          : <ActiveGame game={game}/>
        }
      </div>
    );
  }
}

export default App;
