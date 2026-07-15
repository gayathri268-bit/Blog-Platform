import { Link } from "react-router-dom";
import ai from "../assets/ai.png";


  interface BlogCardProps {
    blog:any;
  }

function BlogCard({ blog }: BlogCardProps) {
 
  return (
    
    <div className="max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">

      <img
        src={blog.image ? `http://localhost:5000${blog.image}` : ai}
        alt={blog.title}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">

        <span className="bg-[#E8D1B8] text-[#5C4033] px-3 py-1 rounded-full text-sm font-semibold">
          {blog.category}
        </span>

        <h2 className="text-2xl font-bold text-[#3E2723] mt-4">
          {blog.title}
        </h2>

        <p className="text-gray-600 mt-3">
          {blog.description}
        </p>

        <div className="flex justify-between text-gray-500 text-sm mt-5">

          <span>👤 {blog.author?.name}</span>
          <span>
            📅 { new Date(blog.createdAt).toLocaleDateString() }
          </span>

        </div>

        <div className="flex gap-3 mt-6">

          <Link
            to={`/blog/${blog._id}`}
            className="bg-[#5C4033] text-white px-4 py-2 rounded-lg hover:bg-[#4A3227]"
          >
            Read More

          </Link>

          <Link
            to={`/edit-blog/${blog._id}`}
            className="bg-[#E8D1B8] text-[#5C4033] px-4 py-2 rounded-lg hover:bg-[#D9BEA1]"
          >
            Edit

          </Link>

           </div>
    </div>
    </div>
  );
}

export default BlogCard