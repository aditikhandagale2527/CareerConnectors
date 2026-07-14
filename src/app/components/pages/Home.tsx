import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import {
  Brain,
  FileText,
  Target,
  TrendingUp,
  Briefcase,
  Code,
  ArrowRight,
  CheckCircle,
  Search,
  MapPin,
  ExternalLink,
} from "lucide-react";
import API from "../../src/api/config";

export function Home() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");

  // Internal jobs (your own MongoDB postings)
  const [allJobs, setAllJobs] = useState<any[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [applying, setApplying] = useState<string | null>(null);
  const [applyResult, setApplyResult] = useState<{ jobId: string; score: number; status: string } | null>(null);

  // External jobs (Adzuna live jobs)
  const [externalJobs, setExternalJobs] = useState<any[]>([]);
  const [loadingExternal, setLoadingExternal] = useState(false);
  const [externalError, setExternalError] = useState("");

  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    fetchInternalJobs();
    const saved = localStorage.getItem("appliedJobs");
    if (saved) setAppliedJobs(JSON.parse(saved));
  }, []);

  const fetchInternalJobs = async () => {
    try {
      const res = await API.get("/api/jobs/");
      setAllJobs(res.data);
    } catch {
      console.error("Failed to fetch jobs");
    } finally {
      setLoadingJobs(false);
    }
  };

  const fetchExternalJobs = async () => {
    if (!searchTerm) {
      setExternalJobs([]);
      return;
    }
    setLoadingExternal(true);
    setExternalError("");
    try {
      const APP_ID = "6ebc4d79";
      const APP_KEY = "af35a7e9114699045882fad30f1bc05a";
      const whereParam = location || "India";
      const response = await fetch(
        `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${APP_ID}&app_key=${APP_KEY}&results_per_page=6&what=${encodeURIComponent(
          searchTerm
        )}&where=${encodeURIComponent(whereParam)}&content-type=application/json`
      );
      const data = await response.json();
      setExternalJobs(data.results || []);
      if (!data.results || data.results.length === 0) {
        setExternalError("No live jobs found for this search.");
      }
    } catch {
      setExternalError("Failed to fetch live jobs.");
    } finally {
      setLoadingExternal(false);
    }
  };

  const handleSearch = () => {
    setHasSearched(true);
    fetchExternalJobs();
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleApply = async (jobId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first to apply for jobs!");
      navigate("/login");
      return;
    }

    if (appliedJobs.includes(jobId)) {
      alert("You have already applied for this job!");
      return;
    }

    setApplying(jobId);
    try {
      const res = await API.post("/api/applications/apply", { job_id: jobId });

      const updated = [...appliedJobs, jobId];
      setAppliedJobs(updated);
      localStorage.setItem("appliedJobs", JSON.stringify(updated));

      setApplyResult({
        jobId: jobId,
        score: res.data.match_score,
        status: res.data.status,
      });
    } catch (err: any) {
      const detail = err?.response?.data?.detail;

      if (detail === "Already applied") {
        alert("You have already applied for this job!");
      } else if (detail === "Please upload your resume before applying for jobs") {
        alert("⚠️ Please upload your resume first before applying!");
        navigate("/student/resume");
      } else {
        alert(detail || "Failed to apply. Please try again.");
      }
    } finally {
      setApplying(null);
    }
  };

  const handleExternalApply = (redirectUrl: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first to apply for jobs!");
      navigate("/login");
      return;
    }
    window.open(redirectUrl, "_blank");
  };

  const searchLower = searchTerm.toLowerCase();
  const locationLower = location.toLowerCase();

  const internalResults = allJobs.filter((job) => {
    const matchesSearch =
      !searchTerm ||
      job.title?.toLowerCase().includes(searchLower) ||
      job.company?.toLowerCase().includes(searchLower) ||
      job.skills_required?.some((s: string) => s.toLowerCase().includes(searchLower));
    const matchesLocation = !location || job.location?.toLowerCase().includes(locationLower);
    return matchesSearch && matchesLocation;
  });

  const displayedInternalJobs = hasSearched ? internalResults : allJobs.slice(0, 6);

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

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="bg-white rounded-xl shadow-lg border border-orange-100 p-2 flex flex-col md:flex-row gap-2">
              <div className="flex items-center flex-1 px-3">
                <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setHasSearched(true);
                  }}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Job title, skills, or company"
                  className="w-full px-3 py-3 outline-none text-gray-700"
                />
              </div>
              <div className="hidden md:block w-px bg-gray-200" />
              <div className="flex items-center flex-1 px-3">
                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    setHasSearched(true);
                  }}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Location"
                  className="w-full px-3 py-3 outline-none text-gray-700"
                />
              </div>
              <button
                onClick={handleSearch}
                className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span>Search Jobs</span>
              </button>
            </div>
          </div>

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

      {/* Match Result Popup */}
      {applyResult && (
        <div className="max-w-6xl mx-auto px-4">
          <div
            className={`mb-6 p-5 rounded-xl border-2 ${
              applyResult.status === "shortlisted"
                ? "bg-green-50 border-green-400"
                : "bg-red-50 border-red-400"
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="text-3xl">{applyResult.status === "shortlisted" ? "🎉" : "📋"}</div>
              <div>
                <h3
                  className={`font-bold text-lg ${
                    applyResult.status === "shortlisted" ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {applyResult.status === "shortlisted"
                    ? "Congratulations! You've been shortlisted! 🎉"
                    : "Not shortlisted this time"}
                </h3>
                <p className="text-gray-600 mt-1">
                  Your skill match score: <span className="font-bold text-lg">{applyResult.score}%</span>
                </p>
                <button
                  onClick={() => setApplyResult(null)}
                  className="mt-3 text-sm text-gray-400 hover:text-gray-600 underline"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Jobs Posted on Career Connector */}
      <section className="py-16 px-4 bg-white/60">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                {hasSearched ? `On Career Connector (${internalResults.length})` : "Featured Jobs"}
              </h2>
              <p className="text-gray-500 text-sm mt-1">Apply directly with AI-powered skill matching</p>
            </div>
            <Link
              to="/livejobs"
              className="text-orange-600 font-semibold hover:text-orange-700 flex items-center space-x-1"
            >
              <span>View All Jobs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loadingJobs ? (
            <div className="text-center py-12">
              <div className="w-10 h-10 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          ) : displayedInternalJobs.length === 0 ? (
            <div className="bg-white rounded-xl p-10 text-center shadow-sm border border-orange-100">
              <Briefcase className="w-12 h-12 text-orange-300 mx-auto mb-3" />
              <p className="text-gray-600">
                {hasSearched
                  ? "No jobs posted on Career Connector match your search."
                  : "No jobs posted yet. Check back soon!"}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedInternalJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-orange-100 flex flex-col"
                >
                  <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-2 py-0.5 rounded-full mb-2 w-fit">
                    Career Connector
                  </span>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{job.title}</h3>
                  <p className="text-orange-600 font-medium text-sm mb-2">{job.company}</p>
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {job.location}
                  </div>
                  {job.description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{job.description}</p>
                  )}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills_required?.slice(0, 4).map((skill: string, i: number) => (
                      <span
                        key={i}
                        className="bg-orange-50 text-orange-600 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto">
                    {appliedJobs.includes(job._id) ? (
                      <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg w-fit">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Applied!</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleApply(job._id)}
                        disabled={applying === job._id}
                        className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center space-x-2 w-full justify-center"
                      >
                        {applying === job._id ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            <span>Applying...</span>
                          </>
                        ) : (
                          <span>Apply Now</span>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Live Jobs from Adzuna (only shown once a search has been made) */}
      {hasSearched && searchTerm && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-gray-800">Live Jobs from Across India</h2>
              <p className="text-gray-500 text-sm mt-1">Real jobs from other companies — apply on their site</p>
            </div>

            {loadingExternal ? (
              <div className="text-center py-12">
                <div className="w-10 h-10 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-gray-600 text-sm">Searching live jobs...</p>
              </div>
            ) : externalError ? (
              <div className="bg-white rounded-xl p-10 text-center shadow-sm border border-orange-100">
                <Briefcase className="w-12 h-12 text-orange-300 mx-auto mb-3" />
                <p className="text-gray-600">{externalError}</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {externalJobs.map((job: any, index: number) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200 flex flex-col"
                  >
                    <span className="inline-block bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-0.5 rounded-full mb-2 w-fit">
                      Live Job
                    </span>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{job.title}</h3>
                    <p className="text-orange-600 font-medium text-sm mb-2">{job.company?.display_name}</p>
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location?.display_name || "India"}
                    </div>
                    {job.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {job.description.slice(0, 150)}...
                      </p>
                    )}
                    <div className="mt-auto">
                      <button
                        onClick={() => handleExternalApply(job.redirect_url)}
                        className="bg-gray-800 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-900 transition-all flex items-center justify-center space-x-2 w-full"
                      >
                        <span>Apply on Company Site</span>
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Key Features Section */}
      <section className="py-16 px-4">
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
                Personalized job role suggestions powered by Gemini, analyzing
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
