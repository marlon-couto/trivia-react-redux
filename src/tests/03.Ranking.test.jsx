import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

import Ranking from '../pages/Ranking';

describe('3 - Testa a tela de Ranking', () => {
  it('exibe um elemento h1 com com o título Ranking', () => {
    renderWithRouterAndRedux(<Ranking />);

    const h1Element = screen.getByRole('heading', {
      name: /ranking/i,
      level: 1,
    });

    expect(h1Element).toBeInTheDocument();
  });

  it('existe um botão de "Play Again" na tela', () => {
    renderWithRouterAndRedux(<Ranking />);

    const buttonElement = screen.getByRole('button', { name: /play again/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('ao clicar no botão "Play Again", o usuário é redirecionado à página inicial', () => {
    const { history } = renderWithRouterAndRedux(<Ranking />);

    const buttonElement = screen.getByRole('button', { name: /play again/i });
    expect(history.location.pathname).toBe('/ranking');

    userEvent.click(buttonElement);
    expect(history.location.pathname).toBe('/');
  });
});
