const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('homepage', {
      id: 1,
      post_url: 'http://localhost:3001/api/posts/',
      title: 'masterTicket',
      created_at: new Date(),
      vote_count: 10,
      comments: [{}, {}],
      user: {
        user_id: 1
      }
    });
  });

  module.exports = router;