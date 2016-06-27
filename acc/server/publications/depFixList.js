import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Collection
import {DepExpList} from '../../imports/api/collections/depExpList';
/**
 * Date End Of Process
 */
Meteor.publish('accDepFixList', function () {
    if (this.userId) {
        this.unblock();
        return DepExpList.find();
    }
});

