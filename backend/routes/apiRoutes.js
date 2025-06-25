const express = require('express');
const router = express.Router();
const { find, findOne } = require('../utils/db');

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

// Get a specific subject with its visualizers
router.get('/visualizers/:subjectId', async (req, res) => {
    try {
        const { subjectId } = req.params;
        
        // Get the subject
        const subject = await findOne('subjects', { id: subjectId });
        
        if (!subject) {
            return res.status(404).json({
                status: 'error',
                message: 'Subject not found'
            });
        }
        
        // Get all visualizers for this subject
        const visualizers = await find('visualizers', { subjectId }, { sort: { name: 1 } });
        
        // Format the response
        const response = {
            id: subject.id,
            name: subject.name,
            description: subject.description || '',
            visualizers: visualizers.map(visualizer => ({
                id: visualizer.id,
                name: visualizer.name,
                description: visualizer.description || '',
                link: visualizer.link,
                tags: visualizer.tags || []
            }))
        };
        
        res.status(200).json(response);
    } catch (error) {
        console.error(`Error fetching subject ${req.params.subjectId}:`, error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch subject details',
            error: error.message
        });
    }
});

// Get a specific visualizer from a subject
router.get('/visualizer/:subjectId/:visualizerId', async (req, res) => {
    try {
        const { subjectId, visualizerId } = req.params;
        
        // Verify the subject exists
        const subject = await findOne('subjects', { id: subjectId });
        if (!subject) {
            return res.status(404).json({
                status: 'error',
                message: 'Subject not found'
            });
        }
        
        // Get the specific visualizer
        const visualizer = await findOne('visualizers', { 
            id: visualizerId, 
            subjectId 
        });
        
        if (!visualizer) {
            return res.status(404).json({
                status: 'error',
                message: 'Visualizer not found in the specified subject'
            });
        }
        
        // Format the response
        const response = {
            id: visualizer.id,
            name: visualizer.name,
            description: visualizer.description || '',
            details: visualizer.details || '',
            link: visualizer.link,
            tags: visualizer.tags || [],
            updatedAt: visualizer.updatedAt
        };
        
        res.status(200).json(response);
    } catch (error) {
        console.error(`Error fetching visualizer ${req.params.visualizerId}:`, error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch visualizer details',
            error: error.message
        });
    }
});

module.exports = router;