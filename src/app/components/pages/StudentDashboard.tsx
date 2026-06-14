import { Link } from "react-router";
import {
  FileUp,
  Brain,
  Target,
  TrendingUp,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export function StudentDashboard() {
  const progress = {
    resume: true,
    aptitude: false,
    personality: false,
    recommendations: false,
  };

  const completionPercentage = Object.values(progress).filter(Boolean).length * 25;

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Header */}
        <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome to Your Career Journey
          </h1>
          <p className="text-gray-600 mb-6">
            Complete all steps to unlock personalized AI-powered career recommendations
          </p>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Profile Completion</span>
              <span className="text-indigo-600 font-semibold">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-indigo-600 to-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Step 1: Resume Upload */}
          <Link
            to="/student/resume"
            className="bg-white rounded-xl shadow-sm border border-orange-100 p-6 hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center">
                <FileUp className="w-6 h-6 text-orange-600" />
              </div>
              {progress.resume ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <div className="bg-gray-200 w-6 h-6 rounded-full" />
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Step 1: Upload Resume
            </h3>
            <p className="text-gray-600 mb-4">
              Upload your resume and let AI extract your technical and soft skills automatically
            </p>
            <div className="flex items-center text-orange-600 group-hover:translate-x-2 transition-transform">
              <span className="font-semibold">
                {progress.resume ? "Review Resume" : "Start Now"}
              </span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </Link>

          {/* Step 2: Aptitude Test */}
          <Link
            to="/student/aptitude"
            className="bg-white rounded-xl shadow-sm border border-red-100 p-6 hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-red-600" />
              </div>
              {progress.aptitude ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <div className="bg-gray-200 w-6 h-6 rounded-full" />
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Step 2: Aptitude Assessment
            </h3>
            <p className="text-gray-600 mb-4">
              Complete LRDI, QA, and VARC tests to evaluate your cognitive abilities
            </p>
            <div className="flex items-center text-red-600 group-hover:translate-x-2 transition-transform">
              <span className="font-semibold">
                {progress.aptitude ? "View Results" : "Take Test"}
              </span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </Link>

          {/* Step 3: Personality Test */}
          <Link
            to="/student/personality"
            className="bg-white rounded-xl shadow-sm border border-orange-100 p-6 hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
              {progress.personality ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <div className="bg-gray-200 w-6 h-6 rounded-full" />
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Step 3: Personality Profiling
            </h3>
            <p className="text-gray-600 mb-4">
              Complete MBTI assessment to understand your personality type and career fit
            </p>
            <div className="flex items-center text-orange-600 group-hover:translate-x-2 transition-transform">
              <span className="font-semibold">
                {progress.personality ? "View Profile" : "Start Assessment"}
              </span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </Link>

          {/* Step 4: Career Recommendations */}
          <Link
            to="/student/recommendations"
            className="bg-white rounded-xl shadow-sm border border-red-100 p-6 hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
              {progress.recommendations ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <div className="bg-gray-200 w-6 h-6 rounded-full" />
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Step 4: AI Career Recommendations
            </h3>
            <p className="text-gray-600 mb-4">
              Get personalized job recommendations and skill gap analysis powered by Gemini AI
            </p>
            <div className="flex items-center text-red-600 group-hover:translate-x-2 transition-transform">
              <span className="font-semibold">Get Recommendations</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </Link>
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-6 text-white">
            <h3 className="text-2xl font-bold mb-2">AI-Powered</h3>
            <p className="text-orange-100">
              Our Gemini-powered AI analyzes thousands of data points to provide accurate career guidance
            </p>
          </div>
          <div className="bg-gradient-to-br from-red-500 to-orange-600 rounded-xl p-6 text-white">
            <h3 className="text-2xl font-bold mb-2">Data-Backed</h3>
            <p className="text-red-100">
              All recommendations are based on real market demand and industry trends
            </p>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-6 text-white">
            <h3 className="text-2xl font-bold mb-2">Personalized</h3>
            <p className="text-orange-100">
              Every career path is customized to your unique skills, aptitude, and personality
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
