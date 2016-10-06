import React, { Component } from 'react';
import styles from './styles.scss';
import Field from './Field';
import Indent from 'components/Indent';
import { Button } from 'components';

class ActiveGame extends Component {
  render() {
    return (
      <div className={styles.art
        }>
        <div className={styles.header}>
          Ход игрока №1
        </div>
        <Indent top={1}>
          <div className={styles.field}>
            <Field/>
          </div>
        </Indent>
        <Indent top={1}>
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
        </Indent>
      </div>
    );
  }
}

export default ActiveGame;
