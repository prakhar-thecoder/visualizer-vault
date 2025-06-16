import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { visualizers } from '../config';

const Home = () => {
  const scrollContainerRefs = useRef({});

  const scroll = (direction, subjectId) => {
    const container = scrollContainerRefs.current[subjectId];
    if (container) {
      container.scrollBy({
        left: direction === 'left' ? -600 : 600,  // Increased from 400 to 600 for more scroll
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
      <main className="py-12">
        <div className="w-full px-4">
          {/* Search and Filter Section */}
          <div className="w-full bg-white p-6 rounded-xl">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-700"
                  placeholder="Search visualizers..."
                />
              </div>
              <button 
                className="inline-flex items-center px-4 py-3 border border-gray-300 rounded-lg bg-orange-100 text-gray-700 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
              >
                <FaFilter className="h-5 w-5 mr-2 text-orange-500" />
                <span className="font-medium">Filters</span>
              </button>
            </div>
          </div>
          
          {/* Visualizers by Subject */}
          <div className="mt-12 space-y-12">
            {visualizers.map((subject) => (
              <div key={subject.id} className="mb-16 relative group">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 px-2">{subject.name}</h2>
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
                    {subject.visualizers.map((visualizer) => (
                    <Link 
                      key={visualizer.id}
                      to={visualizer.link}
                      className="flex-shrink-0 w-80 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow flex flex-col"
                    >
                      <h3 className="font-medium text-gray-900">{visualizer.name}</h3>
                      <p className="text-sm text-gray-600 mt-1 mb-3">
                        {visualizer.description}
                      </p>
                      <div className="mt-auto flex flex-wrap gap-1">
                        {visualizer.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </Link>
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
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
