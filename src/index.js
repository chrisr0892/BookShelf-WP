require('file-loader?name=[name].[ext]!./index.html');
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './App.scss';
import './App.scss';
const appElement = document.getElementById('app');

ReactDOM.createRoot(appElement).render(<App />);
