import React, { useState, useEffect } from 'react'
import {toast} from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { resetPasswordStart, resetUserState } from '../../redux/User/user.actions'
import AuthWrapper from '../AuthWrapper'
import FormInput from '../forms/FormInput'
import Button from '../forms/Button'
import './styles.scss'

const mapState = ({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    userErr: user.userErr
})

const EmailPassword = () => {
    const {resetPasswordSuccess} = useSelector(mapState)
    const dispatch = useDispatch()
    const history =  useHistory()
    const [email, setEmail] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(resetPasswordStart({ email }))
    }
    
    useEffect(() => {
      if(resetPasswordSuccess) {
        toast("Password request sent. Please check your email.")
        dispatch(resetUserState())
          history.push('/login')
      }
    }, [resetPasswordSuccess])

    return (
        <AuthWrapper headline="Email Password">
            <div className="formWrap">
                <form onSubmit={e=>handleSubmit(e)}>
                  <FormInput
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={e=>setEmail(e.target.value)}
                  />
                  <Button 
                    type="submit">
                      Email Password
                  </Button>
                </form>
            </div>
        </AuthWrapper>
    )
}

export default EmailPassword
