import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('Does not Crash!', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});