import React, { Component, PropTypes } from 'react';
import styles from './styles.scss';
import classNames from 'classnames';

class Input extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    errorText: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string,
    textAlignCenter: PropTypes.bool,
  };

  static defaultProps = {
    onChange: () => {},
    errorText: '',
    value: '',
    type: 'text',
    textAlignCenter: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      errorText: props.errorText,
    };
  }

  componentWillReceiveProps(nextProps) {
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
