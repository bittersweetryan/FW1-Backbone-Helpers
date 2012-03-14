(function($){
	Backbone.Model.prototype.fetch = function(options){
		//options is a object that expects to have
		//defaults, success callback, and error callback
		if(options.defaults){
			$.ajax.setup(options.defaults);
		}

		var self = this;
			
		$.ajax({
			url : this.fetchUrl || this.url,
			data : {id : this.id},
			success : options.success || function(){
				populate.apply(this,arguments);
			},
			error : options.error || function(){
				console.log("error fetching model");
			}
		});
	};

	var populate = function(data, textStatus,jqXHR){
		if(typeof data === 'object'){
			for(var key in data){
				if(this.hasOwnProperty(key)){
					this[key] = data[key];
				}
			}
		}
	};

}(jQuery));