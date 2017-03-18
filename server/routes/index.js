const express = require('express');
const router = express.Router();

const Post = require('../models/post');

router.route('/')
	.get((req, res) => {
		res.render('index', {title: "Back-end Project", description: "welcome to this small project"})
	})
	.post((req, res) => {
		const post = new Post();
		post.name = req.body.name;
		post.description = req.body.description;
		post.image = req.body.image;
		post.save((err) => {
			if(err) {
				res.render('index', {title: "Back-end Project", description: "There is an error"});
			}
			res.render('index', {title: "Back-end Project", description: 'Your post was sent'});
		})
	});

router.route('/edit/:id')
	.get((req, res) => {
		const id = req.params.id;
		Post.findById((id, (err, posts) => {
			if(err) {
				throw(err);
			}
			const title = `$ Update of {posts.name}`;
			return res.render('edit', {title: title, blogPost: posts})
		}))
	})
	.post((req, res) => {
		const id = req.params.id;
		Post.update({_id: id}, {name: req.body.name, description: req.body.description}, (err, numRowsAffected, rawResponse) => {
			if(err) {
				throw(err);
			}
			res.redirect('/post');
		})
	});

router.route('/delete/:id')
	.get((req, res) => {
		const id = req.params.id;
		Post.findByIdAndRemove(id, (err) => {
			if(err) {
				throw(err);
			}
			res.redirect('/post');
		})
	});

module.exports = router;