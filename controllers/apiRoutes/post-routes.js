const router = require('express').Router();
const { User, Post, Attend } =  require('../../models');
const { sequelize } = require('../../models/User');

// get all posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'event_title',
            'venue',
            'city',
            'band',
            'genre',
            'event_description',
            'staff_pick',
            'featured_event',
            'created_at'//,
            //[sequelize.literal('(SELECT COUNT(*) FROM users WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
              model: User,
              attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
         res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// get a single post
router.get('/:id', (req, res) => {
    Post.findOne({
        attributes: [
            'id',
            'event_title',
            'venue',
            'city',
            'band',
            'genre',
            'event_description',
            'staff_pick',
            'featured_event',
            'created_at'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
          }
          res.json(dbPostData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });

// add a post
router.post('/', (req, res) => {
    Post.create({
        event_title: req.body.event_title,
        venue: req.body.venue,
        city: req.body.city,
        band: req.body.band,
        genre: req.body.genre,
        event_description: req.body.event_description,
        staff_pick: req.body.staff_pick,
        featured_event: req.body.featured_event,
        date: req.body.date,
        user_id: req.body.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// attending an event
router.put('/attend', (req, res) => {
    Post.attend(req.body, {Attend, User})
    .then(dbAttendData => res.json(dbAttendData))
    .catch(err => res.status(500).json(err));
});

// update a post
router.put('/:id', (req, res) => {
    Post.update(
        {
            event_title: req.body.event_title,
            venue: req.body.venue,
            city: req.body.city,
            band: req.body.band,
            genre: req.body.genre,
            event_description: req.body.event_description,
            staff_pick: req.body.staff_pick,
            featured_event: req.body.featured_event,
            date: req.body.date,
            user_id: req.body.user_id
        },
        {
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'No Post found at that id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => res.status(500).json(err));
});

// delete a post
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'No Post found at that id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => res.status(500).json(err));
});


module.exports = router;