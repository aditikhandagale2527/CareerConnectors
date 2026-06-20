import { useState, useEffect } from "react"
import { Briefcase, Plus, X } from "lucide-react"
import API from "../../src/api/config"

export function RecruiterDashboard() {
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    skills_required: ""
  })

  useEffect(() => {
    fetchJobs()
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

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      await API.post("/api/jobs/", {
        ...form,
        skills_required: form.skills_required.split(",").map(s => s.trim())
      })
      setShowForm(false)
      setForm({ title: "", company: "", location: "", description: "", skills_required: "" })
      fetchJobs()
    } catch {
      alert("Failed to post job. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-orange-600">Recruiter Portal</h1>
            <p className="text-gray-600">Post jobs and find the right candidates</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Post a Job</span>
          </button>
        </div>

        {/* Job Post Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 w-full max-w-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Post a New Job</h2>
                <button onClick={() => setShowForm(false)}>
                  <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. Data Analyst"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={e => setForm({ ...form, company: e.target.value })}
                    placeholder="e.g. DHL India"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={e => setForm({ ...form, location: e.target.value })}
                    placeholder="e.g. Mumbai"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    placeholder="Job description..."
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skills Required (comma separated)</label>
                  <input
                    type="text"
                    value={form.skills_required}
                    onChange={e => setForm({ ...form, skills_required: e.target.value })}
                    placeholder="Python, SQL, Power BI"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={submitting || !form.title || !form.company}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {submitting ? "Posting..." : "Post Job"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Jobs List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading jobs...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm">
            <Briefcase className="w-16 h-16 text-orange-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Jobs Posted Yet</h3>
            <p className="text-gray-600 mb-6">Click "Post a Job" to add your first listing</p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-orange-100 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                    <p className="text-orange-600 font-medium">{job.company}</p>
                  </div>
                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
                    {job.location}
                  </span>
                </div>
                <p className="text-gray-600 mb-3 text-sm">{job.description}</p>
                <div className="flex flex-wrap gap-2">
                  {job.skills_required?.map((skill: string, i: number) => (
                    <span key={i} className="bg-red-50 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
