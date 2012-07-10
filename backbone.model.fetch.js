(function($){
	Backbone.Model.prototype.fetch = function(options){
		var self = this;

		//options is a object that expects to have
		//defaults, success callback, and error callback
		return $.Deferred(function(dfd){

			var defaults = {
				success : function(){
					//console.log("success");
				},

				error : function(){
					//console.log("error");
				}
			};

			options = _.extend({},defaults,options);

			if(options.defaults){
				$.ajax.setup(options.defaults);
			}

			$.ajax({
				url : self.fetchUrl || self.url,
				data : {'id' : self.id},

				success : function(data){
					$.when(
						populate.call(self,data)
					).then(
						options.success.call()
					);
				},
				error : options.error || function(){
					//console.log("error fetching model");
				}
			}).done(function(){
				
				dfd.resolve();
			});

		}).promise();
	};

	var populate = function(data, textStatus,jqXHR){
		var self = this;

		return $.Deferred(function(dfd){

			if(typeof data === 'object'){
				for(var key in data){
					self.set(key,data[key]);
				}
			}

			//trigger a populate event
			self.trigger('populate');
			dfd.resolve();
		}).promise();
		
	};

}(jQuery));