import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import AlbumPage from './AlbumPage';
import UploadPage from './UploadPage';
import DownloadPage from './DownloadPage';
import SettingPage from './SettingPage';
import { Provider } from 'react-redux';
import { store } from './redux/store';
// sample
import TableSample from './sample/TableSample';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path='album-page' element={<AlbumPage />}></Route>
        <Route path="import-page" element={<UploadPage />} />
        <Route path="download-page" element={<DownloadPage />} />
        <Route path="setting-page" element={<SettingPage />} />
        {/* sample */}
        <Route path='table-sample' element={<TableSample />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
