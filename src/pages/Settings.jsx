import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button from '../components/Button';
import triviaIcon from '../images/logo.png';
import './css/Settings.css';

export default class Settings extends Component {
  render() {
    const { history } = this.props;
    return (
      <div className="settings">
        <div className="settingsForm">
          <img src={ triviaIcon } alt="Ícon do Trívia" />
          <h1 data-testid="settings-title">CONFIGURAÇÕES</h1>
          <select
            name="categories"
            className="categoriesSelect"
            id="categories"
            defaultValue="Categoria"
          >
            <option value="Categoria" disabled hidden>Categoria</option>
            <option value="movie">Movie</option>
            <option value="cars">Cars</option>
            <option value="food">Food</option>
          </select>
          <select name="difficulty" id="difficulty" required defaultValue="Dificuldade">
            <option value="Dificuldade" disabled hidden>Dificuldade</option>
            <option value="easy">Fácil</option>
            <option value="medium">Moderado</option>
            <option value="difficult">Difícil</option>
          </select>
          <select name="type" id="type" required defaultValue="Tipo">
            <option value="Tipo" disabled hidden>Tipo</option>
            <option value="easy">Fácil</option>
            <option value="medium">Moderado</option>
            <option value="difficult">Difícil</option>
          </select>
          <Button
            handleClick={ () => { history.push('/'); } }
            text="JOGAR"
            customClass="settingsPlayButton"
          />
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
