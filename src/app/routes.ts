import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./components/pages/Home";
import { StudentDashboard } from "./components/pages/StudentDashboard";
import { ResumeUpload } from "./components/pages/ResumeUpload";
import { AptitudeTest } from "./components/pages/AptitudeTest";
import { PersonalityTest } from "./components/pages/PersonalityTest";
import { CareerRecommendations } from "./components/pages/CareerRecommendations";
import { RecruiterDashboard } from "./components/pages/RecruiterDashboard";
import { ApiDocs } from "./components/pages/ApiDocs";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "student", Component: StudentDashboard },
      { path: "student/resume", Component: ResumeUpload },
      { path: "student/aptitude", Component: AptitudeTest },
      { path: "student/personality", Component: PersonalityTest },
      { path: "student/recommendations", Component: CareerRecommendations },
      { path: "recruiter", Component: RecruiterDashboard },
      { path: "api", Component: ApiDocs },
    ],
  },
]);
