import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { auth, handleUserProfile } from './firebase/config'
import { Switch, Route, Redirect } from 'react-router-dom'
import { setCurrentUser } from './redux/User/user.actions'
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

const App = (props) => {
 
  const { currentUser, setCurrentUser } = props

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth)
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        })
      }
      setCurrentUser(userAuth) //should return null if user is not logged in
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

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
