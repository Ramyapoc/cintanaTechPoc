
const movieModel = require('../models/movies');	
const Msg = require('../../../config/messageConstant');

module.exports = {
	getById: function(req, res, next) {
		console.log(req.body);
		if(req.params.movieId){
			movieModel.find({movieId : req.params.movieId}, function(err, movieInfo){
				if (err) {
					next(err);
				} else {
					if(movieInfo.length){
						res.json({status:Msg.SUCCESS, message: Msg.MOVIEFOUND, data:{movies: movieInfo}});
					}else{
						res.end(Msg.NODATA)
					}
					
				}
			});
		}else{
			res.emd(Msg.MOVIEID_REQ);
		}
		
	},

	getAll: function(req, res, next) {
		let moviesList = [];

		movieModel.find({}, function(err, movies){
			if (err){
				next(err);
			} else{
				if(movies.length){
					for (let movie of movies) {
						moviesList.push({id: movie._id, name: movie.name, released_on: movie.released_on,movieId: movie.movieId});
					}
					res.json({status: Msg.SUCCESS, message: Msg.MOVIELIST, data:{movies: moviesList}});
				}else{
					res.end(Msg.NODATA);
				}
				
							
			}

		});
	},

	updateById: function(req, res, next) {
		if (req.params && req.params.movieId){
			if(req.body.name){
				movieModel.findOneAndUpdate({movieId : req.params.movieId},{name:req.body.name}, function(err, movieInfo){

					if(err)
						next(err);
					else {
						res.json({status:Msg.SUCCESS, message: Msg.MOVIEUPDATESUC, data:null});
					}
				});
			}else{
				res.end(Msg.MOVIE_NAME_REQ)
			}
		}else {
			res.end(Msg.MOVIE_ID_REQ);
		}
		
	},

	deleteById: function(req, res, next) {
		if(req.params.movieId){
			movieModel.findOneAndRemove({movieId : req.params.movieId}, function(err, movieInfo){
				if(err)
					next(err);
				else {
					res.json({status:Msg.SUCCESS, message: Msg.MOVIEDELETESUC, data:null});
				}
			});
		}else{
			res.end(Msg.MOVIEID_REQ);
		}
		
	},

	create: function(req, res, next) {
		if( req.body.name && req.body.released_on && req.body.movieId) {
			movieModel.create({ name: req.body.name, released_on: req.body.released_on,movieId: req.body.movieId }, function (err, result) {
				if (err) 
					next(err);
				else
					res.json({status: Msg.SUCCESS, message: Msg.MOVIECREATESCU, data: null});
				
			  });
		}else{
			res.end(Msg.MOVIE_NAME_RELDT_REQ);
		}
		
	},

}					