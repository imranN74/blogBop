import { Routes, Route, Navigate } from "react-router-dom";
import { Blog } from "./pages/Blog";
import { CreateBlog } from "./pages/CreateBlog";
import { LandingBlogs } from "./pages/LandingBlogs";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
// import { Header } from "./components/Header";
import { useRecoilValue } from "recoil";
import { authAtom } from "./store/atom";
import { Navbar } from "./components/Navbar";
import { AboutPage } from "./pages/AboutPage";

function App() {
  const isLoggedIn = useRecoilValue(authAtom);
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/blog/:id"
          element={isLoggedIn ? <Blog /> : <Navigate to="/login" replace />}
        />
        {/* <Route
          path="/post/:id"
          element={
            isLoggedIn ? <CreateBlog /> : <Navigate to="/login" replace />
          }
        /> */}
        <Route
          path="/post"
          element={
            isLoggedIn ? <CreateBlog /> : <Navigate to="/login" replace />
          }
        />
        <Route path="/" element={<LandingBlogs />} />
        <Route path="/aboutus" element={<AboutPage />} />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" replace /> : <Signin />}
        />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
