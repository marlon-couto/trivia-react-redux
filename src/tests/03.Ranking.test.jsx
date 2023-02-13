import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { act } from 'react-dom/test-utils';

describe('3 - Testa a tela de Ranking', () => {
  it('exibe um elemento h1 com com o título Ranking', () => {
    renderWithRouterAndRedux(<App />, {}, '/ranking');

    const h1Element = screen.getByRole('heading', {
      name: /ranking/i,
      level: 1,
    });

    expect(h1Element).toBeInTheDocument();
  });

  it('existe um botão de "Play Again" na tela', () => {
    renderWithRouterAndRedux(<App />, {}, '/ranking');

    const buttonElement = screen.getByRole('button', { name: /play again/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('ao clicar no botão "Play Again", o usuário é redirecionado à página inicial', async () => {
    localStorage.clear();
    localStorage.setItem('ranking', JSON.stringify([
      { name: 'Teste 01', score: 10, picture: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50' },
      { name: 'Teste 02', score: 310, picture: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50' },
    ]));
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/ranking');
    });

    await waitFor(() => {
      screen.getByRole('button', { name: /play again/i });
      expect(history.location.pathname).toBe('/ranking');
    });

    const rankings = screen.getAllByTestId(/player-name-/i);
    expect(rankings).toHaveLength(2);
    expect(rankings[0]).toHaveTextContent('Teste 02');

    const buttonElement = screen.getByRole('button', { name: /play again/i });
    userEvent.click(buttonElement);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/');
    });

  });
});
