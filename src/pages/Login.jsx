import React, {useState} from 'react'
import Helmet from '../components/Helmet/Helmet'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { auth, googleProvider } from '../firebase.config';
import ForgotPassword from './ForgotPassword';

import { toast } from 'react-toastify'


import '../styles/login.css'


const Login = () => {

  const [email, setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const signIn = async (e) =>{
    e.preventDefault()
    setLoading(true)
    try{
      const userCredential = await signInWithEmailAndPassword(auth,email, password)

      const user = userCredential.user

      console.log(user)
      setLoading(false)
      toast.success("Succesfully logged in")
      navigate('/checkout')

    }catch(error){
      setLoading(false)
      toast.error(error.message)
    }
  }

  const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const user = result.user;

    // Perform actions with the obtained credentials and user data
    console.log(credential);
    console.log(user);

    toast.success('Successfully logged in with Google');
    navigate('/checkout');
  } catch (error) {
    toast.error('Something went wrong');
  }
};


  return (     <Helmet title="Login">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className="text-center">
                <h5 className="fw-bold">Loading......</h5>
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold mb-4">Login</h3>
                <Form className="auth_form" onSubmit={signIn}>
                  <FormGroup className="form_group">
                    <input
                      type="text"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="form_group">
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <div className="d-flex flex-column">
                    <button type="submit" className="auth_btn">
                      Login
                    </button>
                    <button
                      type="button"
                      className="auth_btn google_btn"
                      onClick={handleGoogleLogin}
                      disabled={loading}
                    >
                      Login with Google
                    </button>
                    <button
                      type="button"
                      className="forgot_password_btn"
                      onClick={() => setShowForgotPassword(true)}
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <p>
                    Don't have an account? <Link to="/signup">Create an account</Link>
                  </p>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
      {showForgotPassword && (
        <div className="forgot_password_modal">
          <div className="modal_content">
            <span className="close_modal" onClick={() => setShowForgotPassword(false)}>
              &times;
            </span>
            <h4>Forgot Password</h4>
            <ForgotPassword />
          </div>
        </div>
      )}
    </Helmet>
  );
};

export default Login