import {useEffect} from 'react'
import { useSelector } from 'react-redux'; //allows us to map state from our react-redux store
import { useHistory } from 'react-router-dom'

const mapState = ({ user }) => ({
    currentUser: user.currentUser
})

const useAuth = () => {
    const { currentUser } = useSelector(mapState);
    const history = useHistory()

    useEffect(() => {
        if (!currentUser) {
          history.push('/login')
        }
    },[currentUser])

    return currentUser
}

export default useAuth;