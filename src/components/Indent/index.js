import React, { Component } from 'react';
import styles from './styles.scss';
import classNames from 'classnames';

type Props = {
  top: 1 | 2,
  children: React$Element<*>,
};

class Indent extends Component {
  props: Props;

  render() {
    const { props } = this;
    return (
      <div className={classNames(styles.root, styles[`top-${props.top}`])}>
        {props.children}
      </div>
    );
  }
}

export default Indent;
