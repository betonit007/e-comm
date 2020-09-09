import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { resetPassword, resetAllAuthForms } from '../../redux/User/user.actions'
import AuthWrapper from '../AuthWrapper'
import FormInput from '../forms/FormInput'
import Button from '../forms/Button'
import './styles.scss'

const mapState = ({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    
})

const EmailPassword = ({history}) => {
    const {resetPasswordSuccess} = useSelector(mapState)
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(resetPassword({ email }))
    }
    
    useEffect(() => {
      if(resetPasswordSuccess) {
        dispatch(resetAllAuthForms())
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

export default withRouter(EmailPassword)
