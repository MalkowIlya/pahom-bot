import React from 'react';
import './error-indicator.scss';
import errorImg from '../../style/img/error.png'

const ErrorIndicator = () => {
    return (
        <div className={'error-indicator'}>
            <img src={errorImg} alt="Tobzi"/>
            <h2>Что то пошло не так(</h2>
        </div>
    )
};

export default ErrorIndicator;