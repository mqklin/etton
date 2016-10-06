import React, { Component, PropTypes } from 'react';
import styles from './styles.scss';
import classNames from 'classnames';

class Button extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    type: PropTypes.shape({
      value: PropTypes.oneOf(['button', 'link']).isRequired,
      options: PropTypes.shape({
        colorScheme: PropTypes.oneOf(['default']).isRequired,
      }).isRequired,
    }).isRequired,
  };
  static defaultProps = {
    type: {
      value: 'button',
      options: {
        colorScheme: 'default',
      },
    },
  };
  handleClick = () => {
    const { type, onClick } = this.props;
    onClick();
  };
  render() {
    const { text, type } = this.props;
    return (
      <div className={styles.root}>
        <button
          className={classNames(
            styles[type.value],
            styles[`colorScheme-${type.options.colorScheme}`],
          )}
          onClick={this.handleClick}
        >
          {text}
        </button>
      </div>
    );
  }
}

export default Button;
