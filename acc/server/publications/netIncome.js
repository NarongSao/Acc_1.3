
import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Collection
import {NetInCome} from '../../imports/api/collections/netIncome';
/**
 * Date End Of Process
 */
Meteor.publish('acc_netIncome', function () {
    if (this.userId) {
        this.unblock();
        return NetInCome.find();
    }
});

