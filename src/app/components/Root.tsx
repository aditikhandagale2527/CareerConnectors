import { useState } from "react"
import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { Brain, Home, Users, LogIn, LogOut, Briefcase, Search, Menu, X } from "lucide-react"

export function Root() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [menuOpen, setMenuOpen] = useState(false)

  // Get role from JWT token
  const getRole = () => {
    if (!token) return null
    try {
      const payload = JSON.parse(atob(token.split(".")[1]))
      return payload.role
    } catch {
      return null
    }
  }

  const role = getRole()
  const isStudent = role === "student"
  const isRecruiter = role === "recruiter"

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("appliedJobs")
    localStorage.removeItem("extractedSkills")
    localStorage.removeItem("aptitudeScore")
    localStorage.removeItem("mbtiResult")
    navigate("/login")
    setMenuOpen(false)
  };

  const closeMenu = () => setMenuOpen(false)

  const isAuthPage = location.pathname === "/login" || location.pathname === "/register"

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-indigo-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group" onClick={closeMenu}>
              <div className="bg-gradient-to-br from-orange-600 to-red-600 p-2 rounded-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Career Connector
                </h1>
                <p className="text-xs text-gray-500">AI-Powered Career Guidance</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            {!isAuthPage && (
              <nav className="hidden md:flex items-center space-x-1">

                <Link
                  to="/"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    isActive("/") && location.pathname === "/"
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </Link>

                {/* Show Student Portal only for students */}
                {isStudent && (
                  <Link
                    to="/student"
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      isActive("/student")
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <span>Student Portal</span>
                  </Link>
                )}

                {/* Show Recruiter Portal only for recruiters */}
                {isRecruiter && (
                  <Link
                    to="/recruiter"
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      isActive("/recruiter")
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <span>Recruiter Portal</span>
                  </Link>
                )}

                {/* Show Jobs and Live Jobs only for students */}
                {isStudent && (
                  <>
                    <Link
                      to="/jobs"
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                        isActive("/jobs")
                          ? "bg-indigo-100 text-indigo-700"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Briefcase className="w-4 h-4" />
                      <span>Jobs</span>
                    </Link>

                    <Link
                      to="/livejobs"
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                        isActive("/livejobs")
                          ? "bg-indigo-100 text-indigo-700"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Search className="w-4 h-4" />
                      <span>Live Jobs</span>
                    </Link>
                  </>
                )}

                {/* Show Jobs and Live Jobs when not logged in */}
                {!token && (
                  <>
                    <Link
                      to="/jobs"
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                        isActive("/jobs")
                          ? "bg-indigo-100 text-indigo-700"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Briefcase className="w-4 h-4" />
                      <span>Jobs</span>
                    </Link>

                    <Link
                      to="/livejobs"
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                        isActive("/livejobs")
                          ? "bg-indigo-100 text-indigo-700"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Search className="w-4 h-4" />
                      <span>Live Jobs</span>
                    </Link>
                  </>
                )}

                {token ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition-all"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </Link>
                )}
              </nav>
            )}

            {/* Mobile Hamburger */}
            {!isAuthPage && (
              <button
                className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {!isAuthPage && menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-1 shadow-lg">
            <Link
              to="/"
              onClick={closeMenu}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                isActive("/") && location.pathname === "/"
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </Link>

            {/* Student Portal — students only */}
            {isStudent && (
              <Link
                to="/student"
                onClick={closeMenu}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  isActive("/student")
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Users className="w-5 h-5" />
                <span className="font-medium">Student Portal</span>
              </Link>
            )}

            {/* Recruiter Portal — recruiters only */}
            {isRecruiter && (
              <Link
                to="/recruiter"
                onClick={closeMenu}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  isActive("/recruiter")
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Users className="w-5 h-5" />
                <span className="font-medium">Recruiter Portal</span>
              </Link>
            )}

            {/* Jobs and Live Jobs — students and non logged in */}
            {(isStudent || !token) && (
              <>
                <Link
                  to="/jobs"
                  onClick={closeMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    isActive("/jobs")
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Briefcase className="w-5 h-5" />
                  <span className="font-medium">Jobs</span>
                </Link>

                <Link
                  to="/livejobs"
                  onClick={closeMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    isActive("/livejobs")
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Search className="w-5 h-5" />
                  <span className="font-medium">Live Jobs</span>
                </Link>
              </>
            )}

            <div className="pt-2 border-t border-gray-100">
              {token ? (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition-all"
                >
                  <LogIn className="w-5 h-5" />
                  <span className="font-medium">Login</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="bg-white/80 backdrop-blur-sm border-t border-indigo-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="text-sm">
              © 2026 Career Connector. Powered by AI to bridge the gap between talent and opportunity.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
