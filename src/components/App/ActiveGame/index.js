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

class ActiveGame extends Component {
  props: Props;

  render() {
    const { game } = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.header}>
          Ход игрока №1
        </div>
        <Indent top={1}>
          <div className={styles.field}>
            <Field
              N={game.N}
            />
          </div>
        </Indent>
        {/* <Indent top={1}>
          <div className={styles.result}>
            Победил игрок №
          </div>
        </Indent>
        <Indent top={1}>
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
        </Indent> */}
      </div>
    );
  }
}

export default ActiveGame;
