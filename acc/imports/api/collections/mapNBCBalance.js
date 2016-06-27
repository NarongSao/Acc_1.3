import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';

/**
 * Collection
 *
 * @type {Mongo.Collection}
 */
export const MapNBCBalance = new Mongo.Collection("accMapNBCBalance");
/**
 * Schema
 *
 * @type {AccSchema}
 */
MapNBCBalance.schema = new SimpleSchema({

    transaction: {
        type: Array,
        optional: true
    },
    'transaction.$': {
        type: Object
    },
    'transaction.$.account': {
        type: String,
        max: 200,
        label: "Account"
    },
    chartAccountNBCId: {
        type: String,
        label: "NBC Account",
        autoform: {
            type: "select2",
            options: function () {
                var selector={};
                selector.accountTypeNBC="Balance";
                return Acc.List.chartAccountNBC({accountTypeNBC:"Balance"});
            }
        }
    }
});
/**
 * Attach schema
 */
Meteor.startup(function () {
    MapNBCBalance.schema.i18n("acc.mapNBCBalance.schema");
    MapNBCBalance.attachSchema(MapNBCBalance.schema);
});