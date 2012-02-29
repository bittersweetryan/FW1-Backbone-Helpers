##Override of Backbone Model Save method for use in FW/1 applications.  Uses jQuery's AJAX method.  

This little function ensures that calling save puts the model's properties directly in the RC.

###Usage

Include backbone.model.save.js after you include backbone on the page and make sure you are using jQuery and not zepto.

When calling a model's save method pass in an object that includes:
* options - this is an object that inluces options for jQuery's AJAX method.
* success - callback function to be called when the AJAX method returns success
* error - callback function to be called when the AJAX method returns error

###Example:

```js
	user = Backbone.Model.extend(
		{
			defaults: function(){
				return {
					username : '',
					password : ''
				};
			}
		}
	);

	user.save({
		defaults: { timeout: 500, type: 'POST' },
		success: function(){ console.log('success') },
		error: function(){ console.log('error') }
	});
```