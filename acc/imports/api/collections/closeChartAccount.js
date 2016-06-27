
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';

/**
 * Collection
 *
 * @type {Mongo.Collection}
 */
export const CloseChartAccount = new Mongo.Collection("accCloseChartAccount");
/**
 * Schema
 *
 * @type {AccSchema}
 */
CloseChartAccount.schema = new SimpleSchema({
    closeChartAccountId: {
      type: String
    },
    code: {
        type: String,
        label: "Code",
        max: 7
    },
    name: {
        type: String,
        label: "Name"
    },
    value:{
        type: Number,
        defaultValue: 0,
        decimal: true
    },
    closeDate: {
        type: String,
        label: "Date"
    },
    currencyId: {
        type: String,
        label: "Currency"
    },
    branchId: {
        type: String,
        label: "Branch"
    },
    accountTypeId: {
        type: String,
        label: "Account Type"
    },
    level: {
        type: Number,
        label: "Level"
    },
    parentId: {
        type : String,
        label: "Parent",
        optional: true
    }
});

/**
 * Attach schema
 */

Meteor.startup(function () {
    CloseChartAccount.schema.i18n("acc.closeChartAccount.schema");
    CloseChartAccount.attachSchema(CloseChartAccount.schema);
});
