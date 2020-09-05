import React, { useState, useEffect } from 'react'
import { auth, handleUserProfile } from './firebase/config'
import { Switch, Route, Redirect } from 'react-router-dom'
//layouts
import MainLayout from './layouts/MainLayout'
import HomepageLayout from './layouts/HomepageLayout'
import Login from './pages/Login/Login'
import Recovery from './pages/Recovery'
import Homepage from './pages/Homepage'
import Registration from './pages/Registration'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './default.scss'

const App = () => {
  const [authState, setAuthState] = useState({ currentUser: null });
  const { currentUser } = authState

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth)
        userRef.onSnapshot(snapshot => {
          setAuthState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        })
      }
      setAuthState({ currentUser: null })
    })
    //clean up
    return () => unsubscribe()
  }, [])

  return (
    <div className='App'>
      <ToastContainer
        position="top-center"
        autoClose={5000}
      />
      <Switch>
        <Route exact path='/' render={() => (
          <HomepageLayout currentUser={currentUser}>
            <Homepage />
          </HomepageLayout>
        )} />
        <Route exact path='/registration' render={() => (!currentUser ?
          <MainLayout>
            <Registration />
          </MainLayout>
          :
          <Redirect to="/" />
        )} /><Route exact path='/login' render={() => (!currentUser ?
          <MainLayout>
            <Login />
          </MainLayout>
          :
          <Redirect to="/" />
        )} />
        <Route path='/recovery' render={() => (
          <MainLayout>
            <Recovery />
          </MainLayout>
        )} />
      </Switch>
    </div>
  )
}

export default App
