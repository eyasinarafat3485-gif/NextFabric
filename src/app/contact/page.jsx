'use client';

import { useState } from 'react';
// Fixed: Icons must be imported from their specific icon set sub-folders (like /fa)
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error when typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
        if (!formData.message.trim()) newErrors.message = 'Message is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });

            // Auto hide success message
            setTimeout(() => setSubmitted(false), 5000);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-200">
            {/* Hero Section */}
            <div className="bg-zinc-950 pt-8 ">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
                    <p className="text-zinc-400 text-xl">
                        Have any questions, orders, or feedback? We'd love to hear from you.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
                {/* Contact Form */}
                <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
                    <h2 className="text-3xl font-semibold mb-8">Send us a Message</h2>

                    {submitted && (
                        <div className="mb-6 p-4 bg-green-950 border border-green-800 text-green-400 rounded-xl">
                            ✅ Your message has been sent successfully. We will get back to you soon.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-5 py-3 focus:outline-none focus:border-violet-500 transition"
                                placeholder="Your Name"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-5 py-3 focus:outline-none focus:border-violet-500 transition"
                                placeholder="your@email.com"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-5 py-3 focus:outline-none focus:border-violet-500 transition"
                                placeholder="Order Inquiry / Product Related"
                            />
                            {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={6}
                                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-5 py-3 focus:outline-none focus:border-violet-500 transition resize-y"
                                placeholder="Write your message here..."
                            />
                            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-zinc-700 transition py-4 rounded-xl font-semibold text-lg flex items-center justify-center"
                        >
                            {isSubmitting ? (
                                <>Sending<span className="animate-pulse">...</span></>
                            ) : (
                                'Send Message'
                            )}
                        </button>
                    </form>
                </div>

                {/* Contact Info */}
                <div className="space-y-10">
                    <div>
                        <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>

                        <div className="space-y-8">
                            <div className="flex gap-4">
                                {/* Changed: Replaced emoji with FaMapMarkerAlt */}
                                <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center text-xl text-violet-400">
                                    <FaMapMarkerAlt />
                                </div>
                                <div>
                                    <p className="font-medium">Address</p>
                                    <p className="text-zinc-400">Dhaka, Bangladesh</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                {/* Changed: Replaced emoji with FaEnvelope */}
                                <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center text-xl text-violet-400">
                                    <FaEnvelope />
                                </div>
                                <div>
                                    <p className="font-medium">Email</p>
                                    <a href="mailto:support@nextfabric.com" className="text-violet-400 hover:underline">
                                        support@nextfabric.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                {/* Kept: Existing FaPhoneAlt element layout */}
                                <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center text-xl text-violet-400">
                                    <FaPhoneAlt />
                                </div>
                                <div>
                                    <p className="font-medium">Phone</p>
                                    <a href="tel:+8801712345678" className="text-violet-400 hover:underline">
                                        +880 1712-345678
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Business Hours */}
                    <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
                        <h4 className="font-semibold mb-4">Business Hours</h4>
                        <div className="space-y-2 text-zinc-400">
                            <p>Saturday - Thursday: <span className="text-white">9:00 AM - 8:00 PM</span></p>
                            <p>Friday: <span className="text-white">Closed</span></p>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div>
                        <p className="text-sm text-zinc-500 mb-3">Or reach us on</p>
                        <div className="flex gap-4">
                            <a href="#" className="bg-zinc-900 hover:bg-zinc-800 px-6 py-3 rounded-xl transition">Facebook</a>
                            <a href="#" className="bg-zinc-900 hover:bg-zinc-800 px-6 py-3 rounded-xl transition">Instagram</a>
                            <a href="#" className="bg-zinc-900 hover:bg-zinc-800 px-6 py-3 rounded-xl transition">WhatsApp</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}