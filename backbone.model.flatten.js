
Backbone.Model.prototype.flatten = function(obj,prefix){
	var propName = (prefix) ? prefix + '.' :  '',
		ret = {};

	obj = obj || this.attributes;

	for(var attr in obj){
		if(_.isArray(obj[attr])){
			ret[attr] = JSON.stringify(obj[attr]);
		}
		else if(typeof obj[attr] === 'object' && obj[attr] !== null){
			_.extend(ret,this.flatten(obj[attr], propName + attr));
		}
		else{
			ret[propName + attr] = obj[attr];
		}
	}

	return ret;
};