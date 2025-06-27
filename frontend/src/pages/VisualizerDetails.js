import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaExternalLinkAlt, FaTags } from 'react-icons/fa';
import { fetchVisualizer } from '../utils/fetchVisualizer';
import Loader from '../components/Loader';
import Pill from '../components/Pill';
import { marked } from 'marked';

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
  const [error, setError] = useState('');

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
            <h1 className="text-3xl font-bold text-gray-800">{visualizer.name}</h1>
            <p className="text-gray-600">{visualizer.description}</p>
          </div>
          <a
            href={visualizer.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-600 text-white rounded-lg py-2 px-4 flex items-center gap-2 hover:bg-orange-700 transition-colors"
          >
            <FaExternalLinkAlt className="text-sm" />
            Visit Visualizer
          </a>
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

        <div className="prose max-w-none">
          <div className="">
            <div dangerouslySetInnerHTML={{ __html: marked(visualizer.details) }} />
          </div>
        </div>
        <div className="mt-8 text-gray-500 text-sm">
          Last updated at: {formatDate(visualizer.updatedAt)}
        </div>
      </div>
    </div>
  );
};

export default VisualizerDetails;
