import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {FlowRouterTitle} from 'meteor/ostrio:flow-router-title';
import 'meteor/arillo:flow-router-helpers';
import 'meteor/zimme:active-route';
import 'meteor/theara:flow-router-breadcrumb';

// Lib
import {__} from '../../core/common/libs/tapi18n-callback-helper.js';

// Layout
import {Layout} from '../../core/client/libs/render-layout.js';
import '../../core/imports/ui/layouts/login';
import '../../core/imports/ui/layouts/main';

// Group
let AccRoutes = FlowRouter.group({
    prefix: '/acc',
    title: "Accounting",
    titlePrefix: 'Accounting> ',
    subscriptions: function (params, queryParams) {
//     this.register('files', Meteor.subscribe('files'));
    }
});

// Home
import '../imports/ui/pages/home.js';
AccRoutes.route('/home', {
    name: 'acc.home',
    title: __('acc.home.title'),
    action(param, queryParam){
        Layout.main('Acc_home');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: __('acc.home.title'),
        icon: 'home',
        parent: 'core.welcome'
    }
});

// Item
import '../imports/ui/pages/item.js';
AccRoutes.route('/item', {
    name: 'acc.item',
    title: __('acc.item.title'),
    action: function (params, queryParams) {
        Layout.main('Acc_item');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: __('acc.item.title'),
        icon: 'product-hunt',
        parent: 'acc.home'
    }
});

// Customer
import '../imports/ui/pages/customer.js';
AccRoutes.route('/customer', {
    name: 'acc.customer',
    title: __('acc.customer.title'),
    action: function (params, queryParams) {
        Layout.main('Acc_customer');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: __('acc.customer.title'),
        icon: 'users',
        parent: 'acc.home'
    }
});

// Order
import '../imports/ui/pages/order.js';
AccRoutes.route('/order', {
    name: 'acc.order',
    title: __('acc.order.title'),
    action: function (params, queryParams) {
        Layout.main('Acc_order');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: __('acc.order.title'),
        icon: 'cart-plus',
        parent: 'acc.home'
    }
});

// ChartAccount
import '../imports/ui/pages/chartAccount/chartAccount.js';
AccRoutes.route('/chartAccount', {
    name: 'acc.chartAccount',
    title: __('acc.chartAccount.title'),
    action: function (params, queryParams) {
        Layout.main('acc_chartAccount');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: __('acc.chartAccount.title'),
        icon: 'cart-plus',
        parent: 'acc.home'
    },
    subscriptions: function (params, queryParams) {
        this.register('accAccountType', Meteor.subscribe('accAccountType'));
        this.register('accChartAccount', Meteor.subscribe('accChartAccount'));
    }
});


//Journal
// Index
import '../imports/ui/pages/journal/journal.js';

AccRoutes.route('/journal', {
    name: 'acc.journal',
    // subscriptions: function (params, queryParams) {
    //     this.register(
    //         'acc_Journal',
    //         Meteor.subscribe('acc_Journal')
    //     ),this.register(
    //         'accChartAccount',
    //         Meteor.subscribe('accChartAccount')
    //     ),this.register(
    //         'accDateEndOfProcess',
    //         Meteor.subscribe('accDateEndOfProcess')
    //     );
    // },
    title: __('acc.journal.title'),
    subscriptions: function (params, queryParams) {
        this.register('accChartAccount', Meteor.subscribe('accChartAccount'));
    },
    action: function (params, queryParams) {
        Layout.main('acc_journal');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: __('acc.journal.title'),
        parent: 'acc.home'
    }
});

// Insert
/*AccRoutes.route('/journalInsert', {
 name: 'acc.journalInsert',
 /!*subscriptions: function(params, queryParams) {
 this.register(
 'acc_Journal',
 Meteor.subscribe('acc_Journal')
 )
 , this.register(
 'accCloseChartAccount',
 Meteor.subscribe('accCloseChartAccount')
 ), this.register(
 'accDateEndOfProcess',
 Meteor.subscribe('accDateEndOfProcess')
 );
 },*!/
 subscriptions: function (params, queryParams) {
 this.register('accAccountType', Meteor.subscribe('accAccountType'));
 this.register('accChartAccount', Meteor.subscribe('accChartAccount'));
 },
 action: function (params, queryParams) {
 Layout.main('acc_journalInsert');
 },
 breadcrumb: {
 //params: ['id'],
 //queryParams: ['show', 'color'],
 title: 'Insert',
 parent: 'acc.journal'
 }
 });*/

/*
 // Update
 AccRoutes.route('/journalUpdate/:journalId', {
 name: 'acc.journalUpdate',
 /!*subscriptions: function(params, queryParams) {
 this.register(
 'acc_Journal',
 Meteor.subscribe('acc_Journal')
 ), this.register(
 'accCloseChartAccount',
 Meteor.subscribe('accCloseChartAccount')
 ), this.register(
 'accDateEndOfProcess',
 Meteor.subscribe('accDateEndOfProcess')
 );
 },*!/
 subscriptions: function (params, queryParams) {
 this.register('accAccountType', Meteor.subscribe('accAccountType'));
 this.register('accChartAccount', Meteor.subscribe('accChartAccount'));
 },
 action: function (params, queryParams) {
 Layout.main('acc_journalUpdate');
 },
 breadcrumb: {
 //params: ['id'],
 //queryParams: ['show', 'color'],
 title: 'Update',
 parent: 'acc.journal'
 }
 });
 */


// ConfigDep
import '../imports/ui/pages/configDep/configDep.js';
AccRoutes.route('/configDep', {
    name: 'acc.configDep',
    title: __('acc.configDep.title'),
    subscriptions: function (params, queryParams) {
        this.register('accConfigDep', Meteor.subscribe('accConfigDep'));
    },
    action: function (params, queryParams) {
        Layout.main('acc_configDep');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: __('acc.configDep.title'),
        icon: 'cart-plus',
        parent: 'acc.home'
    }
});

