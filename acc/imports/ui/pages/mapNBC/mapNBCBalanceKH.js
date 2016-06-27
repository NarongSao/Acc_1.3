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
var indexTpl = Template.acc_mapNBCBalanceKH,
  insertTpl = Template.acc_mapNBCBalanceKHInsert,
  updateTpl = Template.acc_mapNBCBalanceKHUpdate;

/**
 * Index
 */

indexTpl.onRendered(function() {
  /* Create new alertify */
  createNewAlertify("mapBalanceNBC");
  // SEO
  SEO.set({
    title: 'Map Chart Account',
    description: 'Description for this page'
  });
});


indexTpl.events({

  'click .insert': function(e, t) {

    itemsState.clear();

    alertify.mapBalanceNBC(fa("plus", "Map NBC Balance"),renderTemplate(insertTpl));
    /*.maximize();*/

  },
  'click .update': function(e, t) {
    itemsState.clear();
    var data = Acc.Collection.MapNBCBalanceKH.findOne(this._id);
    var doc = Acc.Collection.ChartAccountNBCKH.findOne(data.chartAccountNBCId)
    data.name = doc.code + " | " + doc.name;
    if (!_.isUndefined(data)) {
      _.each(data.transaction, function(journal, index) {
        journal.indexAccount = 'transaction.' + index + '.account';
        itemsState.insert(journal.account, journal);
      });
    }
    alertify.mapBalanceNBC(fa("pencil", "Map NBC Balance"),renderTemplate(updateTpl, data));

  },
  'click .remove': function(e, t) {

    var id = this._id;

    alertify.confirm("Are you sure to delete [" + id + "]?")
      .set({
        onok: function(closeEvent) {

          Acc.Collection.MapNBCBalanceKH.remove(id, function(error) {
            if (error) {
              alertify.error(error.message);
            } else {
              alertify.success("Success");
            }
          });
        },
        title: fa("remove", "Map NBC Balance")
      });

  }
});

/**
 * Hook
 */
AutoForm.hooks({
  // Customer
  acc_mapNBCBalanceKHInsert: {
    before: {
      insert: function(doc) {
        doc.branchId = Session.get("currentBranch");
        return doc;
      }
    },
    onSuccess: function(formType, result) {
      alertify.success('Success');
      itemsState.clear();
    },
    onError: function(formType, error) {
      alertify.error(error.message);
    }
  },
  acc_mapNBCBalanceKHUpdate: {
    onSuccess: function(formType, result) {
      alertify.mapBalanceNBC().close();
      alertify.success('Success');
    },
    onError: function(formType, error) {
      alertify.error(error.message);
    }
  }
});
