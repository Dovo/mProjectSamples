// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: KivaApp
// Controller: LoansListController
// ==========================================================================

KivaApp.LoansListController = M.Controller.extend({

    loans_list: []
    ,loans: null

    ,params: ''
    ,page: 0

    ,lastLoanInList: null
    ,totalLoansLastSearch: 0

    ,alreadyLoading: false
    ,firstLoadComplete: false

    ,imageLoadCounter: 0
    ,newImages: []

    ,init: function(isFirstLoad, preload){
        KivaApp.UtilityController.pickImageWidth();

        if(!preload) {
            if(!KivaApp.SettingsController.checkLoggedIn()) {
                return false;
            }

            if(!this.firstLoadComplete) {
                KivaApp.UtilityController.showLoader();
            }
        }

        if(isFirstLoad && !this.alreadyLoading) {
            KivaApp.FilterController.init(true);

            //create loans object
            this.loans = kiva.Loans.create();

            //display loans
            this.alreadyLoading = true;
            this.refreshResults();

            //setup lazy loading
            $(window).scroll(function() {
                var lastid = $('.kv_listItem:nth-last-child(1)').attr('id');
                if (KivaApp.LoansListController.lastLoanInList != lastid) {
                    if (KivaApp.LoansListController.loans_list.length < KivaApp.LoansListController.totalLoansLastSearch && KivaApp.LoansListController.isScrolledIntoView('.kv_listItem:nth-last-child(1)')) {
                        KivaApp.LoansListController.lastLoanInList = lastid;
                        KivaApp.LoansListController.page++;
                        KivaApp.LoansListController.loadMoreLoans();
                    }
                }
            });
        }
    }

    ,listObjectClicked: function(id, nameid){
        //kv.phoneGap.localStorage.aes.setItem('name_id', nameid.toString());
        //this.switchToPage('loanItem');
        KivaApp.BorrowerController.switchToNewLoan(nameid, 'loansView');
    }

    ,refreshResults: function() {
        this.page = 1; // reset paging
        window.scrollTo(0,0); // go back to top of page
        this.makeParams();
        this.loadMoreLoans();
    }

    ,makeParams: function() {
        this.params = {};
        this.params.page = this.page; // possibly not necessary, but doesn't hurt
        this.params.per_page = 10;
        var filters = KivaApp.FilterModel.find();
        var section, value;

        for(var i in filters) {
            section = filters[i].record.section;
            value = filters[i].record.value;
            this.params[section] = this.params[section] ? this.params[section] + ',' + value : '' + value;
        }
    }

    ,isScrolledIntoView : function(elem) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();

        return ((elemBottom <= docViewBottom) && ($(elem).filter(':visible').length));
    }

    ,loadMoreLoans : function() {
        if(this.firstLoadComplete) {
            KivaApp.UtilityController.showLoader();
        }

        this.params.page = this.page;
        this.loans.fetch({action: 'search', params: this.params}, function (data) {
            KivaApp.LoansListController.totalLoansLastSearch = data.paging.total;
            KivaApp.LoansListController.parseNewLoans(KivaApp.LoansListController.loans.members);
        }, function() {
            KivaApp.UtilityController.hideLoader();
        });
    }

    ,parseNewLoans: function(loans) {
        this.newImages = [];
        this.imageLoadCounter = 0;

        // preload default image
        var defImage = new Image();
        defImage.src = 'http://www.kiva.org/img/s325/726677.jpg';

        // start loading images and parse individual loan data
        for(var i = 0; i < loans.length; i++) {
            loans[i].use = KivaApp.UtilityController.makeLoanUse(loans[i]);
            loans[i].percent = KivaApp.UtilityController.makeProgressPercent(loans[i]);
            loans[i].progressText = KivaApp.UtilityController.makeProgressText(loans[i], true);

            // @hack Remove 'theme' from results, it causes a crash and we don't use it here.
            delete loans[i].theme;

            this.imageLoadCounter++;

            this.newImages[i] = new Image();
            this.newImages[i].src = 'http://www.kiva.org/img/s325/' + loans[i].image.id + '.jpg';
            this.newImages[i]._loanIndex = i + this.loans_list.length;

            this.newImages[i].onload = function() {
                KivaApp.LoansListController.imageLoadComplete();
            };
            this.newImages[i].onerror = function() {
                KivaApp.LoansListController.imageLoadError(this._loanIndex);
            };
        }

        // add new loans to loan list
        if (this.page == 1) {
            this.loans_list = loans;
        } else {
            this.loans_list = this.loans_list.concat(loans);
        }

        if(this.loans_list.length === 0) {
            $('.kv_noLoans').css('display', 'block');
        } else {
            $('.kv_noLoans').css('display', 'none');
        }

        if(loans.length === 0) {
            this.set('loans_list', this.loans_list);
            KivaApp.UtilityController.hideLoader();
        }
    }

    ,imageLoadComplete: function() {
        if(--this.imageLoadCounter === 0) {
            this.set('loans_list', this.loans_list);

            if(!this.firstLoadComplete) {
                this.firstLoadComplete = true;
            }
            KivaApp.UtilityController.hideLoader();
        }
    }

    ,imageLoadError: function(i) {
        this.loans_list[i].image.id = 726677;

        this.imageLoadComplete();

        KivaApp.UtilityController.testConnection();
    }
});
