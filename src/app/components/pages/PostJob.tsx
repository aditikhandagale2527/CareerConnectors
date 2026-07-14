import { useState } from "react"
import { useNavigate } from "react-router"
import { ArrowLeft, FileUp, X } from "lucide-react"
import API from "../../src/api/config"

export function PostJob() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [jdMode, setJdMode] = useState<"type" | "upload">("type")
  const [jdFile, setJdFile] = useState<File | null>(null)
  const [extracting, setExtracting] = useState(false)
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    job_type: "Full-time",
    description: "",
    skills_required: "",
    salary_range: "",
    deadline: ""
  })

  const handleFileUpload = async (file: File) => {
    setJdFile(file)
    setExtracting(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await API.post("/api/jobs/extract-jd", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      const data = res.data
      setForm(prev => ({
        ...prev,
        description: data.description || prev.description,
        skills_required: data.skills || prev.skills_required,
        title: data.title || prev.title,
        company: data.company || prev.company,
        location: data.location || prev.location,
      }))
    } catch {
      alert("Failed to extract from file. Please type the description manually.")
      setJdMode("type")
    } finally {
      setExtracting(false)
    }
  }

  const handleSubmit = async () => {
    if (!form.title || !form.company || !form.location || !form.description) {
      alert("Please fill all required fields")
      return
    }
    setSubmitting(true)
    try {
      await API.post("/api/recruiter/jobs", {
        ...form,
        skills_required: form.skills_required.split(",").map((s: string) => s.trim()).filter(Boolean)
      })
      alert("Job posted successfully!")
      navigate("/recruiter")
    } catch {
      alert("Failed to post job. Make sure you are logged in as a recruiter.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate("/recruiter")}
          className="flex items-center space-x-2 text-orange-600 mb-6 hover:text-orange-700"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>

        <div className="bg-white rounded-xl p-8 shadow-sm border border-orange-100">
          <h1 className="text-2xl font-bold text-orange-600 mb-6">Post a New Job</h1>

          <div className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Data Analyst"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.company}
                onChange={e => setForm({ ...form, company: e.target.value })}
                placeholder="e.g. DHL India"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Location + Job Type */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.location}
                  onChange={e => setForm({ ...form, location: e.target.value })}
                  placeholder="e.g. Mumbai"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                <select
                  value={form.job_type}
                  onChange={e => setForm({ ...form, job_type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Internship</option>
                  <option>Remote</option>
                  <option>Contract</option>
                </select>
              </div>
            </div>

            {/* Salary + Deadline */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                <input
                  type="text"
                  value={form.salary_range}
                  onChange={e => setForm({ ...form, salary_range: e.target.value })}
                  placeholder="e.g. 5-8 LPA"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                <input
                  type="date"
                  value={form.deadline}
                  onChange={e => setForm({ ...form, deadline: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Job Description — Type or Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Description <span className="text-red-500">*</span>
              </label>

              {/* Toggle buttons */}
              <div className="flex space-x-2 mb-3">
                <button
                  type="button"
                  onClick={() => setJdMode("type")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    jdMode === "type"
                      ? "bg-orange-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  ✏️ Type Manually
                </button>
                <button
                  type="button"
                  onClick={() => setJdMode("upload")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    jdMode === "upload"
                      ? "bg-orange-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  📎 Upload JD File
                </button>
              </div>

              {/* Type mode */}
              {jdMode === "type" && (
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe the role, responsibilities, and requirements..."
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              )}

              {/* Upload mode */}
              {jdMode === "upload" && (
                <div>
                  {!jdFile ? (
                    <div
                      className="border-2 border-dashed border-orange-300 rounded-xl p-8 text-center cursor-pointer hover:border-orange-500 transition-colors"
                      onClick={() => document.getElementById("jdFileInput")?.click()}
                    >
                      <FileUp className="w-10 h-10 text-orange-400 mx-auto mb-3" />
                      <p className="text-gray-600 font-medium mb-1">Click to upload JD file</p>
                      <p className="text-sm text-gray-400">Supports PDF, Word (.docx), or Text (.txt) files</p>
                      <input
                        id="jdFileInput"
                        type="file"
                        accept=".pdf,.doc,.docx,.txt"
                        className="hidden"
                        onChange={e => {
                          const file = e.target.files?.[0]
                          if (file) handleFileUpload(file)
                        }}
                      />
                    </div>
                  ) : (
                    <div className="border border-orange-200 rounded-xl p-4 bg-orange-50">
                      {extracting ? (
                        <div className="text-center py-4">
                          <div className="w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                          <p className="text-gray-600 text-sm">Extracting job details from file...</p>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <FileUp className="w-5 h-5 text-orange-600" />
                              <span className="text-sm font-medium text-gray-700">{jdFile.name}</span>
                            </div>
                            <button
                              onClick={() => {
                                setJdFile(null)
                                setForm(prev => ({ ...prev, description: "", skills_required: "" }))
                              }}
                              className="text-red-400 hover:text-red-600"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                          <p className="text-green-600 text-sm font-medium">
                            ✅ Details extracted! Review and edit below if needed.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Show extracted description for editing */}
                  {jdFile && !extracting && (
                    <div className="mt-3">
                      <label className="block text-sm text-gray-500 mb-1">Extracted Description (you can edit):</label>
                      <textarea
                        value={form.description}
                        onChange={e => setForm({ ...form, description: e.target.value })}
                        rows={5}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skills Required <span className="text-gray-400">(comma separated)</span>
              </label>
              <input
                type="text"
                value={form.skills_required}
                onChange={e => setForm({ ...form, skills_required: e.target.value })}
                placeholder="Python, SQL, Power BI, Excel"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={submitting || extracting}
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {submitting ? (
                <>
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Posting...</span>
                </>
              ) : (
                <span>Post Job</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
