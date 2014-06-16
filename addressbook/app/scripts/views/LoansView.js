
Addressbook.Views = Addressbook.Views || {};

(function() {
    'use strict';
    Addressbook.Views.LoansView = M.View.extend({

        content: M.ListView.extend({
            childViews: "loans noLoans", loans: M.ListView.design({

                listItemTemplateView: Addressbook.ListViewTemplate, contentBinding: {
                    target: Addressbook.LoansListController, property: 'loans_list'
                }
            })

        })
    });
})();


