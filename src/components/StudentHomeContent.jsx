// src/components/StudentHome.jsx

import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBookOpen, FaClock, FaBookmark, FaFire, FaChartLine, FaTrophy } from 'react-icons/fa';

const StudentHome = () => {
  const [userData, setUserData] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
    } else {
        setUserData(null); // Just reset data, don’t redirect here
      }
      
    });
  
    return () => unsubscribe();
  }, [navigate]);
  

  const handleLogout = async () => {
    await signOut(auth);
    toast.success('Logged out successfully!');
    navigate('/'); // 👈 redirect to landing page instead of login
  };

  const features = [
    {
      title: 'Practice Mode',
      border: 'border-blue-600',
      text: 'text-blue-700',
      desc: 'Practice at your own pace with unlimited questions.',
      icon: <FaBookOpen className="text-blue-600 text-3xl mb-2 mx-auto" />, 
    },
    {
      title: 'Test Mode',
      border: 'border-green-500',
      text: 'text-green-700',
      desc: 'Take real-time quizzes with a countdown timer.',
      icon: <FaClock className="text-green-500 text-3xl mb-2 mx-auto" />,
    },
    {
      title: 'Bookmarked Questions',
      border: 'border-yellow-500',
      text: 'text-yellow-700',
      desc: "Review questions you've bookmarked for later.",
      icon: <FaBookmark className="text-yellow-500 text-3xl mb-2 mx-auto" />,
    },
    {
      title: 'Streak',
      border: 'border-purple-500',
      text: 'text-purple-700',
      desc: 'Keep your learning streak alive day by day!',
      icon: <FaFire className="text-purple-500 text-3xl mb-2 mx-auto" />,
    },
    {
      title: 'Progress',
      border: 'border-pink-500',
      text: 'text-pink-700',
      desc: 'Track your improvement over time with analytics.',
      icon: <FaChartLine className="text-pink-500 text-3xl mb-2 mx-auto" />,
    },
    {
      title: 'Leaderboard',
      border: 'border-indigo-500',
      text: 'text-indigo-700',
      desc: 'See where you rank among top performers.',
      icon: <FaTrophy className="text-indigo-500 text-3xl mb-2 mx-auto" />,
    },
  ];

  if (userData === null) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
        Loading...
      </div>
    );
  }
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative flex flex-col">
      {/* Background Circles */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-100 rounded-full opacity-30 blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full opacity-30 blur-3xl -z-10"></div>

      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">QuizHub</h1>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-white text-2xl focus:outline-none"
          >
            <FiUser />
          </button>
    <AnimatePresence>
  {dropdownOpen && userData && (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg py-2 z-50"
    >
      <p className="px-4 py-2 border-b font-semibold">{userData.name}</p>
      <p className="px-4 py-2 text-sm">{userData.email}</p>
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
        <h1 className="text-4xl font-bold text-blue-700 mb-2">
          Welcome back, {userData?.name || 'Student'}!
        </h1>
        <p className="text-lg text-gray-700 max-w-xl mx-auto">
          Ready to test your knowledge today? Dive into practice mode, take a timed quiz, or check your progress. QuizHub is here to help you learn smarter!
        </p>
      </div>

      {/* Features Section */}
      <div className="py-6 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((card, index) => (
          <button
            key={index}
            className={`bg-white shadow hover:shadow-xl hover:scale-105 transform transition-all duration-300 rounded-xl p-6 text-center border-t-4 ${card.border} flex flex-col justify-between h-52`}
          >
            {card.icon}
            <h3 className={`text-xl font-bold ${card.text} mb-2`}>{card.title}</h3>
            <p className="text-gray-600 text-sm">{card.desc}</p>
          </button>
        ))}
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 border-t py-4 mt-auto">
        © {new Date().getFullYear()} QuizHub. All rights reserved.
      </footer>
    </div>
  );
};

export default StudentHome;
