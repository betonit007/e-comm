import { auth } from '../../firebase/config'
import { toast } from 'react-toastify'

export const handleResetPasswordAPI = (email) => {
    return new Promise((resolve, reject) => {

        auth.sendPasswordResetEmail(email, { url: "http://localhost:3000/login" }).then(() => {
            resolve();
        })
            .catch((err) => {
                toast.error(err.message)
                reject()
            })
    })
}