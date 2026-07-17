import { useEffect, useState } from "react";
import api from "../services/api";

function Profile() {

    const token = localStorage.getItem("token");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        bio: "",
        profileImage: "",
        facebook: "",
        linkedin: "",
        github: "",
    });

    const [profileImage, setProfileImage] = useState<File | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {

            const res = await api.get("/users/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setFormData({
                name: res.data.name,
                email: res.data.email,
                bio: res.data.bio || "",
                profileImage: res.data.profileImage || "",
                facebook: res.data.socialLinks?.facebook || "",
                linkedin: res.data.socialLinks?.linkedin || "",
                github: res.data.socialLinks?.github || "",
            });

        };

        fetchProfile();

    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

        const data = new FormData();

        data.append("name", formData.name);
        data.append("bio", formData.bio);
        data.append("facebook", formData.facebook);
        data.append("linkedin", formData.linkedin);
        data.append("github", formData.github);

        if (profileImage) {
            data.append("profileImage", profileImage);
        }

        await api.put(
            "/users/profile",
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        alert("Profile Updated Successfully");

    };

    return (

        <div className="bg-White border border-[#800020] rounded-3xl shadow-xl p-8">
            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-[#D8C2A8]mt-5 p-10">

                <p className="uppercase tracking-[6px] text-[#8B5E3C] text-center text-sm">
                    My Account
                </p>

                <div className="flex justify-center items-center gap-6 my-3">
                    <div className="w-20 h-[2px] bg-[#C69C6D]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#C69C6D]"></div>
                    <div className="w-20 h-[2px] bg-[#C69C6D]"></div>
                </div>

                <h1 className="text-5xl py-4 text-center font-bold text-[#3E2723]">
                    👤 My Profile
                </h1>

                <p className="text-gray-600 text-center gap-3 mt-5">
                    Manage your Coffee Tales account and personal information.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    {formData.profileImage !== "" && (
                        <img
                            src={formData.profileImage}
                            className="w-20 h-20 rounded-full object-cover mx-auto mb-6"
                        />
                    )}
                    <div>
                        <label className="block font-medium text-[#3E2723] mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name"
                            className="w-full border-2 border-[#7A3E2B] rounded-xl px-4 py-3 focus:outline-none focus:border-[#800020] focus:ring-4 focus:ring-[#5C4033]/30 mt-4 transition-all"
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-[#3E2723] mb-2">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            disabled
                            className="w-full border-2 border-[#7A3E2B] rounded-xl px-4 py-3 focus:outline-none focus:border-[#800020] focus:ring-4 focus:ring-[#5C4033]/30 mt-4 transition-all" />
                    </div>

                    <div>
                        <label className="block font-medium text-[#3E2723] mb-2">Bio</label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder="Write your bio..."
                            className="w-full border-2 border-[#7A3E2B] rounded-xl px-4 py-3 focus:outline-none focus:border-[#800020] focus:ring-4 focus:ring-[#5C4033]/30 mt-4 transition-all" />
                    </div>

                    <div>
                        <label className="block font-medium text-[#3E2723] mb-2">Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    setProfileImage(e.target.files[0]);
                                }
                            }}
                            className="w-full border-2 border-[#7A3E2B] rounded-xl px-4 py-3 focus:outline-none focus:border-[#800020] focus:ring-4 focus:ring-[#5C4033]/20 mt-4 transition-all"
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-[#3E2723] mb-2">Facebook Link</label>
                        <input
                            type="text"
                            name="facebook"
                            value={formData.facebook}
                            onChange={handleChange}
                            placeholder="Facebook Link"
                            className="w-full border-2 border-[#7A3E2B] rounded-xl px-4 py-3 focus:outline-none focus:border-[#800020] focus:ring-4 focus:ring-[#5C4033]/30 mt-4 transition-all"
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-[#3E2723] mb-2">LinkedIn Link</label>
                        <input
                            type="text"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleChange}
                            placeholder="LinkedIn Link"
                            className="w-full border-2 border-[#7A3E2B] rounded-xl px-4 py-3 focus:outline-none focus:border-[#800020] focus:ring-4 focus:ring-[#5C4033]/30 mt-4 transition-all"
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-[#3E2723] mb-2">GitHub Link</label>
                        <input
                            type="text"
                            name="github"
                            value={formData.github}
                            onChange={handleChange}
                            placeholder="GitHub Link"
                            className="w-full border-2 border-[#7A3E2B] rounded-xl px-4 py-3 focus:outline-none focus:border-[#800020] focus:ring-4 focus:ring-[#5C4033]/30 mt-4 transition-all"
                        />
                    </div>

                    <button
                        className="w-full bg-[#5C4033] mt-5 text-white py-3 rounded-lg"
                    >
                        Update Profile
                    </button>

                </form>
            </div>

        </div>

    );

}

export default Profile;