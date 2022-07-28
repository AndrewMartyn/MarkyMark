import { render, screen } from '@testing-library/react';
import App from './client/src';

test('renders the homepage', () => {
    render(<App />);
});