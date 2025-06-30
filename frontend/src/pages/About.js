import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaArrowRight, FaLinkedin } from 'react-icons/fa';
const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">About Visualizer Vault</h1>
      
      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            Visualizer Vault is dedicated to providing high-quality, interactive visualizations to help learners understand complex concepts across various subjects. 
            We believe that visual learning can make education more engaging and accessible to everyone.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Features</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Interactive visualizations for better understanding</li>
            <li>Wide range of subjects and topics</li>
            <li>User-friendly interface</li>
            <li>Regular updates with new content</li>
            <li>Open-source and community-driven</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contribute</h2>
          <p className="text-gray-700 mb-4">
            Visualizer Vault is an open-source project. We welcome contributions from the community!
            Whether you're a developer, designer, or educator, there are many ways to get involved.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <a 
              href="https://github.com/prakhar-thecoder/visualizer-vault" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors inline-flex items-center gap-2"
            >
              <span>GitHub Repository</span>
              <FaGithub className="text-xl" />
            </a>
            <Link 
              to="/contribute" 
              className="text-orange-600 hover:text-orange-700 font-medium inline-flex items-center gap-1"
            >
              <span>Know more about contributing</span>
              <FaArrowRight className="text-xl" />
            </Link>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">About the Developer</h2>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Card */}
            <div className="md:w-1/3">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="w-32 h-32 mx-auto mb-4">
                  <img 
                    src="https://prakhar-thecoder.github.io/prakhar-thecoder/profile-image.png" 
                    alt="Prakhar" 
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">Prakhar</h3>
                <p className="text-center text-gray-600 mb-4">Full Stack Developer</p>
                <div className="flex justify-center space-x-4">
                  <a 
                    href="https://github.com/prakhar-thecoder" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <FaGithub className="text-xl" />
                  </a>
                  <a 
                    href="https://linkedin.com/in/prakhar-parikh" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <FaLinkedin className="text-xl" />
                  </a>
                </div>
              </div>
            </div>

            {/* Developer Description */}
            <div className="md:w-2/3">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p className="text-gray-700 mb-4">
                  Hi there! I'm Prakhar, a passionate full stack developer with a keen interest in creating interactive and educational web applications. I built Visualizer Vault to help students and educators better understand complex concepts through interactive visualizations.
                </p>
                <p className="text-gray-700 mb-4">
                  I believe in the power of open source and community-driven development. That's why I made Visualizer Vault open source - so that others can contribute, learn, and improve it together.
                </p>
                <p className="text-gray-700">
                  When I'm not coding, you can find me exploring new technologies, reading about computer science, or working on my next project. Feel free to connect with me on GitHub or LinkedIn!
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Disclaimer</h2>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <p className="text-gray-700">
              The visualizations and external links featured on this website may not be owned or created by the maintainers of Visualizer Vault. 
              We strive to properly attribute all content and respect intellectual property rights. 
              If you are the creator of any content featured here and would like to be properly credited or have concerns about its inclusion, 
              please reach out to us via email or open an issue on our GitHub repository.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Contact</h2>
          <p className="text-gray-700 mb-4">
            Have questions or suggestions? We'd love to hear from you!
          </p>
          <a 
            href="mailto:pnp14072005@gmail.com" 
            className="text-orange-600 hover:text-orange-700 font-medium"
          >
            pnp14072005@gmail.com
          </a>
        </section>
      </div>
    </div>
  );
};

export default About;
