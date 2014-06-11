// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: KivaApp
// Controller: UtilityController
// ==========================================================================

// This is a test of the stash mirror to github, second try

Addressbook.UtilityController = M.Controller.extend({
    prefetched: []
    ,monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    ,imageWidth: 300

    ,failedAJAX: {}

    ,ajax: function(ops, success, failure) {
        var key = JSON.stringify(ops);

        return $.ajax(ops)
            .done(function(data, status, xhr) {
                if(success !== undefined) {
                    success(data, status, xhr);
                }
            })
            .fail(function(xhr, options, error) {
                if(failure !== undefined) {
                    failure(xhr, options, error);
                }

                if(xhr.status == 0) {
                    KivaApp.UtilityController.failedAJAX[key] = {
                        ops:this,
                        success: function(data2, status2, xhr2) {
                            if(success !== undefined) {
                                success(data2, status2, xhr2);
                            }

                            if(KivaApp.UtilityController.failedAJAX[key]) {
                                delete KivaApp.UtilityController.failedAJAX[key];
                            }
                            KivaApp.UtilityController.hideInternetAlert();
                        },
                        failure: function(xhr2, options2, error2) {
                            if(failure !== undefined) {
                                failure(xhr2, options2, error2);
                            }

                            if(xhr2.status == 0) {
                                if(KivaApp.UtilityController.failedAJAX[key]) {
                                    KivaApp.UtilityController.failedAJAX[key].retry = true;
                                }
                            }
                            else if(xhr2.status === 401) {
                                KivaApp.OAuthController.logout();
                            }
                            else if(xhr2.status === 503) {
                                KivaApp.AlertController.showKivaUnavailable();
                            }
                            else {
                                Raven.captureMessage('AJAX Error', {tags:{
                                    url: this.url,
                                    status: xhr2.status,
                                    response: xhr2.responseText
                                }});
                            }
                        },
                        retry: true
                    };

                    KivaApp.UtilityController.testConnection();
                }
                else if(xhr.status === 401) {
                    KivaApp.OAuthController.logout();
                }
                else if(xhr.status === 503) {
                    KivaApp.AlertController.showKivaUnavailable();
                }
                else {
                    Raven.captureMessage('AJAX Error', {tags:{
                        url: this.url,
                        status: xhr.status,
                        response: xhr.responseText
                    }});
                }
            });
    }

    ,testConnection: function() {
        // show alert bar
        this.showInternetAlert();

        // check for network connection
        if(!navigator.onLine) {
            //set up retrying
            window.setTimeout(function() {
                KivaApp.UtilityController.testConnection();
            }, 30000);
        }
        // test internet connection
        else {
            // if there are failedAJAX retry them
            var retrying = false;
            for(var key in this.failedAJAX) {
                if(this.failedAJAX.hasOwnProperty(key) && this.failedAJAX[key].retry) {
                    retrying = true;
                    this.failedAJAX[key].retry = false;
                    $.ajax(this.failedAJAX[key].ops).done(this.failedAJAX[key].success).fail(this.failedAJAX[key].failure);
                }
            }

            if(retrying) {
                // set timeout to testConn
                window.setTimeout(function() {
                    KivaApp.UtilityController.testConnection();
                }, 30000);
            }
            else {
                this.hideInternetAlert();
            }
        }
    }

    ,showInternetAlert: function() {
        var alertDiv = $('.kv_pageHeader .connect-alert');
        if(alertDiv.length > 0) {
            alertDiv.css('display', 'block');
        }
        else {
            $('<div class="connect-alert">No Internet Connection</div>').appendTo($('.kv_pageHeader'));
        }
    }

    ,hideInternetAlert: function() {
        // if there are xhrs being retried or needing to be retried, don't hide
        var hide = true;
        for(var key in this.failedAJAX) {
            if(this.failedAJAX.hasOwnProperty(key)) {
                hide = false;
            }
        }
        if(hide) {
            $('.kv_pageHeader .connect-alert').css('display','none');
        }
    }

    ,prefetch: function(resources) {
        var resource, self = this;
        for(var i in resources) {
            resource = resources[i];
            if (self.prefetched[resource] !== true) {
                if (resource.substr(-3,3) === 'png'
                    || resource.substr(-3,3) === 'gif'
                    || resource.substr(-3,3) === 'jpg'
                    || resource.substr(-4,4) === 'jpeg'
                    || resource.substr(-3,3) === 'bmp') {

                    var im = new Image();
                    im.onload = function(){
                        self.prefetched[resource] = true;
                    }
                    im.src = resource;
                } else {
                    $.ajax({ url:resource, cache:true }).done(function() {
                        self.prefetched[resource] = true;
                    });
                }
            }
        }
    }

    ,makeLoanUse: function(loan) {
        return loan.use.charAt(0).toUpperCase() + loan.use.slice(1);

        /* Kiva www method
        var count = 0;
        if(loan.borrowers) {
            count = loan.borrowers.length;
        } else if(loan.borrower_count) {
            count = loan.borrower_count;
        } else {
            return false;
        }

        if(count > 1) {
            return 'A portion of ' + loan.name + "'s " + this.formatMoney(loan.loan_amount) + ' loan helps a member ' + loan.use.toLowerCase();
        }
        else {
            return 'A loan of ' + this.formatMoney(loan.loan_amount) + ' helps ' + loan.name + ' ' + loan.use.toLowerCase();
        }
        */
    }

    ,makeProgressPercent: function(loan) {
        var percent;
        if(loan.status === 'fundraising' || loan.status === 'funded') {
            percent = Math.floor(loan.funded_amount / loan.loan_amount * 100);
        } else {
            percent = Math.floor(loan.paid_amount / loan.loan_amount * 100);
        }
        // check nan
        if(!isFinite(percent)) {
            return 0;
        }
        return percent;
    }

    ,makeProgressText: function(loan, long) {
        if(loan.status === 'fundraising' || loan.status === 'funded') {
            if(loan.lender_count !== undefined) {
                return this.formatMoney(loan.loan_amount - loan.funded_amount, true) + ' to go | ' + loan.lender_count + ' lenders';
            } else {
                return this.formatMoney(loan.loan_amount - loan.funded_amount, true) + ' to go';
            }
            /* old method
            if(long === true) {
                return '<span>' + loan.percent + '%</span> raised, $' + (loan.loan_amount - loan.funded_amount) + ' to go';
            }  else {
                return '<span>' + loan.percent + '%</span> of $' + loan.loan_amount + ' raised';
            }
            */
        } else {
            return loan.percent + '% repaid';
            //return '<span>' + loan.percent + '%</span> repaid';
        }
    }

    // needs to be a much better formatter
    ,formatMoney: function(num, trimZeros) {
        num = accounting.formatMoney(num);

        if(trimZeros) {
            if(typeof num == 'string' && num.substr(num.length - 3) == accounting.settings.currency.decimal+'00') {
                num = num.substring(0, num.length-3);
            }
        }
        return num;
    }

    ,formatMoneyMini: function(num, trimZeros) {
        var val = num - 0; // get Number

        if(trimZeros) {
            if(typeof num == 'string' && num.substr(num.length - 3) == accounting.settings.currency.decimal+'00') {
                num = num.substring(0, num.length-3);
            }
        }

        if(val < 1000) {
            return accounting.settings.currency.symbol + num;
        }
        else {
            return accounting.settings.currency.symbol + Math.floor(val/1000) + 'K';
        }
    }

    ,parseMoney: function(num) {
        return accounting.unformat(num);
    }

    ,monthDiff: function(d1, d2) {
        var months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth() + 1;
        months += d2.getMonth();
        return months <= 0 ? 0 : months;
    }

    ,showLoader: function() {
        M.LoaderView.refCount++;

        $('div.ui-loader').css({
            'display':'block',
            'top': '0'
        });
    }

    ,hideLoader: function(force) {
        M.LoaderView.refCount = --M.LoaderView.refCount > 0 ? M.LoaderView.refCount : 0;
        if(M.LoaderView.refCount === 0) {
            $('div.ui-loader').css('display', 'none');
        }
    }

    ,testCookies: function() {
        document.cookie = "testcookie";
        return !!(document.cookie.indexOf("testcookie") != -1);
    }

    ,initTracking: function(id) {
        if (config.environment == 'prod') {
            mixpanel.init("b8e55bcf326863e5ed1cf7c318eac71d");
        } else {
            mixpanel.init("ef11776f0e2ecdfc7f64b4dc3e3bf84b");
        }

        mixpanel.identify(id.toString());

        // override track so it will only be called if the user allows it
        var old_track = mixpanel.track;
        mixpanel.track = function(name, props, fn) {
            if (KivaApp.SettingsController.getSettingValue('sendStats') !== undefined) {
                old_track.call(mixpanel, name, props, fn);
            }
        };

        // set up tap track events
        var isATap = false;

        window.addEventListener('touchstart', function() {
            isATap = true;
        }, true);

        window.addEventListener('touchmove', function() {
            isATap = false;
        }, true);

        window.addEventListener('touchcancel', function() {
            isATap = false;
        }, true);

        window.addEventListener('touchend', function(e) {
            if(isATap) {
                //console.log(e.target.localName + '#' + e.target.id + '.' + e.target.className);
                //console.log("TAP - page: '" + M.ViewManager.getCurrentPage().value + "' platform: '" + device.platform + "'");
                /*
                mixpanel.track('click', {
                    environment: config.environment,
                    version: config.version,
                    platform: device.platform,
                    page: M.ViewManager.getCurrentPage().value
                });
                */
            }
        }, true);

        KivaApp.ABTestController.init();
    }

    ,pickImageWidth: function() {
        this.imageWidth = 1024;
        if(window.innerWidth < 760) {
            this.imageWidth = 512;
        }
        if(window.innerWidth < 376) {
            this.imageWidth = 300;
        }
    }
});
