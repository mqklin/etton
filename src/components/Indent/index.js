import React, { Component } from 'react';
import styles from './styles.scss';
import classNames from 'classnames';

type Props = {
  top?: 1 | 2,
  bottom?: 1 | 2,
  children: React$Element<*>,
};

class Indent extends Component {
  props: Props;

  render() {
    const { props } = this;
    return (
      <div className={classNames(
        styles.root,
        props.top ? styles[`top-${props.top}`] : '',
        props.bottom ? styles[`bottom-${props.bottom}`] : '',
      )}>
        {props.children}
      </div>
    );
  }
}

export default Indent;
