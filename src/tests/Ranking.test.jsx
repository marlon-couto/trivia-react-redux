import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import Ranking from '../pages/Ranking';

describe('Test a tela de Login',() => {
test('Testa se há um elemento h1 com com o titulo Ranking',() => {
    renderWithRouterAndRedux(<Ranking />)
const h1element = screen.getByRole('heading', {
    name: /ranking/i, level: 1 })
    expect(h1element).toBeInTheDocument();
})
test('Testa se existe um botão de Play Again na tela',() => {
    renderWithRouterAndRedux(<Ranking />)
    const buttonelement = screen.getByRole('button', { name: /play again/i })
        expect(buttonelement).toBeInTheDocument();
    })
    test('Testa se o botão Play Again na tela',() => {
        const {history} = renderWithRouterAndRedux(<Ranking />)
        const buttonelement = screen.getByRole('button', { name: /play again/i })
        expect(history.location.pathname).toBe('/');
        userEvent.click(buttonelement);
        expect(history.location.pathname).toBe('/');
        })
})