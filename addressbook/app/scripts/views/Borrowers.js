/*global Addressbook, Backbone, JST*/

Addressbook.Views = Addressbook.Views || {};

(function () {
    'use strict';

    Addressbook.Views.BorrowersView = M.View.extend({
        // The properties of a view
        initialize: function() {
        	this.collection = new Addressbook.Collections.BorrowersCollection;
        	var that = this;
        	this.collection.fetch({
        		success: function() {
        			that.render();
        		}
        	});
        },
    });
})();
