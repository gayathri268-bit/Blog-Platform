import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import api from "../services/api";

function Blogs() {
  const [blogs, setBlogs] =
    useState<any[]>([]);
  const [search, setSearch] = useState("");

  const fetchBlogs = async () => {
    try {
      const response = await api.get("/blogs");
      setBlogs(response.data.blogs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);


  const filteredBlogs = blogs.filter((blog: any) =>

    blog.title.toLowerCase().includes(search.toLowerCase()) ||

    blog.category.toLowerCase().includes(search.toLowerCase()) ||

    blog.description.toLowerCase().includes(search.toLowerCase()) ||

    blog.tags?.join(" ").toLowerCase().includes(search.toLowerCase())

  );

  return (

    <div className="min-h-screen bg-[#F2E6D8] rounded-xl p-10">

      <div className="flex flex-col items-center mb-10">

        <input
          type="text"
          placeholder="🔍 ☕ All   ✈ Travel   💻 Technology   🍔 Food   💼 Business"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
          w-full
          max-w-lg
          px-5
          py-3
          rounded-full
          border
          border-[#C69C6D]
          bg-white
          text-[#3E2723]
          placeholder:text-gray-400
          shadow-md
          focus:outline-none
          focus:ring-2
          focus:ring-[#C69C6D]
          hover:shadow-xl
          transition-all
          duration-300
         "
        />

        <h1 className="text-4xl font-bold text-[#3E2723] mt-8">
          Explore Stories
        </h1>

        <p className="text-gray-500 mt-2 text-center">
          Discover travel, technology, food, business and more.
        </p>

        <p className="text-[#6B4F3B] mt-2">
          {filteredBlogs.length} Stories Found
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-20 items-center justify-center py-6 px-4 gap-5">

        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog: any) => (
            <BlogCard key={blog._id} blog={blog} />
          ))

        ) : (
          
          <div className="col-span-full text-center py-20">
            <h2 className="text-3xl font-bold text-[#6B4F3B]">
              No Stories Found ☕
            </h2>

            <p className="text-gray-500 mt-3">
              Try searching with another keyword.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Blogs;