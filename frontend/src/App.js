import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Subject from './pages/Subject';
import VisualizerDetails from './pages/VisualizerDetails';
import About from './pages/About';
import Contribute from './pages/Contribute';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-grow w-full">
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/visualizers/:subjectId" element={<Subject />} />
              <Route path="/visualizer/:subjectId/:visualizerId" element={<VisualizerDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/contribute" element={<Contribute />} />
              {/* 404 Route - catches all unmatched routes */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
