import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { FiUser, FiBriefcase, FiMail, FiMenu, FiX, FiLogOut } from "react-icons/fi";
import "../index.css";

function NavItem({ to, label, Icon, onClick }) {
    return (
        <li>
            <NavLink
                to={to}
                onClick={onClick}
                className={({ isActive }) =>
                    `flex items-center gap-2 py-2 px-3 rounded transition
                    ${isActive ? "text-blue-400" : "text-white hover:text-blue-400"}`
                }
            >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
            </NavLink>
        </li>
    );
}

const navItems = [
    { to: "/", label: "Home", Icon: AiOutlineHome },
    { to: "/about", label: "About", Icon: FiUser },
    { to: "/services", label: "Services", Icon: FiBriefcase },
    { to: "/contact", label: "Contact", Icon: FiMail },
];

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const read = () => setUsername(localStorage.getItem("username"));
        read();
        window.addEventListener("storage", read);
        window.addEventListener("authChange", read);
        return () => {
            window.removeEventListener("storage", read);
            window.removeEventListener("authChange", read);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setUsername(null);
        navigate("/");
    };

    return (
        <nav className="bg-black fixed w-full z-20 top-0 border-b border-white/10">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-14 sm:h-16">

                {/* Logo */}
                <NavLink to="/" className="flex items-center flex-shrink-0">
                    <img
                        src="logo2.jpg"
                        className="h-6 w-16 sm:h-7 sm:w-20 object-contain"
                        alt="X2ls Logo"
                    />
                </NavLink>

                {/* Desktop Nav — hidden on mobile */}
                <ul className="hidden md:flex items-center gap-2 lg:gap-8 font-medium">
                    {navItems.map((item) => (
                        <NavItem key={item.to} {...item} />
                    ))}
                </ul>

                {/* Right side */}
                <div className="flex items-center gap-2 sm:gap-3">

                    {/* ── Desktop only: username + logout / sign in ── */}
                    {username ? (
                        <div className="hidden sm:flex items-center gap-3">
                            <span className="flex items-center gap-1.5 text-sm text-white/80">
                                <FiUser className="w-4 h-4 text-blue-400" />
                                {username}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white rounded-full border border-white/20 hover:border-red-400/50 hover:text-red-400 transition duration-300"
                            >
                                <FiLogOut className="w-4 h-4" />
                                <span>Logout</span>
                            </button>
                        </div>
                    ) : (
                        <Link className="hidden sm:block" to="/login">
                            <button className="bg-gray-600 relative overflow-hidden px-6 py-2 text-sm font-medium text-white rounded-full backdrop-blur hover:scale-105 transition duration-300 active:scale-100 lg:px-8 lg:py-3">
                                Sign In
                            </button>
                        </Link>
                    )}

                    {/* Hamburger — mobile only */}
                    <button
                        className="md:hidden text-white p-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? (
                            <FiX className="w-5 h-5 sm:w-6 sm:h-6" />
                        ) : (
                            <FiMenu className="w-5 h-5 sm:w-6 sm:h-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* ── Mobile Drawer ── */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                }`}
            >
                <ul className="flex flex-col gap-1 px-4 sm:px-6 py-3 pb-5 font-medium border-t border-white/10 bg-black/95">
                    {navItems.map((item) => (
                        <NavItem key={item.to} {...item} onClick={() => setMenuOpen(false)} />
                    ))}

                    {/* Divider */}
                    <li className="border-t border-white/10 my-1" />

                    {/* Sign In inside drawer when logged out */}
                    {!username && (
                        <li>
                            <Link
                                to="/login"
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center gap-2 py-2 px-3 text-white hover:text-blue-400 transition"
                            >
                                <FiUser className="w-5 h-5" />
                                <span>Sign In</span>
                            </Link>
                        </li>
                    )}

                    {/* Username + Logout inside drawer when logged in */}
                    {username && (
                        <>
                            <li className="flex items-center gap-2 py-2 px-3 text-white/60 text-sm">
                                <FiUser className="w-4 h-4 text-blue-400" />
                                <span>{username}</span>
                            </li>
                            <li>
                                <button
                                    onClick={() => { handleLogout(); setMenuOpen(false); }}
                                    className="flex items-center gap-2 py-2 px-3 text-red-400 hover:text-red-300 transition w-full"
                                >
                                    <FiLogOut className="w-5 h-5" />
                                    <span>Logout</span>
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;