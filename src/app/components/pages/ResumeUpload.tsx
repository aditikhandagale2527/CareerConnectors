import { useState } from "react";
import { Upload, FileText, CheckCircle, X } from "lucide-react";
import { Link } from "react-router";

export function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [extractedSkills, setExtractedSkills] = useState<{
    technical: string[];
    soft: string[];
  } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setAnalyzed(false);
      setExtractedSkills(null);
    }
  };

  const handleAnalyze = () => {
    if (!file) return;
    
    setAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setExtractedSkills({
        technical: [
          "Python",
          "JavaScript",
          "React",
          "Machine Learning",
          "SQL",
          "Data Analysis",
          "Git",
          "REST APIs",
        ],
        soft: [
          "Problem Solving",
          "Communication",
          "Team Collaboration",
          "Leadership",
          "Time Management",
          "Critical Thinking",
        ],
      });
      setAnalyzing(false);
      setAnalyzed(true);
    }, 2000);
  };

  const handleRemove = () => {
    setFile(null);
    setAnalyzed(false);
    setExtractedSkills(null);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Resume Upload</h1>
          <p className="text-gray-600">
            Upload your resume in PDF format and let AI extract your skills automatically
          </p>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-8 mb-8">
          {!file ? (
            <label className="flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-orange-300 rounded-lg p-12 hover:border-orange-500 transition-colors">
              <Upload className="w-16 h-16 text-orange-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Upload Your Resume
              </h3>
              <p className="text-gray-600 mb-4">Click to browse or drag and drop</p>
              <p className="text-sm text-gray-500">Supported format: PDF (Max 10MB)</p>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          ) : (
            <div className="space-y-6">
              {/* File Info */}
              <div className="flex items-center justify-between bg-orange-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-orange-600" />
                  <div>
                    <p className="font-semibold text-gray-800">{file.name}</p>
                    <p className="text-sm text-gray-600">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleRemove}
                  className="text-gray-400 hover:text-red-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Analyze Button */}
              {!analyzed && (
                <button
                  onClick={handleAnalyze}
                  disabled={analyzing}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {analyzing ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-3"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Analyzing with AI...
                    </span>
                  ) : (
                    "Analyze Resume with AI"
                  )}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Extracted Skills */}
        {analyzed && extractedSkills && (
          <div className="bg-white rounded-xl shadow-sm border border-green-100 p-8 mb-8">
            <div className="flex items-center space-x-2 mb-6">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-800">
                Skills Extracted Successfully
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Technical Skills */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm mr-2">
                    {extractedSkills.technical.length}
                  </span>
                  Technical Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {extractedSkills.technical.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm mr-2">
                    {extractedSkills.soft.length}
                  </span>
                  Soft Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {extractedSkills.soft.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Next Step */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <p className="text-gray-600">
                  Great! Now complete your aptitude test to continue.
                </p>
                <Link
                  to="/student/aptitude"
                  className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
                >
                  Next: Aptitude Test
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
          <h3 className="font-semibold text-gray-800 mb-3">
            How the Resume Insight Engine Works
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
              <span>AI-powered text extraction from PDF documents</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
              <span>Automatic categorization of technical and soft skills</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
              <span>Experience level and domain expertise identification</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
              <span>Secure processing with data privacy protection</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}