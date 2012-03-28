describe("Backbone save override",function(){
	var server,
		model;

	beforeEach(function(){
		server = sinon.fakeServer.create();
		var Model = Backbone.Model.extend({
											url: 'model',
											defaults:{
												firstName : "john",
												lastName: "doe"
											}
		});

		model = new Model();
	});

	afterEach(function(){
		server.restore();
	});

	it("Should override save and call success callback",function(){
		var spy = sinon.spy();

		server.respondWith([200, {"Content-Type":"text/html","Content-Length":2}, '{"OK":"True"}']);

		model.save({success:spy});

		server.respond();

		expect(spy.called).toBe(true);
	});

	it("Should override save and call error callback",function(){
		var spy = sinon.spy();

		server.respondWith([300, {"Content-Type":"text/html","Content-Length":2}, '{"OK":"True"}']);

		model.save({error:spy});

		server.respond();

		expect(spy.called).toBe(true);
	});
});