import { useState } from "react";
import {
  Briefcase,
  Users,
  Plus,
  Search,
  Filter,
  TrendingUp,
  Mail,
  MapPin,
} from "lucide-react";

export function RecruiterDashboard() {
  const [activeTab, setActiveTab] = useState<"jobs" | "candidates">("jobs");
  const [showJobForm, setShowJobForm] = useState(false);

  // Mock data
  const jobs = [
    {
      id: 1,
      title: "Senior Machine Learning Engineer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      applicants: 42,
      posted: "2 days ago",
      status: "Active",
      requiredSkills: ["Python", "TensorFlow", "Deep Learning", "AWS"],
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "StartupXYZ",
      location: "Remote",
      type: "Full-time",
      applicants: 78,
      posted: "5 days ago",
      status: "Active",
      requiredSkills: ["React", "Node.js", "MongoDB", "Docker"],
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "Analytics Co.",
      location: "New York, NY",
      type: "Contract",
      applicants: 35,
      posted: "1 week ago",
      status: "Active",
      requiredSkills: ["Python", "R", "SQL", "Tableau"],
    },
  ];

  const candidates = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Machine Learning Engineer",
      matchScore: 94,
      skills: ["Python", "TensorFlow", "Machine Learning", "Data Analysis"],
      mbti: "INTJ",
      aptitude: { lrdi: 2, qa: 2, varc: 2 },
      location: "San Francisco, CA",
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "Full Stack Developer",
      matchScore: 88,
      skills: ["JavaScript", "React", "Node.js", "SQL"],
      mbti: "ENTP",
      aptitude: { lrdi: 3, qa: 2, varc: 3 },
      location: "Remote",
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Data Scientist",
      matchScore: 85,
      skills: ["Python", "R", "Statistics", "Machine Learning"],
      mbti: "INTP",
      aptitude: { lrdi: 3, qa: 3, varc: 2 },
      location: "New York, NY",
    },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Recruiter Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your job postings and discover AI-matched candidates
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-6">
            <div className="flex items-center justify-between mb-2">
              <Briefcase className="w-8 h-8 text-indigo-600" />
              <span className="text-xs text-gray-500">Total</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">12</p>
            <p className="text-sm text-gray-600">Active Jobs</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-purple-600" />
              <span className="text-xs text-gray-500">Total</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">248</p>
            <p className="text-sm text-gray-600">Total Applicants</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <span className="text-xs text-gray-500">This month</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">156</p>
            <p className="text-sm text-gray-600">AI Matches</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
            <div className="flex items-center justify-between mb-2">
              <Mail className="w-8 h-8 text-orange-600" />
              <span className="text-xs text-gray-500">Pending</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">23</p>
            <p className="text-sm text-gray-600">Interviews Scheduled</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-indigo-100 mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("jobs")}
              className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                activeTab === "jobs"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              My Job Postings
            </button>
            <button
              onClick={() => setActiveTab("candidates")}
              className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                activeTab === "candidates"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              AI-Matched Candidates
            </button>
          </div>

          {/* Jobs Tab */}
          {activeTab === "jobs" && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search jobs..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
                </div>
                <button
                  onClick={() => setShowJobForm(!showJobForm)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all"
                >
                  <Plus className="w-5 h-5" />
                  <span>Post New Job</span>
                </button>
              </div>

              {/* Job Form */}
              {showJobForm && (
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 mb-6 border border-indigo-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Post a New Job
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Job Title"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="Company Name"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Contract</option>
                      <option>Internship</option>
                    </select>
                  </div>
                  <textarea
                    placeholder="Job Description"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
                  />
                  <input
                    type="text"
                    placeholder="Required Skills (comma-separated)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
                  />
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setShowJobForm(false)}
                      className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all">
                      Post Job
                    </button>
                  </div>
                </div>
              )}

              {/* Job Listings */}
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-1">
                          {job.title}
                        </h3>
                        <p className="text-gray-600 mb-2">{job.company}</p>
                        <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {job.location}
                          </span>
                          <span>•</span>
                          <span>{job.type}</span>
                          <span>•</span>
                          <span>Posted {job.posted}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {job.status}
                        </span>
                        <p className="text-2xl font-bold text-indigo-600 mt-2">
                          {job.applicants}
                        </p>
                        <p className="text-sm text-gray-500">Applicants</p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        Required Skills:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {job.requiredSkills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                        View Applicants
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Edit
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Close
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Candidates Tab */}
          {activeTab === "candidates" && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search candidates..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                    <span>Filter by Skills</span>
                  </button>
                </div>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Sort by Match Score</option>
                  <option>Sort by Experience</option>
                  <option>Sort by Location</option>
                </select>
              </div>

              {/* Candidate Cards */}
              <div className="space-y-4">
                {candidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                          {candidate.name[0]}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-1">
                            {candidate.name}
                          </h3>
                          <p className="text-gray-600 mb-2">{candidate.role}</p>
                          <div className="flex items-center space-x-3 text-sm text-gray-500">
                            <span className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {candidate.location}
                            </span>
                            <span>•</span>
                            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-semibold">
                              MBTI: {candidate.mbti}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold text-lg">
                          {candidate.matchScore}%
                        </span>
                        <p className="text-xs text-gray-500 mt-1">AI Match</p>
                      </div>
                    </div>

                    {/* Aptitude Scores */}
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        Aptitude Scores:
                      </p>
                      <div className="flex space-x-4">
                        <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded text-sm">
                          LRDI: {candidate.aptitude.lrdi}/3
                        </span>
                        <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded text-sm">
                          QA: {candidate.aptitude.qa}/3
                        </span>
                        <span className="bg-pink-50 text-pink-700 px-3 py-1 rounded text-sm">
                          VARC: {candidate.aptitude.varc}/3
                        </span>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        Top Skills:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all">
                        View Full Profile
                      </button>
                      <button className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50">
                        Contact
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Save
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* API Integration Info */}
        <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-2">
            Integrate with Your ATS
          </h3>
          <p className="text-green-100 mb-4">
            Use our Agentic API to programmatically access candidate recommendations and job
            matching. Perfect for integrating with your existing recruitment systems.
          </p>
          <button className="bg-white text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition-all font-semibold">
            View API Documentation
          </button>
        </div>
      </div>
    </div>
  );
}
