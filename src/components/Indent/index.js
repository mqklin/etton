import React, { Component, PropTypes } from 'react';
import styles from './styles.scss';
import classNames from 'classnames';

class Indent extends Component {
  static propTypes = {
    top: PropTypes.oneOf([1, 2]),
    children: PropTypes.node.isRequired,
  };
  static defaultProps = {};

  render() {
    const { top } = this.props;
    return (
      <div className={classNames(styles.root, styles[`top-${top}`])}>
        {this.props.children}
      </div>
    );
  }
}

export default Indent;
