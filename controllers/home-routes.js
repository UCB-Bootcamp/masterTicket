const { Post, Attend } = require('../models');
const router = require('express').Router();

router.get('/', (req, res) => {
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
            posts
            // loggedIn: req.session.loggedIn    
        });
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
  });

  module.exports = router;