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

        _initView: function() {
            if(!this.kivaCollection) {
                Addressbook.kivaCollection = this.kivaCollection = new Addressbook.Collections.BorrowersCollection();
            
                M.Loader.show();
                var that = this;
                this.kivaCollection.fetch({
                    success: function() {
                        console.log("Got borrowers");
                        //console.log(that.kivaCollection.models[0].attributes);
                        M.Loader.hide();
                    },
                    error: function() {
                        console.log("Error fetching borrowers");
                        M.Loader.hide();
                    }
                });

                //manually add Kiva elements for demo 
                // var dummyCollection = JSON.parse('[{"id":718077,"name":"Byron Antulio","description":{"languages":["es","en"]},"status":"fundraising","funded_amount":0,"basket_amount":0,"image":{"id":1615767,"template_id":1},"activity":"Personal Purchases","sector":"Personal Use","use":"to pay for university fees.","location":{"country_code":"GT","country":"Guatemala","town":"Suchitep\u00e9quez","geo":{"level":"country","pairs":"15.5 -90.25","type":"point"}},"partner_id":246,"posted_date":"2014-06-13T17:50:36Z","planned_expiration_date":"2014-07-13T17:50:36Z","loan_amount":1300,"borrower_count":1,"lender_count":0,"bonus_credit_eligibility":false},{"id":722119,"name":"Jay Maa Mangala Shg Group","description":{"languages":["en"]},"status":"fundraising","funded_amount":0,"basket_amount":0,"image":{"id":1622211,"template_id":1},"activity":"Food Production\/Sales","sector":"Food","use":"to pay for a new grinder and raw spices in bulk ","location":{"country_code":"IN","country":"India","town":"Basudevpur, Odisha","geo":{"level":"country","pairs":"20 77","type":"point"}},"partner_id":241,"posted_date":"2014-06-13T17:50:36Z","planned_expiration_date":"2014-07-13T17:50:36Z","loan_amount":3375,"borrower_count":9,"lender_count":0,"bonus_credit_eligibility":false},{"id":722125,"name":"Laxmi Narayan Shg Group","description":{"languages":["en"]},"status":"fundraising","funded_amount":0,"basket_amount":0,"image":{"id":1622219,"template_id":1},"activity":"Manufacturing","sector":"Manufacturing","use":"to purchase items like coal and sand and a better machine to make bricks ","location":{"country_code":"IN","country":"India","town":"Basudevpur, Odisha","geo":{"level":"country","pairs":"20 77","type":"point"}},"partner_id":241,"posted_date":"2014-06-13T17:50:36Z","planned_expiration_date":"2014-07-13T17:50:36Z","loan_amount":2450,"borrower_count":12,"lender_count":0,"bonus_credit_eligibility":false},{"id":722131,"name":"Maa Bijayalaxmi Shg Group","description":{"languages":["en"]},"status":"fundraising","funded_amount":0,"basket_amount":0,"image":{"id":1622223,"template_id":1},"activity":"Manufacturing","sector":"Manufacturing","use":"To buy a new machine and materials in bulk for her candle-making business.","location":{"country_code":"IN","country":"India","town":"Basudevpur, Odisha","geo":{"level":"country","pairs":"20 77","type":"point"}},"partner_id":241,"posted_date":"2014-06-13T17:50:36Z","planned_expiration_date":"2014-07-13T17:50:36Z","loan_amount":2050,"borrower_count":8,"lender_count":0,"bonus_credit_eligibility":false},{"id":722144,"name":"Salma Al- Baladia Group","description":{"languages":["en"]},"status":"fundraising","funded_amount":0,"basket_amount":0,"image":{"id":1622235,"template_id":1},"activity":"Personal Housing Expenses","sector":"Housing","theme":"Islamic Finance","use":"to purchase paving for the yard of the house.","location":{"country_code":"YE","country":"Yemen","town":"Sanaa","geo":{"level":"country","pairs":"15.5 47.5","type":"point"}},"partner_id":205,"posted_date":"2014-06-13T17:50:36Z","planned_expiration_date":"2014-07-13T17:50:36Z","loan_amount":1225,"borrower_count":5,"lender_count":0,"bonus_credit_eligibility":true},{"id":718794,"name":"Maria Modesta","description":{"languages":["es","en"]},"status":"fundraising","funded_amount":0,"basket_amount":0,"image":{"id":1424615,"template_id":1},"activity":"Farming","sector":"Agriculture","use":"to buy fertilizers and invest in the cultivation of more coffee plants.","location":{"country_code":"HN","country":"Honduras","town":"Gracias, Lempira","geo":{"level":"country","pairs":"15 -86.5","type":"point"}},"partner_id":201,"posted_date":"2014-06-13T17:50:27Z","planned_expiration_date":"2014-07-13T17:50:27Z","loan_amount":1325,"borrower_count":1,"lender_count":0,"bonus_credit_eligibility":true},{"id":719206,"name":"Ramiro Frederman","description":{"languages":["es","en"]},"status":"fundraising","funded_amount":0,"basket_amount":0,"image":{"id":1617618,"template_id":1},"activity":"Retail","sector":"Retail","use":"to buy fruit and other goods to sell on his small stall.","location":{"country_code":"SV","country":"El Salvador","town":"Anamoros","geo":{"level":"country","pairs":"13.833333 -88.916667","type":"point"}},"partner_id":199,"posted_date":"2014-06-13T17:50:27Z","planned_expiration_date":"2014-07-13T17:50:27Z","loan_amount":200,"borrower_count":1,"lender_count":0,"bonus_credit_eligibility":true},{"id":718555,"name":"Vidalia Del Carmen","description":{"languages":["es","en"]},"status":"fundraising","funded_amount":0,"basket_amount":0,"image":{"id":1616476,"template_id":1},"activity":"Livestock","sector":"Agriculture","use":"to buy two cows and more fruit to sell.","location":{"country_code":"SV","country":"El Salvador","town":"Ciudad El Triunfo","geo":{"level":"country","pairs":"13.833333 -88.916667","type":"point"}},"partner_id":199,"posted_date":"2014-06-13T17:50:17Z","planned_expiration_date":"2014-07-13T17:50:17Z","loan_amount":1100,"borrower_count":1,"lender_count":0,"bonus_credit_eligibility":true},{"id":722114,"name":"Adiatu","description":{"languages":["en"]},"status":"fundraising","funded_amount":0,"basket_amount":0,"image":{"id":1622206,"template_id":1},"activity":"Food Market","sector":"Food","use":"to purchase more beans to expand her business. ","location":{"country_code":"SL","country":"Sierra Leone","town":"Moriba town Bo","geo":{"level":"country","pairs":"8.5 -11.5","type":"point"}},"partner_id":183,"posted_date":"2014-06-13T17:50:17Z","planned_expiration_date":"2014-07-13T17:50:17Z","loan_amount":125,"borrower_count":1,"lender_count":0,"bonus_credit_eligibility":true},{"id":722134,"name":"Nhans Group","description":{"languages":["en"]},"status":"fundraising","funded_amount":0,"basket_amount":0,"image":{"id":1621900,"template_id":1},"activity":"Cafe","sector":"Food","use":"To buy coffee in bulk and an old motorcycle, for transporting goods to her business","location":{"country_code":"VN","country":"Vietnam","town":"Ho Chi Minh City","geo":{"level":"country","pairs":"16.166667 107.833333","type":"point"}},"partner_id":172,"posted_date":"2014-06-13T17:50:17Z","planned_expiration_date":"2014-07-13T17:50:17Z","loan_amount":4600,"borrower_count":8,"lender_count":0,"bonus_credit_eligibility":true},{"id":722146,"name":"Dung","description":{"languages":["en"]},"status":"fundraising","funded_amount":0,"basket_amount":0,"image":{"id":1621909,"template_id":1},"activity":"Construction Supplies","sector":"Construction","use":"To buy tiles to sell from her store","location":{"country_code":"VN","country":"Vietnam","town":"Ho Chi Minh City","geo":{"level":"country","pairs":"16.166667 107.833333","type":"point"}},"partner_id":172,"posted_date":"2014-06-13T17:50:17Z","planned_expiration_date":"2014-07-13T17:50:17Z","loan_amount":950,"borrower_count":1,"lender_count":0,"bonus_credit_eligibility":true},{"id":711164,"name":"Daniela Melisa","description":{"languages":["es","en"]},"status":"fundraising","funded_amount":0,"basket_amount":0,"image":{"id":1617629,"template_id":1},"activity":"Agriculture","sector":"Agriculture","theme":"Underfunded Areas","use":"to help with the planting of corn and beans.","location":{"country_code":"CR","country":"Costa Rica","town":"El Progreso, Pejibaye","geo":{"level":"country","pairs":"10 -84","type":"point"}},"partner_id":150,"posted_date":"2014-06-13T17:50:15Z","planned_expiration_date":"2014-07-13T17:50:15Z","loan_amount":900,"borrower_count":1,"lender_count":0,"bonus_credit_eligibility":false},{"id":718825,"name":"Maricela Abigail","description":{"languages":["es","en"]},"status":"fundraising","funded_amount":0,"basket_amount":0,"image":{"id":1517743,"template_id":1},"activity":"Clothing Sales","sector":"Clothing","use":"to buy blouses, shirts, skirts, pants, dresses, undergarments, etc.","location":{"country_code":"SV","country":"El Salvador","geo":{"level":"country","pairs":"13.833333 -88.916667","type":"point"}},"partner_id":167,"posted_date":"2014-06-13T17:50:15Z","planned_expiration_date":"2014-07-13T17:50:15Z","loan_amount":400,"borrower_count":1,"lender_count":0,"bonus_credit_eligibility":true},{"id":719213,"name":"Yerson","description":{"languages":["es","en"]},"status":"fundraising","funded_amount":0,"basket_amount":0,"image":{"id":1625812,"template_id":1},"activity":"Vehicle","sector":"Personal Use","theme":"Underfunded Areas","use":"to buy spare parts for his motorcycle.","location":{"country_code":"CR","country":"Costa Rica","town":"Platanares, Buenos Aires.","geo":{"level":"country","pairs":"10 -84","type":"point"}},"partner_id":150,"posted_date":"2014-06-13T17:50:15Z","planned_expiration_date":"2014-07-13T17:50:15Z","loan_amount":900,"borrower_count":1,"lender_count":0,"bonus_credit_eligibility":false},{"id":722140,"name":"Anecita","description":{"languages":["en"]},"status":"fundraising","funded_amount":0,"basket_amount":0,"image":{"id":1622233,"template_id":1},"activity":"Bakery","sector":"Food","use":"to buy ingredients, like flour, sugar, and butter","location":{"country_code":"PH","country":"Philippines","town":"Santander, Cebu","geo":{"level":"country","pairs":"13 122","type":"point"}},"partner_id":145,"posted_date":"2014-06-13T17:50:15Z","planned_expiration_date":"2014-07-13T17:50:15Z","loan_amount":700,"borrower_count":1,"lender_count":0,"bonus_credit_eligibility":true},{"id":719277,"name":"Greccia Kristhel","description":{"languages":["es","en"]},"status":"fundraising","funded_amount":0,"basket_amount":0,"image":{"id":1617761,"template_id":1},"activity":"Higher education costs","sector":"Education","theme":"Higher Education","use":"to purchase materials in order to realize her studies in the University.","location":{"country_code":"PE","country":"Peru","town":"Nazca","geo":{"level":"country","pairs":"-10 -76","type":"point"}},"partner_id":139,"posted_date":"2014-06-13T17:50:14Z","planned_expiration_date":"2014-07-13T17:50:14Z","loan_amount":375,"borrower_count":1,"lender_count":0,"bonus_credit_eligibility":true},{"id":719285,"name":"Maria Sonia","description":{"languages":["es","en"]},"status":"fundraising","funded_amount":0,"basket_amount":0,"image":{"id":1617774,"template_id":1},"activity":"Personal Housing Expenses","sector":"Housing","use":"to buy sand, quarry stones, cement, boulders and to pay labor costs to put in a drain.","location":{"country_code":"NI","country":"Nicaragua","town":"Nueva Guinea, RAAS","geo":{"level":"country","pairs":"13 -85","type":"point"}},"partner_id":98,"posted_date":"2014-06-13T17:50:14Z","planned_expiration_date":"2014-07-13T17:50:14Z","loan_amount":975,"borrower_count":1,"lender_count":0,"bonus_credit_eligibility":false},{"id":719278,"name":"Mario Javier","description":{"languages":["es","en"]},"status":"fundraising","funded_amount":0,"basket_amount":0,"image":{"id":1617764,"template_id":1},"activity":"Personal Housing Expenses","sector":"Housing","use":"to purchase cement, sand, stone and gravel to plaster walls.","location":{"country_code":"NI","country":"Nicaragua","town":"Nueva Guinea, RAAS","geo":{"level":"country","pairs":"13 -85","type":"point"}},"partner_id":98,"posted_date":"2014-06-13T17:50:11Z","planned_expiration_date":"2014-07-13T17:50:11Z","loan_amount":800,"borrower_count":1,"lender_count":0,"bonus_credit_eligibility":false},{"id":719275,"name":"Martina","description":{"languages":["es","en"]},"status":"fundraising","funded_amount":0,"basket_amount":0,"image":{"id":1617749,"template_id":1},"activity":"Personal Housing Expenses","sector":"Housing","use":"to buy construction material to build a porch.","location":{"country_code":"NI","country":"Nicaragua","town":"Nueva Guinea, RAAS","geo":{"level":"country","pairs":"13 -85","type":"point"}},"partner_id":98,"posted_date":"2014-06-13T17:50:02Z","planned_expiration_date":"2014-07-13T17:50:02Z","loan_amount":1175,"borrower_count":1,"lender_count":0,"bonus_credit_eligibility":false},{"id":721253,"name":"Benkola Group","description":{"languages":["fr","en"]},"status":"fundraising","funded_amount":0,"basket_amount":0,"image":{"id":1620934,"template_id":1},"activity":"Retail","sector":"Retail","theme":"Rural Exclusion","use":"to buy traditional cloth.","location":{"country_code":"ML","country":"Mali","town":"KOUTIALA","geo":{"level":"town","pairs":"12.383333 -5.466667","type":"point"}},"partner_id":78,"posted_date":"2014-06-13T17:50:02Z","planned_expiration_date":"2014-07-13T17:50:02Z","loan_amount":1475,"borrower_count":7,"lender_count":0,"bonus_credit_eligibility":false}]');
                // this.kivaCollection.reset(dummyCollection);
            }

            if(!this.kivaListView) {
                this.kivaListView = Addressbook.Views.BorrowersView.create(this, null, true);
            }

            if(!this.header) {
                this.header = M.ToolbarView.extend({
                    value: M.I18N.get('global.kiva')
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