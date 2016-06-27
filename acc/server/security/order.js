import {Order} from '../../imports/api/collections/order.js';

// Lib
import './_init.js';

Order.permit(['insert'])
    .Acc_ifDataInsert()
    .allowInClientCode();
Order.permit(['update'])
    .Acc_ifDataUpdate()
    .allowInClientCode();
Order.permit(['remove'])
    .Acc_ifDataRemove()
    .allowInClientCode();
