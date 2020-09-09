import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { auth, handleUserProfile } from './firebase/config'
import { Switch, Route, Redirect } from 'react-router-dom'
import { setCurrentUser } from './redux/User/user.actions'

// hoc
import WithAuth from './hoc/WithAuth'

//layouts
import MainLayout from './layouts/MainLayout'
import HomepageLayout from './layouts/HomepageLayout'
import Login from './pages/Login/Login'
import Recovery from './pages/Recovery'
import Homepage from './pages/Homepage'
import Registration from './pages/Registration'
import { ToastContainer } from 'react-toastify'
import Dashboard from './pages/Dashboard'
import 'react-toastify/dist/ReactToastify.css';
import './default.scss'

const App = (props) => {

  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth)
        userRef.onSnapshot(snapshot => {
          dispatch(setCurrentUser({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          }))
        })
      }
      dispatch(setCurrentUser(userAuth)) //should return null if user is not logged in
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
          <HomepageLayout>
            <Homepage />
          </HomepageLayout>
        )} />
        <Route exact path='/registration' render={() => (
          <MainLayout>
            <Registration />
          </MainLayout>
        )}
        />
        <Route exact path='/login' render={() => (
          <MainLayout>
            <Login />
          </MainLayout>
        )}
        />
        <Route path='/recovery' render={() => (
          <MainLayout>
            <Recovery />
          </MainLayout>
        )} />
        <Route path='/dashboard' render={() => (
          <WithAuth>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </WithAuth>
        )} />

      </Switch>
    </div>
  )
}


export default App;
