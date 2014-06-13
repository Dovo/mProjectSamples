/*global Addressbook, Backbone, JST*/

Addressbook.Views = Addressbook.Views || {};



(function () {
    'use strict';
    Addressbook.Views.BorrowersView = M.View.extend({
        
        template: '<div><div data-childviews="content"></div></div>'

    }, {

        content: M.View.extend({
            
            cssClass: 'content-wrapper-no'

        }, {

            borrowerList: M.ListView.extend({
                
                //grid: 'col-xs-12',

                scopeKey: 'kivaCollection',
                
                listItemView: M.ListItemView.extend({
                    
                    cssClass: '',
                    extendTemplate: '<div class="row"><div class="col-xs-7 col-xs-offset-1"><div class="name ellipsis"><span class="firstname"><%= name %></span><span class="lastname"><%= id %></span></div><div class="ellipsis"><span class="street"><%= use %></span></div></div><div class="col-xs-3"><img src="http://kiva.org/img/s100/1599908.jpg"></img></div></div>',
                    
                    //useElement: YES,
                    
                    events: {
                        //no events yet
                    }
                })
            })
        })
    })
})();

// (function () {
//     'use strict';

//     Addressbook.Views.BorrowersView = M.View.extend({
//         // The properties of a view
//         initialize: function() {
//         	this.collection = new Addressbook.Collections.BorrowersCollection;
//         	var that = this;
//         	this.collection.fetch({
//         		success: function() {
//         			that.render();
//         		}
//         	});
//         },
//     });
// })();
