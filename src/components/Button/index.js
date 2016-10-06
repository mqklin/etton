import React, { Component, PropTypes } from 'react';
import styles from './styles.scss';
import classNames from 'classnames';

class Button extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  };
  static defaultProps = {
    disabled: false,
  };
  render() {
    const { text, onClick, disabled } = this.props;
    return (
      <div className={styles.root}>
        <button
          className={classNames(styles.button, disabled && styles.disabled)}
          onClick={onClick}
        >
          {text}
        </button>
      </div>
    );
  }
}

export default Button;
