import { Link } from "react-router-dom";
import ai from "../assets/ai.png";


interface BlogCardProps {
  blog: any;
}

function BlogCard({ blog }: BlogCardProps) {

  return (

    <div className="max-w-sm w-full h-full flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">

      <img
        src={blog.image ? blog.image : ai}
        alt={blog.title}
        className="w-full h-56 object-cover"
      />

      <div className="p-5 flex flex-col flex-1">

        <span className="bg-[#E8D1B8] text-[#5C4033] px-3 py-1 rounded-full text-sm font-semibold w-fit">
          {blog.category}
        </span>

        <h2 className="text-2xl font-bold text-[#3E2723] mt-4 line-clamp-2">
          {blog.title}
        </h2>

        <p className="text-gray-600 mt-3 line-clamp-3">
          {blog.description}
        </p>

        <div className="flex justify-between text-gray-500 text-sm mt-5">

          <span>👤 {blog.author?.name}</span>
          <span>
            📅 {new Date(blog.createdAt).toLocaleDateString()}
          </span>

        </div>

        <div className="flex gap-3 mt-auto pt-4">

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