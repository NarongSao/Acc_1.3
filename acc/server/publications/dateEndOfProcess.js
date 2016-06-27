import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Collection
import {DateEndOfProcess} from '../../imports/api/collections/dateEndOfProcess';
/**
 * Date End Of Process
 */
Meteor.publish('accDateEndOfProcess', function () {
    if (this.userId) {
        this.unblock();
        return DateEndOfProcess.find();
    }
});

