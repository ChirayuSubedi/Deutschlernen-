import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">DeutschLernen</h3>
            <p className="text-sm">
              Your journey to mastering German starts here. Learn, practice, and connect with fellow language enthusiasts.
            </p>
          </div>
          
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/courses" className="hover:text-white transition-colors">Courses</Link></li>
              <li><Link to="/practice" className="hover:text-white transition-colors">Practice</Link></li>
              <li><Link to="/community" className="hover:text-white transition-colors">Community</Link></li>
              <li><Link to="/resources" className="hover:text-white transition-colors">Resources</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/feedback" className="hover:text-white transition-colors">Feedback</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Youtube size={20} /></a>
            </div>
            <p className="text-sm">Subscribe to our newsletter for updates and tips.</p>
            <form className="mt-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </form>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">© 2024 DeutschLernen. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-sm hover:text-white transition-colors">Terms of Service</Link>
          </div>
          <div className="flex items-center space-x-1 mt-4 md:mt-0">
            <span className="text-sm">Made with</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span className="text-sm">in Deutschland</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;