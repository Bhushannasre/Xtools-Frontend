import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../index.css";

const BASE_URL = import.meta.env.VITE_API_URL || "";

function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`${BASE_URL}/api/reset-password/${token}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            const data = await res.json();

            if (!res.ok) {
                // Covers both "invalid/expired token" (400, from
                // resetPassword's $gt: Date.now() check) and any other
                // server-side failure.
                setError(data.error || "Something went wrong");
            } else {
                setDone(true);
                setTimeout(() => navigate("/login"), 2000);
            }
        } catch {
            setError("Unable to connect to server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">

            {/* Background SVG — matches Login.jsx */}
            <svg
                className="absolute inset-0 z-0 w-full h-full"
                viewBox="10 10 1440 720"
                fill="none"
                preserveAspectRatio="none"
            >
                <path d="M-80 80 L280 360 L-80 640" stroke="#9CFF00" strokeWidth="2" strokeOpacity="0.65" />
                <path d="M80 80 L440 360 L80 640" stroke="#9CFF00" strokeWidth="1.5" strokeOpacity="0.25" />
                <path d="M470 40 L840 360 L470 680" stroke="#00C2CB" strokeWidth="1.5" strokeOpacity="0.3" />
                <path d="M1160 80 L1520 360 L1160 640" stroke="#FF5722" strokeWidth="2" strokeOpacity="0.7" />
                <path d="M1000 80 L1360 360 L1000 640" stroke="#FF5722" strokeWidth="1.5" strokeOpacity="0.25" />
                <path d="M0 680 H1440" stroke="#28834C" strokeWidth="1" strokeOpacity="0.35" />
            </svg>

            <form
                onSubmit={handleSubmit}
                className="relative z-10 sm:w-[350px] w-full text-center bg-gray-900 border border-gray-800 rounded-2xl px-8 flex flex-col items-center pt-8 mx-4 mt-24 mb-12"
            >
                <h1 className="text-white text-3xl mt-10 font-medium">
                    Set new password
                </h1>

                <p className="text-gray-400 text-sm mt-2">
                    {done
                        ? "Redirecting you to login..."
                        : "Enter a new password for your account."}
                </p>

                {error && (
                    <div className="mt-4 w-full bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-2">
                        {error}
                    </div>
                )}

                {done ? (
                    <div className="mt-6 mb-11 w-full bg-green-500/10 border border-green-500/30 text-green-400 text-sm rounded-lg px-4 py-3">
                        Your password has been reset. You can now log in.
                    </div>
                ) : (
                    <>
                        {/* New password */}
                        <div className="flex items-center mt-6 w-full bg-gray-800 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" className="text-gray-400"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                            <input
                                type="password"
                                name="password"
                                placeholder="New password"
                                autoComplete="new-password"
                                className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* Confirm password */}
                        <div className="flex items-center mt-4 w-full bg-gray-800 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" className="text-gray-400"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm new password"
                                autoComplete="new-password"
                                className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-6 mb-11 w-full h-11 rounded-full text-white bg-indigo-600 hover:bg-indigo-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Resetting..." : "Reset password"}
                        </button>
                    </>
                )}
            </form>
        </div>
    );
}

export default ResetPassword;