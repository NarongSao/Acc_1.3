import {Meteor} from 'meteor/meteor';
import {_} from 'meteor/erasaur:meteor-lodash';

import {MapClosing} from '../../imports/api/collections/mapCLosing';
Meteor.startup(function() {
  if (MapClosing.find().count() == 0) {

    MapClosing.insert({
      chartAccountCompare: 'Equivalance Exchange Account',
    });
    MapClosing.insert({
      chartAccountCompare: 'Foreign Exchange Gain',
    });
    MapClosing.insert({
      chartAccountCompare: 'Loss on Foreign Exchange',
    });

    MapClosing.insert({
      chartAccountCompare: 'Retain Earning',
    });
  }
});
