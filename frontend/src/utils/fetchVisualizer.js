export const fetchVisualizer = async (subjectId, visualizerId) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/visualizer/${subjectId}/${visualizerId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch visualizer data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching visualizer:', error);
    throw error;
  }
};
