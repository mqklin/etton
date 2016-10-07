import React, { Component, PropTypes } from 'react';
import styles from './styles.scss';
import { Input, Button } from 'components';

class NoGame extends Component {
  static propTypes = {
    onGameStart: PropTypes.func.isRequired,
  };
  static defaultProps = {};

  state = {
    NErrorText: '',
    NValue: '',
  };

  handleNChange = (value: string) => {
    const nextState = {};
    if ((value === '0') || (value.split('').some(c => c.charCodeAt(0) < 48 || c.charCodeAt(0) > 57)) || (+value < 5) || (+value > 9)) {
      nextState.NErrorText = 'Только число от 5 до 9';
    } else {
      nextState.NErrorText = '';
    }
    this.setState({
      ...nextState,
      NValue: value,
    });
  };

  handleStartButtonClick = () => {
    const { NValue, NErrorText } = this.state;
    if (!NValue) {
      this.setState({ NErrorText: 'Обязательное поле' });
      return;
    }
    if (NErrorText) return;
    this.props.onGameStart({ N: NValue });
  };

  render() {
    const { NErrorText, NValue } = this.state;
    return (
      <div className={styles.root}>
        <div className={styles.enterN}>
          <div className={styles.text}>
            Введите N:
          </div>
          <div className={styles.input}>
            <Input
              textAlignCenter
              value={NValue}
              onChange={this.handleNChange}
              errorText={NErrorText}
            />
          </div>
        </div>
        <div className={styles.startButton}>
          <Button
            text="Играть!"
            onClick={this.handleStartButtonClick}
          />
        </div>
      </div>
    );
  }
}

export default NoGame;
