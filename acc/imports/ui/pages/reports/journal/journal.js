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
var reportTpl = Template.acc_journalReport,
    generateTpl = Template.acc_journalReportGen;

reportTpl.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.dateRange(name);

    // SEO
    SEO.set({
        title: 'Journal',
        description: 'Description for this page'
    });
});
reportTpl.events({
    'change [name="accountType"]':function(e){
        Session.set('accountTypeIdSession',$(e.currentTarget).val());
    }
});

//Event
generateTpl.events({
    'dblclick .journalRow': function (e, t) {
        debugger;
        var self = this;
        itemsState.clear();
        var selectorGetLastDate = {};
        var branchId = Session.get("currentBranch");
        selectorGetLastDate.branchId = branchId;

        var selector = {};
        selector._id = self._id;
        Meteor.call('getDateEndOfProcess', selectorGetLastDate, function (err, lastDate) {
            Meteor.call('getJournal', selector, function (err, data) {
                if (data) {
                    if (lastDate != null) {
                        if (moment(lastDate.closeDate).toDate() < data.journalDate) {
                            if (!_.isUndefined(data)) {
                                _.each(data.transaction, function (journal, index) {
                                    journal.indexAccount = 'transaction.' + index + '.account';
                                    journal.indexDr = 'transaction.' + index + '.dr';
                                    journal.indexCr = 'transaction.' + index + '.cr';

                                    journal.dr = formatNumberToSeperate(journal.dr);
                                    journal.cr = formatNumberToSeperate(journal.cr);

                                    itemsState.insert(journal.account, journal);
                                });
                            }
                            FlowRouter.go('/acc/journalUpdate/' + data._id);

                        } else {
                            alertify.error("Can not update, you already end of process!!!");
                        }

                    } else {
                        if (!_.isUndefined(data)) {
                            _.each(data.transaction, function (journal, index) {
                                journal.indexAccount = 'transaction.' + index + '.account';
                                journal.indexDr = 'transaction.' + index + '.dr';
                                journal.indexCr = 'transaction.' + index + '.cr';

                                journal.dr = formatNumberToSeperate(journal.dr);
                                journal.cr = formatNumberToSeperate(journal.cr);

                                itemsState.insert(journal.account, journal);
                            });
                        }
                        FlowRouter.go('/acc/journalUpdate/' + data._id);
                    }
                }
            });
        });
    }
});


generateTpl.onRendered(function(){
    // SEO
    SEO.set({
        title: 'Journal Report',
        description: 'Description for this page'
    });
});


generateTpl.helpers({
    options: function () {
        // font size = null (default), bg
        // paper = a4, a5, mini
        // orientation = portrait, landscape
        return {
            //fontSize: 'bg',
            paper: 'a4',
            orientation: 'portrait'
        };
    },
    data: function () {
        // Get query params
        //FlowRouter.watchPathChange();
        var q = FlowRouter.current().queryParams;

        Fetcher.setDefault('data',false);
        Fetcher.retrieve('data','acc_journalReport',q);

        return Fetcher.get('data');
        /*var callId = JSON.stringify(q);
        var call = Meteor.callAsync(callId, 'acc_journalReport', q);

        if (!call.ready()) {
            return false;
        }
        return call.result();*/
    }
});


var formatNumberToSeperate = function (val) {
    val = val.toString();
    var parts = (val.replace(/,/g, "")).toString().split(".");
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] == "" || parts[1] != null ? "." + parts[1] : "");
}, formatToNumber = function (val) {
    var regex = /^\d+(\.\d{1,2})?$/i;
    if (!regex.test(val)) {
        val = val.replace(/,/g, "");
    }
    return parseFloat(val);
};



