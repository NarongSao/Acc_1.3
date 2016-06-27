
import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Collection
import {MapNBCIncomeKH} from '../../imports/api/collections/mapNBCIncomeKH';
/**
 * Chart Account
 */
Meteor.publish('accMapNBCIncomeKH', function () {
    if (this.userId) {
        this.unblock();
        return MapNBCIncomeKH.find();
    }
});
