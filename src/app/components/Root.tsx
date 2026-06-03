import { Outlet, Link, useLocation } from "react-router";
import { Brain, Home, Users, Code } from "lucide-react";

export function Root() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-indigo-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
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

            {/* Navigation */}
            <nav className="flex space-x-1">
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
              <Link
                to="/api"
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  isActive("/api")
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Code className="w-4 h-4" />
                <span>API</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
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