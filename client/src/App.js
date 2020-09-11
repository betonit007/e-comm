import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { checkUserSession } from './redux/User/user.actions'
import AdminToolbar from './components/AdminToolbar'

// hoc
import WithAuth from './hoc/WithAuth'
import WithAdminAuth from './hoc/withAdminAuth'

//layouts
import MainLayout from './layouts/MainLayout'
import HomepageLayout from './layouts/HomepageLayout'
import Login from './pages/Login/Login'
import Recovery from './pages/Recovery'
import Homepage from './pages/Homepage'
import Registration from './pages/Registration'
import { ToastContainer } from 'react-toastify'
import Dashboard from './pages/Dashboard'
import Admin from './pages/admin'
import 'react-toastify/dist/ReactToastify.css';
import './default.scss'

const App = (props) => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUserSession())
  }, [])

  return (
    <div className='App'>
      <ToastContainer
        position="top-center"
        autoClose={5000}
      />
      <AdminToolbar />
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
        <Route path='/admin' render={() => (
          <WithAdminAuth>
            <MainLayout>
              <Admin />
            </MainLayout>
          </WithAdminAuth>
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
