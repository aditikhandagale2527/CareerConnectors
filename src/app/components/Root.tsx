import { useState } from "react"
import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { Brain, Home, Users, LogIn, LogOut, Briefcase, Search, Menu, X } from "lucide-react"

export function Root() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [menuOpen, setMenuOpen] = useState(false)

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
  const isHomePage = location.pathname === "/"

  const navLinkClass = (path: string, exact = false) => {
    const active = exact ? location.pathname === path : isActive(path)
    return `flex items-center space-x-2 px-4 py-2 font-semibold text-sm transition-all border-b-2 ${
      active
        ? "text-orange-600 border-orange-600"
        : "text-gray-700 border-transparent hover:text-orange-600"
    }`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">

      {/* ✅ Hide header on homepage AND auth pages */}
      {!isHomePage && !isAuthPage && (
        <header className="bg-white border-b-2 border-gray-100 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-18 py-3">

              {/* Logo */}
              <Link to="/" className="flex items-center space-x-3 group" onClick={closeMenu}>
                <div className="bg-gradient-to-br from-orange-600 to-red-600 p-2.5 rounded-xl shadow-md">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-extrabold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent tracking-tight">
                    Career Connector
                  </h1>
                  <p className="text-xs text-gray-500 font-medium">AI-Powered Career Guidance</p>
                </div>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center space-x-2">
                <Link to="/" className={navLinkClass("/", true)}>
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </Link>

                {isStudent && (
                  <Link to="/student" className={navLinkClass("/student")}>
                    <Users className="w-4 h-4" />
                    <span>Student Portal</span>
                  </Link>
                )}

                {isRecruiter && (
                  <Link to="/recruiter" className={navLinkClass("/recruiter")}>
                    <Users className="w-4 h-4" />
                    <span>Recruiter Portal</span>
                  </Link>
                )}

                {isStudent && (
                  <>
                    <Link to="/jobs" className={navLinkClass("/jobs")}>
                      <Briefcase className="w-4 h-4" />
                      <span>Jobs</span>
                    </Link>
                    <Link to="/livejobs" className={navLinkClass("/livejobs")}>
                      <Search className="w-4 h-4" />
                      <span>Live Jobs</span>
                    </Link>
                  </>
                )}

                {!token && (
                  <>
                    <Link to="/jobs" className={navLinkClass("/jobs")}>
                      <Briefcase className="w-4 h-4" />
                      <span>Jobs</span>
                    </Link>
                    <Link to="/livejobs" className={navLinkClass("/livejobs")}>
                      <Search className="w-4 h-4" />
                      <span>Live Jobs</span>
                    </Link>
                  </>
                )}

                <div className="ml-2 pl-2 border-l border-gray-200">
                  {token ? (
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-5 py-2.5 rounded-full border-2 border-red-500 text-red-600 font-semibold text-sm hover:bg-red-50 transition-all"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="flex items-center space-x-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Login</span>
                    </Link>
                  )}
                </div>
              </nav>

              {/* Mobile Hamburger */}
              <button
                className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-1 shadow-lg">
              <Link
                to="/"
                onClick={closeMenu}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold transition-all ${
                  location.pathname === "/" ? "bg-orange-50 text-orange-600" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </Link>

              {isStudent && (
                <Link to="/student" onClick={closeMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold transition-all ${
                    isActive("/student") ? "bg-orange-50 text-orange-600" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Users className="w-5 h-5" />
                  <span>Student Portal</span>
                </Link>
              )}

              {isRecruiter && (
                <Link to="/recruiter" onClick={closeMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold transition-all ${
                    isActive("/recruiter") ? "bg-orange-50 text-orange-600" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Users className="w-5 h-5" />
                  <span>Recruiter Portal</span>
                </Link>
              )}

              {(isStudent || !token) && (
                <>
                  <Link to="/jobs" onClick={closeMenu}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold transition-all ${
                      isActive("/jobs") ? "bg-orange-50 text-orange-600" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Briefcase className="w-5 h-5" />
                    <span>Jobs</span>
                  </Link>
                  <Link to="/livejobs" onClick={closeMenu}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold transition-all ${
                      isActive("/livejobs") ? "bg-orange-50 text-orange-600" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Search className="w-5 h-5" />
                    <span>Live Jobs</span>
                  </Link>
                </>
              )}

              <div className="pt-2 border-t border-gray-100">
                {token ? (
                  <button onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-full border-2 border-red-500 text-red-600 font-semibold transition-all hover:bg-red-50"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                ) : (
                  <Link to="/login" onClick={closeMenu}
                    className="flex items-center justify-center space-x-3 px-4 py-3 rounded-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold shadow-md transition-all"
                  >
                    <LogIn className="w-5 h-5" />
                    <span>Login</span>
                  </Link>
                )}
              </div>
            </div>
          )}
        </header>
      )}

      <main>
        <Outlet />
      </main>

      {/* ✅ Hide footer on homepage AND auth pages */}
      {!isHomePage && !isAuthPage && (
        <footer className="bg-white/80 backdrop-blur-sm border-t border-indigo-100 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-600">
              <p className="text-sm">
                © 2026 Career Connector. Powered by AI to bridge the gap between talent and opportunity.
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
