import 'meteor/matb33:collection-hooks';
import {idGenerator} from 'meteor/theara:id-generator';

// Collection
import {Closing} from '../../imports/api/collections/closing.js';

// Customer
var module = 'Acc';

Closing.before.insert(function (userId, doc) {

    var date = moment(doc.dateFrom).format("YYMM");
    var prefix = doc.branchId + "-" + date;
    doc._id = idGenerator.genWithPrefix(Closing, prefix, 6);

});

