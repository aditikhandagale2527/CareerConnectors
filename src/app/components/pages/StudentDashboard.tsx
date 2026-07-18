import { Link } from "react-router";
import {
  FileUp, Brain, Target, TrendingUp, CheckCircle, ArrowRight, BrainCircuit
} from "lucide-react";

export function StudentDashboard() {
  const progress = {
    resume: !!localStorage.getItem("extractedSkills"),
    aptitude: !!localStorage.getItem("aptitudeScore"),
    personality: !!localStorage.getItem("mbtiResult"),
    recommendations: false,
  };

  const completionPercentage = Object.values(progress).filter(Boolean).length * 25;

  return (
    <div
      className="min-h-screen bg-[#09090B] py-16 px-5"
      style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
    >
      {/* Glow effects */}
      <div className="pointer-events-none fixed -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[#FF3300]/20 blur-[140px]" />
      <div className="pointer-events-none fixed top-1/3 right-0 h-[360px] w-[360px] rounded-full bg-[#FF3300]/10 blur-[120px]" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <p
            className="text-[11px] uppercase tracking-[0.3em] text-[#FF3300] mb-4"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            / Your Career Journey
          </p>
          <h1
            className="font-semibold text-4xl sm:text-5xl tracking-tighter text-[#FAFAFA] leading-[0.95] mb-6"
            style={{ fontFamily: '"Clash Display", sans-serif' }}
          >
            Welcome to your <span className="italic text-[#FF3300]">dashboard.</span>
          </h1>
          <p className="text-white/55 text-base max-w-xl">
            Complete all steps to unlock personalized AI-powered career recommendations
          </p>

          {/* Progress Bar */}
          <div className="mt-8 border border-white/15 bg-white/[0.03] p-5">
            <div className="flex justify-between mb-3">
              <span
                className="text-[10px] uppercase tracking-[0.25em] text-white/45"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                Profile Completion
              </span>
              <span
                className="text-[10px] uppercase tracking-[0.25em] text-[#FF3300]"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                {completionPercentage}%
              </span>
            </div>
            <div className="w-full bg-white/10 h-1.5">
              <div
                className="bg-[#FF3300] h-1.5 transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">

          {/* Step 1 */}
          <Link
            to="/student/resume"
            className="group border border-white/12 bg-white/[0.02] p-8 hover:border-[#FF3300]/50 hover:bg-white/[0.04] transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-8">
              <span className="grid place-items-center h-12 w-12 border border-white/15 group-hover:border-[#FF3300]/50 text-[#FF3300] transition-colors duration-200">
                <FileUp size={22} strokeWidth={1.8} />
              </span>
              {progress.resume ? (
                <CheckCircle className="w-5 h-5 text-[#FF3300]" />
              ) : (
                <span
                  className="text-xs tracking-[0.2em] text-white/30"
                  style={{ fontFamily: '"JetBrains Mono", monospace' }}
                >
                  01
                </span>
              )}
            </div>
            <h3
              className="text-xl font-medium tracking-tight text-[#FAFAFA] mb-3"
              style={{ fontFamily: '"Clash Display", sans-serif' }}
            >
              Upload Resume
            </h3>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Upload your resume and let AI extract your technical and soft skills automatically
            </p>
            <div className="flex items-center gap-2 text-[#FF3300] text-sm font-medium group-hover:gap-3 transition-all duration-200">
              <span>{progress.resume ? "Review Resume" : "Start Now"}</span>
              <ArrowRight size={15} />
            </div>
          </Link>

          {/* Step 2 */}
          <Link
            to="/student/aptitude"
            className="group border border-white/12 bg-white/[0.02] p-8 hover:border-[#FF3300]/50 hover:bg-white/[0.04] transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-8">
              <span className="grid place-items-center h-12 w-12 border border-white/15 group-hover:border-[#FF3300]/50 text-[#FF3300] transition-colors duration-200">
                <Brain size={22} strokeWidth={1.8} />
              </span>
              {progress.aptitude ? (
                <CheckCircle className="w-5 h-5 text-[#FF3300]" />
              ) : (
                <span
                  className="text-xs tracking-[0.2em] text-white/30"
                  style={{ fontFamily: '"JetBrains Mono", monospace' }}
                >
                  02
                </span>
              )}
            </div>
            <h3
              className="text-xl font-medium tracking-tight text-[#FAFAFA] mb-3"
              style={{ fontFamily: '"Clash Display", sans-serif' }}
            >
              Aptitude Assessment
            </h3>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Complete LRDI, QA, and VARC tests to evaluate your cognitive abilities
            </p>
            <div className="flex items-center gap-2 text-[#FF3300] text-sm font-medium group-hover:gap-3 transition-all duration-200">
              <span>{progress.aptitude ? "View Results" : "Take Test"}</span>
              <ArrowRight size={15} />
            </div>
          </Link>

          {/* Step 3 */}
          <Link
            to="/student/personality"
            className="group border border-white/12 bg-white/[0.02] p-8 hover:border-[#FF3300]/50 hover:bg-white/[0.04] transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-8">
              <span className="grid place-items-center h-12 w-12 border border-white/15 group-hover:border-[#FF3300]/50 text-[#FF3300] transition-colors duration-200">
                <Target size={22} strokeWidth={1.8} />
              </span>
              {progress.personality ? (
                <CheckCircle className="w-5 h-5 text-[#FF3300]" />
              ) : (
                <span
                  className="text-xs tracking-[0.2em] text-white/30"
                  style={{ fontFamily: '"JetBrains Mono", monospace' }}
                >
                  03
                </span>
              )}
            </div>
            <h3
              className="text-xl font-medium tracking-tight text-[#FAFAFA] mb-3"
              style={{ fontFamily: '"Clash Display", sans-serif' }}
            >
              Personality Profiling
            </h3>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Complete MBTI assessment to understand your personality type and career fit
            </p>
            <div className="flex items-center gap-2 text-[#FF3300] text-sm font-medium group-hover:gap-3 transition-all duration-200">
              <span>{progress.personality ? "View Profile" : "Start Assessment"}</span>
              <ArrowRight size={15} />
            </div>
          </Link>

          {/* Step 4 */}
          <Link
            to="/student/recommendations"
            className="group border border-white/12 bg-white/[0.02] p-8 hover:border-[#FF3300]/50 hover:bg-white/[0.04] transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-8">
              <span className="grid place-items-center h-12 w-12 border border-white/15 group-hover:border-[#FF3300]/50 text-[#FF3300] transition-colors duration-200">
                <TrendingUp size={22} strokeWidth={1.8} />
              </span>
              {progress.recommendations ? (
                <CheckCircle className="w-5 h-5 text-[#FF3300]" />
              ) : (
                <span
                  className="text-xs tracking-[0.2em] text-white/30"
                  style={{ fontFamily: '"JetBrains Mono", monospace' }}
                >
                  04
                </span>
              )}
            </div>
            <h3
              className="text-xl font-medium tracking-tight text-[#FAFAFA] mb-3"
              style={{ fontFamily: '"Clash Display", sans-serif' }}
            >
              AI Career Recommendations
            </h3>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Get personalized job recommendations and skill gap analysis powered by Gemini AI
            </p>
            <div className="flex items-center gap-2 text-[#FF3300] text-sm font-medium group-hover:gap-3 transition-all duration-200">
              <span>Get Recommendations</span>
              <ArrowRight size={15} />
            </div>
          </Link>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 border-t border-l border-white/10">
          <div className="border-r border-b border-white/10 p-8">
            <div className="grid place-items-center h-12 w-12 border border-white/15 text-[#FF3300] mb-6">
              <BrainCircuit size={22} strokeWidth={1.8} />
            </div>
            <h3
              className="text-xl font-medium text-[#FAFAFA] mb-3"
              style={{ fontFamily: '"Clash Display", sans-serif' }}
            >
              AI-Powered
            </h3>
            <p className="text-white/50 text-sm leading-relaxed">
              Our Gemini-powered AI analyzes thousands of data points to provide accurate career guidance
            </p>
          </div>
          <div className="border-r border-b border-white/10 p-8">
            <div className="grid place-items-center h-12 w-12 border border-white/15 text-[#FF3300] mb-6">
              <TrendingUp size={22} strokeWidth={1.8} />
            </div>
            <h3
              className="text-xl font-medium text-[#FAFAFA] mb-3"
              style={{ fontFamily: '"Clash Display", sans-serif' }}
            >
              Data-Backed
            </h3>
            <p className="text-white/50 text-sm leading-relaxed">
              All recommendations are based on real market demand and industry trends
            </p>
          </div>
          <div className="border-r border-b border-white/10 p-8">
            <div className="grid place-items-center h-12 w-12 border border-white/15 text-[#FF3300] mb-6">
              <Target size={22} strokeWidth={1.8} />
            </div>
            <h3
              className="text-xl font-medium text-[#FAFAFA] mb-3"
              style={{ fontFamily: '"Clash Display", sans-serif' }}
            >
              Personalized
            </h3>
            <p className="text-white/50 text-sm leading-relaxed">
              Every career path is customized to your unique skills, aptitude, and personality
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
