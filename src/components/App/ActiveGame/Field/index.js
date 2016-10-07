import React, { Component, PropTypes } from 'react';
import styles from './styles.scss';

type Props = {
  N: number,
  onGameEnd: () => void,
};

type State = {
  field: ['' | 'x' | 'o'],
};

class Field extends Component {
  static defaultProps = {};
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      field: Array(props.N).fill('\u00A0'),
    };
  }
  render() {
    const { field } = this.state;
    return (
      <div className={styles.root}>
        {field.map((v, idx) => (
          <span
            key={idx}
            className={styles.cell}
          >
            {v}
          </span>
        ))}
      </div>
    );
  }
}
export default Field;
