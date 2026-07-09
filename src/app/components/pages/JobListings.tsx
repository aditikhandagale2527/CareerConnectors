import { useState, useEffect } from "react"
import { Briefcase, MapPin, Search, CheckCircle } from "lucide-react"
import { useNavigate } from "react-router"
import API from "../../src/api/config"

export function JobListings() {
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [applying, setApplying] = useState<string | null>(null)
  const [appliedJobs, setAppliedJobs] = useState<string[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchJobs()
    const saved = localStorage.getItem("appliedJobs")
    if (saved) setAppliedJobs(JSON.parse(saved))
  }, [])

  const fetchJobs = async () => {
    try {
      const res = await API.get("/api/jobs/")
      setJobs(res.data)
    } catch {
      console.error("Failed to fetch jobs")
    } finally {
      setLoading(false)
    }
  }

  const handleApply = async (jobId: string) => {
    const token = localStorage.getItem("token")
    if (!token) {
      alert("Please login first to apply for jobs!")
      navigate("/login")
      return
    }

    if (appliedJobs.includes(jobId)) {
      alert("You have already applied for this job!")
      return
    }

    setApplying(jobId)
    try {
      await API.post("/api/applications/apply", { job_id: jobId })
      const updated = [...appliedJobs, jobId]
      setAppliedJobs(updated)
      localStorage.setItem("appliedJobs", JSON.stringify(updated))
      alert("Successfully applied! The recruiter will review your application.")
    } catch {
      alert("Failed to apply. Please try again.")
    } finally {
      setApplying(null)
    }
  }

  const filtered = jobs.filter(job =>
    job.title?.toLowerCase().includes(search.toLowerCase()) ||
    job.company?.toLowerCase().includes(search.toLowerCase()) ||
    job.location?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-orange-600 mb-2">Job Listings</h1>
        <p className="text-gray-600 mb-6">Find your perfect career opportunity</p>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by title, company or location..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
          />
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading jobs...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm">
            <Briefcase className="w-16 h-16 text-orange-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Jobs Found</h3>
            <p className="text-gray-600">Try a different search term</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((job) => (
              <div key={job._id} className="bg-white p-6 rounded-xl shadow-sm border border-orange-100 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                    <p className="text-orange-600 font-medium">{job.company}</p>
                    {job.job_type && (
                      <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full mt-1 inline-block">
                        {job.job_type}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location}
                    </div>
                    {job.salary_range && (
                      <span className="text-xs text-green-600 font-medium">
                        💰 {job.salary_range}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-gray-600 mb-4 text-sm">{job.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills_required?.map((skill: string, i: number) => (
                    <span key={i} className="bg-orange-50 text-orange-600 px-2 py-1 rounded-full text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>

                {job.deadline && (
                  <p className="text-xs text-gray-400 mb-3">
                    📅 Apply by: {new Date(job.deadline).toLocaleDateString()}
                  </p>
                )}

                {appliedJobs.includes(job._id) ? (
                  <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg w-fit">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Applied!</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleApply(job._id)}
                    disabled={applying === job._id}
                    className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center space-x-2"
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
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
