
import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">Contact Us</h1>
        <p className="text-lg text-gray-400 mb-8">
          Have questions or feedback? We'd love to hear from you.
        </p>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 space-y-4 text-left">
          <p className="text-gray-300">
            <strong>Email:</strong> <a href="mailto:support@muse.com" className="text-purple-400 hover:underline">support@muse.com</a>
          </p>
          <p className="text-gray-300">
            <strong>Phone:</strong> <span className="text-gray-100">(555) 123-4567</span>
          </p>
          <p className="text-gray-300">
            <strong>Address:</strong> <span className="text-gray-100">123 Music Lane, Beat City, 90210</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
