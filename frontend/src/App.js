import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Subject from './pages/Subject';
import VisualizerDetails from './pages/VisualizerDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/visualizers/:subjectId" element={<Subject />} />
            <Route path="/visualizer/:subjectId/:visualizerId" element={<VisualizerDetails />} />
            {/* Add more routes here as we create more pages */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
