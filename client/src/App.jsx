import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { NavBar } from "../src/components";
import {
  RegisterEditPage,
  RegisterPage,
  RegisterContentViewPage,
  Home,
  Error,
  MyLikesPage,
  MyPostPage,
  UserInfoEditPage,
  UserInfoRegisterPage,
} from "./Pages";
import { accessTokenStore } from "./Store/accesstoken-zustand";
import {
  boardPostLoadingStore,
  userinfoPostLoadingStore,
  boardPatchLoadingStore,
  boardDeleteLoadingStore,
  likeGetLoadingStore,
  myPostGetLoadingStore,
  boardGetLoadingStore,
  myPostClosedLoadingStore,
} from "./Store/loading-zustand";
import LoadingPage from "./Pages/LoadingPage";
import ErrorPage from "./Pages/ErrorPage";

function App() {
  const {
    isLogin,
    accessToken,
    cocodusId,
    chgIsLogin,
    chgAccToken,
    chgCocoId,
  } = accessTokenStore();
  useEffect(() => {
    const re = [/accessToken/, /cocodusId/];
    let acc_String = window.document.cookie
      .split(";")
      .filter((x) => (x.match(re[0]) ? true : false))[0];
    // console.log(acc_String);
    let id_String = window.document.cookie
      .split(";")
      .filter((x) => (x.match(re[1]) ? true : false))[0];
    if (id_String && acc_String) {
      chgAccToken(acc_String.split("=")[1]);
      chgCocoId(decodeURIComponent(id_String.split("=")[1]));
    }
  }, []);
  useEffect(() => {
    if (accessToken && cocodusId) chgIsLogin(true);
    else chgIsLogin(false);
  }, [accessToken, isLogin]);
  const theme = {
    colors: {
      header: "#ebfbff",
      body: "#fff",
      footer: "#00333",
    },
  };

  // const { loading1, error1 } = userinfoPostLoadingStore();
  // const { loading2, error2 } = boardPostLoadingStore();
  // const { loading3, error3 } = boardPatchLoadingStore();
  // const { loading4, error4 } = boardDeleteLoadingStore();
  // const { loading5, error5 } = likeGetLoadingStore();
  // const { loading6, error6 } = boardGetLoadingStore();
  // const { loading7, error7 } = myPostGetLoadingStore();
  // const { loading8, error8 } = myPostClosedLoadingStore();
  // if (
  //   loading1 ||
  //   loading2 ||
  //   loading3 ||
  //   loading4 ||
  //   loading5 ||
  //   loading6 ||
  //   loading7 ||
  //   loading8
  // )
  //   return <LoadingPage />;
  // if (error1 || error2 || error3 || error4 || error5 || error6 || error7 || error8)
  //   return <ErrorPage />;
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Router>
          <NavBar />

          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/register" element={<RegisterPage />} />
            <Route exact path="/registeredit" element={<RegisterEditPage />} />
            <Route
              exact
              path="/RegisterContentViewPage"
              element={<RegisterContentViewPage />}
            />
            <Route exact path="/mylikes" element={<MyLikesPage />} />
            <Route exact path="/mypost" element={<MyPostPage />} />
            <Route exact path="/userinfoedit" element={<UserInfoEditPage />} />
            <Route
              exact
              path="/userinforegister"
              element={<UserInfoRegisterPage />}
            />
            <Route exact path="/error" element={<Error />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
