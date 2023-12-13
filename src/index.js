import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QuestionsProvider } from './contexts/QuestionsContext';
import { AnswersProvider } from './contexts/AnswersContext';
import { UsersProvider } from './contexts/UsersContext';
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UsersProvider>
    <AnswersProvider>
      <QuestionsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QuestionsProvider>
    </AnswersProvider>
  </UsersProvider>
);