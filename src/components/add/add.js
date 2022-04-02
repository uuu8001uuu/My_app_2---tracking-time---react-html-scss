import React, {Component} from 'react';
import SliderImage from '../sliderImage';
import './add.scss';

export default class  Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
          textInput: '',
          hours: 0,
          minutes: 0,
          seconds: 0,
          errorInput: false,
          image: null
        };
        this.onValueChangeForm = this.onValueChangeForm.bind(this);
        this.onSubmitInput = this.onSubmitInput.bind(this);
        this.updateSubmitInput = this.updateSubmitInput.bind(this);
        this.displayNotification = this.displayNotification.bind(this);
        this.offErrorInput = this.offErrorInput.bind(this);
        this.clearInput = this.clearInput.bind(this);
        this.clearTime = this.clearTime.bind(this);
        this.onSelectImage = this.onSelectImage.bind(this);
    }

    // We use props because we need to call the submit function based on them.
    componentDidUpdate(prevProps, prevState) {
        // find index in array timers to edit it
        const index = this.props.stateApp.dataTimers.findIndex(elem => elem.id === this.props.stateApp.idEdit)

        if (
            // Adding a new timer.
            this.props.stateApp.submitForm !== prevProps.stateApp.submitForm &&
            index < 0 &&
            this.state.textInput.length > 0 &&
            this.state.image !== null
            ) {
                this.onSubmitInput(this.state);
                this.clearInput();
                this.clearTime();
                this.offErrorInput();
        } else if (
            // Adding a new timer. If empty value input show notification.
            this.props.stateApp.submitForm !== prevProps.stateApp.submitForm &&
            index < 0 && 
            this.state.textInput.length === 0
            ) {
                this.displayNotification(true);
                this.setState({
                    errorInput: true
                })

        } else if (
            // Adding a new timer. If empty value image show notification.
            this.props.stateApp.submitForm !== prevProps.stateApp.submitForm &&
            index < 0 && 
            this.state.image === null
        ){
            this.displayNotification(true);
                this.setState({
                    errorInput: true
            })
        } else if (
            // Timer editing.
            this.props.stateApp.submitForm !== prevProps.stateApp.submitForm &&
            index >= 0 &&
            this.state.textInput.length > 0
            ) {
                const seconds = this.state.seconds * 1000;
                const minutes = this.state.minutes * 60000;
                const hours = this.state.hours * 3600000;
                const totalTime = hours + minutes + seconds

                this.updateSubmitInput(totalTime);
                this.props.clearIdEdit();
                this.clearInput();
                this.clearTime();
                this.offErrorInput();
        } else if (
            // Timer editing. If empty value input show notification.
            this.props.stateApp.submitForm !== prevProps.stateApp.submitForm &&
            index >= 0 &&
            this.state.textInput.length === 0
            ) {
                this.setState({
                    errorInput: true
                })
        } else if (
            // When we open timer edit, we load the current timer title
            this.props.stateApp.hamburger !== prevProps.stateApp.hamburger &&
            index >= 0 &&
            this.props.stateApp.hamburger === true
            ) {
            const elapsedTime = this.props.stateApp.dataTimers[index].totalTime
            const diffInHrs = elapsedTime / 3600000;
            const hours = Math.trunc(diffInHrs);
            const diffInMin = (diffInHrs - hours) * 60;
            const minutes = Math.trunc(diffInMin);
            const diffInSec = (diffInMin - minutes) * 60;
            const seconds = Math.trunc(diffInSec);

            const title = this.props.stateApp.dataTimers[index].title;
            
            this.setState({
                textInput: title,
                seconds: seconds,
                minutes: minutes,
                hours: hours,
            });

        } else if (
            // If we close the add timer, then we remove the error notification
            // This i tied to a hamburher button
            this.props.stateApp.hamburger !== prevProps.stateApp.hamburger &&
            this.props.stateApp.hamburger === false
            ) {
                this.offErrorInput();
        } else if (
            // When we write in input, then we remove the error notification
            this.state.textInput !== prevState.textInput &&
            this.state.textInput.length > 0
        ) {
            this.offErrorInput();
        } else if (
            // When we write in input, then we remove the error notification
            this.state.image !== prevState.image &&
            this.state.image !== null
        ) {
                this.offErrorInput();
        
        } else if (
            // When we close the add/update timer, then we clear text input
            this.props.stateApp.hamburger !== prevProps.stateApp.hamburger
            ) {
                this.clearInput();
                this.clearTime();
        }
    }

    onValueChangeForm(e) {
        const value = e.target.value;
        const name = e.target.name;

        this.setState({
            [name]: value // assignment value input to state
        });
    }

    onSubmitInput(state) {
        this.props.onAddTimerComponent(state);
        this.clearInput();
        this.onSelectImage(null);
    }

    updateSubmitInput(totalTime) {
        this.props.updateTimerComponent(this.state.textInput, totalTime, this.state.image);
        this.clearInput();
        this.onSelectImage(null);
    }

    displayNotification(stateError) {

        if (stateError) {
            return (
                <div
                    className='add-notification'
                >Введите название таймера</div>
            )
        } else {
            return
        }
    }

    offErrorInput() {
        this.setState({
            errorInput: false
        })
    }

    clearInput() {
        this.setState({
            textInput: '',
        })
    }

    clearTime() {
        this.setState({
            hours: 0,
            minutes: 0,
            seconds: 0
        })
    }

    onSelectImage(image){
        this.setState({
            image: image,
        })
    }
    
    render () {
        const stateApp = this.props.stateApp
    
        // find index in array timer to edit it
        const index = stateApp.dataTimers.findIndex(elem => elem.id === stateApp.idEdit)

        const notification = this.displayNotification(this.state.errorInput);

        return (
            <>
                <div style={{ display: !stateApp.addTimer ? "block" : "none" }} >
                    <div
                        className='button-add'
                        onClick={() => {
                            this.props.onToggleAdd()
                            this.props.onHamburger()
                        }} // This div is a big button that adds a timer
                    >
                        <div className="button-add__image"></div>
                        <button
                            className='button-add__button'
                        >Добавить таймер</button>
                    </div>
                </div>
                <div
                    className='field'
                    style={{ display: stateApp.addTimer ? "block" : "none" }}>
                    <hr/>
                    <div className='field-content'>
                        <form
                            className='field-form'
                            id='form-timer'
                        >
                            <div className='field-form__title'>Название таймера</div>
                            <input
                                className='field-form__input-title'
                                id='form-timer'
                                type='text'
                                placeholder='Введите название'
                                value={this.state.textInput} // When we edit timer, we load title. But we add timer, we clear input. When we use index 0 or more 0, else index null (-1)
                                name='textInput'
                                onChange={this.onValueChangeForm}
                            ></input>

                            <div className='field-form__title'>Общее время таймера (чч:мм:сс)</div>
                            <div className='field-form__input'>
                                <input
                                    className='field-form__input-time'
                                    id='form-timer'
                                    type='number'
                                    min="0"
                                    max="23"
                                    placeholder='часов'
                                    value={("00" + (this.state.hours)).slice(-2)} // When we edit timer, we load hours. But we add timer, we clear input. When we use index 0 or more 0, else index null (-1)
                                    name='hours'
                                    onChange={this.onValueChangeForm}
                                ></input>
                                <input
                                    className='field-form__input-time'
                                    id='form-timer'
                                    type='number'
                                    min="0"
                                    max="59"
                                    placeholder='минут'
                                    value={("00" + (this.state.minutes)).slice(-2)}
                                    name='minutes'
                                    onChange={this.onValueChangeForm}
                                ></input>
                                <input
                                    className='field-form__input-time'
                                    id='form-timer'
                                    type='number'
                                    min="0"
                                    max="59"
                                    placeholder='секунд'
                                    value={("00" + (this.state.seconds)).slice(-2)}
                                    name='seconds'
                                    onChange={this.onValueChangeForm}
                                ></input>
                            </div>
                        </form>

                        <SliderImage
                            onSelectImage={
                                (image) => {
                                    this.onSelectImage(image)
                                    this.props.onSelectImage(image) // test delete
                                }}

                            stateSliderImage={(state) => this.props.stateSliderImage(state)}
                            stateImage={this.state.image}
                        />
                        <div
                            className='field-delete'
                            style={{ display: index < 0 ? "none" : "flex" }} // we disable button display when we add a new timer
                            onClick={
                                () => this.props.onDelete(index)
                            }
                        >
                            <img className='field-delete__image' src={require('../../image/trash.png')} alt='Delete timer'/>
                            <div className='field-delete__title'>Удалить таймер</div>
                        </div>
                    </div>
                </div>
                {notification}
            </>
        )
    }
}
