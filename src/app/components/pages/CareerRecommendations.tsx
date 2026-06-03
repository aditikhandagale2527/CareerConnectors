import { Sparkles, TrendingUp, BookOpen, Target, AlertCircle } from "lucide-react";

export function CareerRecommendations() {
  // Mock data - in real app, this would come from AI analysis
  const recommendations = [
    {
      role: "Machine Learning Engineer",
      matchScore: 94,
      description:
        "Design and implement ML algorithms and systems to solve complex problems.",
      requiredSkills: ["Python", "TensorFlow", "Deep Learning", "Statistics", "Big Data"],
      yourSkills: ["Python", "Machine Learning", "Data Analysis"],
      skillGaps: ["TensorFlow", "Deep Learning"],
      salaryRange: "$90k - $150k",
      growthRate: "Very High",
      companies: ["Google", "Microsoft", "Amazon", "Meta"],
    },
    {
      role: "Full Stack Developer",
      matchScore: 88,
      description:
        "Build and maintain web applications from front-end to back-end.",
      requiredSkills: ["JavaScript", "React", "Node.js", "SQL", "Docker"],
      yourSkills: ["JavaScript", "React", "SQL"],
      skillGaps: ["Node.js", "Docker"],
      salaryRange: "$70k - $120k",
      growthRate: "High",
      companies: ["Netflix", "Airbnb", "Uber", "Stripe"],
    },
    {
      role: "Data Scientist",
      matchScore: 85,
      description:
        "Analyze complex data sets to drive business insights and decisions.",
      requiredSkills: ["Python", "R", "Statistics", "SQL", "Tableau"],
      yourSkills: ["Python", "Data Analysis", "SQL"],
      skillGaps: ["R", "Tableau"],
      salaryRange: "$80k - $140k",
      growthRate: "Very High",
      companies: ["IBM", "LinkedIn", "Apple", "Salesforce"],
    },
  ];

  const learningResources = [
    {
      category: "TensorFlow",
      resources: [
        "TensorFlow Developer Certificate Course (Coursera)",
        "Deep Learning Specialization (Andrew Ng)",
        "Hands-On Machine Learning with TensorFlow (Book)",
      ],
    },
    {
      category: "Deep Learning",
      resources: [
        "Deep Learning Specialization (deeplearning.ai)",
        "Fast.ai Practical Deep Learning",
        "Neural Networks and Deep Learning (MIT OpenCourseWare)",
      ],
    },
    {
      category: "Node.js",
      resources: [
        "Node.js - The Complete Guide (Udemy)",
        "Node.js Documentation & Guides",
        "Express.js Fundamentals",
      ],
    },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 mb-8 text-white">
          <div className="flex items-center space-x-3 mb-4">
            <Sparkles className="w-8 h-8" />
            <h1 className="text-3xl font-bold">AI Career Recommendations</h1>
          </div>
          <p className="text-indigo-100 text-lg">
            Based on your resume, aptitude scores (LRDI: 2/3, QA: 2/3, VARC: 2/3), and MBTI type
            (INTJ), here are your personalized career paths powered by Gemini AI.
          </p>
        </div>

        {/* Career Cards */}
        <div className="space-y-6 mb-8">
          {recommendations.map((career, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-indigo-100 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 border-b border-indigo-100">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-2xl font-bold text-gray-800">
                        {career.role}
                      </h3>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {career.matchScore}% Match
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{career.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="flex items-center text-gray-700">
                        <TrendingUp className="w-4 h-4 mr-1 text-green-600" />
                        Growth: {career.growthRate}
                      </span>
                      <span className="flex items-center text-gray-700">
                        💰 {career.salaryRange}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Your Skills */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs mr-2">
                        ✓ {career.yourSkills.length}
                      </span>
                      Your Matching Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {career.yourSkills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Skill Gaps */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs mr-2">
                        ⚠ {career.skillGaps.length}
                      </span>
                      Skills to Develop
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {career.skillGaps.map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-orange-100 text-orange-700 px-3 py-1 rounded-lg text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Required Skills */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    All Required Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {career.requiredSkills.map((skill, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 rounded-lg text-sm font-medium ${
                          career.yourSkills.includes(skill)
                            ? "bg-indigo-100 text-indigo-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Top Companies */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Top Hiring Companies
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {career.companies.map((company, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm"
                      >
                        {company}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all">
                  View Learning Path
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Skill Gap Analysis Section */}
        <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Target className="w-8 h-8 text-orange-600" />
            <h2 className="text-2xl font-bold text-gray-800">
              Personalized Learning Path
            </h2>
          </div>

          <div className="mb-6 bg-orange-50 rounded-lg p-4 border border-orange-100">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">
                  Skill Gap Analysis
                </h4>
                <p className="text-gray-600 text-sm">
                  Based on your top career matches, focus on these skills to maximize your career
                  opportunities. Our AI has identified the most in-demand skills you're missing.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {learningResources.map((category, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
                    {category.category}
                  </h4>
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
                    High Priority
                  </span>
                </div>
                <ul className="space-y-2">
                  {category.resources.map((resource, idx) => (
                    <li
                      key={idx}
                      className="flex items-start space-x-2 text-gray-600"
                    >
                      <span className="text-indigo-600 mt-1">→</span>
                      <span>{resource}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insight Card */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-8 text-white">
          <div className="flex items-start space-x-4">
            <Sparkles className="w-8 h-8 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold mb-2">AI Career Insight</h3>
              <p className="text-purple-100 mb-4">
                Your INTJ personality type combined with strong logical reasoning and programming
                skills makes you an excellent fit for technical leadership roles. The job market
                for Machine Learning Engineers has grown 344% in the last 4 years, with an average
                of 15,000 new positions annually. By acquiring TensorFlow and Deep Learning skills,
                you could increase your market value by approximately 40%.
              </p>
              <p className="text-purple-100">
                <strong>Recommendation:</strong> Focus on completing 1-2 deep learning projects
                while pursuing certifications. Consider contributing to open-source ML projects to
                build your portfolio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
