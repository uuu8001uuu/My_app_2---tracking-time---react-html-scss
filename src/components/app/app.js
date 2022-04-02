import React, { Component } from 'react';
import Tracking from '../tracking';
import Header from '../header';
import Add from '../add';
import MainMenu from '../mainMenu';
import './app.scss';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTimers: [{id: 'z1', title: 'Работа', image: require('../../image/work.png'), totalTime: 0, hours: 0, minutes: 0, seconds: 0},
                   {id: 'z2', title: 'Общение', image: require('../../image/phone.png'), totalTime: 0, hours: 0, minutes: 0, seconds: 0},
                   {id: 'z3', title: 'Сон', image: require('../../image/dream.png'), totalTime: 0, hours: 0, minutes: 0, seconds: 0},
                   {id: 'z4', title: 'Отдых', image: require('../../image/rest.png'), totalTime: 0, hours: 0, minutes: 0, seconds: 0},
                   {id: 'z5', title: 'Дорога', image: require('../../image/road.png'), totalTime: 0, hours: 0, minutes: 0, seconds: 0}],
      addTimer: false,
      idEdit: null,
      hamburger: false,
      mainMenu: false,
      submitForm: false
    };
    this.toogleAdd = this.toogleAdd.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.addTimerComponent = this.addTimerComponent.bind(this);
    this.updateTimerComponent = this.updateTimerComponent.bind(this);
    this.submitFormTimer = this.submitFormTimer.bind(this);
    this.toggleHamburger = this.toggleHamburger.bind(this);
    this.clearIdEdit = this.clearIdEdit.bind(this);
    this.onMainMenu = this.onMainMenu.bind(this);
    this.updateTotalTime = this.updateTotalTime.bind(this);
    this.updateTime = this.updateTime.bind(this);
  }

  // function add Timer
  toogleAdd() {
    this.setState((state) => ({
      addTimer: !state.addTimer,
    }));
  }

  onEdit(id) {
    this.setState(() => ({
      idEdit: id
    }));
  }

  clearIdEdit() {
    this.setState({
      idEdit: null
    });
  }

  onDelete(id) {
    this.setState(({dataTimers}) => {

      // create part of array before index element for delete and after element for delete
      // then concatinate two part array
      const before =  dataTimers.slice(0, id);
      const after =  dataTimers.slice(id+1);

      const newState = [...before, ...after]

      return {dataTimers: newState}
    });

    this.setState((state) => ({
      addTimer: !state.addTimer,
      idEdit: null,
      hamburger: !state.hamburger
    }));
  }

  addTimerComponent(state) {
    const generateId = (Math.random() + state.textInput + Date.now()).slice(2) // Generate random uniq key for new components

    const seconds = parseInt(state.seconds);
    const minutes = parseInt(state.minutes);
    const hours = parseInt(state.hours);
    const totalTime = hours * 3600000 + minutes * 60000 + seconds * 1000

    const newTimer = {id: generateId, title: state.textInput,
      image: state.image.src, totalTime: totalTime,
      hours: hours, minutes: minutes, seconds: seconds
    }

    this.setState(({dataTimers}) => {
      // create part of old array and new timer for adding timer
      // then concatinate two part array
      const newState = [newTimer, ...dataTimers]

      return {dataTimers: newState}
    });

    this.setState((state) => ({
      addTimer: !state.addTimer,
      hamburger: !state.hamburger
    }));
  }

  updateTimerComponent(text, totalTime, image) {
    // find index of timer to update
    const index = this.state.dataTimers.findIndex(elem => elem.id === this.state.idEdit)
    
    const updateTimer = {id: this.state.dataTimers[index].id,
      title: text,
      image: (image !== null ? image.src : this.state.dataTimers[index].image), // because if user leave last image and don't select new image
      totalTime: totalTime,
      hours: 0, minutes: 0, seconds: 0
    }

    this.setState(({dataTimers}) => {
      // create part of array before index element for update and update timer and after element for update
      // then concatinate three part array
      const before =  dataTimers.slice(0, index);
      const after =  dataTimers.slice(index+1);
      const newState = [...before, updateTimer, ...after]

      return {dataTimers: newState}
    });

    this.setState((state) => ({
      addTimer: !state.addTimer,
      hamburger: !state.hamburger
    }));
  }

  submitFormTimer() {
    this.setState((state) => ({
      submitForm: !state.submitForm
    }));
  }

  toggleHamburger() {
    this.setState((state) => ({
      hamburger: !state.hamburger
    }));
  }

  onMainMenu() {
    this.setState((state) => ({
      mainMenu: !state.mainMenu
    }));
  }


  updateTotalTime(totalTime, id) {
    // find index of timer to update
    const index = this.state.dataTimers.findIndex(elem => elem.id === id)
    
    // create updated timer with new total time
    // const updateTimer = {...this.state.dataTimers[index], totalTime: totalTime}
    const updateTimer = {id: this.state.dataTimers[index].id,
      title: this.state.dataTimers[index].title,
      image: this.state.dataTimers[index].image,
      totalTime: totalTime,
      hours: 0, minutes: 0, seconds: 0
    }

    this.setState(({dataTimers}) => {
      // create part of array before index element for update and update timer and after element for update
      // then concatinate three part array
      const before =  dataTimers.slice(0, index);
      const after =  dataTimers.slice(index+1);

      const newState = [...before, updateTimer, ...after]

      return {dataTimers: newState}
    });
  }

  updateTime(totalTime, id) {
    // find index of timer to update
    const index = this.state.dataTimers.findIndex(elem => elem.id === id)

    // transform with total time in hours:minutes:seconds
    const diffInHrs = totalTime / 3600000;
    const hours = Math.trunc(diffInHrs);
    const diffInMin = (diffInHrs - hours) * 60;
    const minutes = Math.trunc(diffInMin);
    const diffInSec = (diffInMin - minutes) * 60;
    const seconds = Math.trunc(diffInSec);
    
    // create updated timer with new total time
    // const updateTimer = {...this.state.dataTimers[index], totalTime: totalTime}
    const updateTimer = {id: this.state.dataTimers[index].id,
      title: this.state.dataTimers[index].title,
      image: this.state.dataTimers[index].image,
      totalTime: totalTime,
      hours: hours, minutes: minutes, seconds: seconds
    }

    this.setState(({dataTimers}) => {
      // create part of array before index element for update and update timer and after element for update
      // then concatinate three part array
      const before =  dataTimers.slice(0, index);
      const after =  dataTimers.slice(index+1);

      const newState = [...before, updateTimer, ...after]

      return {dataTimers: newState}
    });
  }

  render() {

    return (
      
      <>
          <Header
            stateApp={this.state}

            onToggleAdd={() => {
              this.toogleAdd()
            }}
            onHamburger={this.toggleHamburger}
            onMainMenu={this.onMainMenu}
            onSubmit={() => this.submitFormTimer()}
            clearIdEdit={this.clearIdEdit}
          />

          <Tracking
            stateApp={this.state}

            onToggleAdd={(id) => {
              this.toogleAdd(id)
              this.onEdit(id)
            }}
            onHamburger={this.toggleHamburger}
            // updateTotalTime={(totalTime, id) => this.updateTotalTime(totalTime, id)}
            updateTime={(totalTime, id) => this.updateTime(totalTime, id)}
          />

          <Add
            stateApp={this.state}  

            onToggleAdd={this.toogleAdd}
            clearIdEdit={this.clearIdEdit}
            onDelete={(id) => this.onDelete(id)}
            onAddTimerComponent={(state) => this.addTimerComponent(state)}
            // onAddTimerComponent={(state, image) => console.log('app ===', state, image)}
            updateTimerComponent={(textInput, totalTime, image) => this.updateTimerComponent(textInput, totalTime, image)}
            onHamburger={this.toggleHamburger}
            onSelectImage={(image) => console.log('image app ===', image)} // test delete
            // updateTotalTime={(totalTime, id) => this.updateTotalTime(totalTime, id)}
          />

          <MainMenu
            stateMainMenu={this.state.mainMenu}
            onMainMenu={this.onMainMenu}
          />
      </>
    );
  }
}

// What should be done
// If at add new timer, input title empty, prevent create new timer