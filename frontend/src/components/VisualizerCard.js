import React from 'react';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt, FaInfoCircle } from 'react-icons/fa';

const VisualizerCard = ({ visualizer, subjectId }) => {
  return (
    <div className="flex-shrink-0 w-80 p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-orange-400 transition-all duration-200 flex flex-col">
      <h3 className="font-medium text-orange-600">{visualizer.name}</h3>
      <p className="text-sm text-gray-600 mt-1 mb-3 flex-grow">
        {visualizer.description}
      </p>
      <div className="mb-3 flex flex-wrap gap-1">
        {visualizer.tags.slice(0, 5).map((tag) => (
          <span 
            key={tag} 
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
          >
            {tag}
          </span>
        ))}
        {visualizer.tags.length > 5 && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-50 text-orange-600 border border-orange-200">
            +{visualizer.tags.length - 5} more
          </span>
        )}
      </div>
      <div className="flex gap-2 mt-auto">
        <Link
          to={`/visualizers/${subjectId}/${visualizer.id}`}
          className="flex-1 text-center py-2 px-3 bg-white border border-orange-500 text-orange-600 rounded-md hover:bg-orange-50 transition-colors text-sm font-medium flex items-center justify-center gap-1"
        >
          <span>Show Details</span>
          <FaInfoCircle className="text-xs" />
        </Link>
        <a
          href={visualizer.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1 py-2 px-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors text-sm font-medium"
        >
          <span>Visit</span>
          <FaExternalLinkAlt className="text-xs" />
        </a>
      </div>
    </div>
  );
};

export default VisualizerCard;
