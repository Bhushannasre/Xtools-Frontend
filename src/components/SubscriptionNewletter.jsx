import { useState } from 'react';

const BASE_URL = import.meta.env.VITE_API_URL || "";

function SubscriptionNewletter() {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const showMessage = (type, text) => {
        setMessage({ type, text });
        // Auto-clear after 4 seconds
        setTimeout(() => setMessage({ type: '', text: '' }), 4000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            showMessage('error', '🔒 Please sign in to subscribe.');
            return;
        }

        try {
            setIsSubmitting(true);

            const response = await fetch(`${BASE_URL}/api/subscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // ✅ send token to backend
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                showMessage('error', data.message || 'Subscription failed');
                return;
            }

            showMessage('success', data.message || 'Subscribed successfully!');
            setEmail('');

        } catch {
            showMessage('error', 'Something went wrong. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="flex flex-col items-center text-white mt-10">
            <div className="flex flex-col items-center">
                <h2 className="text-center text-3xl sm:text-4xl font-semibold max-w-2xl px-2">
                    Subscribe <span className="bg-gradient-to-t from-red-600 to-black p-1 inline-block">newsletter</span>
                </h2>
                <p className="text-center text-slate-400 max-w-lg mt-3">
                    Stay updated with our latest news and releases.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center mt-8 sm:mt-10 gap-6 border border-[#202829] focus-within:outline focus-within:outline-indigo-600 text-sm rounded-2xl sm:rounded-full min-h-14 max-w-xl w-full p-1"
            >
                <input
                    type="email"
                    required
                    className="bg-transparent outline-none rounded-xl sm:rounded-full px-4 h-12 sm:h-full min-w-4 sm:text-start sm:mt-2 flex-1 placeholder:text-slate-400"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button
                    type="submit"
                    className="bg-[#00c2cb] text-black rounded-xl sm:rounded-full h-11 sm:h-12 mr-0 sm:mr-1 px-6 sm:px-10 flex items-center justify-center hover:bg-gray-300 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
            </form>

            {message.text && (
                <p className={`mt-4 text-center text-sm transition-opacity ${
                    message.type === 'success' ? 'text-green-400' : 'text-red-400'
                }`}>
                    {message.text}
                </p>
            )}
        </section>
    );
}

export default SubscriptionNewletter;