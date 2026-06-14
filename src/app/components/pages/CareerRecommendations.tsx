import { useState } from "react"
import { getRecommendations } from "../../src/api/ai"

export function CareerRecommendations() {
  const [skills, setSkills] = useState("")
  const [results, setResults] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const skillList = skills.split(",").map(s => s.trim())
      const data = await getRecommendations(skillList)
      setResults(data.recommendations)
    } catch {
      setResults("Error getting recommendations. Try again.")
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

        {results && (
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Your Personalized Career Paths</h2>
            <pre className="whitespace-pre-wrap text-gray-700 text-sm">{results}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
