(function( scope ) {

    Addressbook.Controllers.KivaController = M.Controller.extend({

        kivaCollection: null,

        kivaListView: null,

        editModel: M.Model.create(),

        applicationStart: function( ) {

            Addressbook.setLayout(M.AppLayout.design(this, null, true));

            this._initView();

            Addressbook.getLayout().applyViews({
                header: this.header,
                content: this.kivaListView
            });
        },

        show: function( ) {
            this._initView();

            Addressbook.getLayout().applyViews({
                header: this.header,
                content: this.kivaListView
            });
            Addressbook.getLayout().startTransition();
        },

        back: function() {
            this.editModel.set('firstname', '');
            this.editModel.set('lastname', '');
            Addressbook.navigate({
                route: '/'
            });
        },

        _initView: function( ) {
            if(!this.kivaCollection) {
                Addressbook.kivaCollection = this.kivaCollection = new Addressbook.Collections.BorrowersCollection();
            
                //var that = this;
                this.kivaCollection.fetch({
                    success: function() {
                        console.log("Got borrowers");
                        console.log(this.kivaCollection); //why is this undefined
                    },
                    error: function() {
                        console.log("Error fetching borrowers");
                    }
                });
            }

            if(!this.kivaListView) {
                this.kivaListView = Addressbook.Views.BorrowersView.create(this, null, true);
            }

            if(!this.header) {
                this.header = M.ToolbarView.extend({
                    value: M.I18N.get('global.add')
                }, {
                    first: M.ButtonView.extend({
                        cssClass: 'btn-default',
                        value: M.I18N.get('global.back'),
                        useElement: YES,
                        events: {
                            tap: 'back'
                        }
                    }),
                    second: M.View.extend({}, {

                        updateButton: M.ButtonView.extend({
                            cssClass: 'btn-success',
                            value: M.I18N.get('global.save'),
                            useElement: YES,
                            events: {
                                tap: 'addEntry'
                            }
                        })
                    })
                }).create(this, null, true);
            }
        }
    });

})(this);