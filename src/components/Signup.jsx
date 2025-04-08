import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
  
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }
  
    setLoading(true);
  
    try {
      const userCred = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCred.user;
  
      await updateProfile(user, { displayName: formData.name });
  
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        createdAt: serverTimestamp(),
      });
  
      toast.success('Account created successfully!');
  
      setLoading(false);
  
      if (formData.role === 'student') {
        navigate('/student-login');
      } else if (formData.role === 'admin') {
        navigate('/admin-login');
      }
  
    } catch (err) {
      toast.error(err.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-100">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        {error && <p className="text-red-500 mb-3 text-center">{error}</p>}
        {loading && <p className="text-blue-500 mb-3 text-center">Creating your account...</p>}

        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={formData.name}
          placeholder="Name"
          required
          className="w-full mb-3 px-4 py-2 border rounded-lg"
        />
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
          placeholder="Email"
          required
          className="w-full mb-3 px-4 py-2 border rounded-lg"
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
          placeholder="Password"
          required
          className="w-full mb-3 px-4 py-2 border rounded-lg"
        />
        <input
          type="password"
          name="confirmPassword"
          onChange={handleChange}
          value={formData.confirmPassword}
          placeholder="Confirm Password"
          required
          className="w-full mb-3 px-4 py-2 border rounded-lg"
        />

        <select
          name="role"
          onChange={handleChange}
          value={formData.role}
          required
          className="w-full mb-4 px-4 py-2 border rounded-lg"
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Signup;
