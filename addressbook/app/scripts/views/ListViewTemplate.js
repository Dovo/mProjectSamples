// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: KivaApp
// View: ListViewTemplate
// ==========================================================================
//Used for layout of loans list
Addressbook.ListViewTemplate = M.ListItemView.design({

    // tap event that takes use to Loan Item page for selected Borrower
    events: {
        tap: {
            target: Addressbook.LoansListController
            ,action: 'listObjectClicked'
        }
    }

    ,cssClass: 'kv_listItem'
    
    ,childViews: 'photo description progress action'
    
    ,photo: M.View.design({
//,photo: M.View.design({
        cssClass: 'kv_overlayContainer'
        ,childViews: 'img info'

        ,img: M.ImageView.design({
            cssClass: 'kv_photo'
            ,computedValue: {
                valuePattern: '<%= image %>'
                ,operation: function(image) {
                    return 'http://www.kiva.org/img/s' + KivaApp.UtilityController.imageWidth + '/'  + image.id + '.jpg';
                }
            }
        })

        ,info: M.View.design({
//,info: M.View.design({
            cssClass: 'kv_info'
            ,childViews: 'name location'

            ,name: M.TextareaView.design({
                cssClass: 'borrower_name'
                ,valuePattern: '<%= name %>'       
            
            })
            
            ,location: M.View.design({
//,location: M.View.design({
                cssClass: 'borrower_country'
                ,childViews: 'flag country activity'

                ,flag: M.TextareaView.design({
                    computedValue: {
                        valuePattern: '<%= location %>'
                        ,operation: function(location) {
                            return '<span class="f16 ' + location.country_code.toLowerCase() + '"></span>';
                        }
                    }
                    ,isInline: YES
                })

                ,country: M.TextareaView.design({
                    computedValue: {
                        valuePattern: '<%= location %>'
                        ,operation: function(location) {
                            return location.country;
                        }
                    }
                    ,isInline: YES
                })

                ,activity: M.TextareaView.design({
                    computedValue: {
                        valuePattern: '<%= activity %>'
                        ,operation: function(a) {
                            //return ' | ' + a;
                            return '';
                        }
                    }
                    ,isInline: YES
                })
            })
        })
    })

    ,description: M.TextareaView.design({
        cssClass: 'borrower_loan_use'
        ,valuePattern: '<%= use %>'
        ,computedValue: {
            valuePattern: '<%= use %>'
            ,operation: function(use) {
                return use.replace(/(^.{132}).*$/,'$1...');
            }
        }
    })

    ,progress: M.View.design({
        childViews: 'text bar'
        ,cssClass: 'kv_progressArea'

        ,text: M.TextareaView.design({
            cssClass: 'kv_progressText'
            ,valuePattern: '<%= progressText %>'
        })

        ,bar: M.TextareaView.design({
            cssClass: 'kv_fundMeter'
            ,computedValue: {
                valuePattern: '<%= percent %>'
                ,operation: function(percent) {
                    if(percent > 95) {
                        return '<div style="' +
                            'width:' + percent + '%;' +
                            'border-top-right-radius:20px;' +
                            'border-bottom-right-radius:20px;' +
                            '-webkit-border-top-right-radius:20px;' +
                            '-webkit-border-bottom-right-radius:20px;' +
                            '"></div>';
                    } else {
                        return '<div style="width:' + percent + '%"></div>';
                    }
                }
            }
        })
    })

    ,action: M.View.design({
        childViews: 'lend25 readMore'
        ,cssClass: 'kv_actionArea'

        ,lend25: M.TextareaView.design({
            cssClass: 'kv_loanCardAction'
            ,computedValue: {
                valuePattern: '<%= status %>'
                ,operation: function(status, obj) {
                    if(status !== 'fundraising') {
                        return '';
                    } else {
                        var loanId = obj.item.id;
                        if(KivaApp.BorrowerController.loanExistsInBasket(loanId)){
                            return '<span class="ui-btn ui-btn-up-a">' +
                                        '       <span class="ui-btn-inner">' +
                                        '           <span class="ui-btn-text">Update</span>' +
                                        '       </span>' +
                                        '   </span>';
                        }
                        return '<span class="kv_lend25 ui-btn ui-btn-up-c">' +
                            '       <span class="ui-btn-inner">' +
                            '           <span class="ui-btn-text">Lend $25</span>' +
                            '       </span>' +
                            '   </span>';
                    }
                }
            }
            ,events: {
                tap: {
                    action: function(id) {
                        var itemView = M.ViewManager.getViewById(id);
                        var loanId = itemView.item.id;
                        if(KivaApp.BorrowerController.loanExistsInBasket(loanId)){
                            KivaApp.BorrowerController.switchToNewLoan(loanId, 'loansView');
                        }
                        else{
                            KivaApp.BasketController.addToBasket(loanId, 25.00);
                        }
                    }
                }
            }
        })

        ,readMore: M.TextareaView.design({
            cssClass: 'kv_loanCardAction'
            ,value: '<span class="ui-btn ui-btn-up-a">' +
                '       <span class="ui-btn-inner">' +
                '           <span class="ui-btn-text">Read More</span>' +
                '       </span>' +
                '   </span>'
        })
    })

});

