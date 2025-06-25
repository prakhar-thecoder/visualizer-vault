import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSubject } from '../utils/fetchSubject';
import VisualizerCard from '../components/VisualizerCard';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import SearchBar from '../components/SearchBar';

const Subject = () => {
  const { subjectId } = useParams();
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadSubject = async () => {
      try {
        setLoading(true);
        const data = await fetchSubject(subjectId);
        setSubject(data);
      } catch (err) {
        console.error('Failed to load subject:', err);
        setError('Failed to load subject. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadSubject();
  }, [subjectId]);

  if (loading) {
    return <Loader message="Loading subject..." className="min-h-[50vh]" />;
  }

  if (error) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center p-6 max-w-md mx-auto bg-red-50 rounded-lg">
          <p className="text-red-600 font-medium">{error}</p>
          <Link 
            to="/" 
            className="mt-4 inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
          >
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const filteredVisualizers = subject.visualizers.filter(visualizer => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      visualizer.name.toLowerCase().includes(searchLower) ||
      visualizer.description.toLowerCase().includes(searchLower) ||
      visualizer.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="px-4">
      <div className="mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium mb-4"
        >
          <FaArrowLeft className="mr-2" />
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{subject.name}</h1>
        <p className="text-gray-600 max-w-3xl mb-6">{subject.description}</p>
        <SearchBar onSearch={setSearchTerm} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredVisualizers.map((visualizer) => (
          <VisualizerCard 
            key={visualizer.id} 
            visualizer={visualizer} 
            subjectId={subjectId}
          />
        ))}
      </div>
    </div>
  );
};

export default Subject;
