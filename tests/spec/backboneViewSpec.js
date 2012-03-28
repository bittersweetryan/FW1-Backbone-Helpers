describe("Backbone view extension",function(){
	var specView;

	beforeEach(function(){
		loadFixtures('view_fixture.html');

		var SpecView = Backbone.View.extend({
			el : $("#view_fixture"),
			model : generateModel()
		});

		specView = new SpecView();

		specView.populate();
	});

	it("should populate first level variables",function(){

		expect(specView.$el.find("#firstName").html()).toBe("Joe");

		expect(specView.$el.find("#lastName").val()).toBe("Montana");
	});

	it("should populate second level variables directly",function(){

		expect(specView.$el.find("#line1").html()).toBe("742 Evergreen terrace");

		expect(specView.$el.find("#zip").val()).toBe("32456");
	});

	it("should populate second level variables that use dot prefix",function(){

		expect(specView.$el.find("#address\\.state").html()).toBe("unknown");
	});

	it("should populate third level variables that use dot prefix",function(){

		expect(specView.$el.find("#address\\.country\\.name").html()).toBe("USA");
	});

	var generateModel = function(){
		var SpecModel =  Backbone.Model.extend({
			defaults : function(){
				return {
					firstName : "Joe",
					lastName : "Montana",
					address : {
						line1 : "742 Evergreen terrace",
						city : "Springfield",
						state : "unknown",
						zip : "32456",
						country : {
							name : "USA"
						}
					}
				};
			}
		});

		return new SpecModel();
	};
});