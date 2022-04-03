import React, { useState, useEffect, Suspense, MouseEvent } from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import ReactGA from 'react-ga'
import { useSelector, useDispatch } from 'react-redux'
import styled, { ThemeProvider } from 'styled-components'

import { RootState } from './modules'
import { handleSearch, handleClose } from './modules/dictionary'
import { handleSideBar } from './modules/sideBar'
import { lightTheme, darkTheme } from './Theme'
import GlobalStyle from './globalStyles'
import LoadingPage from './components/pages/Load'
import ScrollToTop from './components/atom/ScrollToTop'
import Header from './components/organism/Header'
import Dictionary from './components/organism/Dictionary'
import VOCsPerProduct from './components/pages/VOCsPerProduct'
import VOCsPerUsage from './components/pages/VOCsPerUsage'
import VOCsPerDistribution from './components/pages/VOCsPerDistribution'
import SideBar from './components/organism/SideBar';

const DimmedOut = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: ${({ open }) => (open ? '#000000' : '#fff')};
  opacity: ${({ open }) => (open ? '0.6' : '0')};
  display: ${({ open }) => (open ? 'flex' : 'none')};
  z-index: 2;
`

function App() {
  const [theme, setTheme] = useState('light')
  const open = useSelector((state: RootState) => state.sideBar.open)
  const search = useSelector((state: RootState) => state.dictionary.search)
  const close = useSelector((state: RootState) => state.dictionary.close)

  const dispatch = useDispatch()
  const clickToOpen = () => dispatch(handleSideBar())
  const clickToSearch = (e: MouseEvent<HTMLElement>) => dispatch(handleSearch(e))
  
  const clickToClose = () => dispatch(handleClose())

  useEffect(() => {
    ReactGA.initialize('UA-*********-*') // Google Analytics 추적 ID
    // 페이지 뷰 리포트
    ReactGA.pageview(window.location.pathname)
  }, [])
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }
  return (
    <Router>
      <Suspense fallback={<LoadingPage />}>
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
          <GlobalStyle />
          <ScrollToTop />
          <DimmedOut onClick={clickToOpen} open={open} />
          <Header handleToggle={themeToggler} />
          {/* 네비게이션 메뉴 */}
          <SideBar open={open} />
          <Dictionary search={search} close={close} clickToClose={clickToClose} />
          <Switch>
            <Route exact path="/" render={() => <VOCsPerProduct close={close} clickToSearch={clickToSearch} />} />
            <Route exact path="/disposable-vs-reusable" render={() => <VOCsPerUsage close={close} clickToSearch={clickToSearch} />} />
            <Route exact path="/domestic-vs-overseas" render={() => <VOCsPerDistribution close={close} clickToSearch={clickToSearch} />} />
          </Switch>
        </ThemeProvider>
      </Suspense>
    </Router>
  )
}

export default App

