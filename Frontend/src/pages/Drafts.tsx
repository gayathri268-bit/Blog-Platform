import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Drafts() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDrafts = async () => {

      try {
        
        const token = localStorage.getItem("token");

        const res = await api.get("/blogs/drafts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBlogs(res.data.blogs);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDrafts();
  }, []);

  const publishBlog = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/blogs/${id}`,
        {
          status: "published",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Blog Published Successfully");

      window.location.reload();

    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlog = async (id: string) => {

    if (!window.confirm("Delete this draft?")) return;

    try {

      const token = localStorage.getItem("token");

      await api.delete(`/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Draft Deleted");

      setBlogs(blogs.filter((blog: any) => blog._id !== id));

    } catch (error) {
      console.log(error);
    }
  };

  {
    blogs.map((blog: any) => {
      console.log("Image:", blog.image);
    })

    return (

      <div className="min-h-screen bg-[#F8F3ED] py-10">
        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-10">

            <p className="uppercase tracking-[6px] text-[#8B5E3C] text-sm">
              Continue Writing
            </p>

            <div className="flex justify-center items-center gap-3 my-3">
              <div className="w-20 h-[2px] bg-[#C69C6D]"></div>
              <div className="w-3 h-3 rounded-full bg-[#C69C6D]"></div>
              <div className="w-20 h-[2px] bg-[#C69C6D]"></div>
            </div>

            <h1 className="text-4xl font-bold text-[#3E2723]">
              📝 Your Drafts
            </h1>

            <p className="text-gray-600 mt-3">
              You have {blogs.length} draft
              {blogs.length !== 1 ? "s" : ""} waiting to be published.
            </p>
          </div>

          {blogs.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-lg p-10 text-center">

              <h2 className="text-2xl font-semibold text-[#3E2723]">
                No Drafts Yet
              </h2>

              <p className="text-gray-500 mt-3">
                Start writing your first story and save it as a draft.
              </p>

              <button
                onClick={() => navigate("/create-blog")}
                className="mt-6 bg-[#5C4033] hover:bg-[#3E2723] text-white px-6 py-3 rounded-xl transition"
              >
                Create Your First Blog
              </button>

            </div>
          ) : (

            blogs.map((blog: any) => (

              <div
                key={blog._id}
                className="bg-white border border-[#D8C2A8] rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 mb-6"
              >
                {blog.image ? (
                  <img
                    src={`http://localhost:5000${blog.image}`}
                    alt={blog.title}
                    className="w-full h-56 object-cover rounded-xl mb-5"
                  />
                ) : (
                  <div className="w-full h-56 bg-[#F3E3D0] rounded-xl flex items-center justify-center text-[#8B5E3C] text-lg mb-5">
                    📷 No Featured Image
                  </div>
                )}


                <h2 className="text-2xl font-bold text-[#3E2723]">
                  {blog.title}
                </h2>

                <p className="text-gray-600 mt-2">
                  {blog.description}
                </p>

                <p className="mt-3 text-[#8B5E3C] font-medium">
                  📂 {blog.category}
                </p>

                <div className="flex items-center gap-4 mt-4">

                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                    🟡 Draft
                  </span>

                  <span className="text-gray-500 text-sm">
                    📅{" "}
                    {blog.updatedAt
                      ? new Date(blog.updatedAt).toLocaleDateString("en-GB")
                      : "No Date"}
                  </span>

                </div>


                <div className="flex gap-4 mt-6">

                  <button
                    onClick={() => navigate(`/edit-blog/${blog._id}`)}
                    className="bg-[#8B6B4A] hover:bg-[#75573C] text-white px-5 py-2 rounded-lg transition"
                  >
                    ✏ Edit
                  </button>

                  <button
                    onClick={() => publishBlog(blog._id)}
                    className="bg-[#5C4033] hover:bg-[#3E2723] text-white px-5 py-2 rounded-lg transition"
                  >
                    🚀 Publish
                  </button>

                  <button
                    onClick={() => deleteBlog(blog.i_d)}
                    className="bg-[#C68E5A] hover:bg-[#3A2A24] text-white px-5 py-2 rounded-lg transition"
                  >
                    🗑 Delete
                  </button>

                </div>

              </div>

            ))
          )}

        </div>
      </div>
    );
  }
}
export default Drafts;