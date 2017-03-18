const express = require('express');
const router = express.Router();

const Post = require('../models/post');

router.route("/posts")
	.get((req, res) => {
		Post.find((err, posts) => {
			//console.log('posts: ', posts);
			if(err) {
				throw(err);
			}
			res.render('post', {title: 'Posts', blogPosts: posts, description:'Posted'});
		})
	});
module.exports = router;