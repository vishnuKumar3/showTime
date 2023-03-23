import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./css/global.css"
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeModule from "./homeModule.js";
import MoviesModule from "./videos/videoModule.js"
import AddVideoModule from './videos/addVideoModule';
import AddUserModule from './users/addUserModule';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(

  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<HomeModule />} />
      <Route path="/movies" element={<MoviesModule />} />
      <Route path="/addVideo" element={<AddVideoModule />} />
      <Route path="/addUser" element={<AddUserModule />} />
    </Routes>
  </BrowserRouter>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
