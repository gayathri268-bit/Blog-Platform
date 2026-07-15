import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBlogById, updateBlog } from "../services/blogService";


function EditBlog() {

    const { id } = useParams();
    const navigate = useNavigate();

    console.log("Route ID:", id);

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        image: "",
        description: "",
        content: "",
        tags: "",
    });

    const [image, setImage] = useState<File | null>(null);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const data = await getBlogById(id!);
                console.log(data.blog);

                setFormData({
                    title: data.blog.title,
                    category: data.blog.category,
                    image: data.blog.image,
                    description: data.blog.description,
                    content: data.blog.content,
                    tags: Array.isArray(data.blog.tags)
                        ? data.blog.tags.join(", ")
                        : data.blog.tags,
                });
            } catch (error) {
                console.log(error);
            }
        }

        fetchBlog();
    }, [id]);

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        try {

            const data = new FormData();

            data.append("title", formData.title);
            data.append("category", formData.category);
            data.append("description", formData.description);
            data.append("content", formData.content);
            data.append("tags", formData.tags);

            if (image) {
                data.append("image", image);
            }

            console.log("sending FormData...");
            for (const pair of data.entries()) {
                console.log(pair[0], pair[1]);
            }
            await updateBlog(id!, data);

            alert("Blog Updated Successfully");

            navigate(`/blog/${id}`);
        }
        catch (error: any) {
            console.log(error);

            console.log(error.response);

            console.log(error.response?.data);

            alert(error.response?.data?.message || "Failed to update blog");
        }

    };

    return (

        <div className="min-h-screen bg-[#F8F3ED] py-12 px-6">

            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10">

                <p className="uppercase tracking-[4px] text-[#8B6B52] font-semibold text-center">
                    EDIT YOUR STORY
                </p>

                <div className="flex items-center justify-center gap-3 my-4">
                    <div className="w-16 h-[2px] bg-[#C69C6D]"></div>
                    <div className="w-2 h-2 rounded-full bg-[#C69C6D]"></div>
                    <div className="w-16 h-[2px] bg-[#C69C6D]"></div>
                </div>

                <h1 className="text-4xl font-bold text-center text-[#3E2723]">
                    Edit Blog
                </h1>

                <p className="text-center text-gray-500 mt-4 mb-10">
                    Update your blog and keep your readers informed.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label className="block font-medium text-[#3E2723] mb-2">
                            Blog Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full border border-[#D8C3A5] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-[#3E2723] mb-2">
                            Category
                        </label>

                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full border border-[#D8C3A5] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
                        >

                            <option value="Technology">Technology</option>
                            <option value="Travel">Travel</option>
                            <option value="Food">Food</option>
                            <option value="Business">Business</option>
                            <option value="Lifestyle">Lifestyle</option>

                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="block text-[#3E2723] font-medium mb-2">
                            Featured Image
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                if (e.target.files?.[0]) {
                                    setImage(e.target.files[0]);
                                }
                            }}
                            className="w-full border border-[#D8C3A5] font-medium text-[#3E2723] focus:border-[#6F4E37] rounded-lg px-4 py-3"
                        />

                    </div>

                    <div>
                        <label className="block font-medium text-[#3E2723] mb-2">
                            Short Description
                        </label>
                        <textarea
                            rows={3}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full border border-[#D8C3A5] rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
                        ></textarea>

                    </div>

                    <div>
                        <label className="block font-medium text-[#3E2723] mb-2">
                            Blog Content
                        </label>

                        <textarea
                            rows={10}
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            className="w-full border border-[#D8C3A5] rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
                        ></textarea>

                    </div>

                    <div>
                        <label className="block font-medium text-[#3E2723] mb-2">
                            Tags
                        </label>

                        <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            className="w-full border border-[#D8C3A5] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#5C4033] hover:bg-[#4A3227] text-white py-3 rounded-lg font-semibold transition duration-300"
                    >
                        Update Blog
                    </button>

                </form>

            </div>

        </div>
    );
}

export default EditBlog;