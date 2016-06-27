import {Customer} from '../../imports/api/collections/customer.js';

// Lib
import './_init.js';

Customer.permit(['insert'])
    .Acc_ifDataInsert()
    .allowInClientCode();
Customer.permit(['update'])
    .Acc_ifDataUpdate()
    .allowInClientCode();
Customer.permit(['remove'])
    .Acc_ifDataRemove()
    .allowInClientCode();
