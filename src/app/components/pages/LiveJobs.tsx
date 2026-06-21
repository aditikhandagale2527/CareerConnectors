import { useState } from "react"
import { Search, MapPin, Briefcase } from "lucide-react"

export function LiveJobs() {
  const [query, setQuery] = useState("")
  const [location, setLocation] = useState("India")
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [searched, setSearched] = useState(false)

  const searchJobs = async () => {
    if (!query) return
    setLoading(true)
    setError("")
    setSearched(true)
    try {
      const response = await fetch(
        `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}&page=1&num_pages=1`,
        {
          headers: {
            "X-RapidAPI-Key": "e1147effacmshaa9c3f93c5fa41fp153da3jsnacc6738690c",
            "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
          }
        }
      )
      const data = await response.json()
      console.log("API Response:", data)
      setJobs(data.data || [])
      if (!data.data || data.data.length === 0) {
        setError("No jobs found. Try different keywords.")
      }
    } catch (err) {
      console.error("Error:", err)
      setError("Failed to fetch jobs. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-orange-600 mb-2">Live Job Listings</h1>
        <p className="text-gray-600 mb-6">Real jobs from Indeed, LinkedIn and more</p>

        <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === "Enter" && searchJobs()}
              placeholder="Job title or skills (e.g. Data Analyst)"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="relative w-40">
            <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="Location"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button
            onClick={searchJobs}
            disabled={loading || !query}
            className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Searching live jobs...</p>
          </div>
        )}

        {!loading && searched && jobs.length === 0 && !error && (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm">
            <Briefcase className="w-16 h-16 text-orange-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Jobs Found</h3>
            <p className="text-gray-600">Try different keywords or location</p>
          </div>
        )}

        {!loading && jobs.length > 0 && (
          <div className="space-y-4">
            <p className="text-gray-600 text-sm">{jobs.length} jobs found</p>
            {jobs.map((job: any, index: number) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-orange-100 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{job.job_title}</h3>
                    <p className="text-orange-600 font-medium">{job.employer_name}</p>
                  </div>
                  {job.employer_logo && (
                    <img
                      src={job.employer_logo}
                      alt={job.employer_name}
                      className="w-12 h-12 object-contain rounded-lg ml-4"
                    />
                  )}
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {job.job_city || job.job_country || "Remote"}
                  </span>
                  <span className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-1" />
                    {job.job_employment_type || "Full Time"}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4">
                  {job.job_description ? job.job_description.slice(0, 200) + "..." : ""}
                </p>

                {job.job_required_skills && job.job_required_skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.job_required_skills.slice(0, 5).map((skill: string, i: number) => (
                      <span key={i} className="bg-orange-50 text-orange-600 px-2 py-1 rounded-full text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => window.open(job.job_apply_link, "_blank")}
                  className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
