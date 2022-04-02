import React from 'react';

import './header.scss';

export default function Header (props) {
    
    const humburgerState = props.stateApp.hamburger;
    let classHamburger = 'header-menu__hamburger';
    if(humburgerState){
        classHamburger +=' activeHamburger';
    }
    
    return (
        <>
            <div className='header'>
                <div
                    className={classHamburger}
                    onClick={
                        props.stateApp.addTimer
                        ? () => {
                            props.onHamburger();
                            props.onToggleAdd();
                            props.clearIdEdit();
                        }
                        : props.onMainMenu}
                >
                    <div></div>
                </div>
                <h1 className='header-title'>
                    
                    {/* Title in header depending on which page we are on */}
                    {
                        !props.stateApp.addTimer ? "Таймеры"
                        : (props.stateApp.idEdit >= 0 ? "Добавить" : "Изменить")
                    }
                    
                </h1>
                <div
                    className="button_plus"
                    style={{ display: !props.stateApp.addTimer ? "flex" : "none" }}
                    onClick={() => {
                        props.onToggleAdd()
                        props.onHamburger()
                    }}
                ></div>
                <button
                    className="header-ready"
                    type='submit'
                    onClick={() => {
                        props.onSubmit()
                        }
                    }
                    style={{ display: !props.stateApp.addTimer ? "none" : "flex" }}
                >Готово</button>
            </div>
        </>
    )
}
