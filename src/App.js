import React, { useEffect, Suspense, lazy } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import ReactGA from "react-ga";
import { connect } from "react-redux";

import GlobalStyle from "./globalStyles";
import LoadingPage from "./pages/loading";
import ScrollToTop from "./ScrollToTop";
import Header from "./components/Header";

const Homepage = lazy(() => import("./pages/index"));

function App() {
  useEffect(() => {
    ReactGA.initialize("UA-*********-*"); // Google Analytics 추적 ID
    // 페이지 뷰 리포트
    ReactGA.pageview(window.location.pathname);
  }, []);
  return (
    <Router>
      <Suspense fallback={<LoadingPage />}>
        <GlobalStyle />
        <ScrollToTop />
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
        </Switch>
      </Suspense>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  open: state.sidebar.open,
});

const mapDispatchToProps = (dispatch) => ({
  openSideBar: () => {
    console.log("open");
  },
  closeSideBar: () => {
    console.log("close");
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
