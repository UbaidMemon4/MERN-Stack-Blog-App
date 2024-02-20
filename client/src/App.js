import "./App.css";
import Header from "./component/Header/header";
import { Routes, Route } from "react-router-dom";
import Blogs from "./pages/Blogs/blogs";
import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import UserBlog from "./pages/UserBlog/userBlog";
import CreateBlog from "./pages/CrateBlog/createBlog";
import BlogDetails from "./pages/BlogDetails/blogDetails";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/my-blogs" element={<UserBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/blog-detials/:id" element={<BlogDetails />} />
      </Routes>
    </>
  );
}

export default App;
