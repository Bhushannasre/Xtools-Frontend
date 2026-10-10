// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../index.css";

// const BASE_URL = import.meta.env.VITE_API_URL || "";
// console.log("BASE_URL:", BASE_URL);

// function Toast({ message, onClose }) {
//     return (
//         <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-green-500/20 border border-green-500/40 text-green-400 text-sm px-5 py-3 rounded-xl shadow-lg backdrop-blur animate-fade-in">
//             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
//                 fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M20 6 9 17l-5-5" />
//             </svg>
//             {message}
//             <button onClick={onClose} className="ml-2 text-green-300 hover:text-white transition">✕</button>
//         </div>
//     );
// }

// const Login = () => {
//     const navigate = useNavigate();
//     const [state, setState] = useState("login");
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [toast, setToast] = useState(null);

//     const [formData, setFormData] = useState({
//         username: "",
//         email: "",
//         password: "",
//     });

//     const showToast = (message) => {
//         setToast(message);
//         setTimeout(() => setToast(null), 3000);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError(null);
//         setLoading(true);

//         const endpoint =
//             state === "login"
//                 ? `${BASE_URL}/api/login`
//                 : `${BASE_URL}/api/register`;

//         const payload =
//             state === "login"
//                 ? { email: formData.email, password: formData.password }
//                 : {
//                       username: formData.username,
//                       email: formData.email,
//                       password: formData.password,
//                   };

//         try {
//             const res = await fetch(endpoint, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(payload),
//             });

//             const data = await res.json();

//             if (!res.ok) {
//                 setError(data.error || "Something went wrong");
//             } else if (state === "register") {
//                 // Save username, switch to login form with success toast
//                 localStorage.setItem("username", formData.username);
//                 showToast("Account created! Please log in.");
//                 setFormData({ username: "", email: "", password: "" });
//                 setState("login");
//             } else {
//                 // Login success — save token + username, toast, redirect
//               localStorage.setItem("token", data.token);
//                 if (data.data?.username) {
//                     localStorage.setItem("username", data.data.username);
//                 }
//                 // Notify Navbar in the same tab immediately
//                 window.dispatchEvent(new Event("authChange"));
//                 showToast("Welcome back!");
//                 setTimeout(() => navigate("/"), 1200);
//             }
//         } catch {
//             setError("Unable to connect to server");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     const switchState = () => {
//         setState((prev) => (prev === "login" ? "register" : "login"));
//         setError(null);
//         setFormData({ username: "", email: "", password: "" });
//     };

//     return (
//         <div className="min-h-screen bg-black text-white flex items-center justify-center">

//             {/* Toast notification */}
//             {toast && <Toast message={toast} onClose={() => setToast(null)} />}

//             {/* Background SVG */}
//           <svg
//   className="absolute inset-0 z-0 w-full h-full"
//   viewBox="10 10 1440 720"
//   fill="none"
//   preserveAspectRatio="none"
// >
//   {/* LEFT X - GREEN */}
//   <path
//     d="M-80 80 L280 360 L-80 640"
//     stroke="#9CFF00"
//     strokeWidth="2"
//     strokeOpacity="0.65"
//   />

//   <path
//     d="M80 80 L440 360 L80 640"
//     stroke="#9CFF00"
//     strokeWidth="1.5"
//     strokeOpacity="0.25"
//   />

//   {/* CENTER X - CYAN */}
                

//   <path
//     d="M470 40 L840 360 L470 680"
//     stroke="#00C2CB"
//     strokeWidth="1.5"
//     strokeOpacity="0.3"
//   />

//   {/* RIGHT X - ORANGE */}
//   <path
//     d="M1160 80 L1520 360 L1160 640"
//     stroke="#FF5722"
//     strokeWidth="2"
//     strokeOpacity="0.7"
//   />

//   <path
//     d="M1000 80 L1360 360 L1000 640"
//     stroke="#FF5722"
//     strokeWidth="1.5"
//     strokeOpacity="0.25"
//   />

