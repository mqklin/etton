import React, { Component, PropTypes } from 'react';
import styles from './styles.scss';
import classNames from 'classnames';

type State = {
  value: string,
  errorText: string,
};

type Props = {
  onChange: () => void,
  errorText: string,
  value: string,
  type: string,
  textAlignCenter: boolean,
};

class Input extends Component {
  static defaultProps = {
    onChange: (value: string) => {},
    errorText: '',
    value: '',
    type: 'text',
    textAlignCenter: false,
  };

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
    const { value, errorText } = this.state;
    const { type, textAlignCenter } = this.props;
    return (
      <div className={styles.root}>
        <input style={{ display: 'none' }} />
        <input
          type={type}
          className={classNames(styles.input, errorText && styles.error, textAlignCenter && styles.textAlignCenter)}
          value={value}
          onChange={({ target: { value } }) => this.props.onChange(value)}
        />
        {errorText && <span className={styles.errorText}>{errorText}</span>}
      </div>
    );
  }
}

export default Input;
