import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {ReactiveVar} from 'meteor/reactive-var';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';

// Method
import {itemInfo} from '../../../common/methods/item-info.js';

// Item schema
let defaultPrice = new ReactiveVar(0);

export const ItemsSchema = new SimpleSchema({
    tmpId: {
        type: String,
        label: 'Name',
        autoform: {
            type: 'universe-select',
            afFieldInput: {
                uniPlaceholder: 'Select One',
                optionsMethod: 'simple.selectOptMethods.item'
            }
        }
    },
    tmpQty: {
        type: Number,
        label: 'Qty',
        min: 1,
        autoform: {
            type: 'inputmask',
            inputmaskOptions: function () {
                return inputmaskOptions.integer();
            }
        }
    },
    tmpPrice: {
        type: Number,
        label: 'Price',
        decimal: true,
        defaultValue: function () {
            let id = AutoForm.getFieldValue('tmpId');

            if (id) {
                itemInfo.callPromise({
                    _id: id
                }).then(function (result) {
                    defaultPrice.set(result.price);
                }).catch(function (err) {
                    console.log(err.message);
                });
            } else {
                defaultPrice.set(0);
            }

            return defaultPrice.get();
        },
        autoform: {
            type: 'inputmask',
            inputmaskOptions: function () {
                return inputmaskOptions.currency();
            }
        }
    },
    tmpAmount: {
        type: Number,
        label: 'Amount',
        decimal: true,
        autoform: {
            type: 'inputmask',
            inputmaskOptions: function () {
                return inputmaskOptions.currency();
            }
        }
    }
});
