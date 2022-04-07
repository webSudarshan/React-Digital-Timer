import {Component} from 'react'
import './index.css'

const initialState = {minutes: 25, seconds: 0, isTimerRunning: false}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.timerID)

  decreaseLimit = () => {
    this.setState(prevState => ({minutes: prevState.minutes - 1}))
  }

  increaseLimit = () => {
    this.setState(prevState => ({minutes: prevState.minutes + 1}))
  }

  tick = () => {
    const {minutes, seconds} = this.state
    const isTimerCompleted = seconds === minutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({seconds: prevState.seconds + 1}))
    }
  }

  toggleTimer = () => {
    const {minutes, seconds, isTimerRunning} = this.state
    const isTimerCompleted = seconds === minutes * 60

    if (isTimerCompleted) {
      this.setState({seconds: 0})
    }

    if (!isTimerRunning) {
      this.timerID = setInterval(this.tick, 1000)
    } else {
      this.clearTimerInterval()
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  resetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  getElapsedSecondsInTimeFormat = () => {
    const {minutes, seconds} = this.state
    const remainingSeconds = minutes * 60 - seconds
    const minute = Math.floor(remainingSeconds / 60)
    const second = Math.floor(remainingSeconds % 60)
    const stringifiedMinutes = minute > 9 ? minute : `0${minute}`
    const stringifiedSeconds = second > 9 ? second : `0${second}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {minutes, seconds, isTimerRunning} = this.state
    const isButtonsDisabled = seconds > 0
    return (
      <div className="container">
        <h1 className="heading">Digital Timer</h1>
        <div className="card">
          <div className="timer-card">
            <div className="timer-text">
              <h1 className="timer">{this.getElapsedSecondsInTimeFormat()}</h1>
              <p className="timer-state">
                {isTimerRunning ? 'Running' : 'Paused'}
              </p>
            </div>
          </div>
          <div>
            <div className="btn-container">
              {!isTimerRunning ? (
                <button
                  type="button"
                  className="start-reset-btn"
                  onClick={this.toggleTimer}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                    alt="play icon"
                  />
                  <p>Start</p>
                </button>
              ) : (
                <button
                  type="button"
                  className="start-reset-btn"
                  onClick={this.toggleTimer}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png "
                    alt="pause icon"
                  />
                  <p>Pause</p>
                </button>
              )}
              <button
                type="button"
                className="start-reset-btn"
                onClick={this.resetTimer}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                />
                <p>Reset</p>
              </button>
            </div>
            <p>Set Timer limit</p>
            <div className="timer-limit-container">
              <button
                type="button"
                className="limit-btn"
                onClick={this.decreaseLimit}
                disabled={isButtonsDisabled}
              >
                -
              </button>
              <p className="timer-limit">{minutes}</p>
              <button
                type="button"
                className="limit-btn"
                onClick={this.increaseLimit}
                disabled={isButtonsDisabled}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
