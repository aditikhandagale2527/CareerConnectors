{/* Recruiter CTA — Indeed-style hero block */}
<section className="relative overflow-hidden bg-gradient-to-br from-orange-700 via-red-700 to-red-800">
  <div className="max-w-6xl mx-auto px-4 py-20 relative z-10">
    <div className="grid md:grid-cols-2 gap-10 items-center">
      {/* Left: Text content */}
      <div>
        <p className="text-orange-200 font-semibold tracking-wide text-sm mb-4 uppercase">
          Career Connector for Recruiters
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
          Let's hire your <br />
          next great <br />
          candidate. <span className="italic font-light">Fast.</span>
        </h2>
        <p className="text-orange-100 text-lg mb-8 max-w-md">
          No matter the skills, experience, or qualifications you're looking for,
          our AI-powered matching finds the right candidates for you.
        </p>
        <Link
          to="/recruiter"
          className="inline-flex items-center space-x-2 bg-white text-orange-700 px-8 py-4 rounded-lg font-semibold hover:bg-orange-50 transition-all shadow-lg"
        >
          <span>Post a Job</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Right: Illustration panel */}
      <div className="relative hidden md:flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-10 border border-white/20 w-full max-w-sm">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 bg-white/95 rounded-xl p-4 shadow-lg">
              <div className="bg-orange-100 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">Post a Job</p>
                <p className="text-gray-500 text-xs">Takes less than 2 minutes</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-white/95 rounded-xl p-4 shadow-lg ml-6">
              <div className="bg-red-100 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Brain className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">AI Matches Candidates</p>
                <p className="text-gray-500 text-xs">Powered by Gemini</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-white/95 rounded-xl p-4 shadow-lg">
              <div className="bg-orange-100 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">Auto-Shortlisted</p>
                <p className="text-gray-500 text-xs">Top matches, ranked instantly</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Curved bottom edge */}
  <svg
    className="absolute bottom-0 left-0 w-full"
    viewBox="0 0 1440 120"
    fill="none"
    preserveAspectRatio="none"
    style={{ height: "80px" }}
  >
    <path d="M0,120 C480,0 960,0 1440,120 L1440,120 L0,120 Z" fill="white" />
  </svg>
</section>
