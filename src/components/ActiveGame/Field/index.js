import React, { Component } from 'react';
import styles from './styles.scss';
import classNames from 'classnames';
import update from 'react-addons-update';

type Props = {
  N: number,
  onGameEnd: (winner: 'x' | 'o') => void,
};

type State = {
  field: ['' | 'x' | 'o'],
  activePlayer: 'x' | 'o',
  winChain?: ?[number],
};

class Field extends Component {
  props: Props;
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      field: Array(props.N * props.N).fill(''),
      activePlayer: 'x',
    };
  }

  handleCellClick = (idx: number): void => {
    const { props, state } = this;
    if (state.field[idx] !== '' || state.winChain) return;
    const winChain = getWinChainFromCell(state.activePlayer, idx, state.field, props.N);
    this.setState({
      field: update(state.field, { [idx]: { $set: state.activePlayer } }) ,
      activePlayer: state.activePlayer === 'x' ? 'o' : 'x',
      winChain,
    });
    if (winChain) {
      props.onGameEnd(state.activePlayer);
    }
  };

  render() {
    const { props, state } = this;
    return (
      <div className={styles.root}>
        {!state.winChain && <div className={styles.header}>Ход игрока {state.activePlayer}</div>}
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
                state.winChain ? (state.winChain.includes(idx) ? styles.win : styles.lose) : ''
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

function getWinChainFromCell(activePlayer: 'x' | 'o', cellIdx: number, field: ['' | 'x' | 'o'], N: number): ?[number] {
  const getNextCellIdx = [
    i => i - N - 1, // lt
    i => i - N, // t
    i => i - N + 1, // rt
    i => i + 1, // r
    i => i + N + 1, // br
    i => i + N, // b
    i => i + N - 1, // bl
    i => i - 1 // l
  ];
  for (const f of getNextCellIdx) {
    let i = cellIdx;
    const chain = [i];
    while (field[i = f(i)] === activePlayer) {
      chain.push(i);
      if (chain.length === 5) {
        return chain;
      }
    }

  }
  return null;
}
