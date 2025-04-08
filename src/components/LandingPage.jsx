// src/pages/LandingPage.jsx
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import heroImage from "../assets/hero-quizhub.png"; // Place the new image in public or src/assets

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50">
        <Link to="/" className="text-3xl font-extrabold text-indigo-600 tracking-wide">QuizHub</Link>
        <div className="hidden md:flex space-x-8 items-center">
          {/* <Link to="/" className="text-gray-800 hover:text-indigo-600 transition">Home</Link> */}
          <Link to="/login" className="text-gray-800 hover:text-indigo-600 transition">Login</Link>
          <Link to="/signup" className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition">Sign Up</Link>
        </div>
        <button className="md:hidden focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className="w-6 h-0.5 bg-gray-700 mb-1"></div>
          <div className="w-6 h-0.5 bg-gray-700 mb-1"></div>
          <div className="w-6 h-0.5 bg-gray-700"></div>
        </button>
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 right-4 bg-white rounded-xl shadow-lg p-4 w-48 space-y-2 z-50">
            <Link to="/login" className="block hover:text-indigo-600">Login</Link>
            <Link to="/signup" className="block bg-indigo-600 text-white px-4 py-2 rounded-lg text-center hover:bg-indigo-700">Sign Up</Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-[#f8f9ff] py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="md:w-1/2 text-center md:text-left"
    >
      <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-800 leading-tight">
        Empower Your Learning.<br />Create Impactful Quizzes.
      </h1>
      <p className="mt-4 text-gray-700 text-lg">
        Join a platform where students learn smarter and educators create better.
      </p>
      <div className="mt-6 space-x-4">
        <Link to="/signup" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition">
          Get Started
        </Link>
        <Link to="/login" className="text-indigo-700 hover:underline font-medium">
          Explore Features
        </Link>
      </div>
    </motion.div>

    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="md:w-1/2"
    >
      <img
        src={heroImage}
        alt="QuizHub Illustration"
        className="w-full max-w-md mx-auto"
      />
    </motion.div>
  </div>
</section>


      {/* Why Choose Us Section */}
      <section className="py-20 bg-white px-6 md:px-20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-indigo-800 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Why Choose QuizHub?
          </motion.h2>
          <p className="text-gray-600 mb-12 text-lg">
            Discover the smart features that make QuizHub the best place to learn, test, and grow.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "User-Friendly Interface",
                img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                desc: "Simple and intuitive design for both learners and educators."
              },
              {
                title: "Smart Analytics",
                img: "https://cdn-icons-png.flaticon.com/512/2985/2985150.png",
                desc: "Track progress, analyze performance, and get meaningful insights."
              },
              {
                title: "Custom Quiz Creation",
                img: "https://cdn-icons-png.flaticon.com/512/4712/4712103.png",
                desc: "Easily create quizzes with subjects, topics, and difficulty levels."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-indigo-50 p-6 rounded-2xl shadow hover:shadow-lg transition"
                whileHover={{ scale: 1.05 }}
              >
                <img src={item.img} alt={item.title} className="w-16 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-indigo-700 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 px-6">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">QuizHub</h2>
          <p className="text-sm">Where learners grow & educators create.</p>
          <div className="flex justify-center space-x-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white"><FaGithub size={20} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white"><FaLinkedin size={20} /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white"><FaTwitter size={20} /></a>
          </div>
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} QuizHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
