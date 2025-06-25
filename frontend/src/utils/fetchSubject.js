export const fetchSubject = async (subjectId) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/visualizers/${subjectId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch subject data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching subject:', error);
    throw error;
  }
};
