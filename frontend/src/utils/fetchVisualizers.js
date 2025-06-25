export const fetchVisualizers = async () => {
  try {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/visualizers/all`;
    
    if (!endpoint) {
      throw new Error('Base URL is not configured. Please set REACT_APP_BASE_URL in your .env file');
    }

    const response = await fetch(endpoint);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch visualizers: ${response.status}`);
    }
    
    let data = await response.json();
    
    // Convert the Firebase object to an array if needed
    return Array.isArray(data) ? data : Object.values(data || {});
  } catch (error) {
    console.error('Error fetching visualizers:', error);
    throw error; // Re-throw to allow error handling in components
  }
};
