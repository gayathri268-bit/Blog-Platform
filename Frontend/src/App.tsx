import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
import ForgotPassword from "./pages/ForgotPassword";
import EditBlog from "./pages/EditBlog";
import Blogs from "./pages/Blogs";
import Profile from "./pages/Profile";
import Drafts from "./pages/Drafts";
import AuthorPage from "./pages/AuthorPage";
import Analytics from "./pages/Analytics";

function App() {
  return(
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="create-blog" element={<CreateBlog />} />
        <Route path="blog/:id" element={<BlogDetails />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="edit-blog/:id" element={<EditBlog />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/author/:id" element={<AuthorPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/drafts" element={<Drafts />} />


        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;