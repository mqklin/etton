import React, { Component } from 'react';
import styles from './styles.scss';
import classNames from 'classnames';

type Props = {
  text: string,
  onClick: () => void,
  options: {
    type: 'button' | 'link',
    colorScheme: 'default' /*| 'warning' | 'success'*/,
  },
};

class Button extends Component {
  props: Props;
  render() {
    const { props } = this;
    return (
      <div className={styles.root}>
        <button
          className={classNames(
            styles[props.options.type],
            styles[`colorScheme-${props.options.colorScheme}`],
          )}
          onClick={props.onClick}
        >
          {props.text}
        </button>
      </div>
    );
  }
}

export default Button;
