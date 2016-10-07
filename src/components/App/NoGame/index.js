import React, { Component, PropTypes } from 'react';
import styles from './styles.scss';
import { Input, Button } from 'components';

type State = {
  NErrorText: string,
  NValue: string,
};

type Props = {
  onGameStart: (N: number) => void,
};

class NoGame extends Component {
  props: Props;
  state: State;
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
    if (!this.state.NValue) {
      this.setState({ NErrorText: 'Обязательное поле' });
      return;
    }
    if (this.state.NErrorText) return;
    this.props.onGameStart(+this.state.NValue);
  };

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.enterN}>
          <div className={styles.text}>
            Введите N:
          </div>
          <div className={styles.input}>
            <Input
              textAlignCenter
              value={this.state.NValue}
              onChange={this.handleNChange}
              errorText={this.state.NErrorText}
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
