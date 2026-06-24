import { useState, useEffect } from "react"
import { Link } from "react-router"
import { Briefcase, Plus, Users, CheckCircle, Clock, TrendingUp } from "lucide-react"
import API from "../../src/api/config"

export function RecruiterDashboard() {
  const [stats, setStats] = useState({
    total_jobs: 0,
    total_applicants: 0,
    shortlisted: 0,
    pending: 0
  })
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboard()
    fetchJobs()
  }, [])

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/api/recruiter/dashboard")
      setStats(res.data)
    } catch {
      console.error("Failed to fetch dashboard stats")
    }
  }

  const fetchJobs = async () => {
    try {
      const res = await API.get("/api/recruiter/jobs")
      setJobs(res.data)
    } catch {
      console.error("Failed to fetch jobs")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (jobId: string) => {
    if (!confirm("Delete this job?")) return
    try {
      await API.delete(`/api/recruiter/jobs/${jobId}`)
      fetchJobs()
      fetchDashboard()
    } catch {
      alert("Failed to delete job.")
    }
  }

  const handleToggleStatus = async (jobId: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "closed" : "active"
    try {
      await API.patch(`/api/recruiter/jobs/${jobId}/status?status=${newStatus}`)
      fetchJobs()
    } catch {
      alert("Failed to update status.")
    }
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-orange-600">Recruiter Dashboard</h1>
            <p className="text-gray-600">Manage your jobs and candidates</p>
          </div>
          <Link
            to="/recruiter/post-job"
            className="flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Post a Job</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-orange-100">
            <div className="bg-orange-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
              <Briefcase className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-2xl
