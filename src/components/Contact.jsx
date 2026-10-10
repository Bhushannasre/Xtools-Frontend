import React, { useState } from "react";

const BASE_URL = import.meta.env.VITE_API_URL || "";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      setStatus({
        type: "error",
        message: "🔒 Please sign in to submit this form.",
      });
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch(`${BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus({
          type: "error",
          message: data.error || "Something went wrong",
        });
      } else {
        setStatus({
          type: "success",
          message: "Message sent successfully! 🎉",
        });

        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Server unreachable. Please try again later.",
      });
    }
  };

  return (
    <section
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-black
        flex
        items-center
        px-4
        sm:px-8
        md:px-12
        lg:px-16
        xl:px-24
        py-16
        sm:py-20
        lg:py-24
      "
    >
      {/* =====================================================
          BACKGROUND X DESIGN
      ====================================================== */}
      <svg
        className="
          absolute
          inset-0
          w-full
          h-full
          z-0
          pointer-events-none
        "
        viewBox="0 0 1440 720"
        fill="none"
        preserveAspectRatio="none"
      >
        {/* LEFT X */}
        <path
          d="M-100 70 L300 360 L-100 650"
          stroke="#9CFF00"
          strokeWidth="2"
          strokeOpacity="0.65"
        />

        <path
          d="M80 70 L480 360 L80 650"
          stroke="#9CFF00"
          strokeWidth="1"
          strokeOpacity="0.25"
        />

        {/* CENTER X */}
        <path
          d="M420 20 L780 360 L420 700"
          stroke="#00C2CB"
          strokeWidth="1.5"
          strokeOpacity="0.35"
        />

        {/* RIGHT X */}
        <path
          d="M1140 70 L1540 360 L1140 650"
          stroke="#FF5722"
          strokeWidth="2"
          strokeOpacity="0.7"
        />

        <path
          d="M980 70 L1380 360 L980 650"
          stroke="#FF5722"
          strokeWidth="1"
          strokeOpacity="0.25"
        />
      </svg>

      {/* =====================================================
          CENTER GLOW
      ====================================================== */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-80
          h-80
          rounded-full
          bg-[#00c2cb]/10
          blur-[160px]
          pointer-events-none
        "
      />

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <div
        className="
          relative
          z-10
          w-full
          max-w-7xl
          mx-auto
          grid
          grid-cols-1
          lg:grid-cols-[0.9fr_1fr]
          gap-12
          lg:gap-20
          items-center
        "
      >

        {/* ===================================================
            LEFT CONTENT
        ==================================================== */}
        <div
          className="
            w-full
            flex
            flex-col
            items-center
            lg:items-start
            text-center
            lg:text-left
          "
        >

          {/* COMMUNITY BADGE */}
          <div
            className="
              flex
              items-center
              p-1.5
              rounded-full
              border
              border-green-900
              bg-black/30
              backdrop-blur-sm
              w-fit
            "
          >
            <div className="flex items-center">

              <img
                className="
                  size-8
                  rounded-full
                  border
                  border-green-900
                "
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=50"
                alt="userImage1"
              />

              <img
                className="
                  size-8
                  rounded-full
                  border
                  border-green-900
                  -translate-x-2
                "
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=50"
                alt="userImage2"
              />

              <img
                className="
                  size-8
                  rounded-full
                  border
                  border-green-900
                  -translate-x-4
                "
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=50&h=50&auto=format&fit=crop"
                alt="userImage3"
              />
            </div>

            <p
              className="
                -translate-x-2
                pr-3
                text-xs
                sm:text-sm
                text-slate-200
                whitespace-nowrap
              "
            >
              Join community of 1m+ founders
            </p>
          </div>


          {/* HEADING */}
          <h1
            className="
              mt-8
              sm:mt-10
              font-medium
              text-4xl
              sm:text-5xl
              md:text-6xl
              lg:text-[64px]
              xl:text-[70px]
              leading-[1.05]
              tracking-tight
              bg-gradient-to-r
              from-white
              via-[#d9ffff]
              to-[#00c2cb]
              bg-clip-text
              text-transparent
              max-w-[650px]
            "
          >
            Ready to
            <br />

            Transform Your
            <br />

            Digital Experience?
          </h1>


          {/* DESCRIPTION */}
          <p
            className="
              mt-7
              text-sm
              sm:text-base
              leading-7
              text-slate-300
              max-w-[500px]
              lg:max-w-[520px]
            "
          >
            Let our design team craft a website that elevates your
            brand. Book a free session today.
          </p>


          {/* SMALL ACCENT */}
          <div
            className="
              mt-8
              flex
              items-center
              gap-3
            "
          >
            <span className="w-10 h-px bg-[#00c2cb]" />

            <span className="text-xs text-slate-500">
              Let's build something exceptional.
            </span>
          </div>

        </div>


        {/* ===================================================
            CONTACT FORM
        ==================================================== */}
        <div
          className="
            w-full
            max-w-xl
            lg:ml-auto
            backdrop-blur-xl
            bg-black/40
            border
            border-white/10
            rounded-2xl
            p-5
            sm:p-7
            lg:p-8
            shadow-2xl
          "
        >

          <form
            className="space-y-5 sm:space-y-6 text-white"
            onSubmit={handleSubmit}
          >

            {/* NAME */}
            <div>
              <label className="block text-white text-sm mb-2">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Eden Johnson"
                className="
                  w-full
                  bg-[#00A63E]/5
                  border
                  border-white/20
                  rounded-lg
                  px-4
                  py-3.5
                  text-white/90
                  placeholder:text-white/40
                  placeholder:text-sm
                  focus:outline-none
                  focus:border-[#00c2cb]
                  focus:ring-1
                  focus:ring-[#00c2cb]/30
                  transition
                "
              />
            </div>


            {/* EMAIL */}
            <div>
              <label className="block text-white text-sm mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Eden@example.com"
                className="
                  w-full
                  bg-[#00A63E]/5
                  border
                  border-white/20
                  rounded-lg
                  px-4
                  py-3.5
                  text-white/90
                  placeholder:text-white/40
                  placeholder:text-sm
                  focus:outline-none
                  focus:border-[#00c2cb]
                  focus:ring-1
                  focus:ring-[#00c2cb]/30
                  transition
                "
              />
            </div>


            {/* PHONE */}
            <div>
              <label className="block text-white text-sm mb-2">
                Phone
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                maxLength={10}
                inputMode="numeric"
                placeholder="85451xxxxx"
                className="
                  w-full
                  bg-[#00A63E]/5
                  border
                  border-white/20
                  rounded-lg
                  px-4
                  py-3.5
                  text-white/90
                  placeholder:text-white/40
                  placeholder:text-sm
                  focus:outline-none
                  focus:border-[#00c2cb]
                  focus:ring-1
                  focus:ring-[#00c2cb]/30
                  transition
                "
              />
            </div>


            {/* MESSAGE */}
            <div>
              <label className="block text-white text-sm mb-2">
                Message
              </label>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                rows="4"
                required
                className="
                  w-full
                  bg-[#00A63E]/5
                  border
                  border-white/20
                  rounded-lg
                  px-4
                  py-3.5
                  text-white/90
                  placeholder:text-white/40
                  placeholder:text-sm
                  focus:outline-none
                  focus:border-[#00c2cb]
                  focus:ring-1
                  focus:ring-[#00c2cb]/30
                  transition
                  resize-none
                "
              />
            </div>


            {/* STATUS */}
            {status?.type === "success" && (
              <p className="text-green-400 text-sm">
                {status.message}
              </p>
            )}

            {status?.type === "error" && (
              <p className="text-red-400 text-sm">
                {status.message}
              </p>
            )}


            {/* BOTTOM */}
            <div
              className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-5
                pt-1
              "
            >

              <p
                className="
                  text-xs
                  sm:text-sm
                  leading-5
                  text-white/50
                  max-w-[280px]
                "
              >
                By submitting, you agree to our{" "}
                <span className="text-white">
                  Terms
                </span>{" "}
                and{" "}
                <span className="text-white">
                  Privacy Policy
                </span>.
              </p>

              <button
                type="submit"
                disabled={status === "loading"}
                className="
                  shrink-0
                  bg-gradient-to-r
                  from-blue-950
                  to-green-600
                  hover:from-green-600
                  hover:to-[#00c2cb]
                  text-white
                  text-sm
                  font-medium
                  px-10
                  sm:px-14
                  py-3.5
                  rounded-full
                  transition
                  duration-300
                  cursor-pointer
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                {status === "loading"
                  ? "Sending..."
                  : "Submit"}
              </button>

            </div>

          </form>
        </div>

      </div>
    </section>
  );
}

export default Contact;