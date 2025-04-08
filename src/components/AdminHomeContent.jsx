// src/components/AdminHome.jsx

import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiEdit, FiClipboard, FiBarChart2, FiMessageCircle, FiSettings } from 'react-icons/fi';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

const AdminHome = () => {
  const [adminData, setAdminData] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.role === 'admin') {
            setAdminData(data);
          } else {
            toast.error('Access denied.');
            navigate('/');
          }
        }
      } else {
        navigate('/admin-login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    toast.success('Logged out successfully!');
    navigate('/');
  };

  const cards = [
    {
      title: 'Create Quiz',
      icon: <FiEdit className="text-orange-600 text-3xl mb-2" />,
      desc: 'Design and publish new quizzes for students.',
      border: 'border-orange-500',
      text: 'text-orange-700'
    },
    {
      title: 'View Submissions',
      icon: <FiClipboard className="text-blue-600 text-3xl mb-2" />,
      desc: 'Review quiz submissions and results.',
      border: 'border-blue-500',
      text: 'text-blue-700'
    },
    {
      title: 'Leaderboard',
      icon: <FiBarChart2 className="text-green-600 text-3xl mb-2" />,
      desc: 'Track top performers across all quizzes.',
      border: 'border-green-500',
      text: 'text-green-700'
    },
    {
      title: 'Analytics',
      icon: <FiBarChart2 className="text-purple-600 text-3xl mb-2" />,
      desc: 'View quiz performance trends and data.',
      border: 'border-purple-500',
      text: 'text-purple-700'
    },
    {
      title: 'Feedback',
      icon: <FiMessageCircle className="text-pink-600 text-3xl mb-2" />,
      desc: 'Read student feedback and suggestions.',
      border: 'border-pink-500',
      text: 'text-pink-700'
    },
    {
      title: 'Settings',
      icon: <FiSettings className="text-gray-600 text-3xl mb-2" />,
      desc: 'Manage account and application settings.',
      border: 'border-gray-400',
      text: 'text-gray-700'
    }
  ];

  if (adminData === null) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
        Loading...
      </div>
    );
  }
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 relative flex flex-col">
      {/* Background Circles */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-orange-100 rounded-full opacity-30 blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-100 rounded-full opacity-30 blur-3xl -z-10"></div>

      {/* Navbar */}
      <nav className="bg-orange-600 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">QuizHub</h1>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-white text-2xl focus:outline-none"
          >
            <FiUser />
          </button>
          <AnimatePresence>
            {dropdownOpen && adminData && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg py-2 z-50"
              >
                <p className="px-4 py-2 border-b font-semibold">{adminData.name}</p>
                <p className="px-4 py-2 text-sm">{adminData.email}</p>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                >
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="py-6 px-4 text-center">
        <h1 className="text-4xl font-bold text-orange-700 mb-2">
          Welcome back, {adminData?.name || 'Admin'}!
        </h1>
        <p className="text-lg text-gray-700 max-w-xl mx-auto">
          Ready to manage quizzes and monitor student performance? Dive into the admin dashboard now!
        </p>
      </div>

      {/* Feature Cards */}
      <div className="py-6 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {cards.map((card, index) => (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            key={index}
            className={`bg-white shadow hover:shadow-md transition rounded-xl p-6 text-center border-t-4 ${card.border} flex flex-col justify-between h-48`}
          >
            {card.icon}
            <h3 className={`text-xl font-bold ${card.text} mb-1`}>{card.title}</h3>
            <p className="text-gray-600 text-sm">{card.desc}</p>
          </motion.button>
        ))}
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 border-t py-4 mt-auto">
        © {new Date().getFullYear()} QuizHub Admin. All rights reserved.
      </footer>
    </div>
  );
};

export default AdminHome;
