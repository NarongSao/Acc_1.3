
import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Collection
import {CloseChartAccount} from '../../imports/api/collections/closeChartAccount';
/**
 * Close Chart Account
 */
Meteor.publish('accCloseChartAccount', function () {
    if (this.userId) {
        this.unblock();
        return CloseChartAccount.find();
    }
});
