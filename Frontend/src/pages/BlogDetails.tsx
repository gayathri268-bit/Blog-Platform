import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteBlog } from "../services/blogService";
import {
    getBlogById,
    getComments,
    addComment,
    editComment,
    deleteComment,
    likeBlog,
} from "../services/blogService";
import {
    FacebookShareButton,
    WhatsappShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    EmailShareButton,
    FacebookIcon,
    WhatsappIcon,
    TwitterIcon,
    LinkedinIcon,
    EmailIcon,
} from "react-share";


function BlogDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [blog, setBlog] = useState<any>(null);
    const [comments, setComments] = useState<any[]>([]);
    const [text, setText] = useState("");
    const [editingId, setEditingId] = useState("");
    const [editText, setEditText] = useState("");
    const [likes, setLikes] = useState(0);
    const shareUrl = window.location.href;


    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const data = await getBlogById(id!);

                console.log(data);
                console.log(data.blog);

                setBlog(data.blog);
                console.log("Blog:", data.blog);
                console.log("Image:", data.blog.image);
                
                const commentData = await getComments(id!);
                setComments(commentData.comments);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBlog();
    }, [id]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this blog?"
        );

        if (!confirmDelete) return;

        try {
            await deleteBlog(id!);

            alert("Blog deleted successfully");

            navigate("/blogs");

        } catch (error) {
            console.error(error);
            alert("Failed to delete blog");
        }
    };

    const handleComment = async () => {
        if (!text.trim()) return;

        try {
            await addComment(id!, text);

            const commentData = await getComments(id!);
            setComments(commentData.comments);

            setText("");

        } catch (error) {
            console.log(error);
            alert("Failed to add comment");
        }
    };

    const handleEdit = async (id: string) => {
        if (!editText.trim()) return;

        try {
            await editComment(id, editText);

            const commentData = await getComments(blog._id);
            setComments(commentData.comments);

            setEditingId("");
            setEditText("");

        } catch (error) {
            console.log(error);
            alert("Failed to update comment");
        }
    };

    const handleDeleteComment = async (id: string) => {
        try {
            await deleteComment(id);

            const commentData = await getComments(blog._id);
            setComments(commentData.comments);

        } catch (error) {
            console.log(error);
            alert("Failed to delete comment");
        }
    };

    const handleLike = async () => {
        try {
            const data = await likeBlog(blog._id);

            setLikes(data.likes);

            setBlog({
                ...blog,
                likes: data.likes,
            });

        } catch (error) {
            console.log(error);
            alert("Failed to like blog");
        }
    };

    if (!blog) {
        return <h1 className="text-center mt-10"> Loading...</h1>;
    }

    return (
        <div className="min-h-screen bg-[#E8D1B8] py-12 px-6">

            <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
                <img
                    src={
                        blog.image
                            ? `http://localhost:5000${blog.image}`
                            : "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200"
                    }
                    alt={blog.title}
                    className="w-full h-[600px] object-cover"
                />
            </div>

            <div className="p-10">

                <span className="bg-[#E8D1B8] text-[#5C4033] px-4 py-2 rounded-full text-sm font-semibold">
                    {blog.category}
                </span>

                <h1 className="text-5xl font-bold text-[#3E2723] mt-6">
                    {blog.title}
                </h1>

                <div className="flex gap-6 text-gray-500 mt-4 mb-8">

                    <Link
                        to={`/author/${blog.author?._id}`}
                        className="text-blue-600 hover:underline"
                    >
                        👤 {blog.author?.name}
                    </Link>

                    <p>📅{new Date(blog.updatedAt).toLocaleDateString()} </p>

                </div>


                <p className="text-lg text-gray-600 mt-6">
                    {blog.description}
                </p>

                <div className="flex gap-8 mt-6 text-gray-600 font-medium">

                    <p>👁️ Views: {blog.views || 0}</p>
                    <p>💬 Comments: {comments.length}</p>

                </div>

                <div className="mt-8 text-gray-700 leading-8"
                    dangerouslySetInnerHTML={{
                        __html:
                            blog.content
                    }}
                />

                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-[#3E2723] mb-3">
                        Tags
                    </h3>

                    <div className="flex flex-wrap gap-2">
                        {blog.tags?.map((tag: string, index:
                            number) => (
                            <span
                                key={index}
                                className="bg-[#E8D1B8] text-[#5C4033] px-3 py-1 rounded-full text-sm">
                                #{tag}
                            </span>
                        )
                        )}
                    </div>
                </div>

                <div className="mt-10">
                    <h2 className="text-2xl font-bold text-[#3E2723] mb-4">
                        Share this Blog
                    </h2>

                    <div className="flex gap-4">
                        <FacebookShareButton url={shareUrl}>
                            <FacebookIcon size={40} round />
                        </FacebookShareButton>

                        <WhatsappShareButton url={shareUrl}>
                            <WhatsappIcon size={40} round />
                        </WhatsappShareButton>

                        <TwitterShareButton url={shareUrl}>
                            <TwitterIcon size={40} round />
                        </TwitterShareButton>

                        <LinkedinShareButton url={shareUrl}>
                            <LinkedinIcon size={40} round />
                        </LinkedinShareButton>

                        <EmailShareButton
                            url={shareUrl}
                            subject={blog.title}
                            body={blog.description}
                        >
                            <EmailIcon size={40} round />
                        </EmailShareButton>
                    </div>
                </div>

                <div className="mt-6">
                    <button
                        onClick={handleLike}
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
                    >
                        ❤️ Like ({likes})
                    </button>
                </div>

                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-[#3E2723] mb-4">
                        Comments ({comments.length})
                    </h2>

                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Write a comment..."
                        className="w-full border border-[#D8C3A5] rounded-lg p-3"
                    />

                    <button
                        onClick={handleComment}
                        className="mt-3 bg-[#5C4033] text-white px-5 py-2 rounded-lg"
                    >
                        Add Comment
                    </button>

                    <div className="mt-8 space-y-4">
                        {comments.map((comment) => (
                            <div
                                key={comment._id}
                                className="bg-white p-4 rounded-lg shadow"
                            >
                                <p className="font-semibold">
                                    {comment.user?.name}
                                </p>

                                {editingId === comment._id ? (
                                    <>
                                        <textarea
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                            className="w-full border rounded-lg p-2 mt-2"
                                        />

                                        <button
                                            onClick={() => handleEdit(comment._id)}
                                            className="bg-green-600 text-white px-3 py-1 rounded mt-2"
                                        >
                                            Save
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <p>{comment.text}</p>

                                        <div className="flex gap-3 mt-3">
                                            <button
                                                onClick={() => {
                                                    setEditingId(comment._id);
                                                    setEditText(comment.text);
                                                }}
                                                className="bg-yellow-500 text-white px-3 py-1 rounded"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => handleDeleteComment(comment._id)}
                                                className="bg-red-600 text-white px-3 py-1 rounded"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-10">
                        <button
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold"
                        >
                            Delete Blog
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogDetails;