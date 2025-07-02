const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { find, findOne, insertOne, updateOne, deleteOne } = require('../utils/db');
const { requireAuth } = require('../middleware/auth');
const multer = require('multer');
const { uploadImage } = require('../utils/imagekit'); // Adjust path as needed

const upload = multer(); // Store in memory

// Helper function to handle async errors
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Public routes (no auth required)
router.get('/login', (req, res) => {
    res.render('admin-login', { 
        title: 'Admin Login',
        error: null 
    });
});

// Handle login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Verify credentials
        if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
            return res.status(401).render('admin-login', { 
                title: 'Admin Login',
                error: 'Invalid username or password' 
            });
        }

        // Generate a random token
        const token = crypto.randomBytes(32).toString('hex');
        
        // Store the token in the database with an expiration time (24 hours from now)
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 24*30);
        
        await insertOne('sessions', {
            token,
            userId: username,
            expiresAt,
            createdAt: new Date()
        });
        
        // Set the token in a cookie
        res.cookie('auth_token', token, { 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000 * 30 // One month
        });
        
        return res.redirect('/admin/dashboard');
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).render('admin-login', { 
            title: 'Admin Login',
            error: 'An error occurred during login' 
        });
    }
});

// Apply auth middleware to all routes below this line
router.use(requireAuth);

// Protected routes (require authentication)
router.get('/', (req, res) => {
    res.redirect('/admin/dashboard');
});

router.get('/dashboard', (req, res) => {
    res.render('admin-dashboard', { 
        title: 'Admin Dashboard',
        user: { username: 'admin' } // In a real app, get this from the session
    });
});

// Logout
router.post('/logout', async (req, res) => {
    const token = req.cookies.auth_token;
    if (token) {
        await deleteOne('sessions', { token });
    }
    res.clearCookie('auth_token');
    res.redirect('/admin/login');
});

// Subjects Management
router.get('/subjects', asyncHandler(async (req, res) => {
    const subjects = await find('subjects', {}, { sort: { name: 1 } });
    res.render('admin-subjects', {
        title: 'Manage Subjects',
        user: { username: req.user.id },
        subjects: subjects || [],
        success: req.query.success,
        error: req.query.error
    });
}));

// Add New Subject (Form)
router.get('/subjects/new', (req, res) => {
    res.render('admin-subject-form', {
        title: 'Add New Subject',
        user: { username: req.user.id },
        subject: { name: '', description: '' },
        isEdit: false
    });
});

// Create New Subject
router.post('/subjects', asyncHandler(async (req, res) => {
    const { id, name, description } = req.body;
    
    // Basic validation
    if (!id || !name || !description) {
        return res.status(400).render('admin-subject-form', {
            title: 'Add New Subject',
            user: { username: req.user.id },
            subject: { id, name, description },
            error: 'ID, name and description are required',
            isEdit: false
        });
    }

    // Validate ID format (alphanumeric, hyphens, underscores)
    if (!/^[a-zA-Z0-9-_]+$/.test(id)) {
        return res.status(400).render('admin-subject-form', {
            title: 'Add New Subject',
            user: { username: req.user.id },
            subject: { id, name, description },
            error: 'ID can only contain letters, numbers, hyphens, and underscores',
            isEdit: false
        });
    }

    // Check if subject ID already exists
    const existingId = await findOne('subjects', { id });
    if (existingId) {
        return res.status(400).render('admin-subject-form', {
            title: 'Add New Subject',
            user: { username: req.user.id },
            subject: { id, name, description },
            error: 'A subject with this ID already exists',
            isEdit: false
        });
    }

    // Check if subject name already exists
    const existingName = await findOne('subjects', { name });
    if (existingName) {
        return res.status(400).render('admin-subject-form', {
            title: 'Add New Subject',
            user: { username: req.user.id },
            subject: { id, name, description },
            error: 'A subject with this name already exists',
            isEdit: false
        });
    }

    // Create new subject
    await insertOne('subjects', {
        id,
        name,
        description,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    res.redirect('/admin/subjects?success=Subject created successfully');
}));

// Edit Subject (Form)
router.get('/subjects/:id/edit', asyncHandler(async (req, res) => {
    const subject = await findOne('subjects', { id: req.params.id });
    if (!subject) {
        return res.redirect('/admin/subjects?error=Subject not found');
    }
    
    res.render('admin-subject-form', {
        title: 'Edit Subject',
        user: { username: req.user.id },
        subject,
        isEdit: true
    });
}));

// Update Subject
router.post('/subjects/:id', asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const { id } = req.params;
    
    // Basic validation
    if (!name || !description) {
        return res.status(400).render('admin-subject-form', {
            title: 'Edit Subject',
            user: { username: req.user.id },
            subject: { id, name, description },
            error: 'Name and description are required',
            isEdit: true
        });
    }

    // Get current subject
    const currentSubject = await findOne('subjects', { id });
    if (!currentSubject) {
        return res.redirect('/admin/subjects?error=Subject not found');
    }

    // Check if subject with same name exists (excluding current subject)
    const existingSubject = await findOne('subjects', { 
        name,
        id: { $ne: id }
    });
    
    if (existingSubject) {
        return res.status(400).render('admin-subject-form', {
            title: 'Edit Subject',
            user: { username: req.user.id },
            subject: { id, name, description },
            error: 'A subject with this name already exists',
            isEdit: true
        });
    }

    // Update subject
    await updateOne(
        'subjects',
        { id },
        { 
            $set: { 
                name, 
                description,
                updatedAt: new Date() 
            } 
        }
    );

    res.redirect('/admin/subjects?success=Subject updated successfully');
}));

