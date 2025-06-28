import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaCode, FaBug, FaBook, FaDiscord, FaEnvelope } from 'react-icons/fa';

const Contribute = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Contribute to Visualizer Vault</h1>
        <p className="text-xl text-gray-600">Join our community of developers, designers, and educators</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Why Contribute */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Contribute?</h2>
          <p className="text-gray-700 mb-4">
            Visualizer Vault thrives on community contributions. Whether you're a developer, designer, educator, or just passionate about learning, your contributions can make a difference.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>Help students and learners worldwide</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>Improve your skills and portfolio</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>Be part of an open-source community</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>Learn from and collaborate with others</span>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <a
            href="https://github.com/prakhar-thecoder/visualizer-vault"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gray-800 text-white p-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-between"
          >
            <div className="flex items-center">
              <FaGithub className="text-2xl mr-3" />
              <span>GitHub Repository</span>
            </div>
            <span className="text-gray-300 text-sm">View on GitHub</span>
          </a>

          <a
            href="https://github.com/prakhar-thecoder/visualizer-vault/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-orange-50 border border-orange-100 text-orange-700 p-4 rounded-lg hover:bg-orange-100 transition-colors flex items-center justify-between"
          >
            <div className="flex items-center">
              <FaBug className="text-xl mr-3" />
              <span>View Open Issues</span>
            </div>
            <span className="text-orange-500 text-sm">Good first issues available</span>
          </a>

          <Link
            to="/about"
            className="block bg-white border border-gray-200 p-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between"
          >
            <div className="flex items-center">
              <FaBook className="text-xl mr-3 text-gray-700" />
              <span>Read Documentation</span>
            </div>
            <span className="text-gray-500 text-sm">Coming Soon</span>
          </Link>
        </div>
      </div>

      {/* Ways to Contribute */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Ways to Contribute</h2>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* For Educators & Learners */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-50">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">For Educators & Learners</h3>
            <ul className="space-y-2 text-gray-700 mb-4">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Report bugs or incorrect information in visualizers</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Request new visualizers with detailed explanations</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Provide feedback on existing visualizations</span>
              </li>
            </ul>
            <a 
              href="https://github.com/prakhar-thecoder/visualizer-vault/issues/new/choose"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium mt-2"
            >
              Submit feedback or request
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          {/* For Designers */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-50">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.486M7 17h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">For Designers</h3>
            <ul className="space-y-2 text-gray-700 mb-4">
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>Improve UI/UX of the platform</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>Create engaging visualizations</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>Enhance accessibility and responsiveness</span>
              </li>
            </ul>
            <a 
              href="https://github.com/prakhar-thecoder/visualizer-vault/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-purple-600 hover:text-purple-700 text-sm font-medium mt-2"
            >
              Join design discussion
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          {/* For Developers */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-green-50">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <FaCode className="text-green-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">For Developers</h3>
            <ul className="space-y-2 text-gray-700 mb-4">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Add new features and functionality</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Fix bugs and improve performance</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Implement new visualization libraries</span>
              </li>
            </ul>
            <div className="space-y-2">
              <a 
                href="https://github.com/prakhar-thecoder/visualizer-vault/contribute"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-green-50 text-green-700 hover:bg-green-100 px-3 py-2 rounded-md text-sm font-medium"
              >
                View open issues
              </a>
              <a 
                href="https://github.com/prakhar-thecoder/visualizer-vault/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-green-600 hover:text-green-700 text-sm font-medium"
              >
                Read contribution guide
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Get in Touch */}
      <section className="bg-gray-50 p-8 rounded-xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Get in Touch</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <a 
            href="https://github.com/prakhar-thecoder/visualizer-vault/discussions" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="bg-purple-100 p-4 rounded-full mb-4">
              <FaDiscord className="text-purple-600 text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Community Discussions</h3>
            <p className="text-gray-600 text-center">Join our GitHub Discussions to ask questions and share ideas with the community.</p>
          </a>
          <a 
            href="mailto:pnp14072005@gmail.com" 
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <FaEnvelope className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Email Us</h3>
            <p className="text-gray-600 text-center">Have a question? Reach out to us directly via email.</p>
          </a>
        </div>
      </section>

      <div className="mt-12 text-center text-gray-500 text-sm">
        <p>Thank you for your interest in contributing to Visualizer Vault! 🙏</p>
        <p className="mt-2">Your contributions help make learning more accessible to everyone.</p>
      </div>
    </div>
  );
};

export default Contribute;
