import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {AutoForm} from 'meteor/aldeed:autoform';
import {sAlert} from 'meteor/juliancwirko:s-alert';
import 'meteor/theara:autoprint';
import {DateTimePicker} from 'meteor/tsega:bootstrap3-datetimepicker';


// Component
import '../../../../core/imports/ui/layouts/report/content.html';
import '../../../../core/imports/ui/layouts/report/sign-footer.html';
import '../../../../core/client/components/loading.js';
import '../../../../core/client/components/form-footer.js';

// Method
import {customerReport} from '../../../common/methods/reports/customer.js';

// Schema
import {CustomerSchema} from '../../api/collections/reports/customer.js';

// Page
import './customer.html';
// Declare template

var reportTpl = Template.acc_BalanceSheetNBCReport,
  generateTpl = Template.acc_BalanceSheetNBCReportGen;

reportTpl.onRendered(function() {
  var name = $('[name="date"]');
  DateTimePicker.date(name);

  // SEO
  SEO.set({
    title: 'Balance Sheet',
    description: 'Description for this page'
  });
});


generateTpl.onRendered(function() {
  // SEO
  SEO.set({
    title: 'Balance Sheet',
    description: 'Description for this page'
  });
});


generateTpl.helpers({
  options: function() {
    // font size = null (default), bg
    // paper = a4, a5, mini
    // orientation = portrait, landscape
    return {
      //fontSize: 'bg',
      paper: 'a4',
      orientation: 'portrait'
    };
  },
  data: function() {
    // Get query params
    //FlowRouter.watchPathChange();
    var q = FlowRouter.current().queryParams;

    Fetcher.setDefault('data',false);
    Fetcher.retrieve('data','acc_BalanceSheetNBC',q);

    return Fetcher.get('data');

   /* var callId = JSON.stringify(q);
    var call = Meteor.callAsync(callId, 'acc_BalanceSheetNBC', q);

    if (!call.ready()) {
      return false;
    }
    return call.result();*/
  }
});
