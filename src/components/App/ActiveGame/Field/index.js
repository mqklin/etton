import React, { Component, PropTypes } from 'react';
import styles from './styles.scss';
import classNames from 'classnames';

type Props = {
  N: number,
  onGameEnd: () => void,
};

type State = {
  field: ['' | 'x' | 'o'],
};

class Field extends Component {
  props: Props;
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      field: Array(props.N * props.N).fill('\u00A0'),
    };
  }
  render() {
    const { N } = this.props;
    return (
      <div
        className={styles.root}
        style={{
          width: `${N * 50}px`,
          height: `${N * 50}px`,
        }}
      >
        {this.state.field.map((v, idx) => (
          <span
            key={idx}
            className={classNames(
              styles.cell,
              idx % N === 0 ? styles.firstColumn : '' ,
              idx < N ? styles.firstRow : '',
            )}
          >
            {v}
          </span>
        ))}
      </div>
    );
  }
}
export default Field;
