import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaChevronLeft, FaChevronRight, FaArrowRight } from 'react-icons/fa';
import VisualizerCard from '../components/VisualizerCard';
import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import { fetchVisualizers } from '../utils/fetchVisualizers';
import Loader from '../components/Loader';
import { FaStar } from 'react-icons/fa';
import { getStarredVisualizers } from '../utils/localStorage';
import StarButton from '../components/StarButton';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [starredVisualizers, setStarredVisualizers] = useState([]);

  useEffect(() => {
    const updateStarredVisualizers = () => {
      const starred = getStarredVisualizers();
      setStarredVisualizers(starred);
    };
  
    updateStarredVisualizers();
  
    const handleCustomStarChange = () => {
      updateStarredVisualizers();
    };
  
    window.addEventListener('starred-visualizers-changed', handleCustomStarChange);
  
    return () => {
      window.removeEventListener('starred-visualizers-changed', handleCustomStarChange);
    };
  }, []);
  

  const [visualizers, setVisualizers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollContainerRefs = useRef({});

  useEffect(() => {
    const loadVisualizers = async () => {
      try {
        setIsLoading(true);
        const data = await fetchVisualizers();
        setVisualizers(data);
      } catch (err) {
        console.error('Failed to load visualizers:', err);
        setError('Failed to load visualizers. Please try again later. Contact the developer if the issue persists.');
      } finally {
        setIsLoading(false);
      }
    };

    loadVisualizers();
  }, []);
  
  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  const scroll = (direction, subjectId) => {
    const container = scrollContainerRefs.current[subjectId];
    if (container) {
      container.scrollBy({
        left: direction === 'left' ? -600 : 600,
        behavior: 'smooth'
      });
    }
  };

  const scrollbarHide = {
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  };
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-orange-50 to-orange-100">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Visualize, Learn, Master
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Interactive visualizations for complex computer science algorithms and concepts.
            Perfect for students and educators.
          </p>
          <div className="space-x-4">
            <Link 
              to="/" 
              className="inline-flex items-center bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              <FaSearch className="mr-2" />
              Explore Visualizers
            </Link>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <main className="pt-12">
        <div className="w-full px-4">
          <SearchBar onSearch={handleSearch} />
          
          {/* Loading and Error States */}
          {isLoading && <Loader message="Loading visualizers..." />}

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4 mx-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Starred Visualizers */}
          { !isLoading && !error &&
          <div className="mt-12">
            <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-800 border-b-[3px] border-orange-500 inline-block">
              Starred Visualizers
            </h2>
            <FaStar className="text-yellow-500 text-2xl" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {starredVisualizers.length === 0 ? (
                <div className="col-span-full text-center p-8 bg-white rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No Starred Visualizers</h3>
                  <p className="text-gray-600 mb-4 flex flex-row items-center justify-center">
                    Star your favorite visualizers by clicking the <StarButton className=" inline" muted /> icon on any visualizer card.
                  </p>
                </div>
              ) : (
              starredVisualizers.map((visualizerKey) => {
                const [subjectName, visualizerId] = visualizerKey.split('/');
                const subject = visualizers.find(s => s.id === subjectName);
                const visualizer = subject?.visualizers.find(v => v.id === visualizerId);
                
                if (!visualizer) return null;
                
                return (
                  <VisualizerCard visualizer={visualizer} subjectId={subjectName} />
                );
              })
            )}
            </div>
          </div>
          }

          {/* Visualizers by Subject */}
          <div className="mt-12 space-y-12">
            {!isLoading && !error && visualizers
              // First, filter out subjects with no matching visualizers when searching
              .filter(subject => {
                if (searchTerm === '') return true; // Show all subjects when not searching
                
                // Check if search term matches subject name or any visualizer in the subject
                return subject.name.toLowerCase().includes(searchTerm) || subject.id.toLowerCase().includes(searchTerm) ||
                  subject.visualizers.some(visualizer => 
                    visualizer.name.toLowerCase().includes(searchTerm) ||
                    visualizer.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
                    visualizer.description.toLowerCase().includes(searchTerm)
                  );
              })
              // Then map through the filtered subjects
              .map((subject) => {
                // Get filtered visualizers for this subject
                const filteredVisualizers = searchTerm === ''
                  ? subject.visualizers.slice(0, 5) // First 5 when not searching
                  : subject.name.toLowerCase().includes(searchTerm) || subject.id.toLowerCase().includes(searchTerm)
                    ? subject.visualizers // Show all visualizers if subject name matches
                    : subject.visualizers.filter(visualizer => 
                        visualizer.name.toLowerCase().includes(searchTerm) ||
                        visualizer.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
                        visualizer.description.toLowerCase().includes(searchTerm)
                      );
                
                return (
                  <div key={subject.id} className="mb-16 relative group">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-800 pb-1 border-b-[3px] border-orange-500 inline-block">
                        {subject.name}
                      </h2>
                      <Link 
                        to={`/visualizers/${subject.id}`}
                        className="flex items-center text-orange-600 hover:text-orange-800 text-sm font-medium transition-colors"
                      >
                        View All
                        <FaArrowRight className="ml-1" />
                      </Link>
                    </div>
                    <div className="relative">
                      {/* Left Navigation Button */}
                      <button 
                        onClick={() => scroll('left', subject.id)}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-orange-500 rounded-full shadow-md text-white hover:bg-orange-600 transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none"
                        aria-label={`Scroll ${subject.name} left`}
                      >
                        <FaChevronLeft />
                      </button>
                      
                      {/* Visualizers Container */}
                      <div 
                        ref={el => scrollContainerRefs.current[subject.id] = el}
                        className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide"
                        style={{ ...scrollbarHide, scrollbarWidth: 'none' }}
                      >
                        {filteredVisualizers.map((visualizer) => (
                          <VisualizerCard 
                            key={visualizer.id} 
                            visualizer={visualizer}
                            subjectId={subject.id}
                          />
                        ))}
                      </div>
                  
                      {/* Right Navigation Button */}
                      <button 
                        onClick={() => scroll('right', subject.id)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-orange-500 rounded-full shadow-md text-white hover:bg-orange-600 transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none"
                        aria-label={`Scroll ${subject.name} right`}
                      >
                        <FaChevronRight />
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
