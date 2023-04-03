const router = require('express').Router();
const { Blog, User } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

// GET route for getting all the blog posts 
router.get('/', async (req, res) => {
  try {
    // Get all blog posts and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Renders the 'homepage' Handlebars.js template. This is how we connect each route to the correct template.
    res.render('homepage', { 
      blogs, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [
        { model: Blog,
          attributes: ['file_URL','date_created' ] }],
    });

    const user = userData.get({ plain: true });
//when user is logged in, the profile page will render automatically after a successful sign in
    res.render('profile', {
      ...user,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET route
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    return;
  }

  res.render('login');
});

module.exports = router;
