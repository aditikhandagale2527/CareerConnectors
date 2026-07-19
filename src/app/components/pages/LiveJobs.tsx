import { useState } from "react"
import { Search, MapPin, Briefcase, ArrowUpRight } from "lucide-react"
import API from "../../src/api/config"

export function LiveJobs() {
  const [query, setQuery] = useState("")
  const [location, setLocation] = useState("Mumbai")
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
      const res = await API.get("/api/livejobs/search", {
        params: { query, location }
      })
      setJobs(res.data.results || [])
      if (!res.data.results || res.data.results.length === 0) {
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
    <div className="min-h-screen bg-[#F4F0EA] text-[#121212] pt-[104px] pb-24" style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}>
      <div className="mx-auto max-w-[1000px] px-5 sm:px-8">

        {/* Header */}
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#FF3300] mb-5" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
          / Live Feed
        </p>
        <h1 className="font-semibold text-4xl sm:text-5xl tracking-tighter leading-[0.95] mb-3" style={{ fontFamily: '"Clash Display", sans-serif' }}>
          Live job listings.
        </h1>
        <p className="text-black/55 text-base leading-relaxed mb-10">
          Real jobs pulled from across India, updated in real time.
        </p>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row border border-black/15 bg-white mb-10">
          <label className="flex items-center gap-3 px-4 py-4 flex-1 border-b sm:border-b-0 sm:border-r border-black/12">
            <Search size={18} className="text-black/35 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === "Enter" && searchJobs()}
              placeholder="Job title (e.g. Data Analyst)"
              className="bg-transparent outline-none w-full text-sm text-[#121212] placeholder:text-black/35"
            />
          </label>
          <label className="flex items-center gap-3 px-4 py-4 sm:w-56 border-b sm:border-b-0 sm:border-r border-black/12">
            <MapPin size={18} className="text-black/35 shrink-0" />
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="Location"
              className="bg-transparent outline-none w-full text-sm text-[#121212] placeholder:text-black/35"
            />
          </label>
          <button
            onClick={searchJobs}
            disabled={loading || !query}
            className="bg-[#FF3300] text-white px-8 py-4 font-medium text-sm hover:brightness-110 transition-[filter] duration-200 disabled:opacity-50"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {error && (
          <p className="text-[#FF3300] text-sm mb-6" style={{ fontFamily: '"JetBrains Mono", monospace' }}>{error}</p>
        )}

        {loading && (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-2 border-[#FF3300] border-t-transparent rounded-full animate-spin mx-auto mb-5" />
            <p className="text-black/45 text-sm uppercase tracking-[0.2em]" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
              Searching live jobs...
            </p>
          </div>
        )}

        {!loading && searched && jobs.length === 0 && !error && (
          <div className="border border-black/10 bg-white p-16 text-center">
            <Briefcase size={40} className="text-[#FF3300]/40 mx-auto mb-5" strokeWidth={1.6} />
            <h3 className="text-xl font-medium tracking-tight mb-2" style={{ fontFamily: '"Clash Display", sans-serif' }}>
              No jobs found
            </h3>
            <p className="text-black/50 text-sm">Try different keywords or a different location.</p>
          </div>
        )}

        {!loading && jobs.length > 0 && (
          <div className="flex flex-col gap-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-black/40" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
              {jobs.length} jobs found
            </p>
            {jobs.map((job: any, index: number) => (
              <article
                key={index}
                className="group bg-white border border-black/10 p-6 sm:p-8 hover:-translate-y-0.5 hover:border-black/40 hover:shadow-[6px_6px_0_0_#FF3300] transition-[transform,border-color,box-shadow] duration-200"
              >
                <h3 className="text-2xl font-medium tracking-tight leading-tight mb-1" style={{ fontFamily: '"Clash Display", sans-serif' }}>
                  {job.title}
                </h3>
                <p className="text-[#FF3300] font-medium text-sm mb-4">{job.company?.display_name}</p>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-black/50 mb-5">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} /> {job.location?.display_name || "India"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Briefcase size={13} /> {job.contract_time || "Full Time"}
                  </span>
                  {job.salary_min && (
                    <span className="text-green-700 font-medium">
                      ₹{Math.round(job.salary_min).toLocaleString()} - ₹{Math.round(job.salary_max).toLocaleString()}
                    </span>
                  )}
                </div>

                {job.description && (
                  <p className="text-black/60 text-sm leading-relaxed mb-6">
                    {job.description.slice(0, 200)}...
                  </p>
                )}

                <button
                  onClick={() => window.open(job.redirect_url, "_blank")}
                  className="group/btn inline-flex items-center justify-center gap-2 bg-[#09090B] text-[#FAFAFA] px-6 py-3 text-sm font-medium hover:bg-[#FF3300] transition-colors duration-200"
                >
                  Apply Now
                  <ArrowUpRight size={15} className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </button>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
