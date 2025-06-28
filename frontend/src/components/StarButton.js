import React, { useState, useEffect } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { toggleStarVisualizer } from '../utils/localStorage';

const StarButton = ({ visualizerId, subjectName, isStarred, muted = false }) => {
  const [starred, setStarred] = useState(isStarred);

  // Update local state when isStarred prop changes
  useEffect(() => {
    setStarred(isStarred);
  }, [isStarred]);

  const toggleStar = () => {
    if (muted) return;
    const newStarredStatus = toggleStarVisualizer(subjectName, visualizerId);
    setStarred(newStarredStatus);
    window.dispatchEvent(new Event('starred-visualizers-changed'));
  };

  return (
    <button
      onClick={toggleStar}
      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
      aria-label={starred ? 'Unstar visualizer' : 'Star visualizer'}
    >
      {starred ? (
        <FaStar className="text-yellow-500 w-5 h-5" />
      ) : (
        <FaRegStar className="text-gray-400 w-5 h-5 hover:text-yellow-500 transition-colors" />
      )}
    </button>
  );
};

export default StarButton;
