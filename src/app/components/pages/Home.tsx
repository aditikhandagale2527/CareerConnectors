import { Link } from "react-router";
import {
  Brain,
  FileText,
  Target,
  TrendingUp,
  Briefcase,
  Code,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block mb-6">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 p-4 rounded-2xl">
              <Brain className="w-16 h-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 bg-clip-text text-transparent">
            Career Connector
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-4">
            AI-Powered Ecosystem Bridging Job Seekers & Employers
          </p>
          <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
            Democratizing career guidance through AI-driven resume analysis, cognitive aptitude
            testing, and personality profiling to provide data-backed career paths and identify
            skill gaps.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/student"
              className="flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-lg hover:shadow-lg transition-all"
            >
              <span>Get Started as Student</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/recruiter"
              className="flex items-center space-x-2 bg-white text-orange-600 px-8 py-4 rounded-lg border-2 border-orange-600 hover:bg-orange-50 transition-all"
            >
              <span>I'm a Recruiter</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 px-4 bg-white/60">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Powerful Features for Career Success
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-orange-100">
              <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                AI Career Recommender
              </h3>
              <p className="text-gray-600">
                Personalized job role suggestions powered by Gemini 1.5/2.0 Pro/Flash, analyzing
                your profile to find perfect career matches.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-red-100">
              <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Resume Insight Engine
              </h3>
              <p className="text-gray-600">
                Automated extraction of technical and soft skills from PDF resumes using advanced
                AI analysis.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-orange-100">
              <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Aptitude & Personality Mapping
              </h3>
              <p className="text-gray-600">
                Integration of LRDI, QA, VARC scores and MBTI types into intelligent
                recommendation logic.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-red-100">
              <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Skill Gap Analysis</h3>
              <p className="text-gray-600">
                Actionable recommendations on what to learn next based on market demand and your
                career goals.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-orange-100">
              <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Recruiter Portal</h3>
              <p className="text-gray-600">
                Secure platform for employers to post jobs and manage candidate requirements
                efficiently.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-red-100">
              <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Agentic API</h3>
              <p className="text-gray-600">
                Standalone FastAPI service for programmatic job recommendations and seamless
                integration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            How Career Connector Works
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {/* For Students */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-orange-100">
              <h3 className="text-2xl font-bold text-orange-600 mb-6">For Students</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Upload Your Resume</h4>
                    <p className="text-gray-600 text-sm">
                      AI extracts your skills, experience, and qualifications
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Take Aptitude Tests</h4>
                    <p className="text-gray-600 text-sm">
                      Complete LRDI, QA, and VARC assessments
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Personality Assessment</h4>
                    <p className="text-gray-600 text-sm">
                      MBTI profiling for career alignment
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Get AI Recommendations</h4>
                    <p className="text-gray-600 text-sm">
                      Receive personalized career paths and skill gap analysis
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Recruiters */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-red-100">
              <h3 className="text-2xl font-bold text-red-600 mb-6">For Recruiters</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Post Job Openings</h4>
                    <p className="text-gray-600 text-sm">
                      Create detailed job listings with requirements
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">AI-Matched Candidates</h4>
                    <p className="text-gray-600 text-sm">
                      Receive candidates that match your requirements
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Manage Applications</h4>
                    <p className="text-gray-600 text-sm">
                      Track and organize candidate pipeline efficiently
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Access via API</h4>
                    <p className="text-gray-600 text-sm">
                      Integrate with your existing recruitment systems
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Connect with Your Career?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of students and recruiters using AI-powered career guidance
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/student"
              className="bg-white text-orange-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all font-semibold"
            >
              Start as Student
            </Link>
            <Link
              to="/recruiter"
              className="bg-orange-700 text-white px-8 py-4 rounded-lg hover:bg-orange-800 transition-all border-2 border-white font-semibold"
            >
              Join as Recruiter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}