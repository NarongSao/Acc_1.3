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


    action: function (params, queryParams) {
        Layout.main('acc_journal');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Journal',
        parent: 'acc.home'
    }
});

// Insert
AccRoutes.route('/journalInsert', {
    name: 'acc.journalInsert',
    /*subscriptions: function(params, queryParams) {
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
     },*/
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
});

// Update
AccRoutes.route('/journalUpdate/:journalId', {
    name: 'acc.journalUpdate',
    /*subscriptions: function(params, queryParams) {
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
     },*/
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

