import React, { useState, useEffect, Suspense, lazy } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import ReactGA from "react-ga";
import { useSelector } from "react-redux";
import { RootState } from "./modules";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./Theme";
import GlobalStyle from "./globalStyles";
import LoadingPage from "./pages/loading";
import ScrollToTop from "./ScrollToTop";
import Header from "./components/Header";

const Homepage = lazy(() => import("./pages/index"));
const VOCspage = lazy(() => import("./pages/VOCs"));

const App: React.FC = () => {
  const [theme, setTheme] = useState("light");
  // 상태 조회. state의 타입을 RootState로 지정해야 함
  const open = useSelector((state: RootState) => state.sideBar.open);

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
          <DimmedOut open={open} />
          <Header themeToggler={themeToggler} />
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/VOCs" component={VOCspage} />
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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: ${({ open }) => (open ? "#000000" : "#fff")};
  opacity: ${({ open }) => (open ? "0.6" : "0")};
`;
