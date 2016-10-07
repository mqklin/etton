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
      field: Array(props.N).fill(''),
    };
  }
  render() {
    const { field } = this.state;
    return (
      <div>
        Field
      </div>
    );
  }
}
export default Field;
