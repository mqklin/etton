import React, { Component, PropTypes } from 'react';
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
  winner: 'none' | 'first' | 'second',
};

class ActiveGame extends Component {
  props: Props;
  state: State;
  state = {
    winner: 'none',
  };

  render() {
    const { game } = this.props;
    const { winner } = this.state;
    return (
      <div className={styles.root}>
        <div className={styles.field}>
          <Field
            N={game.N}
            onGameEnd={(winner: 'first' | 'second') => this.setState({ winner })}
          />
        </div>
        {winner !== 'none' && [
          <Indent top={1} key="header">
            <div className={styles.result}>
              Победил игрок №{}
            </div>
          </Indent>,
          <Indent top={1} key="close">
            <div className={styles.close}>
              <Button
                text="Закрыть"
                type={{
                  value: 'link',
                  options: {
                    colorScheme: 'default',
                  },
                }}
                onClick={this.props.onGameClose}
              />
            </div>
          </Indent>
        ]}
      </div>
    );
  }
}

export default ActiveGame;
