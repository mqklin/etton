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
  xChains?: [[number]],
  oChains?: [[number]],
  winChain?: [number],
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
    const { props, state } = this;
    if (state.field[idx] !== '') return;
    const activeChains = state.activePlayer === 'first' ? 'xChains' : 'oChains';
    const newChains = updateChains(idx, state[activeChains], props.N);
    this.setState({
      field: update(state.field, { [idx]: { $set: state.activePlayer === 'first' ? 'x' : 'o' } }) ,
      activePlayer: state.activePlayer === 'first' ? 'second' : 'first',
      [activeChains]: newChains,
      winChain: newChains.find(c => c.length === 5),
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


function cellHasNeighbourInThisChain(cellIdx: number, chain: [number], N: number) {
  const cellNeighbours = [
    cellIdx - N - 1, // lt
    cellIdx - N, // t
    cellIdx - N + 1, // tr
    cellIdx + 1, // r
    cellIdx + N + 1, // br
    cellIdx + N, // b
    cellIdx + N - 1, // bl
    cellIdx - 1 // l
  ];
  return chain.some((idx1: number) => cellNeighbours.some((idx2: number) => idx1 === idx2));
};
function updateChains(cellIdx: number, chains?: [[number]], N: number): [[number]] {
  const chainIdx = (chains || []).findIndex((chain: [number]) => cellHasNeighbourInThisChain(cellIdx, chain, N));
  return update(
    chains,
    chainIdx === -1
      ? { $push: [[cellIdx]] }
      : { [chainIdx]: { $push: [cellIdx] } }
  );
}
