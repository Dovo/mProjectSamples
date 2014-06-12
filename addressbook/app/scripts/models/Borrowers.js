/*global mileslaff, Backbone*/

Addressbook.Models = Addressbook.Models || {};

(function () {
    'use strict';

    Addressbook.Models.BorrowersModel = M.Model.extend({
        idAttribute: '_id',

        entity: {
        	name: 'borrower'
        }
    });
})();
