import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student Login Card */}
        <Link to="/student-login" className="bg-white rounded-2xl shadow-md hover:shadow-lg p-8 text-center transition-all duration-300">
          <h2 className="text-2xl font-bold text-blue-600 mb-2">Student Login</h2>
          <p className="text-gray-600">Access quizzes, track progress, and grow your knowledge.</p>
        </Link>

        {/* Admin Login Card */}
        <Link to="/admin-login" className="bg-white rounded-2xl shadow-md hover:shadow-lg p-8 text-center transition-all duration-300">
          <h2 className="text-2xl font-bold text-orange-600 mb-2">Admin Login</h2>
          <p className="text-gray-600">Create quizzes, manage students, and view performance.</p>
        </Link>
      </div>
    </div>
  );
}
