import blogHero from "../assets/blogHero.png";
import ai from "../assets/ai.png"
import castle from "../assets/castle.png"
import food from "../assets/food.png"
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

function Home() {

    const [email, setEmail] = useState("");

    const handleSubscribe = () => {
        if (!email.trim()) {
            alert("Please enter your email.");
            return;
        }

        alert("Subscribed Successfully!");

        setEmail("");
    };

    return (
        
        <div className="relative min-h-screen overflow-hidden bg-[#F8F3ED] bg-gradient-to-b from-[#FFF8F0] to-[#F3E2CF] rounded-3xl">

            <div className="absolute top-0 left-0 w-72 h-72 bg-[#FFD79A] opacity-20 blur-[120px] rounded-full"></div>

            <div className="absolute top-20 right-10 w-80 h-80 bg-[#F6C26B] opacity-20 blur-[140px] rounded-full"></div>

            <div className="absolute bottom-20 left-20 w-64 h-64 bg-[#FFD79A] opacity-20 blur-[120px] rounded-full"></div>

            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C68C53] opacity-15 blur-[150px] rounded-full"></div>

            <div className="relative z-10">

                <section className="max-w-8xl mx-auto px-10 py-20 rounded-[32px] bg-gradient-to-r from-[#2B1D16] via-[#3A281F] to-[#4B3528] shadow-2xl grid grid-cols-1 lg:grid-cols-2 items-center gap-12">

                    <div>
                        <p className="uppercase tracking-[4px] text-[#D9A15E] font-semibold mb-4">
                            Welcome to the world of stories
                        </p>

                        <div className="flex items-center gap-4 font-bold mt-4">
                            <div className="w-44 h-[3px] bg-[#C69C6D]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#C69C6D]"></div>
                            <div className="w-44 h-[3px] bg-[#C69C6D]"></div>
                        </div>

                        <h1 className="text-8xl font-bold text-white leading-tight">
                            Share Your Stories.
                            <br />
                            <span className="text-[#D9A15E]">
                                Inspire The World.
                            </span>
                        </h1>


                        <p className="text-white mt-6 max-w-xl font-semibold text-lg leading-8">
                            Write blogs, discover inspiring stories, connect with writers,
                            and share your ideas with people around the world.
                        </p>

                        <div className="flex gap-6 mt-10">
                            <Link
                                to="/create-blog"
                                className="border-2 border-[#C68E5A] bg-[#C68E5A] text-white font-semibold px-8 py-4 rounded-xl hover:bg-[#5C4033] hover:text-white hover:border border-[#C68E5A] transition duration-300 hover:scale-105"
                            >
                                Start Writing
                            </Link>

                            <Link
                                to="/blogs"
                                className="border-2 border-[#C68E5A] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#5C4033] hover:text-white hover:border border-[#C68E5A] transition duration-300 hover:scale-105"
                            >
                                Explore Blogs
                            </Link>
                        </div>
                    </div>

                    <div className="relative overflow-hidden">

                        <img
                            src={blogHero}
                            alt="blogHero"
                            className="w-full h-[600px] rounded-3xl shadow-2xl border border-[#5C4033] object-cover"
                        />

                    </div>
                </section>


                <section className="max-w-7xl mx-auto px-6 py-20">
                    <p className="uppercase tracking-[5px] text-[#8B6B52] font-semibold text-center">
                        Find your interest
                    </p>

                    <div className="flex items-center justify-center gap-3 my-4">
                        <div className="w-30 h-[3px] bg-[#C69C6D]"></div>
                        <div className="w-2 h-2 rounded-full bg-[#C69C6D]"></div>
                        <div className="w-30 h-[3px] bg-[#C69C6D]"></div>
                    </div>

                    <h2 className="text-6xl font-bold text-center text-[#3E2723]">
                        Explore Categories
                    </h2>

                    <p className="text-center text-gray-500 mt-4 mb-14 text-xl">
                        Discover blogs from your favorite topics.
                    </p>

                    <div className="grid grid-cols-1 l:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">

                        <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:-translate-y-3 hover:shadow-2xl transition duration-300">
                            <div className="w-30 h-20 mx-auto mb-6 rounded-full bg-[#F3E3D0] flex items-center justify-center text-4xl">💻</div>

                            <h3 className="text-2xl font-semibold text-[#5C4033]">
                                Technology
                            </h3>

                            <p className="text-gray-500 mt-3">
                                Latest tech trends, AI, coding and software.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition duration-300">

                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#F3E3D0] flex items-center justify-center text-4xl">✈️</div>

                            <h3 className="text-2xl font-semibold text-[#5C4033]">
                                Travel
                            </h3>

                            <p className="text-gray-500 mt-3">
                                Explore beautiful destinations around the world.
                            </p>

                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition duration-300">

                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#F3E3D0] flex items-center justify-center text-4xl">🍽️</div>

                            <h3 className="text-2xl font-semibold text-[#5C4033]">
                                Food
                            </h3>

                            <p className="text-gray-500 mt-3">
                                Recipes, restaurants and delicious stories.
                            </p>

                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition duration-300">

                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#F3E3D0] flex items-center justify-center text-4xl">💼</div>

                            <h3 className="text-2xl font-semibold text-[#5C4033]">
                                Business
                            </h3>

                            <p className="text-gray-500 mt-3">
                                Entrepreneurship, startups and success stories.
                            </p>

                        </div>

                    </div>

                </section>


                <section className="max-w-6xl mx-auto px-6 pt-32 pb-24">

                    <p className="uppercase tracking-[5px] text-[#8B6B52] font-semibold text-center">
                        Latest Articles
                    </p>

                    <div className="flex items-center justify-center gap-3 my-4">
                        <div className="w-20 h-[2px] bg-[#C69C6D]"></div>
                        <div className="w-2 h-2 rounded-full bg-[#C69C6D]"></div>
                        <div className="w-20 h-[2px] bg-[#C69C6D]"></div>
                    </div>

                    <h2 className="text-7xl font-bold text-center text-[#3E2723]">
                        Featured Blogs
                    </h2>

                    <p className="text-center text-gray-500 mt-4 mb-14 text-xl">
                        Read our latest stories and discover new ideas.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 gap-8">

                        <div className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl hover:-translate-y-2 transition duration-300">

                            <img
                                src={ai}
                                alt="Technology"
                                className="w-full h-64 object-cover"
                            />

                            <div className="p-6 flex flex-col h-full">

                                <span className="inline-block w-fit bg-[#5C1A1B] text-[#F3E3D0] px-4 py-2 rounded-full text-sm font-semibold">
                                    Technology
                                </span>

                                <h3 className="text-2xl font-bold text-[#3E2723] mt-5 min-h-[72px]">
                                    The Future of Artificial Intelligence
                                </h3>

                                <p className="text-gray-600 mt-3">
                                    Discover how AI is transforming industries and changing our daily lives.
                                </p>

                                <p className="text-gray-600 mt-3">

                                    Artificial Intelligence (AI) has rapidly evolved from a futuristic concept into a technology that influences our everyday lives.

                                </p>

                                <div className="mt-auto">
                                    <div className="flex justify-between items-center mt-5 text-sm text-gray-500">
                                        <span>By Admin</span>
                                        <span>July 6, 2026</span>
                                    </div>
                                </div>
                            </div>

                            <Link
                                to="/blogs"
                                className="mt-auto p-5 text-[#6D1F2F] font-semibold hover:underline"
                            >
                                Read More →
                            </Link>

                        </div>

                        <div className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl hover:-translate-y-2 transition duration-300">

                            <img
                                src={castle}
                                alt="Travel"
                                className="w-full h-64 object-cover"
                            />

                            <div className="p-6 flex flex-col h-full">

                                <span className="inline-block w-fit bg-[#5C1A1B] text-[#F3E3D0] px-4 py-2 rounded-full text-sm font-semibold">
                                    Travel
                                </span>

                                <h3 className="text-2xl font-bold text-[#3E2723] mt-5">
                                    Top 10 Hidden Places to Visit
                                </h3>

                                <p className="text-gray-600 mt-3">
                                    Explore breathtaking destinations and unforgettable travel experiences.
                                </p>

                                <div className="mt-auto">

                                    <div className="flex justify-between items-center mt-5 text-sm text-gray-500">

                                        <span>By Admin</span>
                                        <span>July 6, 2026</span>

                                    </div>

                                    <button className="mt-auto pt-6 text-[#6D1F2F] font-semibold hover:underline">
                                        Read More →
                                    </button>
                                </div>

                            </div>

                        </div>

                        <div className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl hover:-translate-y-2 transition duration-300">

                            <img
                                src={food}
                                alt="Food"
                                className="w-full h-64 object-cover"
                            />

                            <div className="p-6 flex flex-col h-full">

                                <span className="inline-block w-fit bg-[#5C1A1B] text-[#F3E3D0] px-4 py-2 rounded-full text-sm font-semibold">
                                    Food
                                </span>

                                <h3 className="text-2xl font-bold text-[#3E2723] mt-5">
                                    Healthy Recipes for Everyday Life
                                </h3>

                                <p className="text-gray-600 mt-3">
                                    Simple, delicious meals packed with nutrition for your everyday life.
                                </p>

                                <div className="mt-auto">
                                    <div className="flex justify-between items-center mt-5 text-sm text-gray-500">
                                        <span>By Admin</span>
                                        <span>July 6, 2026</span>
                                    </div>

                                    <button className="mt-auto pt-6 text-[#6D1F2F] font-semibold hover:underline">
                                        Read More →
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center mt-14">

                            <Link
                                to="/blogs"
                                className="bg-[#5C4033] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#3E2723] transition duration-300 shadow-lg hover:shadow-xl"
                            >
                                View All Blogs →
                            </Link>
                        </div>
                    </div>
                </section>


                <section className="max-w-7xl mx-auto mb-20 px-6 py-24">

                    <p className="uppercase tracking-[5px] text-[#8B6B52] font-bold text-center">
                        Why Choose Us
                    </p>

                    <div className="flex items-center justify-center gap-3 my-4">
                        <div className="w-20 h-[2px] bg-[#C69C6D]"></div>
                        <div className="w-2 h-2 rounded-full bg-[#C69C6D]"></div>
                        <div className="w-20 h-[2px] bg-[#C69C6D]"></div>
                    </div>

                    <h2 className="text-6xl font-bold text-center text-[#3E2723]">
                        Why Readers Love Us
                    </h2>

                    <p className="text-center text-gray-500 mt-4 mb-14 text-xl">
                        Everything you need to discover, write and share amazing stories.
                    </p>

                    <div className="grid md:grid-cols-3 gap-10">

                        <div className="bg-white rounded-3xl shadow-lg p-10 text-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">

                            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#F3E3D0] flex items-center justify-center text-5xl">✍️</div>

                            <h3 className="text-2xl font-bold text-[#3E2723] mb-4">
                                Easy Writing
                            </h3>

                            <p className="text-gray-600">
                                Create beautiful blogs with a simple editor designed for everyone.
                            </p>

                        </div>

                        <div className="bg-white rounded-3xl shadow-lg p-10 text-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">

                            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#F3E3D0] flex items-center justify-center text-5xl">🌍</div>

                            <h3 className="text-2xl font-bold text-[#3E2723] mb-4">
                                Global Community
                            </h3>

                            <p className="text-gray-600">
                                Connect with readers and writers from around the world.
                            </p>

                        </div>

                        <div className="bg-white rounded-3xl shadow-lg p-10 text-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">

                            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#F3E3D0] flex items-center justify-center text-5xl">🚀</div>

                            <h3 className="text-2xl font-bold text-[#3E2723] mb-4">
                                Fast Publishing
                            </h3>

                            <p className="text-gray-600">
                                Publish your stories instantly and reach your audience quickly.
                            </p>

                        </div>

                    </div>

                </section>

                <section className="max-w-5xl mx-auto px-6 py-24">

                    <div className="bg-[#5C4033] rounded-3xl p-12 text-center shadow-2xl">

                        <p className="uppercase tracking-[4px] text-[#F3E3D0] font-semibold">
                            Stay Updated
                        </p>

                        <div className="flex items-center justify-center gap-3 my-4">
                            <div className="w-20 h-[2px] bg-[#C69C6D]"></div>
                            <div className="w-2 h-2 rounded-full bg-[#C69C6D]"></div>
                            <div className="w-20 h-[2px] bg-[#C69C6D]"></div>
                        </div>

                        <h2 className="text-5xl font-bold text-white">
                            Subscribe to Our Newsletter
                        </h2>

                        <p className="text-[#F3E3D0] mt-5 text-lg max-w-2xl mx-auto">
                            Get the latest blogs, technology updates, travel guides,
                            and inspiring stories delivered directly to your inbox.
                        </p>

                        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-12">

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="px-6 py-4 rounded-xl bg-white md:w-96 outline-none h-14"
                            />
                            <button
                                onClick={handleSubscribe}
                                className="bg-[#C69C6D] hover:bg-[#D7A86E] text-[#3E2723] font-semibold h-14 px-8 rounded-xl transition"
                            >
                                Subscribe
                            </button>

                        </div>

                    </div>

                </section>

                <footer className="bg-[#3E2723] rounded-lg mt-20">

                    <div className="max-w-7xl mx-auto px-6 py-16">

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                            <div>
                                <h3 className="text-3xl font-bold text-[#C69C6D]">
                                    ☕ Blog Platform
                                </h3>

                                <p className="text-gray-300 mt-4 leading-7">
                                    Share your stories with the world through our elegant blog platform.
                                </p>

                            </div>

                            <div>
                                <h3 className="text-2xl font-semibold text-[#F3E3D0] hover:text-[#C69C6D] transition duration-300 mb-5">
                                    Quick Links
                                </h3>

                                <ul className="space-y-3 mt-4 text-gray-300">

                                    <li>
                                        <Link to="/" className="hover:text-[#C69C6D] transition">
                                            Home
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="/blogs" className="hover:text-[#C69C6D] transition">
                                            Blogs
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="/create-blog" className="hover:text-[#C69C6D] transition">
                                            Create Blog
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="/login" className="hover:text-[#C69C6D] transition">
                                            Login
                                        </Link>
                                    </li>

                                </ul>
                            </div>

                            <div>
                                <h3 className="text-2xl font-semibold text-[#F3E3D0] mb-5">
                                    Categories
                                </h3>

                                <ul className="space-y-3 text-gray-300">
                                    <li className="hover:text-[#C69C6D] cursor-pointer">Technology</li>
                                    <li className="hover:text-[#C69C6D] cursor-pointer">Travel</li>
                                    <li className="hover:text-[#C69C6D] cursor-pointer">Food</li>
                                    <li className="hover:text-[#C69C6D] cursor-pointer">Business</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-2xl font-semibold text-[#F3E3D0] mb-5">
                                    Follow Us
                                </h3>

                                <ul className="space-y-4 text-gray-300">
                                    <li className=" flex items-center gap-3 hover:text-[#C69C6D] cursor-pointer transition duration-300"><FaFacebookF className="text-lg" /> Facebook</li>
                                    <li className="flex items-center gap-3 hover:text-[#C69C6D] cursor-pointer transition duration-300"><FaInstagram className="text-lg" />Instagram</li>
                                    <li className="flex items-center gap-3 hover:text-[#C69C6D] cursor-pointer transition duration-300"><FaTwitter className="text-lg" />Twitter</li>
                                    <li className="flex items-center gap-3 hover:text-[#C69C6D] cursor-pointer transition duration-300"><FaLinkedinIn className="text-lg" />LinkedIn</li>
                                </ul>
                            </div>
                        </div>


                        <div className="border-t border-[#6D5A4C] mt-12 pt-6 text-center text-sm text-gray-400 hover:text-[#C69C6D] transition-all duration-300 hover-translate-x-1">

                            © 2026 Coffee Tales. All Rights Reserved.

                        </div>

                    </div>

                </footer>
            </div>
        </div >

    );
}

export default Home;
