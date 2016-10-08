import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './styles.scss';
import update from 'react-addons-update';
import { Indent, Button } from 'components';

type Props = {
  game: {
    N: number,
    activePlayer: 'x' | 'o',
    field: ['' | 'x' | 'o'],
    winChain: ?[number],
  },
  onGameClose: () => void,
};

type State = {
  activePlayer: 'x' | 'o',
  field: ['' | 'x' | 'o'],
  winChain: ?[number],
};

class ActiveGame extends Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      activePlayer: props.game.activePlayer,
      field: props.game.field,
      winChain: props.game.winChain,
    };
  }

  handleCellClick = (idx: number): void => {
    const { props, state } = this;
    if (state.field[idx] !== '' || state.winChain) return;
    const winChain = getWinChainFromCell(state.activePlayer, idx, state.field, props.game.N);
    const newState = {
      field: update(state.field, { [idx]: { $set: state.activePlayer } }) ,
      activePlayer: state.activePlayer === 'x' ? 'o' : 'x',
      winChain,
    };
    this.setState(newState);
    localStorage.setItem('game', JSON.stringify({
      N: props.game.N,
      ...newState,
    }));
  };

  render() {
    const { props, state } = this;
    return (
      <div className={styles.root}>
        <Indent
          bottom={1}
          children={(
            <div
              className={styles.header}
            >
              {state.winChain ? `Победил игрок ${state.field[state.winChain[0]]}` : `Ход игрока ${state.activePlayer}`}
            </div>
          )}
        />
        <div
          className={styles.field}
          style={{
            width: `${props.game.N * 50}px`,
            height: `${props.game.N * 50}px`,
          }}
        >
          {state.field.map((v, idx) => (
            <span
              key={idx}
              className={classNames(
                styles.cell,
                state.field[idx] !== '' ? styles.dirty : '',
                idx % props.game.N === 0 ? styles.firstColumn : '' ,
                idx < props.game.N ? styles.firstRow : '',
                state.winChain ? (state.winChain.includes(idx) ? styles.win : styles.lose) : ''
              )}
              onClick={() => this.handleCellClick(idx)}
            >
              {v || '\u00A0'}
            </span>
          ))}
        </div>
        <Indent
          top={1}
          children={(
            <Button
              text="Закрыть"
              options={{ type: 'link', colorScheme: 'default' }}
              onClick={props.onGameClose}
            />
          )}
        />
      </div>
    );
  }
}

export default ActiveGame;

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
