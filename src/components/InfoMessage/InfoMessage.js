import React from 'react';
import PropTypes from 'prop-types';

import './InfoMessage.css';

function InfoMessage(props) {
  const {
    isShown, code, type,
  } = props;

  InfoMessage.propTypes = {
    isShown: PropTypes.bool.isRequired,
    code: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  };

  const [messageText, setMessageText] = React.useState('');

  function getMessage(messageType) {
    if (messageType === 'signup') {
      return 'При регистрации пользователя произошла ошибка';
    } if (messageType === 'signin') {
      return 'Вы ввели неправильный логин или пароль';
    } if (messageType === 'update') {
      return 'При обновлении профиля произошла ошибка';
    }

    return 'Произошла ошибка';
  }

  React.useEffect(() => {
    if (code === 200 || code === 201) {
      setMessageText('Данные обновлены');
    } if (code > 400) {
      setMessageText(getMessage(type));
    }
  }, [code, type]);

  return (
    <div className="message">
      {isShown && (
        <p className={`message__text ${code > 400 ? 'message__text_error' : ''}`}>
          {messageText}
        </p>
      )}
    </div>
  );
}

export default InfoMessage;
