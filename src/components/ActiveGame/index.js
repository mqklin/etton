import React, { Component } from 'react';
import styles from './styles.scss';
import Field from './Field';
import { Indent, Button } from 'components';

type Props = {
  game: {
    N: number,
  },
  onGameClose: () => void,
};
type State = {
  winner: 'none' | 'x' | 'o',
};

class ActiveGame extends Component {
  props: Props;
  state: State = {
    winner: 'none',
  };

  onGameEnd = (winner: 'x' | 'o') => {
    this.setState({ winner });
  };

  render() {
    const { props, state } = this;
    return (
      <div className={styles.root}>
        <div className={styles.field}>
          <Field
            N={props.game.N}
            onGameEnd={this.onGameEnd}
          />
        </div>
        {state.winner !== 'none' && [
          <Indent
            top={1}
            key="header"
            children={(
              <div className={styles.result}>
                Победил игрок {state.winner}
              </div>
            )}
          />,
          <Indent
            top={1}
            key="close"
            children={(
              <div className={styles.close}>
                <Button
                  text="Закрыть"
                  options={{ type: 'link', colorScheme: 'default' }}
                  onClick={props.onGameClose}
                />
              </div>
            )}
          />
        ]}
      </div>
    );
  }
}

export default ActiveGame;
