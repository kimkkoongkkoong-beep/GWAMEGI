import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx'; // 확장자를 명시하여 Babel이 파일을 찾기 쉽게 합니다.

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
