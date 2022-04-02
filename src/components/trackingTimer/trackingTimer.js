import React, {Component} from 'react';

export default class TrackingTimer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        play: false,
        refresh: false,
        add: true
      };
      this.tooglePlay = this.tooglePlay.bind(this);
      this.toogleRefresh = this.toogleRefresh.bind(this);
    }
    
      componentDidUpdate(prevProps, prevState) {
        
        if ( // Start the timer for the first time
          this.state.play === true
          && this.state.play !== prevState.play
        ) {
          if (this.props.data.totalTime === 0) {
            this.timerID = setInterval(
              () => {
                let elapsedTime = Date.now() - this.state.startTime
                this.props.updateTime(elapsedTime)
              },
              1000
            );
          } else { // Start the timer for the next time
            let totalTime = this.props.data.totalTime
            this.timerID = setInterval(
              () => {
                let elapsedTime = Date.now() - this.state.startTime + totalTime
                this.props.updateTime(elapsedTime)
              },
              1000
            );
          }
        }

        if ( // When we stop the timer, we clear interval the current timer. This is necessary to prevent memory leaks.
            !this.state.play
            && this.state.play !== prevState.play
          ) {
          clearInterval(this.timerID);
        }
        
        if ( // If we add timer in component add, then update total time
        this.props.stateApp.addTimer !== prevProps.stateApp.addTimer
        && this.props.data.totalTime > 0
        && this.props.stateApp.addTimer === false
        ) {
          this.props.updateTime(this.props.data.totalTime)
        }
      }
    
      // button play/pause
      tooglePlay () {
        this.setState((state) => ({
          play: !state.play
        }));
        
        // install time tracking
        let startTime;
        let elapsedTime = 0;
        
        startTime = Date.now() - elapsedTime;

        this.setState({
          startTime: startTime,
        });
      };
    
    
      // button refresh
      toogleRefresh () {
        this.setState((state) => ({
          refresh: !state.refresh
        }));
        clearInterval(this.timerID);
        this.setState({
          // seconds: 0,
          // minutes: 0,
          // hours: 0,
          play: false
        });
        this.props.updateTime(0)
      }
      
      componentWillUnmount() {
        clearInterval(this.timerID);
      }
    
      render () {
        const data = this.props.data

        const {play, refresh} = this.state
    
        // stop time tracking through 24 hours
        if (data.hours >= 24) {
          clearInterval(this.timerID);
        }
    
        // button play - add class active
        let classPlay = 'playPauseButton';
        if (play) {
          classPlay +=' activePlay';
        }
    
        // button refresh - add class active
        let classRefresh = 'tracking-right__refresh-image';
        if (refresh) {
          classRefresh +=' activeRefresh';
    
          setTimeout(() => {
            this.setState((refresh) => ({
              refresh: !refresh
            }));
          }, 800);
        }
    
        return (
            <>
              <div
                className='tracking'
                style={{ display: !this.props.stateApp.addTimer ? "flex" : "none" }} // show/hide block when adding timer
              >
                <div>
                  <div className='tracking-left'>
                    <img className='tracking-left__image' src={data.image} alt='work'></img>
                    <div className='tracking-left__info'>
                      <h2 className='tracking-left__info-title'>{data.title}</h2>
                      <p className='tracking-left__info-time'>
                        {("00" + (data.hours)).slice(-2)}:
                        {("00" + (data.minutes)).slice(-2)}:
                        {("00" + (data.seconds)).slice(-2)}</p>
                    </div>
                  </div>
                </div>
    
                <div>
                  <div className='tracking-right'>
                    <div className='tracking-right__edit'>
                      <img
                        onClick={() => {
                          this.props.onToggleAdd()
                          this.props.onHamburger()
                        }}
                        className='tracking-right__edit-image'
                        src={require('../../image/edit.png')} alt='edit'/>
                    </div>

                    <div className='tracking-right__refresh'>
                      <img
                        onClick={this.toogleRefresh}
                        className={classRefresh}
                        src={require('../../image/refresh.png')} 
                        alt='refresh'/>
                    </div>
    
                    <div className='tracking-right__play'>
                      <button onClick={this.tooglePlay} className={classPlay}></button>
                    </div>
                  </div>
                </div>
              </div>
            </>
        )
      }
}