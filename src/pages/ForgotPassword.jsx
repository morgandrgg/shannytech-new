import React, { useState } from 'react';
import { Form, FormGroup } from 'reactstrap';
import { auth } from '../firebase.config';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await auth.sendPasswordResetEmail(email);
      toast.success('Password reset link sent to your email.');
      setEmail('');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Form onSubmit={handleResetPassword}>
      <FormGroup>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </FormGroup>
      <button type="submit" className="auth_btn">
        Reset Password
      </button>
    </Form>
  );
};

export default ForgotPassword;