// ConfigDep
import '../imports/ui/pages/endOfProcess/endOfProcess.js';
AccRoutes.route('/endOfProcess', {
    name: 'acc.endOfProcess',
    title: __('acc.endOfProcess.title'),
    subscriptions: function (params, queryParams) {
        this.register('accDateEndOfProcess', Meteor.subscribe('accDateEndOfProcess'));
    },
    action: function (params, queryParams) {
        Layout.main('acc_dateEndOfProcess');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: __('acc.endOfProcess.title'),
        icon: 'cart-plus',
        parent: 'acc.home'
    }
});

// ExchangeNBC
import '../imports/ui/pages/exchangeNBC/exchangeNBC.js';
AccRoutes.route('/exchangeNBC', {
    name: 'acc.exchangeNBC',
    title: __('acc.exchangeNBC.title'),
    subscriptions: function (params, queryParams) {
        this.register('acc_exchangeNBC', Meteor.subscribe('acc_exchangeNBC'));
    },
    action: function (params, queryParams) {
        Layout.main('acc_exchangeNBC');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: __('acc.exchangeNBC.title'),
        icon: 'cart-plus',
        parent: 'acc.home'
    }
});

// fixed Asset Depreciation
import '../imports/ui/pages/fixAssetDep/fixAssetDep.js';
AccRoutes.route('/fixAssetDep', {
    name: 'acc.fixAssetDep',
    title: __('acc.fixAssetDep.title'),
    action: function (params, queryParams) {
        Layout.main('acc_fixAssetDep');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: __('acc.fixAssetDep.title'),
        icon: 'cart-plus',
        parent: 'acc.home'
    }
});

// fixed Asset Expense
import '../imports/ui/pages/fixAssetExpense/fixAssetExpense.js';
AccRoutes.route('/fixAssetExpense', {
    name: 'acc.fixAssetExpense',
    title: __('acc.fixAssetExpense.title'),
    action: function (params, queryParams) {
        Layout.main('acc_fixAssetExpense');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: __('acc.fixAssetExpense.title'),
        icon: 'cart-plus',
        parent: 'acc.home'
    }
});

// Map fixed Asset
import '../imports/ui/pages/mapFixAsset/mapFixAsset.js';
AccRoutes.route('/mapFixAsset', {
    name: 'acc.mapFixAsset',
    title: __('acc.mapFixAsset.title'),
    action: function (params, queryParams) {
        Layout.main('acc_mapFixAsset');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: __('acc.mapFixAsset.title'),
        icon: 'cart-plus',
        parent: 'acc.home'
    }
});

// Map Closing
import '../imports/ui/pages/mapClosing/mapClosing.js';
AccRoutes.route('/mapClosing', {
    name: 'acc.mapClosing',
    title: __('acc.mapClosing.title'),
    action: function (params, queryParams) {
        Layout.main('acc_mapClosing');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: __('acc.mapClosing.title'),
        icon: 'cart-plus',
        parent: 'acc.home'
    },
    subscriptions: function (params, queryParams) {
        this.register('accAccountType', Meteor.subscribe('accAccountType'));
        this.register('accChartAccount', Meteor.subscribe('accChartAccount'));
    }
});
// Map NBC Balance
import '../imports/ui/pages/mapNBC/mapNBCBalance.js';
AccRoutes.route('/mapNBCBalance', {
    name: 'acc.mapNBCBalance',
    title: __('acc.mapNBCBalance.title'),
    action: function (params, queryParams) {
        Layout.main('acc_mapNBCBalance');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: __('acc.mapNBCBalance.title'),
        icon: 'cart-plus',
        parent: 'acc.home'
    },
    subscriptions: function (params, queryParams) {
        this.register('accChartAccount', Meteor.subscribe('accChartAccount'));
    }
});

// Map NBC Income
import '../imports/ui/pages/mapNBC/mapNBCIncome.js';
AccRoutes.route('/mapNBCIncome', {
    name: 'acc.mapNBCIncome',
    title: __('acc.mapNBCIncome.title'),
    action: function (params, queryParams) {
        Layout.main('acc_mapNBCIncome');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: __('acc.mapNBCIncome.title'),
        icon: 'cart-plus',
        parent: 'acc.home'
    },
    subscriptions: function (params, queryParams) {
        this.register('accChartAccount', Meteor.subscribe('accChartAccount'));
    }
});


// Map NBC Balance KH
import '../imports/ui/pages/mapNBC/mapNBCBalanceKH';
AccRoutes.route('/mapNBCBalanceKH', {
    name: 'acc.mapNBCBalanceKH',
    title: __('acc.mapNBCBalance.title'),
    action: function (params, queryParams) {
        Layout.main('acc_mapNBCBalanceKH');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: __('acc.mapNBCBalance.title'),
        icon: 'cart-plus',
        parent: 'acc.home'
    },
    subscriptions: function (params, queryParams) {
        this.register('accChartAccount', Meteor.subscribe('accChartAccount'));
    }
});

// Map NBC Income KH
import '../imports/ui/pages/mapNBC/mapNBCIncomeKH.js';
AccRoutes.route('/mapNBCIncomeKH', {
    name: 'acc.mapNBCIncomeKH',
    title: __('acc.mapNBCIncome.title'),
    action: function (params, queryParams) {
        Layout.main('acc_mapNBCIncomeKH');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: __('acc.mapNBCIncome.title'),
        icon: 'cart-plus',
        parent: 'acc.home'
    },
    subscriptions: function (params, queryParams) {
        this.register('accChartAccount', Meteor.subscribe('accChartAccount'));
    }
});
