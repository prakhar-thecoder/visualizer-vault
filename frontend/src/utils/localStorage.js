export const STARRED_VISUALIZERS_KEY = 'starred-visualizers';

export const getStarredVisualizers = () => {
  const stored = localStorage.getItem(STARRED_VISUALIZERS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const isVisualizerStarred = (subjectName, visualizerId) => {
  const starred = getStarredVisualizers();
  return starred.includes(`${subjectName}/${visualizerId}`);
};

export const toggleStarVisualizer = (subjectName, visualizerId) => {
  const starred = getStarredVisualizers();
  const visualizerKey = `${subjectName}/${visualizerId}`;
  
  if (starred.includes(visualizerKey)) {
    // Remove from starred if already starred
    const updated = starred.filter(key => key !== visualizerKey);
    localStorage.setItem(STARRED_VISUALIZERS_KEY, JSON.stringify(updated));
    return false;
  } else {
    // Add to starred if not starred
    const updated = [...starred, visualizerKey];
    localStorage.setItem(STARRED_VISUALIZERS_KEY, JSON.stringify(updated));
    return true;
  }
};
