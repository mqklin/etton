import React, { Component, PropTypes } from 'react';
import styles from './styles.scss';
import Field from './Field';
import { Indent, Button } from 'components';

class ActiveGame extends Component {
  static propTypes = {
    game: PropTypes.shape({
      N: PropTypes.number.isRequried,
    }).isRequried,
    onGameClose: PropTypes.func.isRequried,
  };
  static defaultProps = {};
  render() {
    return (
      <div className={styles.root}>
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
