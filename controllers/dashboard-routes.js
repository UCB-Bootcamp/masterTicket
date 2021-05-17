const { Post, Attend, User } = require('../models');
const router = require('express').Router();
const sequelize = require('../config/connection');

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
                'featured_event',
                'date',
                [sequelize.literal('(SELECT COUNT(*) FROM attend WHERE post.id = attend.post_id)'),
                    'attend_events']
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

// upcoming events that we want to attend
router.get('/', (req, res) => {
    if(req.session.loggedIn) {
        Attend.findAll({
            where: {
                user_id: req.session.user_id,
            },
            attributes: [
                'id',
                'post_id',
                'user_id'
            ]
        })
            .then(dbAttendData => {
                const attendEvents = dbAttendData.map(attend => attend.get({ plain: true }));
                console.log(attendEvents);
                res.render('dashboard', {
                    attendEvents,
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