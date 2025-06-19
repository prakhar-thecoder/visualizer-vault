export const fetchVisualizers = async () => {
  try {
    const endpoint = process.env.REACT_APP_FIREBASE_VISUALIZERS_ENDPOINT;
    
    if (!endpoint) {
      throw new Error('Firebase endpoint is not configured. Please set REACT_APP_FIREBASE_VISUALIZERS_ENDPOINT in your .env file');
    }

    const response = await fetch(endpoint);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch visualizers: ${response.status}`);
    }
    
    let data = await response.json();
    data = JSON.parse(data);
    
    // Convert the Firebase object to an array if needed
    return Array.isArray(data) ? data : Object.values(data || {});
  } catch (error) {
    console.error('Error fetching visualizers:', error);
    throw error; // Re-throw to allow error handling in components
  }
};
