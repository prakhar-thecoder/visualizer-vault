import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Developed and Maintained By:</span>
            <a 
              href="https://www.linkedin.com/in/prakhar-parikh/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1"
            >
              Prakhar Parikh
              <FaLinkedin className="text-orange-600" />
            </a>
          </div>
          <a 
            href="https://github.com/prakhar-thecoder/visualizer-vault" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800 font-medium flex items-center gap-2"
          >
            <FaGithub className="text-xl" />
            <span>View Source on GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
