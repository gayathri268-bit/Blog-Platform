import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

import {
    Editor,
    EditorProvider,
    Toolbar,
    BtnBold,
    BtnItalic,
    BtnUnderline,
    BtnBulletList,
    BtnNumberedList,
} from "react-simple-wysiwyg";


function CreateBlog() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        content: "",
        tags: "",
        status: "published",
    });
    const [image, setImage] = useState<File | null>(null);

    const handleChange = (

        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const data = new FormData();

            data.append("title", formData.title);
            data.append("category", formData.category);
            data.append("description", formData.description);
            data.append("content", formData.content);
            data.append("tags", formData.tags);
            data.append("status", formData.status);

            if (image) {
                data.append("image", image);
            }

            await api.post(
                "/blogs",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (formData.status === "draft") {
                alert("Draft Saved Successfully");
                navigate("/drafts");
            } else {
                alert("Blog Published Successfully");
                navigate("/blogs");
            }

        } catch (error: any) {
            console.log(error.response?.data);
            alert(error.response?.data?.message || "Failed to create blog");
        }
    };

    return (
        <div className="min-h-screen bg-[#F8F3ED] py-12 px-6">

            <div className="max-w-4xl mx-auto border-2 border-[#8B5E3C] bg-white rounded-3xl shadow-2xl p-10">

                <p className="uppercase tracking-[8px] text-[#8B6B52] text-sm font-semibold text-center">
                    LET YOUR STORY BREW
                </p>

                <div className="flex items-center justify-center gap-3 mt-4">
                    <div className="w-40 h-[2px] bg-[#C69C6D]"></div>
                    <div className="w-2 h-2 rounded-full bg-[#C69C6D]"></div>
                    <div className="w-40 h-[2px] bg-[#C69C6D]"></div>
                </div>

                <h1 className="text-4xl font-bold text-center text-[#3E2723]">
                    Create New Blog
                </h1>

                <p className="text-center text-gray-500 text-lg max-w-2xl mx-auto mt-4 mb-10">
                    Share your thoughts, experiences and ideas With Readers Around The World .
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label className="block font-medium text-[#3E2723] mb-2">
                            📝 Blog Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter blog title"
                            className="w-full border-2 border-[#8B5E3C] focus:border-[#8B5E3C] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C69C6D] focus:ring-4 focus:ring-[#C69C6D]/30"
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-[#3E2723] mb-2">
                            📂 Category
                        </label>

                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full border-2 border-[#8B5E3C] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C69C6D] focus:ring-4 focus:ring-[#C69C6D]/30"
                        >
                            <option value="">Select Category</option>
                            <option value="Technology">Technology</option>
                            <option value="Travel">Travel</option>
                            <option value="Food">Food</option>
                            <option value="Business">Business</option>
                            <option value="Lifestyle">Lifestyle</option>
                        </select>

                    </div>


                    <div className="mb-6">
                        <label className="block text-[#3E2723] font-medium mb-2">
                            🖼 Featured Image
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    setImage(e.target.files[0]);
                                }
                            }}
                            className="w-full border-2 border-[#8B5E3C] rounded-xl px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-[#3E2723] mb-2">
                            📄 Short Description
                        </label>

                        <textarea
                            rows={3}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Write a short description..."
                            className="w-full border-2 border-[#8B5E3C] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C69C6D] focus:ring-4 focus:ring-[#C69C6D]/30"
                        ></textarea>

                    </div>

                    <div>
                        <label className="block font-medium text-[#3E2723] mb-2">
                            ✍ Blog Content
                        </label>

                        <EditorProvider>
                            <Toolbar>
                                <BtnBold />
                                <BtnItalic />
                                <BtnUnderline />
                                <BtnBulletList />
                                <BtnNumberedList />
                            </Toolbar>

                            <Editor
                                value={formData.content}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        content: e.target.value,
                                    })
                                }
                            />
                        </EditorProvider>
                    </div>


                    <div>
                        <label className="block font-medium text-[#3E2723] mb-2">
                            🏷 Tags
                        </label>

                        <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            placeholder="React, AI, Travel..."
                            className="w-full border-2 border-[#8B5E3C] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C69C6D] focus:ring-4 focus:ring-[#C69C6D]/30"
                        />

                    </div>


                    <div className="flex gap-4">

                        <button
                            type="submit"
                            onClick={() =>
                                setFormData({
                                    ...formData,
                                    status: "draft",
                                })
                            }
                            className="w-1/2 bg-gray-500 text-white py-3 rounded-lg"
                        >
                            Save Draft
                        </button>

                        <button
                            type="submit"
                            onClick={() =>
                                setFormData({
                                    ...formData,
                                    status: "published",
                                })
                            }
                            className="w-1/2 bg-[#5C4033] text-white py-3 rounded-lg"
                        >
                            Publish Blog
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default CreateBlog;