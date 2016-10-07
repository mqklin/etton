import React, { Component, PropTypes } from 'react';
import styles from './styles.scss';
import classNames from 'classnames';
import update from 'react-addons-update';

type Props = {
  N: number,
  onGameEnd: (winner: 'first' | 'second') => void,
};

type State = {
  field: ['' | 'x' | 'o'],
  activePlayer: 'first' | 'second',
};

class Field extends Component {
  props: Props;
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      field: Array(props.N * props.N).fill(''),
      activePlayer: 'first',
    };
  }

  handleCellClick = (idx: number): void => {
    const { field, activePlayer } = this.state;
    if (field[idx] !== '') return;
    this.setState({
      field: update(field, { [idx]: { $set: activePlayer === 'first' ? 'x' : 'o' } }) ,
      activePlayer: activePlayer === 'first' ? 'second' : 'first',
    });
  };

  render() {
    const { field, activePlayer } = this.state;
    const { N } = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.header}>Ход игрока №{activePlayer === 'first' ? 1 : 2}</div>
        <div
          className={styles.field}
          style={{
            width: `${N * 50}px`,
            height: `${N * 50}px`,
          }}
          >
          {field.map((v, idx) => (
            <span
              key={idx}
              className={classNames(
                styles.cell,
                field[idx] !== '' ? styles.dirty : '',
                idx % N === 0 ? styles.firstColumn : '' ,
                idx < N ? styles.firstRow : '',
              )}
              onClick={() => this.handleCellClick(idx)}
              >
              {v || '\u00A0'}
              </span>
            ))}
            </div>
      </div>
    );
  }
}
export default Field;
