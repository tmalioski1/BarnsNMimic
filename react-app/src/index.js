import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ModalProvider, Modal } from './context/Modal';
import { SecondModalProvider } from './context/SecondModal';
import './index.css';
import App from './App';
import configureStore from './store';

const store = configureStore();

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//         <App />
//       </Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );


function Root() {
  return (
    <ModalProvider>
      <SecondModalProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
          <Modal />
        </BrowserRouter>
      </Provider>
      </SecondModalProvider>
    </ModalProvider>

  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
