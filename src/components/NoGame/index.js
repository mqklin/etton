import React, { Component } from 'react';
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
  state: State = {
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
    const { props, state } = this;
    if (!state.NValue) {
      this.setState({ NErrorText: 'Обязательное поле' });
      return;
    }
    if (state.NErrorText) return;
    props.onGameStart(+state.NValue);
  };

  render() {
    const { state } = this;
    return (
      <div className={styles.root}>
        <div className={styles.enterN}>
          <div className={styles.text}>
            Введите N:
          </div>
          <div className={styles.input}>
            <Input
              textAlignCenter
              value={state.NValue}
              onChange={this.handleNChange}
              errorText={state.NErrorText}
            />
          </div>
        </div>
        <div className={styles.startButton}>
          <Button
            text="Играть!"
            options={{ type: 'button', colorScheme: 'default' }}
            onClick={this.handleStartButtonClick}
          />
        </div>
      </div>
    );
  }
}

export default NoGame;
