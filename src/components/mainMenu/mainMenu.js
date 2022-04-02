import React, {Component} from 'react';
import './mainMenu.scss';

export default class MainMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
          setting: false,
          contacts: false,
          aboutApp: false
        };
        this.onSetting = this.onSetting.bind(this);
        this.onСontacts = this.onСontacts.bind(this);
        this.onAboutApp = this.onAboutApp.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        // For disable div setting, contacts, aboutApp when main menu is closed
        if (this.props.stateMainMenu !==prevProps.stateMainMenu &&
            this.state.setting === true) {
            this.onSetting();
        }
        if (this.props.stateMainMenu !==prevProps.stateMainMenu &&
            this.state.contacts === true) {
            this.onСontacts();
        }
        if (this.props.stateMainMenu !==prevProps.stateMainMenu &&
            this.state.aboutApp === true) {
            this.onAboutApp();
        }
    }

    onSetting() {
        this.setState({
            setting: !this.state.setting,
            contacts: false,
            aboutApp: false
        })
    }

    onСontacts() {
        this.setState({
            setting: false,
            contacts: !this.state.contacts,
            aboutApp: false
        })
    }

    onAboutApp() {
        this.setState({
            setting: false,
            contacts: false,
            aboutApp: !this.state.aboutApp
        })
    }

    render() {
        const stateMainMenu = this.props.stateMainMenu

        // click setting - add class active for enable div
        let classSetting = 'mainMenu-setting';
        if (this.state.setting) { 
            classSetting +=' activeSetting';
        }

        // click contacts - add class active for enable div
        let classСontacts = 'mainMenu-contacts';
        if (this.state.contacts) { 
            classСontacts +=' activeСontacts';
        }

        // click about app - add class active for enable div
        let classAboutApp = 'mainMenu-aboutApp';
        if (this.state.aboutApp) { 
            classAboutApp +=' activeAboutApp';
        }


        return (
            <div style={{ display: stateMainMenu ? "block" : "none" }}>
                <div
                    className='mainMenu'
                >
                    <div className='mainMenu-title'>Time tracking</div>
                    <div className='mainMenu-content'>
                        <div className='mainMenu-content__navigation'>
                            <div
                                className='mainMenu-content__navigation-link'
                                onClick={this.onSetting}
                            >
                                <img
                                    src={require('../../image/setting.png')} alt='setting'
                                    className='mainMenu-content__navigation-image'
                                />
                                <span
                                    className='mainMenu-content__navigation-text'
                                >Настройки</span>
                            </div>
                        </div>
                        <div className='mainMenu-content__navigation'>
                            <div
                                className='mainMenu-content__navigation-link'
                                onClick={this.onСontacts}
                            >
                                <img
                                    src={require('../../image/callback.png')} alt='callback'
                                    className='mainMenu-content__navigation-image'
                                />
                                <span
                                    className='mainMenu-content__navigation-text'
                                >Обратная связь</span>
                            </div>
                        </div>
                        <div className='mainMenu-content__navigation'>
                            <div
                                className='mainMenu-content__navigation-link'
                                onClick={this.onAboutApp}
                            >
                                <img
                                    src={require('../../image/about-app.png')} alt='about app'
                                    className='mainMenu-content__navigation-image'
                                />
                                <span
                                    className='mainMenu-content__navigation-text'
                                >О приложении</span>
                            </div>
                        </div>
                    </div>
                    <div
                        className={classSetting}
                    >
                        <span>Здесь будут настройки</span>
                    </div>
                    <div
                        className={classСontacts}
                    >
                        <div className='mainMenu-contacts__content'>
                            <span className='mainMenu-contacts__content-text'>Подписывайтесь и следите за новостями</span>
                            <div className='mainMenu-contacts__content-button'><img src={require('../../image/icon_about_app.png')} alt='Instagram'/><span>Instagram</span></div>
                            <span className='mainMenu-contacts__content-text'>Есть вопросы и пожелания?</span>
                            <div className='mainMenu-contacts__content-button'><img src={require('../../image/icon_about_app.png')} alt='Email'/><span>Напишите на email</span></div>

                        </div>
                    </div>
                    <div
                        className={classAboutApp}
                    >
                        <div className='mainMenu-aboutApp__content'>
                            <img
                                src={require('../../image/icon_about_app.png')} alt='about app'
                                className='mainMenu-aboutApp__content-image'
                            />
                            <span className='mainMenu-aboutApp__content-text'>Приложение для учета личного времени и учета времени работы над проектами</span>
                            <span className='mainMenu-aboutApp__content-vesion'>Версия 1.0</span>
                            <span
                                className='mainMenu-aboutApp__content-developer'
                                style={{ display: this.state.aboutApp ? "block" : "none" }}
                            >uuu8001uuu</span>
                        </div>
                    </div>
                </div>
                <div className='darkArea' onClick={this.props.onMainMenu}></div>
            </div>
        )
    }
}