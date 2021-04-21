import React, { useState, useEffect, Suspense } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import ReactGA from "react-ga";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./modules";
import { handleSearch, handleClose } from "./modules/dictionary";
import { handleSideBar } from "./modules/sideBar";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./Theme";
import GlobalStyle from "./globalStyles";
import LoadingPage from "./pages/loading";
import ScrollToTop from "./ScrollToTop";
import Header from "./components/Header";
import Dictionary from "./components/Dictionary";
import Homepage from "./components/Main";
import VOCsPage from "./components/VOCs";

const App: React.FC = () => {
  const [theme, setTheme] = useState("light");
  // 상태 조회. state의 타입을 RootState로 지정해야 함
  const open = useSelector((state: RootState) => state.sideBar.open);
  const search = useSelector((state: RootState) => state.dictionary.search);
  const close = useSelector((state: RootState) => state.dictionary.close);

  const dispatch = useDispatch(); // 디스패치 함수를 가져옵니다
  // 각 액션들을 디스패치하는 함수들을 만들어줍니다
  const clickToOpen = () => {
    dispatch(handleSideBar());
  };
  const clickToSearch = (e: any) => {
    dispatch(handleSearch(e));
  };
  const clickToClose = () => {
    dispatch(handleClose());
  };

  useEffect(() => {
    ReactGA.initialize("UA-*********-*"); // Google Analytics 추적 ID
    // 페이지 뷰 리포트
    ReactGA.pageview(window.location.pathname);
  }, []);
  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  return (
    <Router>
      <Suspense fallback={<LoadingPage />}>
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
          <GlobalStyle />
          <ScrollToTop />
          <DimmedOut onClick={clickToOpen} open={open} />
          <Header themeToggler={themeToggler} />
          <Dictionary
            search={search}
            close={close}
            clickToClose={clickToClose}
          />
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Homepage clickToSearch={clickToSearch} />}
            />
            <Route
              exact
              path="/VOCs"
              render={() => (
                <VOCsPage close={close} clickToSearch={clickToSearch} />
              )}
            />
          </Switch>
        </ThemeProvider>
      </Suspense>
    </Router>
  );
};

export default App;

type Props = {
  open: boolean;
};

const DimmedOut = styled.div<Props>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: ${({ open }) => (open ? "#000000" : "#fff")};
  opacity: ${({ open }) => (open ? "0.6" : "0")};
  display: ${({ open }) => (open ? "flex" : "none")};
  z-index: 2;
`;
