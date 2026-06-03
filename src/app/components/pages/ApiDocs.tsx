import { Code, Key, Book, Zap } from "lucide-react";

export function ApiDocs() {
  const endpoints = [
    {
      method: "POST",
      path: "/api/v1/analyze-resume",
      description: "Extract skills from resume PDF",
      request: {
        file: "resume.pdf (multipart/form-data)",
      },
      response: {
        technical_skills: ["Python", "React", "SQL"],
        soft_skills: ["Leadership", "Communication"],
        experience_years: 3,
      },
    },
    {
      method: "POST",
      path: "/api/v1/career-recommendations",
      description: "Get AI-powered career recommendations",
      request: {
        skills: ["Python", "Machine Learning"],
        aptitude: { lrdi: 2, qa: 3, varc: 2 },
        mbti: "INTJ",
      },
      response: {
        recommendations: [
          {
            role: "Machine Learning Engineer",
            match_score: 94,
            skill_gaps: ["TensorFlow", "Deep Learning"],
          },
        ],
      },
    },
    {
      method: "POST",
      path: "/api/v1/match-candidates",
      description: "Find candidates matching job requirements",
      request: {
        job_title: "Full Stack Developer",
        required_skills: ["React", "Node.js", "MongoDB"],
        min_match_score: 80,
      },
      response: {
        candidates: [
          {
            id: "cand_123",
            name: "Alex Johnson",
            match_score: 88,
            matching_skills: ["React", "Node.js"],
          },
        ],
      },
    },
    {
      method: "GET",
      path: "/api/v1/skill-gap-analysis",
      description: "Analyze skill gaps for a career path",
      request: {
        current_skills: ["Python", "SQL"],
        target_role: "Data Scientist",
      },
      response: {
        skill_gaps: ["R", "Tableau", "Statistics"],
        learning_resources: [
          {
            skill: "R",
            courses: ["R Programming A-Z", "Data Science with R"],
          },
        ],
      },
    },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-8 mb-8 text-white">
          <div className="flex items-center space-x-3 mb-4">
            <Code className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Agentic API Documentation</h1>
          </div>
          <p className="text-green-100 text-lg mb-6">
            Standalone FastAPI service for programmatic job recommendations and career guidance
            integration.
          </p>
          <div className="flex items-center space-x-4">
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              Base URL: https://api.careerconnector.ai/v1
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              Version: 1.0.0
            </span>
          </div>
        </div>

        {/* Quick Start */}
        <div className="bg-white rounded-xl shadow-sm border border-green-100 p-8 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Zap className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-800">Quick Start</h2>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                1. Get Your API Key
              </h3>
              <p className="text-gray-600 mb-3">
                Sign up for an API key from your dashboard. Keep it secure and never share it
                publicly.
              </p>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <code className="text-green-400 text-sm">
                  export CAREER_CONNECTOR_API_KEY="cc_live_your_api_key_here"
                </code>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                2. Make Your First Request
              </h3>
              <p className="text-gray-600 mb-3">
                Example: Get career recommendations using cURL
              </p>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm">
                  {`curl -X POST https://api.careerconnector.ai/v1/career-recommendations \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "skills": ["Python", "Machine Learning"],
    "aptitude": {"lrdi": 2, "qa": 3, "varc": 2},
    "mbti": "INTJ"
  }'`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                3. Handle the Response
              </h3>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-blue-400 text-sm">
                  {`{
  "status": "success",
  "recommendations": [
    {
      "role": "Machine Learning Engineer",
      "match_score": 94,
      "skill_gaps": ["TensorFlow", "Deep Learning"],
      "salary_range": "$90k - $150k"
    }
  ]
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Authentication */}
        <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-8 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Key className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-800">Authentication</h2>
          </div>
          <p className="text-gray-600 mb-4">
            All API requests require authentication using an API key in the Authorization header:
          </p>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4">
            <code className="text-green-400 text-sm">
              Authorization: Bearer cc_live_your_api_key_here
            </code>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>Security Note:</strong> Never expose your API key in client-side code or
              public repositories. Use environment variables and server-side implementations.
            </p>
          </div>
        </div>

        {/* API Endpoints */}
        <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Book className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-800">API Endpoints</h2>
          </div>

          <div className="space-y-6">
            {endpoints.map((endpoint, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <span
                    className={`px-3 py-1 rounded font-semibold text-sm ${
                      endpoint.method === "POST"
                        ? "bg-green-100 text-green-700"
                        : endpoint.method === "GET"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {endpoint.method}
                  </span>
                  <code className="text-gray-800 font-mono text-sm">
                    {endpoint.path}
                  </code>
                </div>
                <p className="text-gray-600 mb-4">{endpoint.description}</p>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Request */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                      Request Body:
                    </h4>
                    <div className="bg-gray-900 rounded-lg p-3 overflow-x-auto">
                      <pre className="text-green-400 text-xs">
                        {JSON.stringify(endpoint.request, null, 2)}
                      </pre>
                    </div>
                  </div>

                  {/* Response */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                      Response:
                    </h4>
                    <div className="bg-gray-900 rounded-lg p-3 overflow-x-auto">
                      <pre className="text-blue-400 text-xs">
                        {JSON.stringify(endpoint.response, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rate Limits */}
        <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Rate Limits</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-indigo-600 mb-2">100</p>
              <p className="text-gray-600 text-sm">Requests per minute</p>
              <p className="text-xs text-gray-500 mt-1">Free Tier</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-purple-600 mb-2">1,000</p>
              <p className="text-gray-600 text-sm">Requests per minute</p>
              <p className="text-xs text-gray-500 mt-1">Pro Tier</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-pink-600 mb-2">Custom</p>
              <p className="text-gray-600 text-sm">Requests per minute</p>
              <p className="text-xs text-gray-500 mt-1">Enterprise Tier</p>
            </div>
          </div>
        </div>

        {/* SDKs */}
        <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Official SDKs & Libraries
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Python</h3>
              <div className="bg-gray-900 rounded p-2 mb-3">
                <code className="text-green-400 text-xs">
                  pip install career-connector
                </code>
              </div>
              <a href="#" className="text-indigo-600 text-sm hover:underline">
                View Documentation →
              </a>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Node.js</h3>
              <div className="bg-gray-900 rounded p-2 mb-3">
                <code className="text-green-400 text-xs">
                  npm install @cc/sdk
                </code>
              </div>
              <a href="#" className="text-indigo-600 text-sm hover:underline">
                View Documentation →
              </a>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Java</h3>
              <div className="bg-gray-900 rounded p-2 mb-3">
                <code className="text-green-400 text-xs">
                  maven: career-connector
                </code>
              </div>
              <a href="#" className="text-indigo-600 text-sm hover:underline">
                View Documentation →
              </a>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
          <p className="text-indigo-100 mb-6">
            Our developer support team is here to help you integrate Career Connector API into
            your applications.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-all font-semibold">
              Contact Support
            </button>
            <button className="bg-indigo-700 text-white px-6 py-3 rounded-lg hover:bg-indigo-800 transition-all border-2 border-white font-semibold">
              Join Developer Discord
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
