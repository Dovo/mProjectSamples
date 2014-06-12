/*global mileslaff, Backbone*/

Addressbook.Collections = Addressbook.Collections || {};

(function () {
    'use strict';

    Addressbook.Collections.BorrowersCollection = M.Collection.extend({
        model: Addressbook.Models.BorrowersModel,
        url: 'http://api.kivaws.org/v1/loans/newest.json',
        parse: function(response) {
        	console.log(response.loans);
            return response.loans;
        },
        sync: function(method, model, options) {
        	var that = this;
        		var params = _.extend({
        			type: 'GET',
        			dataType: 'json',
        			url: that.url,
        			processData: false
        		}, options);
        	return $.ajax(params);
        }   
    });
})();
