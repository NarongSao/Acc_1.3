
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';


/**
 * Collection
 *
 * @type {Mongo.Collection}
 */
export const DateEndOfProcess = new Mongo.Collection("accDateEndOfProcess");
/**
 * Schema
 *
 * @type {AccSchema}
 */
DateEndOfProcess.schema = new SimpleSchema({
    closeDate: {
        type: String,
        label: "Date"
    },
    branchId:{
        type: String,
        label: "Branch"
    }
});

/**
 * Attach schema
 */

Meteor.startup(function () {
    DateEndOfProcess.schema.i18n("acc.dateEndOfProcess.schema");
    DateEndOfProcess.attachSchema(DateEndOfProcess.schema);
});
