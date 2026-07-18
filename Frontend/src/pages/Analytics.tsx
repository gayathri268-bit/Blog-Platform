import { useEffect, useState } from "react";
import api from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
interface Blog {
  _id: string;
  title: string;
  views: number;
  likes: number;
}

function Analytics() {

  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalViews: 0,
    totalLikes: 0,
  });
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const token = localStorage.getItem("token");

      const res = await api.get("/blogs/analytics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(res.data);
      setBlogs(res.data.blogs);
    };

    fetchAnalytics();
  }, []);

  const data = blogs.map((blog) => ({
    name: blog.title,
    views: blog.views,
  }));

  const topBlog = blogs.length > 0
    ? [...blogs].sort((a, b) =>
      Number(b.views) - Number(a.views))[0]
    : null;

  return (

    <div className="bg-[#E8D1B8]">
      <div className="max-w-6xl mx-auto p-8">

        <h1 className="text-4xl font-bold mb-8 text-white">
          Analytics Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="shadow-xl bg-white rounded-xl border border-[#D8C2A8] p-6 text-center hover:scale-105 transition">

            <h2 className="text-5xl font-bold text-[#3E2723]">
              {stats.totalBlogs}
            </h2>

            <p className="mt-2 text-[#8B6B52] font-medium">
              Total Blogs
            </p>

          </div>

          <div className="bg-white shadow-xl rounded-xl border border-[#D8C2A8] p-6 text-center hover:scale-105 transition">

            <h2 className="text-5xl font-bold text-[#3E2723]">
              {stats.totalViews}
            </h2>

            <p className="mt-2 text-[#8B6B52] font-medium">
              Total Views
            </p>

          </div>

          <div className="bg-white shadow-xl rounded-xl border border-[#D8C2A8] p-6 text-center hover:scale-105 transition">

            <h2 className="text-5xl font-bold text-[#3E2723]">
              {stats.totalLikes}
            </h2>

            <p className="mt-2 text-[#8B6B52] font-medium">
              Total Likes
            </p>

          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-[#D8C2A8] p-6 mb-8 h-[500px]">

          <h2 className="text-2xl font-bold text-[#3E2723] mb-6">
            Performance Overview
          </h2>

          <div className="h-96">

            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis
                  dataKey="name"
                  angle={-15}
                  textAnchor="end"
                  interval={0}
                  height={70}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(name) => name.length > 12 ? name.slice(0, 12) + "..." : name}
                />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="views"
                  fill="#5C1A1B"
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h3 className="font-bold text-xl mb-4">
              🏆 Top Performing Blog
            </h3>

            {topBlog ? (
              <>
                <p> {topBlog.title} </p>
                <p> Views : {topBlog.views}</p>
                <p> Likes : {topBlog.likes}</p>
              </>
            ) : (
              <p> No blogs yet . </p>
            )}

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h3 className="font-bold text-xl mb-4">
              📌 Recent Activity
            </h3>

            <p>✓ Food Blog Published</p>
            <p>✓ Draft Saved</p>
            <p>✓ Blog Updated</p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h3 className="font-bold text-xl mb-4">
              📊 Quick Summary
            </h3>

            <p>Blogs Published : {stats.totalBlogs}</p>
            <p>Drafts : 2</p>
            <p>Views Today : 18</p>
            <p>Likes Today : 5</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h3 className="font-bold text-xl mb-4">
              🏆 Top Performing Blogs
            </h3>

            {[...blogs]
              .sort((a, b) => Number(b.views) -
                Number(a.views))
              .map(blog => (
                <div
                  key={blog._id}
                  className="flex justify-between border-b py-2"
                >
                  <span>{blog.title}</span>
                  <span>{blog.views} Views</span>
                </div>
              ))}

          </div>

        </div>
      </div>
    </div>


  );
}
export default Analytics;