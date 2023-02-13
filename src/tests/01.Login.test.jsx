import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import mockData from './helpers/mockData';

const PLAYER_NAME = /input-player-name/i;
const PLAYER_EMAIL = /input-gravatar-email/i;
const RESPONSE_API = {
  token: 'token-jogador',
  results: [...mockData.results],
};

describe('1 - Testa a tela de Login', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockImplementation(() => RESPONSE_API),
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('existe um campo de email e senha na página com os data-testid corretos', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.queryByTestId(PLAYER_NAME);
    const inputEmail = screen.queryByTestId(PLAYER_EMAIL);

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
  });

  it('é posssível escrever o nome e o email da pessoa jogadora', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.queryByTestId(PLAYER_NAME);
    const inputEmail = screen.queryByTestId(PLAYER_EMAIL);

    userEvent.type(inputName, 'Nome');
    userEvent.type(inputEmail, 'email@valido.com');

    expect(inputName).toHaveValue('Nome');
    expect(inputEmail).toHaveValue('email@valido.com');
  });

  it('desabilita o botão "Play" quando a pessoa jogadora escrever um nome inválido', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.queryByTestId(PLAYER_NAME);
    const inputEmail = screen.queryByTestId(PLAYER_EMAIL);
    const buttonPlay = screen.queryByTestId(/btn-play/i);

    userEvent.type(inputName, 'N');
    userEvent.type(inputEmail, 'email@valido.com');

    expect(buttonPlay).toBeDisabled();
  });

  it('desabilita o botão "Play" quando a pessoa jogadora escrever um email inválido', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.queryByTestId(PLAYER_NAME);
    const inputEmail = screen.queryByTestId(PLAYER_EMAIL);
    const buttonPlay = screen.queryByTestId(/btn-play/i);

    userEvent.type(inputName, 'Nome');
    userEvent.type(inputEmail, 'emailinvalido');

    expect(buttonPlay).toBeDisabled();
  });

  it('é possível clicar no botão "Play" somente após preencher o nome e o email', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.queryByTestId(PLAYER_NAME);
    const inputEmail = screen.queryByTestId(PLAYER_EMAIL);
    const buttonPlay = screen.queryByTestId(/btn-play/i);

    expect(buttonPlay).toBeDisabled();

    userEvent.type(inputName, 'Nome');
    userEvent.type(inputEmail, 'email@valido.com');

    expect(buttonPlay).toBeEnabled();
  });

  it('redireciona para a página de jogo quando o botão "Play" é clicado e salva as informações na store', async () => {
    const { history, store } = renderWithRouterAndRedux(<App />);

    expect(history.location.pathname).toBe('/');

    const inputName = screen.getByTestId(PLAYER_NAME);
    const inputEmail = screen.getByTestId(PLAYER_EMAIL);

    userEvent.type(inputName, 'grupo 14B');
    userEvent.type(inputEmail, 'alguem@gmail.com');

    const buttonPlay = screen.getByRole('button', {
      name: /play/i,
    });

    expect(buttonPlay).toBeInTheDocument();
    userEvent.click(buttonPlay);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(store.getState().player.name).toBe('grupo 14B');
      expect(screen.getByTestId('question-text')).toBeInTheDocument();
      expect(history.location.pathname).toBe('/game');
    });
  });

  it('a tela de login exibe um botão de configurações e ele redireciona para a página de configurações ao ser clicado', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    expect(history.location.pathname).toBe('/');

    const btnSettings = screen.getByTestId('btn-settings');
    expect(btnSettings).toBeInTheDocument();

    userEvent.click(btnSettings);
    expect(history.location.pathname).toBe('/settings');

    const settings = screen.getByTestId('settings-title');
    expect(settings).toBeInTheDocument();
  });
});
