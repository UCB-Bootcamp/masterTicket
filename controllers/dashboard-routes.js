const { Post, Attend, User } = require('../models');
const router = require('express').Router();
const sequelize = require('../config/connection');

// events that user posts
router.get('/', (req, res) => {
    if(req.session.loggedIn) {
        const posts = Post.findAll({
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
        });

        const attend_events = Attend.findAll({
            where: {
                user_id: req.session.user_id,
            },
            attributes: [
                'id',
                'post_id',
                'user_id'
            ]
        });
        Promise
            .all([posts, attend_events])
            .then(responses => {
                console.log(responses[0]);
                console.log(responses[1]);

                const posts = responses[0].map(post => post.get({ plain: true }));
                const attend_events = responses[1].map(post => post.get({ plain: true }));

                res.render('dashboard', {
                    posts,
                    attend_events,
                    loggedIn: req.session.loggedIn
                });
            })
    }
});

module.exports = router;
