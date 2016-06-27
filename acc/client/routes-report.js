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
import '../../core/imports/ui/layouts/report/index.html';

// Group
let SimplePOSRoutes = FlowRouter.group({
    prefix: '/acc',
    title: "Simple POS",
    titlePrefix: 'Simple POS > ',
    subscriptions: function (params, queryParams) {
//     this.register('files', Meteor.subscribe('files'));
    }
});

// Customer list
import '../imports/ui/reports/customer.js';
SimplePOSRoutes.route('/customer-report', {
    name: 'acc.customerReport',
    title: __('acc.customerReport.title'),
    action: function (params, queryParams) {
        Layout.main('Acc_customerReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: __('acc.customerReport.title'),
        icon: 'users',
        parent: 'acc.home'
    }
});

SimplePOSRoutes.route('/customer-report-gen', {
    name: 'acc.customerReportGen',
    title: __('acc.customerReport.title'),
    action: function (params, queryParams) {
        Layout.report('Acc_customerReportGen');
    }
});

// Order
import '../imports/ui/reports/order.js';
SimplePOSRoutes.route('/order-report', {
    name: 'acc.orderReport',
    title: __('acc.orderReport.title'),
    action: function (params, queryParams) {
        Layout.main('Acc_orderReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: __('acc.orderReport.title'),
        icon: 'cart-plus',
        parent: 'acc.home'
    }
});

SimplePOSRoutes.route('/order-report-gen', {
    name: 'acc.orderReportGen',
    title: __('acc.orderReport.title'),
    action: function (params, queryParams) {
        Layout.report('Acc_orderReportGen');
    }
});
