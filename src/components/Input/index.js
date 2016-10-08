import React, { Component, PropTypes } from 'react';
import styles from './styles.scss';
import classNames from 'classnames';

type State = {
  value: string,
  errorText: string,
};

type Props = {
  errorText: string,
  textAlignCenter: boolean,
  onChange: (value: string) => void,
  value: string,
};

class Input extends Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      value: props.value,
      errorText: props.errorText,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      value: nextProps.value,
      errorText: nextProps.errorText,
    });
  }

  render() {
    const { props, state } = this;
    return (
      <div className={styles.root}>
        <input style={{ display: 'none' }} />
        <input
          className={classNames(
            styles.input,
            state.errorText ? styles.error : '',
            props.textAlignCenter ? styles.textAlignCenter : '',
          )}
          value={state.value}
          onChange={({ target: { value } }) => props.onChange(value)}
        />
        {state.errorText && <span className={styles.errorText}>{state.errorText}</span>}
      </div>
    );
  }
}

export default Input;