// Delete Subject
router.delete('/subjects/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    await deleteOne('subjects', { id });
    res.json({ 
        success: true,
        redirect: '/admin/subjects?success=Subject deleted successfully'
    });
}));

// Visualizers Management
router.get('/visualizers', asyncHandler(async (req, res) => {
    const visualizers = await find('visualizers', {}, { sort: { createdAt: -1 } });
    const subjects = await find('subjects', {}, { sort: { name: 1 } });
    
    // Create a map of subject IDs to names for easy lookup
    const subjectMap = {};
    subjects.forEach(subject => {
        subjectMap[subject.id] = subject.name;
    });
    
    // Add subject names to visualizers
    const visualizersWithSubjects = visualizers.map(vis => ({
        ...vis,
        subjectName: subjectMap[vis.subjectId] || 'Unknown'
    }));
    
    res.render('admin-visualizers', {
        title: 'Manage Visualizers',
        user: { username: req.user.id },
        visualizers: visualizersWithSubjects || [],
        subjects: subjects || [],
        success: req.query.success,
        error: req.query.error
    });
}));

// Add New Visualizer (Form)
router.get('/visualizers/new', asyncHandler(async (req, res) => {
    const subjects = await find('subjects', {}, { sort: { name: 1 } });
    
    res.render('admin-visualizer-form', {
        title: 'Add New Visualizer',
        user: { username: req.user.id },
        visualizer: { 
            subjectId: '',
            id: '',
            link: '',
            description: '',
            tags: []
        },
        subjects: subjects || [],
        isEdit: false
    });
}));

// Create New Visualizer
router.post('/visualizers', upload.array('images', 5), asyncHandler(async (req, res) => {
    const { subjectId, id, name, link, description, details, tags } = req.body;
    const tagArray = typeof tags === 'string' ? tags.split(',').map(tag => tag.trim()) : [];
    
    // Basic validation
    if (!subjectId || !id || !link) {
        const subjects = await find('subjects', {}, { sort: { name: 1 } });
        return res.status(400).render('admin-visualizer-form', {
            title: 'Add New Visualizer',
            user: { username: req.user.id },
            visualizer: { subjectId, id, name, link, description, tags: tagArray },
            subjects,
            error: 'Subject, ID, Name, and Link are required',
            isEdit: false
        });
    }

    // Upload new images
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
        const uploads = await Promise.all(
            req.files.map((file, index) => 
                uploadImage(file, `${index+1}.${file.originalname.split('.').pop()}`, `${subjectId}/${id}`)
            )
        );
        imageUrls = uploads.map(upload => upload.url);
    }

    // Validate ID format
    if (!/^[a-zA-Z0-9-_]+$/.test(id)) {
        const subjects = await find('subjects', {}, { sort: { name: 1 } });
        return res.status(400).render('admin-visualizer-form', {
            title: 'Add New Visualizer',
            user: { username: req.user.id },
            visualizer: { subjectId, id, link, description, tags: tagArray },
            subjects,
            error: 'ID can only contain letters, numbers, hyphens, and underscores',
            isEdit: false
        });
    }

    // Check if visualizer ID already exists
    const existingVisualizer = await findOne('visualizers', { id });
    if (existingVisualizer) {
        const subjects = await find('subjects', {}, { sort: { name: 1 } });
        return res.status(400).render('admin-visualizer-form', {
            title: 'Add New Visualizer',
            user: { username: req.user.id },
            visualizer: { subjectId, id, link, description, tags: tagArray },
            subjects,
            error: 'A visualizer with this ID already exists',
            isEdit: false
        });
    }

    // Create new visualizer
    await insertOne('visualizers', {
        id,
        name,
        subjectId,
        link,
        description: description || '',
        details: details || '',
        tags: tagArray,
        imageUrls: imageUrls,
        createdAt: new Date(),
        updatedAt: new Date()
    });
    

    res.redirect('/admin/visualizers?success=Visualizer created successfully');
}));

