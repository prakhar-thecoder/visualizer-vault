import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaExternalLinkAlt, FaTags, FaBug, FaGithub, FaEnvelope, FaTimes } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { fetchVisualizer } from '../utils/fetchVisualizer';
import Loader from '../components/Loader';
import Pill from '../components/Pill';
import { marked } from 'marked';
import StarButton from '../components/StarButton';
import { isVisualizerStarred } from '../utils/localStorage';

// Configure marked to use a safe mode
marked.setOptions({
  sanitize: true,
  breaks: true,
  smartypants: true,
});

const VisualizerDetails = () => {
  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  const { subjectId, visualizerId } = useParams();
  const navigate = useNavigate();
  const [visualizer, setVisualizer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);

  useEffect(() => {
    const loadVisualizer = async () => {
      try {
        setLoading(true);
        const data = await fetchVisualizer(subjectId, visualizerId);
        setVisualizer(data);
      } catch (err) {
        console.error('Failed to load visualizer:', err);
        setError('Failed to load visualizer. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadVisualizer();
  }, [subjectId, visualizerId]);

  if (loading) {
    return <Loader message="Loading visualizer..." />;
  }

  if (error) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
          >
            <FaArrowLeft className="mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!visualizer) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700">Visualizer not found</h2>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
          >
            <FaArrowLeft className="mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4">
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium mb-4"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
        <div className="flex items-center justify-between mb-6">
          <div className='flex flex-col gap-2'>
            <div className="flex it ems-center gap-2">
              <h1 className="text-3xl font-bold text-gray-800">{visualizer.name}</h1>
              <StarButton 
                visualizerId={visualizer.id} 
                subjectName={subjectId} 
                isStarred={isVisualizerStarred(subjectId, visualizer.id)} 
              />
            </div>
            <p className="text-gray-600">{visualizer.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowReportModal(true)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              data-tooltip-id="report-bug-tooltip"
              data-tooltip-content="Report an issue"
            >
              <FaBug className="text-xl" />
            </button>
            <button
              onClick={() => window.open(visualizer.link, '_blank')}
              className="bg-orange-600 text-white rounded-lg py-2 px-4 flex items-center gap-2 hover:bg-orange-700 transition-colors"
            >
              <FaExternalLinkAlt className="text-sm" />
              <span>Visit Visualizer</span>
            </button>
          </div>
        </div>

        <div className="prose max-w-none">
          <div className="">
            <div dangerouslySetInnerHTML={{ __html: marked(visualizer.details) }} />
          </div>
        </div>
        <div className="mt-8 text-gray-500 text-sm">
          Last updated at: {formatDate(visualizer.updatedAt)}
        </div>
      </div>

      <div className="mb-8">
          <div className="flex items-center gap-2 text-orange-600 font-medium mb-2">
            <FaTags className="text-xl" />
            <span>Tags</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {visualizer.tags.map((tag) => (
              <Pill key={tag}>{tag}</Pill>
            ))}
          </div>
        </div>
      
      <Tooltip id="report-bug-tooltip" />

      {/* Report Bug Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
            <button 
              onClick={() => setShowReportModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FaTimes className="text-xl" />
            </button>
            
            <h3 className="text-xl font-bold mb-4">Report an Issue</h3>
            <p className="mb-6 text-gray-700">
              Found a bug or have a suggestion? Please report it by either:
            </p>
            
            <div className="space-y-4">
              <a
                href="https://github.com/prakhar-thecoder/visualizer-vault/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 p-3 rounded-lg transition-colors"
              >
                <FaGithub className="text-gray-800 text-xl" />
                <span>Open GitHub Issue</span>
              </a>
              
              <a
                href="mailto:pnp14072005@gmail.com?subject=Bug%20Report%20for%20Visualizer%20Vault"
                className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 p-3 rounded-lg transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaEnvelope className="text-blue-500 text-xl" />
                <span>Email Maintainer</span>
              </a>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Please include as much detail as possible about the issue you're experiencing.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisualizerDetails;
