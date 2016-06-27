import {Template} from 'meteor/templating';
import {AutoForm} from 'meteor/aldeed:autoform';
import {Roles} from  'meteor/alanning:roles';
import {alertify} from 'meteor/ovcharik:alertifyjs';
import {sAlert} from 'meteor/juliancwirko:s-alert';
import {fa} from 'meteor/theara:fa-helpers';
import {lightbox} from 'meteor/theara:lightbox-helpers';
import {TAPi18n} from 'meteor/tap:i18n';
import {ReactiveTable} from 'meteor/aslagle:reactive-table';
import {moment} from 'meteor/momentjs:moment';
import {DateTimePicker} from 'meteor/tsega:bootstrap3-datetimepicker';

import {ReactiveList} from 'meteor/theara:reactive-list';


// Lib
import {createNewAlertify} from '../../../../../core/client/libs/create-new-alertify.js';
import {reactiveTableSettings} from '../../../../../core/client/libs/reactive-table-settings.js';
import {renderTemplate} from '../../../../../core/client/libs/render-template.js';
import {destroyAction} from '../../../../../core/client/libs/destroy-action.js';
import {displaySuccess, displayError} from '../../../../../core/client/libs/display-alert.js';
import {__} from '../../../../../core/common/libs/tapi18n-callback-helper.js';



// Component
import '../../../../../core/client/components/loading.js';
import '../../../../../core/client/components/column-action.js';
import '../../../../../core/client/components/form-footer.js';

// Collection
import {ChartAccount} from '../../../api/collections/chartAccount';
import {AccountType} from '../../../api/collections/accountType';


//Method
import {SpaceChar} from '../../../../common/configs/space';


// Page
import './journalDetail.html';

// Declare template

// Declare template
var journalDetailTpl = Template.acc_journalDetail;

// Items state
var itemsState = new ReactiveList();
var state = new ReactiveObj({
    dr: 0,
    cr: 0,
    cssClassForAddMore: 'disabled'
});


/**
 * JournalDetail
 */
journalDetailTpl.onRendered(function () {
    $('.tmpAccount').select2();
    // $.fn.select2.amd.require(['select2/compat/matcher'], function (oldMatcher) {
    /*$.fn.select2.amd.require(['select2/compat/matcher'], function (oldMatcher) {
        $(".tmpAccount").select2({
            matcher: oldMatcher(matchStart)
        })
    });*/

    $('.tmpAccount').select2('val','');
    // $('.tmpAccount').val('');

});


journalDetailTpl.helpers({
    cssClassForAddMore: function () {
        var dr = state.get('dr');
        var cr = state.get('cr');
        if (dr > 0 || cr > 0 && (dr != "" || cr != "")) {
            state.set('cssClassForAddMore', '');
        } else {
            state.set('cssClassForAddMore', 'disabled');
        }
        return state.get('cssClassForAddMore');
    },
    chartAccount: function () {
        var listChartAccount = [];
        ChartAccount.find({}, {sort: {code: 1}})
            .forEach(function (obj) {
                var accountType = AccountType.findOne(obj.accountTypeId).name;
                listChartAccount.push({
                    _id: obj._id,
                    name: obj.name,
                    code: Spacebars.SafeString(SpaceChar.space(obj.level * 6) + obj.code),
                    accountType: accountType
                });
            });
        return listChartAccount;
    },
    journals: function () {
        debugger;
        return itemsState.fetch();
    },
    totalDr: function () {
        var totalDrVal = 0;
        _.each(itemsState.fetch(), function (o) {
            totalDrVal += formatToNumber(o.dr);
        });
        var totalDr = formatNumberToSeperate(math.round(totalDrVal, 2).toString());
        return totalDr;

    },
    totalCr: function () {
        var totalCrVal = 0;
        _.each(itemsState.fetch(), function (o) {
            totalCrVal += formatToNumber(o.cr);
        });
        var totalCr = formatNumberToSeperate(math.round(totalCrVal, 2).toString());
        return totalCr;
    },
    options: function () {
        var list=[];
        list.push({
            label: "test",
            value: "test"
        })
        return list;
    }
});

