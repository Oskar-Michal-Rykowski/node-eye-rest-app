import React, { setState } from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  state = {
    status: 'off',
    time: 1200,
    timer: '',
  };

  step = () => {
    const newTime = this.state.time - 1;

    this.setState({
      time: newTime,
    });

    const playBell = () => {
      const bell = new Audio('./sounds/bell.wav');
      bell.play();
    };

    if (this.state.time === 0) {
      switch (this.state.status) {
        case 'work':
          this.setState({
            time: 2,
            status: 'rest',
          });
          playBell();
          break;
        case 'rest':
          this.setState({
            time: 5,
            status: 'work',
          });
          playBell();
          break;
      }
    }
  };

  render() {
    const { status, time, timer } = this.state;

    function formatTime(sec) {
      const sec_num = parseInt(sec, 10);
      const hours = Math.floor(sec_num / 3600);
      const minutes = Math.floor(sec_num / 60) % 60;
      const seconds = sec_num % 60;

      return [hours, minutes, seconds]
        .map((digit) => (digit < 10 ? '0' + digit : digit))
        .filter((digit, i) => digit !== '00' || i > 0)
        .join(':');
    }

    const startTimer = () => {
      this.setState({
        timer: setInterval(this.step, 1000),
        time: 1200,
        status: 'work',
      });
    };

    const stopTimer = () => {
      clearInterval(timer);
      this.setState({
        time: 20,
        status: 'off',
      });
    };

    return (
      <div>
        <h1>Protect your eyes</h1>
        {status === 'off' ? (
          <div>
            <p>
              According to optometrists in order to save your eyes, you should
              follow the 20/20/20. It means you should to rest your eyes every
              20 minutes for 20 seconds by looking more than 20 feet away.
            </p>
            <p>
              This app will help you track your time and inform you when it's
              time to rest.
            </p>
          </div>
        ) : (
          <div></div>
        )}
        {status === 'work' ? <img src="./images/work.png" /> : <div></div>}
        {status === 'rest' ? <img src="./images/rest.png" /> : <div></div>}
        {status !== 'off' ? (
          <div className="timer">{formatTime(time)}</div>
        ) : (
          <div></div>
        )}
        {status === 'off' ? (
          <button onClick={() => startTimer()} className="btn">
            Start
          </button>
        ) : (
          <div></div>
        )}
        {status !== 'off' ? (
          <button onClick={() => stopTimer()} className="btn">
            Stop
          </button>
        ) : (
          <div></div>
        )}
        <button onClick={() => window.close()} className="btn btn-close">
          X
        </button>
      </div>
    );
  }
}

render(<App />, document.querySelector('#app'));
