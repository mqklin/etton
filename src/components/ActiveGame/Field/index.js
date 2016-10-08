import React, { Component } from 'react';
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
    const { state } = this;
    if (state.field[idx] !== '') return;
    this.setState({
      field: update(state.field, { [idx]: { $set: state.activePlayer === 'first' ? 'x' : 'o' } }) ,
      activePlayer: state.activePlayer === 'first' ? 'second' : 'first',
    });
  };

  render() {
    const { props, state } = this;
    return (
      <div className={styles.root}>
        <div className={styles.header}>Ход игрока №{state.activePlayer === 'first' ? 1 : 2}</div>
        <div
          className={styles.field}
          style={{
            width: `${props.N * 50}px`,
            height: `${props.N * 50}px`,
          }}
          >
          {state.field.map((v, idx) => (
            <span
              key={idx}
              className={classNames(
                styles.cell,
                state.field[idx] !== '' ? styles.dirty : '',
                idx % props.N === 0 ? styles.firstColumn : '' ,
                idx < props.N ? styles.firstRow : '',
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
