import React, { useState } from 'react';
import Content from '../../components /Content';
import Row from '../../components /Row';
import Button from '../../components /ui-kit/Button';
import H1 from '../../components /ui-kit/H1';
import Input from '../../components /ui-kit/Input';
import Select from '../../components /ui-kit/Select';
import SelectDate from '../../components /ui-kit/SelectDate';

import styles from './styles.module.scss';

const valid_text = 'Поле является объязательным';
const valid_email_text = 'Введент некорректный адрес почты';

const redExpEmail = new RegExp(/^\w{1,2}[\w\\.\d-]+@[\w\\.\d-]+\.\w{2,4}$/i);

const MainPage = () => {
  const [data, setData] = useState({
    first_name: 'Alena',
    last_name: '',
    patronymic: '',
    gender: '',
    birthday: '',
    phone: '',
    email: '',
    address: '',
    employer: '',
  });

  const [valid, setValid] = useState({
    first_name: '',
    last_name: '',
    birthday: '',
    phone: '',
    email: '',
  });

  const validate = () => {
    const validator = {
      first_name: data.first_name.length > 0 ? '' : valid_text,
      last_name: data.last_name.length > 0 ? '' : valid_text,
      birthday: data.birthday.length > 0 ? '' : valid_text,
      phone: data.phone.length > 0 ? '' : valid_text,
      email: data.email.length > 0 && redExpEmail.test(data.email) ? '' : valid_email_text,
    };

    setValid(validator);

    return Object.keys(validator).every(key => validator[key].length === 0);
  };

  const clickSave = () => {
    if (validate()) {
      window.alert('Форма валидна, отправляетя запрос');
    }
  };

  const changeData = key => value => {
    setData({ ...data, [key]: value });
    setValid({ ...valid, [key]: '' });
  };

  return (
    <Content>
      <div className={styles.info_form}>
        <H1>Информация о сотруднике</H1>
        <Input
          value={data.last_name}
          error={valid.last_name}
          placeholder="Фамилия"
          onChange={changeData('last_name')}
        />
        <Input value={data.first_name} error={valid.first_name} placeholder="Имя" onChange={changeData('first_name')} />
        <Input value={data.patronymic} placeholder="Отвество" onChange={changeData('patronymic')} />
        <Row className={styles.row_block}>
          <Select
            value={data.gender}
            list={['Мужской', 'Женский']}
            placeholder="Пол"
            onSelect={changeData('gender')}
            style={styles.small_input}
          />
          <SelectDate
            value={data.birthday}
            error={valid.birthday}
            placeholder="Дата рождения"
            onSelect={changeData('birthday')}
            style={styles.small_input}
          />
        </Row>
        <Row className={styles.row_block}>
          <Input
            value={data.phone}
            error={valid.phone}
            type="phone"
            placeholder="Мобильный телефон"
            onChange={changeData('phone')}
            style={styles.small_input}
          />
          <Input
            value={data.email}
            error={valid.email}
            placeholder="Email"
            onChange={changeData('email')}
            style={styles.small_input}
          />
        </Row>
        <Input
          value={data.address}
          placeholder="Адрес постоянной регистрации"
          onChange={changeData('address')}
          styles={{ marginBottom: '15px' }}
        />
        <Input value={data.employer} placeholder="Название работодателя" onChange={changeData('employer')} />
        <Row className={styles.button_line}>
          <Button className={styles.save_button} onClick={clickSave}>
            СОХРАНИТЬ
          </Button>
        </Row>
      </div>
    </Content>
  );
};

export default MainPage;
