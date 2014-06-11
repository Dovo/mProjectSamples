// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: KivaApp
// View: LoansView
// ==========================================================================

m_require('app/views/FilterView.js');
m_require('app/views/Tabs.js');
m_require('app/views/ListViewTemplate.js');

KivaApp.LoansView = M.PageView.design({

    events: {
        pageshow: {
             target: KivaApp.LoansListController
            ,action: 'init'
		}
        ,pagebeforeshow: {
            action: function() {
                $('#'+KivaApp.LoansView.header.id + ', .ui-footer').css('display', 'block');
            }
        }
        ,pagebeforehide: {
            action: function() {
                KivaApp.UtilityController.showLoader();
                $('#'+KivaApp.LoansView.header.id).css('display', 'none');
            }
        }
        ,pagehide: {
            action: function() {
                KivaApp.UtilityController.hideLoader();
            }
        }
	}

	,value: 'Loans'

    // @hack inject into cssClass to set theme swatch letter
    ,cssClass: 'kv_loansView" data-theme="a'

	,childViews: 'header content filterPanel sortPanel footer'


	,header: M.ToolbarView.design({
         anchorLocation: M.TOP
        ,cssClass: 'kv_pageHeader'
        ,childViews: 'filter title sort'

        ,filter: M.LabelView.design({
            value: ''
            ,cssClass: 'kv_headerIcon kv_filter'
            ,anchorLocation: M.LEFT
            ,events: {
                tap: {
                    target: KivaApp.PanelController
                    ,action: 'openFilterPanel'
                }
            }
        })

        ,title: M.LabelView.design({
             value: 'Borrowers'
            ,anchorLocation: M.CENTER
        })

        ,sort: M.LabelView.design({
            value: ''
            ,cssClass: 'kv_headerIcon kv_sort'
            ,anchorLocation: M.RIGHT
            ,events: {
                tap: {
                    target: KivaApp.PanelController
                    ,action: 'openSortPanel'
                }
            }
        })
    })

			
	,content: M.ScrollView.design({
		 childViews: "loans noLoans"
			
		,loans: M.ListView.design({
			
			 listItemTemplateView: KivaApp.ListViewTemplate
				
			,contentBinding: {
				target: KivaApp.LoansListController
				,property: 'loans_list'
			}	
		})

        ,noLoans: M.ContainerView.design({
            cssClass: 'kv_noLoans'
            ,childViews: 'message changeLink clearLink'

            ,message: M.LabelView.design({
                value: 'No loans were found matching your selected filters'
            })

            ,changeLink: M.LabelView.design({
                cssClass: 'kv_changeFilters'
                ,isInline: YES
                ,value: 'Change your filters. '
                ,events: {
                    tap: {
                        target: KivaApp.PanelController
                        ,action: 'openFilterPanel'
                    }
                }
            })

            ,clearLink: M.LabelView.design({
                cssClass: 'kv_changeFilters'
                ,isInline: YES
                ,value: 'Clear your filters.'
                ,events: {
                    tap: {
                        action: function() {
                            KivaApp.FilterController.resetFilters(function() {
                                KivaApp.LoansListController.refreshResults();
                            });
                        }
                    }
                }
            })
        })
	})

    ,filterPanel: KivaApp.FilterView

    ,sortPanel: M.PanelView.design({
         position: M.RIGHT
        ,display: M.REVEAL
        ,dataTheme: 'b'

        //@hack disable swipeclose for this panel (doing our own swipe close implementation)
        ,cssClass: 'kv_sortPanel" data-swipe-close="false'

        ,childViews: 'header content'

        ,header: M.ContainerView.design({
            anchorLocation: M.TOP
            ,cssClass: 'kv_panelHeader header ui-header ui-bar-b ui-header-fixed'
            ,childViews: 'title'

            ,title: M.LabelView.design({
                 value: 'Sort'
                ,cssClass: 'kv_title'
            })
        })

        ,content: M.ContainerView.design({
            cssClass: 'kv_panelContent'
            ,childViews: 'sortList'

            ,sortList: M.SelectionListView.design({
                 selectionMode: M.SINGLE_SELECTION
                ,cssClass: 'kv_sortList'
                ,contentBinding: {
                     target: KivaApp.FilterController
                    ,property: 'sections.sort_by'
                }
                ,events: {
                    change: {
                        target: KivaApp.FilterController
                        ,action: 'sortItemSelected'
                    }
                }
            })
        })
    })

	,footer: KivaApp.Tabs
});

