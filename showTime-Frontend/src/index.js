import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./css/global.css"
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import HomeModule from "./homeModule.js";
import MoviesModule from "./videos/videoModule.js"
import AddVideoModule from './videos/addVideoModule';
import AddUserModule from './users/addUserModule';
import SignInUserModule from "./users/signInUser";
import DashboardModule from './dashboard/dashboardModule';
import VideoDisplayModule from './videos/videoDisplayModule';
import AddAdminModule from './admins/addAdminModule';
import UpdateVideoModule from './videos/updateVideoModule';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <CookiesProvider>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomeModule />} />
        <Route path="/videoDisplay/*" element={<VideoDisplayModule />} />
        <Route path="/video" element={<MoviesModule />} />
        <Route path="/addVideo" element={<AddVideoModule />} />
        <Route path="/updateVideo" element={<UpdateVideoModule />} />
        <Route path="/addUser" element={<AddUserModule />} />
        <Route path="/addAdmin" element={<AddAdminModule />} />
        <Route path="/signIn" element={<SignInUserModule />} />
      </Routes>
    </BrowserRouter>
  </CookiesProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
