import React, { useEffect } from 'react'
import { auth, provider } from '../../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate , Navigate} from 'react-router-dom'
import useGetUserInfo from '../../hooks/useGetUserInfo'
import './styles.css'

function Auth() {

    const navigate = useNavigate()
    const {isAuth} = useGetUserInfo()
    const signInWithGoogle = async () => { 
        const results = await signInWithPopup(auth, provider)
        const authInfo = {
            userID: results.user.uid,
            name: results.user.displayName,
            profilePhoto: results.user.photoURL,
            isAuth: true
        }
        localStorage.setItem('auth', JSON.stringify(authInfo))
        navigate('/expense-tracker')
    }

    if (isAuth) {
        <Navigate to='/expense-tracker'/>
    } else {
        <Navigate to="/" />;
    }
    
  return (
    <div className="login-page">
      <p>Sign In with Google to Continue</p>
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign In With Google
      </button>
      <h3 style={{ position: "absolute", bottom: 0 }}>
        Karthik Vinod ©{new Date().getFullYear()}-{new Date().getFullYear()%100 + 1}
      </h3>
    </div>
  );
}

export default Auth