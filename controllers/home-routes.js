const { Post } = require('../models');
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
        res.render('homepage', dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
  });

  module.exports = router;