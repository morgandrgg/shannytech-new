import React, { useState } from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup, Progress } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';
import { auth, storage, db, googleProvider } from '../firebase.config';
import { toast } from 'react-toastify';
import bcrypt from 'bcryptjs';
import '../styles/login.css';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const navigate = useNavigate()

  const signup = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    if (password.length < 8) {
      toast.error('Password should be at least 8 characters long');
      setLoading(false);
      return;
    }

    
     const hashedPassword = await bcrypt.hash(password, 10);

    const userCredential = await createUserWithEmailAndPassword(auth, email, hashedPassword);
    const user = userCredential.user;

    const storageRef = ref(storage, `images/${Date.now() + username}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          // Update user profile
          await updateProfile(user, {
            displayName: username,
            photoURL: downloadURL,
          });

          // Store user data in Firestore
          await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            displayName: username,
            email,
            photoURL: downloadURL,
          });
        });
      }
    );

    setLoading(false);
    toast.success('Account created');
    navigate('/login');
  } catch (error) {
    setLoading(false);
    toast.error('Something went wrong');
  } finally {
    setLoading(false);
    setUploadProgress(0);
  }
};

  const handleGoogleSignup = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const user = result.user;

    if (credential && user) {
      await updateProfile(user, {
        displayName: user.displayName,
        photoURL: user.photoURL,
      });

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });

      toast.success('Account created');
      navigate('/login');
    }
  } catch (error) {
    toast.error('Something went wrong');
  }
};

const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
};



  return (
    <Helmet title="Signup">
      <section>
        <Container>
          <Row>
            {
              loading ? <Col lg='12' className='text-center'>
                <h5 className='fw-bold'>Loading...</h5>
                </Col> : <Col lg="6" className="m-auto text-center">
              <h3 className="fw-bold mb-4">Signup</h3>

              <Form className="auth_form" onSubmit={signup}>
                <FormGroup className="form_group">
                  <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </FormGroup>

                <FormGroup className="form_group">
                  <input type="text" placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormGroup>

              <FormGroup className="form_group">
                <div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required                  
                  />
                  <button
                    type="button"
                    className="password_toggle_btn"
                    onClick={togglePasswordVisibility}
                  >
                  {showPassword ? <i className='ri-eye-close-line'></i> : <i className='ri-eye-line'></i>}
                  </button>              
                </div>

              </FormGroup>

              <FormGroup className="form_group">
                <input
                  type="file" accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </FormGroup>

              {uploadProgress > 0 && (
                <Progress value={uploadProgress} max="100" />
              )}

              <div className="sigup_btn d-flex flex-column">
                <button
                type="submit"
                className="auth_btn"
                disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
              <button
                  type="button"
                  className="auth_btn google_btn"
                  onClick={handleGoogleSignup}
                  disabled={loading}>
                  Sign up with Google
                </button>
              </div>

              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </Form>
          </Col>
            }
        </Row>
      </Container>
    </section>
  </Helmet>
);
}
export default Signup;
