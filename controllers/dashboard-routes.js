const { Post, Attend, User } = require('../models');
const router = require('express').Router();
const sequelize = require('../config/connection');

// upcoming events that we want to attend

// events that user posts
router.get('/', (req, res) => {
    if(req.session.loggedIn) {
        Post.findAll({
            where: {
                user_id: req.session.user_id
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
                'date'
            ],
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
            .then(dbPostData => {
                const posts = dbPostData.map(post => post.get({ plain: true }));
                console.log(posts);
                res.render('dashboard', {
                    posts,
                    loggedIn: req.session.loggedIn
                });
    
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    } else {
        res.redirect('/login');
    }
});

module.exports = router;