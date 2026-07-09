import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import { ArrowLeft, User } from "lucide-react"
import API from "../../src/api/config"

export function Applicants() {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const [applicants, setApplicants] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchApplicants()
  }, [])

  const fetchApplicants = async () => {
    try {
      const res = await API.get(`/api/recruiter/jobs/${jobId}/applicants`)
      setApplicants(res.data)
    } catch {
      console.error("Failed to fetch applicants")
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (appId: string, status: string) => {
    try {
      await API.patch(`/api/recruiter/applicants/${appId}/status`, { status })
      fetchApplicants()
    } catch {
      alert("Failed to update status")
    }
  }

  const scoreColor = (score: number) => {
    if (score >= 60) return "text-green-600"
    return "text-red-500"
  }

  const shortlisted = applicants.filter(a => a.status === "shortlisted")
  const rejected = applicants.filter(a => a.status === "rejected")

  const ApplicantCard = ({ app }: { app: any }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-orange-100">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{app.student_name || "Applicant"}</h3>
          <p className="text-gray-500 text-sm">{app.student_email}</p>
          <p className="text-gray-400 text-xs mt-1">
            Applied: {new Date(app.applied_at).toLocaleDateString()}
          </p>
        </div>
        <div className="text-right">
          <span className={`text-2xl font-bold ${scoreColor(app.match_score ?? 0)}`}>
            {app.match_score ?? 0}%
          </span>
          <p className="text-xs text-gray-400">match score</p>
        </div>
      </div>

      {app.student_skills?.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {app.student_skills.map((skill: string, i: number) => (
            <span key={i} className="bg-gray-50 text-gray-600 px-2 py-0.5 rounded-full text-xs">
              {skill}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-3 pt-3 border-t border-gray-100">
        <button
          onClick={() => updateStatus(app._id, "shortlisted")}
          disabled={app.status === "shortlisted"}
          className="bg-green-50 text-green-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-100 transition-all disabled:opacity-40"
        >
          Shortlist
        </button>
        <button
          onClick={() => updateStatus(app._id, "rejected")}
          disabled={app.status === "rejected"}
          className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-all disabled:opacity-40"
        >
          Reject
        </button>
      </div>
    </div>
  )

  const Section = ({ title, list, color }: { title: string; list: any[]; color: string }) => (
    <div className="mb-8">
      <h2 className={`text-lg font-bold mb-3 flex items-center gap-2 ${color}`}>
        {title}
        <span className="text-sm font-normal text-gray-400">({list.length})</span>
      </h2>
      {list.length === 0 ? (
        <p className="text-gray-400 text-sm bg-white rounded-xl p-4 border border-gray-100">
          No candidates here yet
        </p>
      ) : (
        <div className="space-y-4">
          {list.map(app => <ApplicantCard key={app._id} app={app} />)}
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/recruiter")}
          className="flex items-center space-x-2 text-orange-600 mb-6 hover:text-orange-700"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>

        <h1 className="text-2xl font-bold text-orange-600 mb-6">Applicants</h1>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading applicants...</p>
          </div>
        ) : applicants.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm">
            <User className="w-16 h-16 text-orange-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Applicants Yet</h3>
            <p className="text-gray-600">Applicants will appear here once students apply</p>
          </div>
        ) : (
          <>
            <Section title="Shortlisted" list={shortlisted} color="text-green-600" />
            <Section title="Rejected" list={rejected} color="text-red-500" />
          </>
        )}
      </div>
    </div>
  )
}