// Edit Visualizer (Form)
router.get('/visualizers/:id/edit', asyncHandler(async (req, res) => {
    const [visualizer, subjects] = await Promise.all([
        findOne('visualizers', { id: req.params.id }),
        find('subjects', {}, { sort: { name: 1 } })
    ]);
    
    if (!visualizer) {
        return res.redirect('/admin/visualizers?error=Visualizer not found');
    }
    
    res.render('admin-visualizer-form', {
        title: 'Edit Visualizer',
        user: { username: req.user.id },
        visualizer: {
            ...visualizer,
            tags: Array.isArray(visualizer.tags) ? visualizer.tags.join(', ') : ''
        },
        subjects: subjects || [],
        isEdit: true
    });
}));

// Update Visualizer
router.post('/visualizers/:id', upload.array('images', 5), asyncHandler(async (req, res) => {
    const { subjectId, id, name, link, description, details, tags } = req.body;
    const tagArray = typeof tags === 'string' ? tags.split(',').map(tag => tag.trim()) : [];
    
    // Basic validation
    if (!subjectId || !id || !link) {
        const subjects = await find('subjects', {}, { sort: { name: 1 } });
        return res.status(400).render('admin-visualizer-form', {
            title: 'Edit Visualizer',
            user: { username: req.user.id },
            visualizer: { subjectId, id, name, link, description, tags: tagArray },
            subjects,
            error: 'Subject, ID, Name, and Link are required',
            isEdit: true
        });
    }
    
    // Upload new images
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
        const uploads = await Promise.all(
            req.files.map((file, index) => 
                uploadImage(file, `${index+1}.${file.originalname.split('.').pop()}`, `${subjectId}/${id}`)
            )
        );
        imageUrls = uploads.map(upload => upload.url);
    }

    // Get current visualizer
    const currentVisualizer = await findOne('visualizers', { id: req.params.id });
    if (!currentVisualizer) {
        return res.redirect('/admin/visualizers?error=Visualizer not found');
    }

    // Check if another visualizer with the same ID exists
    if (id !== req.params.id) {
        const existingVisualizer = await findOne('visualizers', { id });
        if (existingVisualizer) {
            const subjects = await find('subjects', {}, { sort: { name: 1 } });
            return res.status(400).render('admin-visualizer-form', {
                title: 'Edit Visualizer',
                user: { username: req.user.id },
                visualizer: { subjectId, id, link, description, tags: tagArray },
                subjects,
                error: 'A visualizer with this ID already exists',
                isEdit: true
            });
        }
    }

    // Update visualizer
    await updateOne(
        'visualizers',
        { id: req.params.id },
        { 
            id,
            name,
            subjectId,
            link,
            description: description || '',
            details: details || '',
            tags: tagArray,
            imageUrls: imageUrls.length > 0 ? imageUrls : currentVisualizer.imageUrls,
            updatedAt: new Date()
        }
    );

    res.redirect('/admin/visualizers?success=Visualizer updated successfully');
}));

// Delete Visualizer
router.delete('/visualizers/:id', asyncHandler(async (req, res) => {
    await deleteOne('visualizers', { id: req.params.id });
    res.json({ 
        success: true,
        redirect: '/admin/visualizers?success=Visualizer deleted successfully'
    });
}));

module.exports = router;
