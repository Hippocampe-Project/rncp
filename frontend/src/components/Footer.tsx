import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 py-8 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between">
        {/* About Section */}
        <div className="mb-6 md:mb-0">
          <h2 className="text-white text-lg font-semibold mb-2">A propos</h2>
          <p className="max-w-md">
            We are committed to delivering the best products and services.
            Our mission is to make your experience seamless and enjoyable.
          </p>
        </div>

        {/* Contact Us Section */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-2">Nous contacter</h2>
          <ul>
            <li>Email: <a href="mailto:contact@example.com" className="hover:underline">contact@example.com</a></li>
            <li>Phone: <a href="tel:+1234567890" className="hover:underline">+1 (234) 567-890</a></li>
            <li>Address: 123 Main St, Your City</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-8">
        &copy; {new Date().getFullYear()} The Hippocampe project. All rights reserved.
      </div>
    </footer>
  );
}
