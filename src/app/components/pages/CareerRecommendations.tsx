import { useState } from "react"
import { getRecommendations } from "../../src/api/ai"

export function CareerRecommendations() {
  const savedSkills = localStorage.getItem("extractedSkills")
  const parsedSkills = savedSkills ? JSON.parse(savedSkills).join(", ") : ""
  const [skills, setSkills] = useState(parsedSkills)
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async () => {
    setLoading(true)
    setError("")
    try {
      const skillList = skills.split(",").map(s => s.trim())
      const data = await getRecommendations(skillList)
      const cleaned = data.recommendations
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim()
      const parsed = JSON.parse(cleaned)
      setResults(Array.isArray(parsed) ? parsed : parsed.career_paths || [])
    } catch {
      setError("Error getting recommendations. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-orange-600 mb-2">AI Career Recommendations</h1>
        <p className="text-gray-600 mb-6">Enter your skills and get personalized career paths powered by Gemini AI</p>

        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Skills (comma separated)
          </label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="Python, SQL, Power BI, Data Analysis"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4"
          />
          <button
            onClick={handleSubmit}
            disabled={loading || !skills}
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
          >
            {loading ? "Getting AI Recommendations..." : "Get Career Recommendations"}
          </button>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {results.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Your Personalized Career Paths</h2>
            {results.map((item: any, index: number) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-orange-100">
                <h3 className="text-lg font-bold text-orange-600 mb-2">
                  {index + 1}. {item.job_title}
                </h3>
                <p className="text-gray-700 mb-3">{item.why_it_suits_these_skills}</p>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">Skills to develop:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {item.skill_gaps_to_fill?.map((gap: string, i: number) => (
                      <li key={i} className="text-gray-600 text-sm">{gap}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
