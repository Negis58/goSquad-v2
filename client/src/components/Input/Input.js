import React from 'react';

import './Input.css';

const Input = ({ setMessage, sendMessage, message }) => (
    <form className="form-input-text">
        <input
            className="input-text"
            type="text"
            placeholder="Напишите сообщение..."
            value={message}
            onChange={({ target: { value } }) => setMessage(value)}
            onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
        />
        <button className="button-input-send" onClick={e => sendMessage(e)}>Отправить</button>
    </form>
)

export default Input;