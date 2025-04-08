// components/LoginSelection.jsx
import { Link } from "react-router-dom";

export default function LoginSelection() {
  return (
    <section className="py-20 bg-blue-50 px-6 md:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-10">
          Get Started with QuizHub
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Student Card */}
          <Link
            to="/student-login"
            className="bg-white p-8 rounded-2xl shadow hover:shadow-lg border border-blue-100 transition duration-300 transform hover:-translate-y-1"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
              alt="Student Login"
              className="w-20 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-blue-700 mb-2">I'm a Student</h3>
            <p className="text-gray-600 text-sm">Take quizzes, track progress, and improve your skills.</p>
          </Link>

          {/* Admin Card */}
          <Link
            to="/admin-login"
            className="bg-white p-8 rounded-2xl shadow hover:shadow-lg border border-blue-100 transition duration-300 transform hover:-translate-y-1"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135767.png"
              alt="Admin Login"
              className="w-20 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-blue-700 mb-2">I'm an Educator</h3>
            <p className="text-gray-600 text-sm">Create quizzes, manage content, and view learner analytics.</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
