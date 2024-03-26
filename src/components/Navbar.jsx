import React from "react";

const Navbar = () => {
    return (
        <nav className="flex justify-between bg-slate-700 text-white px-9">
            <div className="font-bold mx-6 my-3 text-xl">TodoList</div>
            <ul className="flex gap-7 mx-6">
                <li className="my-3 cursor-pointer transition-all hover:font-bold">Home</li>
                <li className="my-3 cursor-pointer transition-all hover:font-bold">Your Tasks</li>
            </ul>
        </nav>
    );
}

export default Navbar;