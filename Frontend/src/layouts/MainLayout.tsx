import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function MainLayout() {
    return (
        <>
        <div className="min-h-screen bg-[]#F8F3ED">
        <Navbar />
        <main className="w-full mx-auto px-8 py-8">
           <Outlet />
        </main>

        </div>
        </>
    );
}

export default MainLayout;