//   {/* Subtle horizontal line */}
//   <path
//     d="M0 680 H1440"
//     stroke="#28834C"
//     strokeWidth="1"
//     strokeOpacity="0.35"
//   />
// </svg>


//             {/* Form */}
//             <form
//                 onSubmit={handleSubmit}
//                 className="relative z-10 sm:w-[350px] w-full text-center bg-gray-900 border border-gray-800 rounded-2xl px-8 flex flex-col items-center pt-8 mx-4 mt-24 mb-12"
//             >
//                 <h1 className="text-white text-3xl mt-10 font-medium">
//                     {state === "login" ? "Login" : "Sign up"}
//                 </h1>

//                 <p className="text-gray-400 text-sm mt-2">
//                     Please sign in to continue
//                 </p>

//                 {/* Error message */}
//                 {error && (
//                     <div className="mt-4 w-full bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-2">
//                         {error}
//                     </div>
//                 )}

//                 {/* Username — register only */}
//                 {state !== "login" && (
//                     <div className="flex items-center mt-6 w-full bg-gray-800 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
//                             fill="none" stroke="currentColor" className="text-gray-400"
//                             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                             <circle cx="12" cy="8" r="5" />
//                             <path d="M20 21a8 8 0 0 0-16 0" />
//                         </svg>
//                         <input
//                             type="text"
//                             name="username"
//                             placeholder="Username"
//                             autoComplete="username"
//                             className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none"
//                             value={formData.username}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//                 )}

//                 {/* Email */}
//                 <div className="flex items-center w-full mt-4 bg-gray-800 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
//                         fill="none" stroke="currentColor" className="text-gray-400"
//                         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                         <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
//                         <rect x="2" y="4" width="20" height="16" rx="2" />
//                     </svg>
//                     <input
//                         type="email"
//                         name="email"
//                         placeholder="Email id"
//                         autoComplete="email"
//                         className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 {/* Password */}
//                 <div className="flex items-center mt-4 w-full bg-gray-800 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
//                         fill="none" stroke="currentColor" className="text-gray-400"
//                         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                         <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
//                         <path d="M7 11V7a5 5 0 0 1 10 0v4" />
//                     </svg>
//                     <input
//                         type="password"
//                         name="password"
//                         placeholder="Password"
//                         autoComplete={state === "login" ? "current-password" : "new-password"}
//                         className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none"
//                         value={formData.password}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 {/* Forgot password */}
//                 {state === "login" && (
//                     <div className="mt-4 w-full text-left">
//                         <button type="button" className="text-sm text-indigo-400 hover:underline">
//                             Forgot password?
//                         </button>
//                     </div>
//                 )}

//                 {/* Submit */}
//                 <button
//                     type="submit"
//                     disabled={loading}
//                     className="mt-4 w-full h-11 rounded-full text-white bg-indigo-600 hover:bg-indigo-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                     {loading
//                         ? state === "login" ? "Logging in..." : "Signing up..."
//                         : state === "login" ? "Login" : "Sign up"}
//                 </button>

//                 {/* Switch state */}
//                 <p className="text-gray-400 text-sm mt-3 mb-11">
//                     {state === "login" ? "Don't have an account?" : "Already have an account?"}
//                     <button
//                         type="button"
//                         onClick={switchState}
//                         className="text-indigo-400 hover:underline ml-1"
//                     >
//                         click here
//                     </button>
//                 </p>
//             </form>
//         </div>
//     );
// };

// export default Login;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const BASE_URL = import.meta.env.VITE_API_URL || "";
console.log("BASE_URL:", BASE_URL);

function Toast({ message, onClose }) {
    return (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-green-500/20 border border-green-500/40 text-green-400 text-sm px-5 py-3 rounded-xl shadow-lg backdrop-blur animate-fade-in">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
            </svg>
            {message}
            <button onClick={onClose} className="ml-2 text-green-300 hover:text-white transition">✕</button>
        </div>
    );
}