journalDetailTpl.events({
    'click [name="tmpDr"]': function (e, t) {
        var val = $(e.currentTarget).val();
        if (val == "0") {
            $(e.currentTarget).val("");
        }
    },
    'click [name="tmpCr"]': function (e, t) {
        var val = $(e.currentTarget).val();
        if (val == "0") {
            $(e.currentTarget).val("");
        }
    },
    'keyup [name="tmpDr"]': function (e, t) {
        var elm = $(e.currentTarget);
        elm.val(formatNumberToSeperate(elm.val()));
        var dr = formatToNumber(t.$('[name="tmpDr"]').val());
        $('[name="tmpCr"]').val("0");
        state.set('dr', dr);

    },
    'keyup [name="tmpCr"]': function (e, t) {
        var elm = $(e.currentTarget);
        elm.val(formatNumberToSeperate(elm.val()));
        var cr = formatToNumber(t.$('[name="tmpCr"]').val());
        $('[name="tmpDr"]').val("0");
        state.set('cr', cr);
    },
    'click .addItem': function (e, t) {
        debugger;
        var journal = {};
        var index = 0;
        journal.account = (t.$('[name="tmpAccount"]').val()).split('&nbsp;')[(t.$('[name="tmpAccount"]').val()).split('&nbsp;').length - 1];
        journal.dr = t.$('[name="tmpDr"]').val();
        journal.cr = t.$('[name="tmpCr"]').val();

        if (itemsState.length() > 0) {
            // Check exist
            var findExist = itemsState.get(journal.account);
            // Update exist
            if (!_.isUndefined(findExist)) {

                journal.dr = math.round(formatToNumber(journal.dr) + (formatToNumber(findExist.dr) - formatToNumber(journal.cr)), 2);
                journal.dr = journal.dr > 0 ? journal.dr : 0;
                journal.dr = formatNumberToSeperate(journal.dr);

                journal.cr = math.round(formatToNumber(journal.cr) + (formatToNumber(findExist.cr) - formatToNumber(journal.dr)), 2);
                journal.cr = journal.cr > 0 ? journal.cr : 0;
                journal.cr = formatNumberToSeperate(journal.cr);
                itemsState.update(journal.account, journal);
            } else { // Cal index to add new
                index = itemsState.last().index + 1;

                journal.index = index;
                journal.indexAccount = 'transaction.' + index + '.account';
                journal.indexDr = 'transaction.' + index + '.dr';
                journal.indexCr = 'transaction.' + index + '.cr';

                itemsState.insert(journal.account, journal);
            }
        } else {
            journal.index = index;
            journal.indexAccount = 'transaction.' + index + '.account';
            journal.indexDr = 'transaction.' + index + '.dr';
            journal.indexCr = 'transaction.' + index + '.cr';

            itemsState.insert(journal.account, journal);
        }
        $('#tmpAccount').select2('val', '');
        $('[name="tmpDr"]').val("");
        $('[name="tmpCr"]').val("");

        state.set('dr', 0);
        state.set('cr', 0);
        Meteor.defer(function () {
            disableSubmit();
        });

    },
    'click .removeItem': function (e, t) {
        var self = this;
        itemsState.remove(self.account);
        Meteor.defer(function () {
            disableSubmit();
        });
    },
    'keypress .dr,.cr,.tmpDr,.tmpCr': function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ($(evt.currentTarget).val().indexOf('.') != -1) {
            if (charCode == 46) {
                return false;
            }
        }
        return !(charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57));
    }
    ,
    'keyup .dr': function (e, t) {
        var elm = $(e.currentTarget);
        elm.val(formatNumberToSeperate(elm.val()));
        if (elm.val(formatNumberToSeperate(elm.val())) != "0" || elm.val(formatNumberToSeperate(elm.val())) != "") {
            elm.parents('div.listJournal').find('.cr').val('0');
        }
    },
    'keyup .cr': function (e, t) {
        var elm = $(e.currentTarget);
        elm.val(formatNumberToSeperate(elm.val()));
        if (elm.val(formatNumberToSeperate(elm.val())) != "0" || elm.val(formatNumberToSeperate(elm.val())) != "") {
            elm.parents('div.listJournal').find('.dr').val('0');
        }
    },
    'blur .cr': function (e, t) {
        var elm = $(e.currentTarget);

        var name = elm.parents('div.listJournal').find('.account').val();

        var dr = elm.parents('div.listJournal').find('.dr').val();
        var cr = elm.parents('div.listJournal').find('.cr').val();
        var getItem = itemsState.get(name);
        var journal = {};
        journal.dr = dr;
        journal.cr = cr;

        itemsState.update(getItem.account, journal);

        Meteor.defer(function () {
            disableSubmit();
        });
    },
    'blur .dr': function (e, t) {
        var elm = $(e.currentTarget);

        var name = elm.parents('div.listJournal').find('.account').val();

        var cr = elm.parents('div.listJournal').find('.cr').val();
        var dr = elm.parents('div.listJournal').find('.dr').val();

        var getItem = itemsState.get(name);
        var journal = {};
        journal.dr = dr;
        journal.cr = cr;

        itemsState.update(getItem.account, journal);

        Meteor.defer(function () {
            disableSubmit();
        });
    },
    'change #tmpAccount': function(e,t){

        var dr=formatToNumber($('#total-debit').val());
        var cr=formatToNumber($('#total-credit').val());

        var bal=dr-cr;
        if(bal>0){
            $('.tmpDr').val("0");
            $('.tmpCr').val(formatNumberToSeperate(Math.abs(math.round(bal,2))));
            state.set('dr', 0);
            state.set('cr', Math.abs(bal));

        }else{
            $('.tmpDr').val(formatNumberToSeperate(Math.abs(math.round(bal))));
            $('.tmpCr').val("0");

            state.set('dr', Math.abs(bal));
            state.set('cr', 0);
        };

    }
});
var formatNumberToSeperate = function (val) {
        val = val.toString();
        var parts = (val.replace(/,/g, "")).toString().split(".");
        return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] == "" || parts[1] != null ? "." + parts[1] : "");
    },
    formatToNumber = function (val) {
        var regex = /^\d+(\.\d{1,2})?$/i;
        if (!regex.test(val)) {
            val = val.replace(/,/g, "");
        }
        return parseFloat(val);
    },
    disableSubmit = function () {
        var debitcheck = $('#total-debit').val();
        var creditcheck = $('#total-credit').val();
        if (creditcheck != debitcheck || (debitcheck == 0 && creditcheck == 0)) {
            $('.save-journal').attr('disabled', true);
        } else {
            $('.save-journal').attr('disabled', false);
        }
    };


function matchStart (term, text) {
    if (text.toUpperCase().indexOf(term.toUpperCase()) == 0) {
        return true;
    }

    return false;
}



