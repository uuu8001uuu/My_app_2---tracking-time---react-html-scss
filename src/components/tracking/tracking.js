import React, {Component} from 'react';
import TrackingTimer from '../trackingTimer';
import './tracking.scss';

export default class Tracking extends Component {

  render () {
    const stateApp = this.props.stateApp

    // get data timers in rotations from array state and return Component
    const data = stateApp.dataTimers
    const elements = data.map((item) => { // map in rotations all elements array
        return (
          <TrackingTimer
            key={item.id}
            data={item}
            stateApp={stateApp}
            onToggleAdd={() => this.props.onToggleAdd(item.id)}
            onHamburger={this.props.onHamburger}
            updateTime={(totalTime) => this.props.updateTime(totalTime, item.id)}
          />
            )
      });
    
    return (
      <>
        {elements}
      </>
    )
  }
}