const Login = () => {
    const navigate = useNavigate();
    // "login" | "register" | "forgot"
    const [state, setState] = useState("login");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    // Separate from formData.email so switching to/from "forgot" never
    // clobbers whatever the user already typed into the login/register form.
    const [forgotEmail, setForgotEmail] = useState("");
    const [forgotSent, setForgotSent] = useState(false);

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(null), 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const endpoint =
            state === "login"
                ? `${BASE_URL}/api/login`
                : `${BASE_URL}/api/register`;

        const payload =
            state === "login"
                ? { email: formData.email, password: formData.password }
                : {
                      username: formData.username,
                      email: formData.email,
                      password: formData.password,
                  };

        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Something went wrong");
            } else if (state === "register") {
                // Save username, switch to login form with success toast
                localStorage.setItem("username", formData.username);
                showToast("Account created! Please log in.");
                setFormData({ username: "", email: "", password: "" });
                setState("login");
            } else {
                // Login success — save token + username, toast, redirect
              localStorage.setItem("token", data.token);
                if (data.data?.username) {
                    localStorage.setItem("username", data.data.username);
                }
                // Notify Navbar in the same tab immediately
                window.dispatchEvent(new Event("authChange"));
                showToast("Welcome back!");
                setTimeout(() => navigate("/"), 1200);
            }
        } catch {
            setError("Unable to connect to server");
        } finally {
            setLoading(false);
        }
    };

    const handleForgotSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const res = await fetch(`${BASE_URL}/api/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: forgotEmail }),
            });

            const data = await res.json();

            if (!res.ok) {
                // e.g. the backend isn't configured with EMAIL_USER/EMAIL_PASS
                // yet, or the rate limiter kicked in — real failures, worth
                // surfacing, unlike the generic "account may or may not
                // exist" success message below.
                setError(data.error || "Something went wrong");
            } else {
                // Backend always returns this same generic message whether
                // or not the email has an account — don't show anything
                // more specific than what it sent us.
                setForgotSent(true);
            }
        } catch {
            setError("Unable to connect to server");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const switchState = () => {
        setState((prev) => (prev === "login" ? "register" : "login"));
        setError(null);
        setFormData({ username: "", email: "", password: "" });
    };

    const openForgotPassword = () => {
        setState("forgot");
        setError(null);
        setForgotEmail(formData.email || "");
        setForgotSent(false);
    };

    const backToLogin = () => {
        setState("login");
        setError(null);
        setForgotSent(false);
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">

            {/* Toast notification */}
            {toast && <Toast message={toast} onClose={() => setToast(null)} />}

            {/* Background SVG */}
          <svg
  className="absolute inset-0 z-0 w-full h-full"
  viewBox="10 10 1440 720"
  fill="none"
  preserveAspectRatio="none"
>
  {/* LEFT X - GREEN */}
  <path
    d="M-80 80 L280 360 L-80 640"
    stroke="#9CFF00"
    strokeWidth="2"
    strokeOpacity="0.65"
  />

  <path
    d="M80 80 L440 360 L80 640"
    stroke="#9CFF00"
    strokeWidth="1.5"
    strokeOpacity="0.25"
  />

  {/* CENTER X - CYAN */}


  <path
    d="M470 40 L840 360 L470 680"
    stroke="#00C2CB"
    strokeWidth="1.5"
    strokeOpacity="0.3"
  />

  {/* RIGHT X - ORANGE */}
  <path
    d="M1160 80 L1520 360 L1160 640"
    stroke="#FF5722"
    strokeWidth="2"
    strokeOpacity="0.7"
  />

  <path
    d="M1000 80 L1360 360 L1000 640"
    stroke="#FF5722"
    strokeWidth="1.5"
    strokeOpacity="0.25"
  />

  {/* Subtle horizontal line */}
  <path
    d="M0 680 H1440"
    stroke="#28834C"
    strokeWidth="1"
    strokeOpacity="0.35"
  />
</svg>


            {/* ================================================
                FORGOT PASSWORD FORM
            ================================================ */}
            {state === "forgot" ? (
                <form
                    onSubmit={handleForgotSubmit}
                    className="relative z-10 sm:w-[350px] w-full text-center bg-gray-900 border border-gray-800 rounded-2xl px-8 flex flex-col items-center pt-8 mx-4 mt-24 mb-12"
                >
                    <h1 className="text-white text-3xl mt-10 font-medium">
                        Reset password
                    </h1>

                    <p className="text-gray-400 text-sm mt-2">
                        {forgotSent
                            ? "Check your inbox for the reset link."
                            : "Enter your email and we'll send you a reset link."}
                    </p>

                    {error && (
                        <div className="mt-4 w-full bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-2">
                            {error}
                        </div>
                    )}

                    {forgotSent ? (
                        <div className="mt-6 w-full bg-green-500/10 border border-green-500/30 text-green-400 text-sm rounded-lg px-4 py-3">
                            If an account exists for that email, a password
                            reset link has been sent. The link expires in 15
                            minutes.
                        </div>
                    ) : (
                        <div className="flex items-center w-full mt-6 bg-gray-800 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" className="text-gray-400"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                                <rect x="2" y="4" width="20" height="16" rx="2" />
                            </svg>
                            <input
                                type="email"
                                name="forgotEmail"
                                placeholder="Email id"
                                autoComplete="email"
                                className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none"
                                value={forgotEmail}
                                onChange={(e) => setForgotEmail(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    {!forgotSent && (
                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-6 w-full h-11 rounded-full text-white bg-indigo-600 hover:bg-indigo-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Sending..." : "Send reset link"}
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={backToLogin}
                        className="text-indigo-400 hover:underline text-sm mt-4 mb-11"
                    >
                        ← Back to login
                    </button>
                </form>
            ) : (

            /* ================================================
                LOGIN / REGISTER FORM
            ================================================ */
            <form
                onSubmit={handleSubmit}
                className="relative z-10 sm:w-[350px] w-full text-center bg-gray-900 border border-gray-800 rounded-2xl px-8 flex flex-col items-center pt-8 mx-4 mt-24 mb-12"
            >
                <h1 className="text-white text-3xl mt-10 font-medium">
                    {state === "login" ? "Login" : "Sign up"}
                </h1>

                <p className="text-gray-400 text-sm mt-2">
                    Please sign in to continue
                </p>

                {/* Error message */}
                {error && (
                    <div className="mt-4 w-full bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-2">
                        {error}
                    </div>
                )}

                {/* Username — register only */}
                {state !== "login" && (
                    <div className="flex items-center mt-6 w-full bg-gray-800 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" className="text-gray-400"
                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="8" r="5" />
                            <path d="M20 21a8 8 0 0 0-16 0" />
                        </svg>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            autoComplete="username"
                            className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}

                {/* Email */}
                <div className="flex items-center w-full mt-4 bg-gray-800 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" className="text-gray-400"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                    </svg>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email id"
                        autoComplete="email"
                        className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Password */}
                <div className="flex items-center mt-4 w-full bg-gray-800 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" className="text-gray-400"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete={state === "login" ? "current-password" : "new-password"}
                        className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Forgot password */}
                {state === "login" && (
                    <div className="mt-4 w-full text-left">
                        <button
                            type="button"
                            onClick={openForgotPassword}
                            className="text-sm text-indigo-400 hover:underline"
                        >
                            Forgot password?
                        </button>
                    </div>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 w-full h-11 rounded-full text-white bg-indigo-600 hover:bg-indigo-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading
                        ? state === "login" ? "Logging in..." : "Signing up..."
                        : state === "login" ? "Login" : "Sign up"}
                </button>

                {/* Switch state */}
                <p className="text-gray-400 text-sm mt-3 mb-11">
                    {state === "login" ? "Don't have an account?" : "Already have an account?"}
                    <button
                        type="button"
                        onClick={switchState}
                        className="text-indigo-400 hover:underline ml-1"
                    >
                        click here
                    </button>
                </p>
            </form>
            )}
        </div>
    );
};

export default Login;