const express = require('express');
const router = express.Router();
const { find } = require('../utils/db');

// Health check endpoint
router.get('/', (req, res) => {
    res.status(200).json({ 
        status: 'success',
        message: 'Server is running well',
        timestamp: new Date().toISOString()
    });
});

// Get all visualizers grouped by subject
router.get('/visualizers/all', async (req, res) => {
    try {
        // Get all subjects
        const subjects = await find('subjects', {}, { sort: { name: 1 } });
        
        // Get all visualizers
        const visualizers = await find('visualizers', {}, { sort: { name: 1 } });
        
        // Create a map of subjectId to visualizers
        const visualizersBySubject = visualizers.reduce((acc, visualizer) => {
            if (!acc[visualizer.subjectId]) {
                acc[visualizer.subjectId] = [];
            }
            acc[visualizer.subjectId].push({
                id: visualizer.id,
                name: visualizer.name,
                description: visualizer.description || '',
                link: visualizer.link,
                tags: visualizer.tags || []
            });
            return acc;
        }, {});
        
        // Format the response
        const response = subjects.map(subject => ({
            id: subject.id,
            name: subject.name,
            visualizers: visualizersBySubject[subject.id] || []
        }));
        
        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching visualizers:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch visualizers',
            error: error.message
        });
    }
});

module.exports = router;