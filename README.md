##Override of Backbone Model methods for eaiser use in FW/1 applications.  Uses jQuery's AJAX method.  

This little function ensures that calling save puts the model's properties directly in the RC.

###Usage

Include backbone.model.save.js after you include backbone on the page and make sure you are using jQuery and not zepto.

In your model you can set the url property which fetch and save will both use so you'd need a smart controller method that would read the properties passed to it. You can also set a models saveUrl and fetchUrl properties respectively to load different url's for each action.  

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
			},

			url: 'index.cfm?action=user.do'
		}
	);

	user.save({
		defaults: { timeout: 500, type: 'POST' },
		success: function(){ console.log('success') },
		error: function(){ console.log('error') }
	});
```

Generic controller method:

```cfm

component(){
	...

	function do(){
		//only an id was passed in get
		if(structKeyExists(rc,"id") && !structKeyExists(rc,"name")){
			//return a json representation of your object;
		}
		//id was passed and is blank, name was also passed update
		else if(structKeyExists(rc, "id") && rc.id != "" && structKeyExists(rc,"name")){
			update();
			//return a response that the callback can use
		}
	}

	..
}

```