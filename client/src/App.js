import React, {useState, useEffect} from 'react'
import { auth } from './firebase/config'
import { Switch, Route } from 'react-router-dom'
//layouts
import MainLayout from './layouts/MainLayout'
import HomepageLayout from './layouts/HomepageLayout'
import Login from './pages/Login/Login'
import Homepage from './pages/Homepage'
import Registration from './pages/Registration'
import './default.scss'

const App = () => {
  const [authState, setAuthState] = useState({user: null});

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
        if (user) {
            const idTokenResult = await auth.currentUser.getIdTokenResult()

           setAuthState({
             user,
             token: idTokenResult
           })
        } else {
          setAuthState({
            user: null
          })
        }
    })
    //clean up
    return () => unsubscribe()
}, [])

  return (
    <div className='App'>
        <Switch>
          <Route exact path='/' render={() => (
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          )}/>
          <Route exact path='/registration' render={() => (
            <MainLayout>
              <Registration />
            </MainLayout>
          )}/><Route exact path='/login' render={() => (
            <MainLayout>
              <Login 
                authState={authState}
              />
            </MainLayout>
          )}/>
        </Switch>
    </div>
  )
}

export default App
