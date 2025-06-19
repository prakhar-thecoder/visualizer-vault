const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { findOne, insertOne, deleteOne } = require('../utils/db');

// Admin login page
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
        
        // In a real app, you'd get this from your database
        const adminUser = {
            username: process.env.ADMIN_USERNAME,
            password: process.env.ADMIN_PASSWORD
        };

        // Verify username and password
        if (username !== adminUser.username) {
            return res.status(401).render('admin-login', { 
                error: 'Invalid credentials',
                title: 'Admin Login'
            });
        }

        const isPasswordValid = password === adminUser.password;
        if (!isPasswordValid) {
            return res.status(401).render('admin-login', { 
                error: 'Invalid credentials',
                title: 'Admin Login'
            });
        }

        // Generate a random token
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

        // Store the token in the database
        await insertOne('sessions', {
            token,
            userId: process.env.ADMIN_USERNAME,
            expiresAt,
            createdAt: new Date()
        });

        // Set the token in a cookie
        res.cookie('auth_token', token, { 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires: expiresAt
        });

        res.redirect('/admin/dashboard');
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).render('admin-login', { 
            error: 'An error occurred during login',
            title: 'Admin Login'
        });
    }
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

router.get('/dashboard', async (req, res) => {
    res.render('admin-dashboard', { 
        title: 'Admin Dashboard',
        user: { username: process.env.ADMIN_USERNAME }
    });
});

module.exports = router;
