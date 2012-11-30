	var async = require('async');
	var config = require('../../config').config;
	var mysql = require('../../lib/mysql.js');
	
	//app
	exports.index = function(req,res,next){
		res.render('app/index');
	};
	
	//奥运徽标
	exports.auyun = function(req,res,next){
		res.render('app/auyun',{ active: '1' });
	};
	//爱情语录
	exports.love = function(req,res,next){
		res.render('app/love',{ active: '2' });
	};
	//日韩街拍
	exports.photo = function(req,res,next){
		res.render('app/photo',{ active: '3' });
	};
	
	//花样早餐
	exports.breakfast = function(req,res,next){
		res.render('app/breakfast',{ active: '4' });
	};
	
	//养生粥
	exports.zhou = function(req,res,next){
		res.render('app/zhou',{ active: '5' });
	};
	
	//人生一定去的山
	exports.mustgo = function(req,res,next){
		res.render('app/mustgo',{ active: '6' });
	};
	
	//排骨
	exports.paigu = function(req,res,next){
		res.render('app/paigu',{ active: '7' });
	};
	//甜品
	exports.tianpin = function(req,res,next){
		res.render('app/tianpin',{ active: '8' });
	};
	
	//车标大全
	exports.all = function(req,res,next){
		res.render('app/car/all',{ active: '9' });
	};
	exports.britain = function(req,res,next){
		res.render('app/car/britain',{ active: '9' });
	};
	exports.italy = function(req,res,next){
		res.render('app/car/italy',{ active: '9' });
	};
	exports.usa = function(req,res,next){
		res.render('app/car/usa',{ active: '9' });
	};
	exports.germany = function(req,res,next){
		res.render('app/car/germany',{ active: '9' });
	};
	exports.korea = function(req,res,next){
		res.render('app/car/korea',{ active: '9' });
	};
	exports.france = function(req,res,next){
		res.render('app/car/france',{ active: '9' });
	};
	exports.japan = function(req,res,next){
		res.render('app/car/japan',{ active: '9' });
	};
	exports.china = function(req,res,next){
		res.render('app/car/china',{ active: '9' });
	};
	exports.other = function(req,res,next){
		res.render('app/car/other',{ active: '9' });
	};
	
	//交通标志大全
	exports.all2 = function(req,res,next){
		res.render('app/jiaotong/all2',{ active: '10' });
	};
	exports.britain2 = function(req,res,next){
		res.render('app/jiaotong/britain2',{ active: '10' });
	};
	exports.italy2 = function(req,res,next){
		res.render('app/jiaotong/italy2',{ active: '10' });
	};
	exports.usa2 = function(req,res,next){
		res.render('app/jiaotong/usa2',{ active: '10' });
	};
	exports.germany2 = function(req,res,next){
		res.render('app/jiaotong/germany2',{ active: '10' });
	};
	exports.korea2 = function(req,res,next){
		res.render('app/jiaotong/korea2',{ active: '10' });
	};
	exports.france2 = function(req,res,next){
		res.render('app/jiaotong/france2',{ active: '10' });
	};
	exports.japan2 = function(req,res,next){
		res.render('app/jiaotong/japan2',{ active: '10' });
	};
	exports.china2 = function(req,res,next){
		res.render('app/jiaotong/china2',{ active: '10' });
	};
	exports.other2 = function(req,res,next){
		res.render('app/jiaotong/other2',{ active: '10' });
	};
	
	//语录
	exports.yulu = function(req,res,next){
		var type = req.params.id || 0
		res.render('app/yulu/index',{ active: '2' ,type:type});
	};
	
	exports.getCarAjax = function(req,res,next){
		var car_id  = Number(req.query.car_id) || 1;
		var contry = req.query.contry || all
		var data = require('../data/'+contry+'/main'+car_id+'.js')
        	res.end(JSON.stringify(data))
        	return;
	};

	exports.getDataAjax = function(req,res,next){
		var page_id  = Number(req.query.page_id) || 1;
		var page_size = Number(req.query.page_size) || 6;
		var type = Number(req.query.type) || 0;
		//var sort = req.query.sort || order by date desc,id desc;
		var start = (page_id - 1)*page_size;
		async.auto({
	        signature : function(cb) {
	            mysql.query("Select * From user Where  type = ? ORDER BY  create_at DESC limit ? ,?", [ type,start,page_size], function(err, results) {
	                if (err) {
	                    cb(null, []);
	                }
	                if (!results) {
	                    cb(null, []);
	                }
	                if(results instanceof Array){
		                results.sort(function(a,b){
		                    if(a.email.length>b.email.length)return -1;
		                    	else if(a.email.length==b.email.length)return 0;
		                    	else return 1;
		                    	}
		                    );
		                if( typeof(results[2]) != 'undefined' && typeof(results[1]) != 'undefined'){
		                	var tem = results[2];
		                	results[2] = results[1];
		                	results[1] = tem;
		                }
	                }
	                cb(null, results);
	            });
	        },
	        totalRecords : function(cb) {
	            mysql.query("Select count(*) as total From user Where  type = ?", [type], function(err, results) {
	                if (err) {
	                    cb(null, []);
	                }
	                if (!results) {
	                    cb(null, []);
	                }
	                cb(null, results);
	            });
	        },
	      
	    }, function(err, results) {
	        if (err) {
	        	throw err;
	            return;
	        }
	        results.pageNum = page_size;
	        res.end(JSON.stringify(results))
	        return;
	    });
	};
	exports.monitor = function(req,res,next){
		res.render('monitor',{ layout: false });
	};