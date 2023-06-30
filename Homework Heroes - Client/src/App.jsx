import * as Pages from "./pages";
import Footer from "./components/Footer";
import UserProfile from './pages/UserProfile/index';
import { Routes, Route, Navigate } from "react-router-dom";
import { NavBar } from './components'
import "./App.css";

import { PrivateRoute } from "./components";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Pages.LandingPage />} />
          <Route path="/login" element={<Pages.LoginPage />} />
          <Route path="/register" element={<Pages.RegisterPage />} />
          <Route path="/teacherdashboard" element={<Pages.TeacherDashboard />} />
          <Route path="/completedhomework" element={<Pages.CompletedHomework />} />
          <Route path="/visualcalendar" element={<Pages.VisualCalendar />} />


          <Route path="" element={<PrivateRoute />}>
            <Route path='/profile' element={<UserProfile />} />
            <Route path="/homework">
              <Route index element={<Pages.HomeworkListPage />} />
              <Route path="/homework/:id" element={<Pages.HomeworkPage />} />
            </Route>
          </Route>

          <Route path = "*" element={<Pages.NotFoundPage />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
