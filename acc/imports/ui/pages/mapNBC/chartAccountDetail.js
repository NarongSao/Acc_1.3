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

// Lib
import {createNewAlertify} from '../../../../core/client/libs/create-new-alertify.js';
import {reactiveTableSettings} from '../../../../core/client/libs/reactive-table-settings.js';
import {renderTemplate} from '../../../../core/client/libs/render-template.js';
import {destroyAction} from '../../../../core/client/libs/destroy-action.js';
import {displaySuccess, displayError} from '../../../../core/client/libs/display-alert.js';
import {__} from '../../../../core/common/libs/tapi18n-callback-helper.js';

// Component
import '../../../../core/client/components/loading.js';
import '../../../../core/client/components/column-action.js';
import '../../../../core/client/components/form-footer.js';

// Collection
import {Customer} from '../../api/collections/customer.js';

// Tabular
import {CustomerTabular} from '../../../common/tabulars/customer.js';

// Page
import './customer.html';

// Declare template
// Declare template
var chartAccountDetailTPL = Template.acc_chartAccountDetail;

// Items state
/*itemsState = new ReactiveList();*/

/**
 * JournalDetail
 */
chartAccountDetailTPL.onRendered(function () {
    $('[name="tmpAccount"]').select2();
});
chartAccountDetailTPL.helpers({
    chartAccount: function () {
        var listChartAccount = [];
        Acc.Collection.ChartAccount.find({}, {sort: {code: 1}})
            .forEach(function (obj) {
                var accountType = Acc.Collection.AccountType.findOne(obj.accountTypeId).name;
                listChartAccount.push({
                    _id: obj._id,
                    name: obj.name,
                    code: Spacebars.SafeString(Acc.SpaceChar.space(obj.level * 6) + obj.code),
                    accountType: accountType
                });
            });
        return listChartAccount;
    },
    detail: function () {
        return itemsState.fetch();
    }
});

chartAccountDetailTPL.events({
    'click .addItem': function (e, t) {
        var detail = {};
        var index = 0;
        detail.account = (t.$('[name="tmpAccount"]').val()).split('&nbsp;')[(t.$('[name="tmpAccount"]').val()).split('&nbsp;').length - 1];

        if (itemsState.length() > 0) {
            // Check exist
            var findExist = itemsState.get(detail.account);
            // Update exist
            if (!_.isUndefined(findExist)) {
                return false;
            } else { // Cal index to add new
                index = itemsState.last().index + 1;

                detail.index = index;
                detail.indexAccount = 'transaction.' + index + '.account';
                itemsState.insert(detail.account, detail);
            }
        } else {
            detail.index = index;
            detail.indexAccount = 'transaction.' + index + '.account';
            itemsState.insert(detail.account, detail);
        }
    },
    'click .removeItem': function (e, t) {
        var self = this;
        itemsState.remove(self.account);
    }
});




