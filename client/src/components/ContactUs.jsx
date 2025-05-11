import React from 'react';

const ContactUs = () => {
    return (
        <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <div className="text-gray-800">
                <h1 className="text-3xl font-bold text-center mb-10">Contact Us</h1>
                <p className='font-semibold mb-5 text-amber-700'>You can drop us a note using the form below. You'll always get a response from a real person — with a real name — within 48 hours.</p>
                <form className="space-y-6">
                    <div>
                        <label className="block font-semibold mb-1">Name</label>
                        <input
                            type="text"
                            className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 py-2"
                            placeholder="Your name"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Email Address</label>
                        <input
                            type="email"
                            className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 py-2"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Phone Number</label>
                        <input
                            type="tel"
                            className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 py-2"
                            placeholder="Your phone number"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Vendor Name</label>
                        <input
                            type="tel"
                            className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 py-2"
                            placeholder="Your phone number"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Message</label>
                        <textarea
                            rows="4"
                            className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 py-2"
                            placeholder="Write your message here"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-800 text-white px-5 py-2 rounded shadow hover:bg-emerald-700 transition"
                    >
                        SUBMIT
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
