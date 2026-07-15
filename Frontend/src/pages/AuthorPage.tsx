import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

function AuthorPage() {
    const { id } = useParams();

    const [author, setAuthor] = useState<any>(null);
    const [blogs, setBlogs] = useState<any[]>([]);

    useEffect(() => {
        const fetchAuthor = async () => {
            const res = await api.get(`/users/author/${id}`);

            setAuthor(res.data.author);
            setBlogs(res.data.blogs);
        };

        fetchAuthor();
    }, [id]);

    const handleSubscribe = async () => {
        try {
            const token = localStorage.getItem("token");

            await api.post(
                `/users/subscribe/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Subscribed Successfully!");
        } catch (error) {
            console.log(error);
            alert("Failed to subscribe");
        }
    };

    if (!author) return <h1 className="text-center mt-10">Loading...</h1>;

    return (
        <div className="max-w-6xl mx-auto p-8">
            <div className="bg-white shadow rounded-xl p-6 mb-8">
                <h1 className="text-3xl font-bold">{author.name}</h1>

                <p className="mt-3 text-gray-600">{author.bio}</p>

                <p className="mt-2 text-gray-500">
                    {author.email}
                </p>

                <button
                    onClick={handleSubscribe}
                    className="mt-5 bg-[#5C4033] hover:bg-[#4A3228] text-white px-5 py-2 rounded-lg"
                >
                    Subscribe
                </button>

            </div>

            <h2 className="text-2xl font-bold mb-6">
                Blogs by {author.name}
            </h2>

            <div className="grid gap-6">
                {blogs.map((blog: any) => (
                    <div
                        key={blog._id}
                        className="bg-white shadow rounded-xl p-5"
                    >
                        <h3 className="text-xl font-bold">
                            {blog.title}
                        </h3>

                        <p className="text-gray-600 mt-2">
                            {blog.description}
                        </p>

                        <Link
                            to={`/blog/${blog._id}`}
                            className="text-blue-600 mt-3 inline-block"
                        >
                            Read More →
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AuthorPage;