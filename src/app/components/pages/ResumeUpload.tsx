import { useState } from "react"
import { useNavigate } from "react-router"
import { FileUp, CheckCircle, ArrowRight } from "lucide-react"
import API from "../../src/api/config"

export function ResumeUpload() {
  const navigate = useNavigate()
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [skills, setSkills] = useState<string[]>([])
  const [error, setError] = useState("")
  const [done, setDone] = useState(false)

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    setError("")
    try {
      const formData = new FormData()
      formData.append("file", file)
      const response = await API.post("/api/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      const skillsText = response.data.skills
      const cleaned = skillsText.replace(/```json/g, "").replace(/```/g, "").trim()
      const parsed = JSON.parse(cleaned)
      setSkills(parsed)
      setDone(true)
    } catch {
      setError("Failed to upload resume. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleGetRecommendations = () => {
    localStorage.setItem("extractedSkills", JSON.stringify(skills))
    navigate("/student/recommendations")
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-orange-600 mb-2">Upload Your Resume</h1>
        <p className="text-gray-600 mb-8">
          Our AI will automatically extract your skills from your resume
        </p>

        {!done ? (
          <div className="bg-white p-8 rounded-xl shadow-sm">
            {/* Upload Area */}
            <div
              className="border-2 border-dashed border-orange-300 rounded-xl p-8 text-center mb-6 hover:border-orange-500 transition-colors cursor-pointer"
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              <FileUp className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">
                {file ? file.name : "Click to upload your resume"}
              </p>
              <p className="text-sm text-gray-400">PDF files only</p>
              <input
                id="fileInput"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm mb-4">{error}</p>
            )}

            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? "Extracting Skills with AI..." : "Upload & Extract Skills"}
            </button>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="flex items-center mb-6">
              <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
              <h2 className="text-xl font-bold text-gray-800">Skills Extracted Successfully!</h2>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>

            <button
              onClick={handleGetRecommendations}
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center"
            >
              <span>Get AI Career Recommendations</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
