const { Post, Attend } = require('../models');
const router = require('express').Router();
const sequelize = require('../config/connection');

// landing page
router.get('/', (req, res) => {
    console.log(req.session)
    Post.findAll({
        attributes: [
            'id',
            'event_title',
            'user_id',
            'venue',
            'city',
            'band',
            'genre',
            'event_description',
            'staff_pick',
            'date'
        ],
        include: [
            {
                model: Attend,
                attributes: ['id', 'user_id', 'post_id']
            }
        ]
    })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('homepage', {
                posts,
                loggedIn: req.session.loggedIn    
            });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// login page
router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// add-event page - might turn into a modal?
router.get('/add-event', (req, res) => {
    // this is going to need to be updated when we get partials going
    res.sendFile(path.join(__dirname, '../templates', 'form.html'));
});

  router.get('/post/:id', (req, res) => {
      Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'event_title',
            'user_id',
            'venue',
            'city',
            'band',
            'genre',
            'event_description',
            'staff_pick',
            'featured_event',
            'date',
            [sequelize.literal('(SELECT COUNT(*) FROM attend WHERE post.id = attend.post_id)'), 'attend_events']
        ],
        include: [
            {
                model: Attend,
                attributes: ['id', 'user_id', 'post_id']
            }
        ]
      })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        // serialize the data
        const post = dbPostData.get({ plain: true });
        // pass data to template
        res.render('single-post', {
          post
         // loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;

