import {Meteor} from  'meteor/meteor';
import {_} from 'meteor/erasaur:meteor-lodash';

// Collection
import {Branch} from '../../../../core/imports/api/collections/branch.js';
import {Setting} from '../../../../core/imports/api/collections/setting';
import {ChartAccount} from '../../api/collections/chartAccount.js';
import {AccountType} from '../../api/collections/accountType';
import {ChartAccountNBC} from '../../api/collections/chartAccountNBC.js';
import {ChartAccountNBCKH} from '../../api/collections/chartAccountNBCKH.js';
import {Currency} from '../../api/collections/currency.js';


import {SpaceChar} from '../../../common/configs/space';

// Collection Core

export const SelectOpts = {
    branch: function (selectOne = true) {
        let list = [];
        if (selectOne) {
            list.push({label: "(Select One)", value: ""});
        }

        Branch.find()
            .forEach(function (obj) {
                list.push({label: obj.enName, value: obj._id});
            });

        return list;
    },
    gender: function () {
        let list = [
            {label: "(Select One)", value: ""},
            {label: "Male", value: "M"},
            {label: "Female", value: "F"}
        ];

        return list;
    },
    gender: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "(Select One)", value: ""});
        }
        list.push({label: 'Male', value: 'M'});
        list.push({label: 'Female', value: 'F'});

        return list;
    },
  
    depType: function () {
        var typeArr = [];
        typeArr.push({
            value: '',
            label: "(Select One)"
        }, {
            value: '01: Straight Line',
            label: "01: Straight Line"
        }, {
            value: '02: Sum Of Year Digits',
            label: "02: Sum Of Year Digits"
        }, {
            value: '03: Declining Balance',
            label: "03: Declining Balance"
        })
        return typeArr;
    }, fixAssetChatAccount: function () {
        Meteor.subscribe('acc.chartAccount');
        var listChartAccount = [];
        ChartAccount.find({accountTypeId: '11'}, {sort: {code: 1}})
            .forEach(function (obj) {
                listChartAccount.push({
                    label: Spacebars.SafeString(SpaceChar.space(obj.level * 6) + obj.code + " | " + obj.name),
                    value:  obj.code + " | " + obj.name
                })
            });
        return listChartAccount;
    }, fixAssetList: function () {
        Meteor.subscribe('acc.chartAccount');

        var listChartAccount = [{label: "(Select One)", value: ""}];
        ChartAccount.find({accountTypeId: '11'}, {sort: {code: 1}})
            .forEach(function (obj) {
                listChartAccount.push({
                    label: Spacebars.SafeString(SpaceChar.space(obj.level * 6) + obj.code + " | " + obj.name),
                    value: obj._id
                })
            });
        return listChartAccount;
    },fixAssetExpenseList: function () {
        Meteor.subscribe('acc.chartAccount');

        var listChartAccount = [{label: "(Select One)", value: ""}];
        ChartAccount.find({accountTypeId: '50'}, {sort: {code: 1}})
            .forEach(function (obj) {
                listChartAccount.push({
                    label: Spacebars.SafeString(SpaceChar.space(obj.level * 6) + obj.code + " | " + obj.name),
                    value:  obj._id
                })
            });
        return listChartAccount;
    },
    parent: function (selector) {
        Meteor.subscribe('acc.chartAccount');
        Meteor.subscribe('acc.accountType');

        var selector = _.isUndefined(selector) ? {} : selector;
        var list = [{label: "(Select One)", value: ""}];
        ChartAccount.find(selector, {sort: {code: 1}})
            .forEach(function (obj) {
                var accountType = AccountType.findOne(obj.accountTypeId).name;
                list.push({
                    label: Spacebars.SafeString(SpaceChar.space(obj.level * 6) + obj.code + " | " + obj.name + "--" + accountType),
                    value: obj._id
                })
            });
        return list;
    },
    accountType: function (selector) {
        Meteor.subscribe('acc.accountType');
        var selector = _.isUndefined(selector) ? {} : selector;
        var list = [{label: "(Select One)", value: ""}];
        AccountType.find(selector)
            .forEach(function (obj) {
                list.push({label: obj._id + " | " + obj.name, value: obj._id})
            });
        return list;
        //}
    },
    chartAccountId: function (selector) {
        Meteor.subscribe('acc.chartAccount');

        var selector = _.isUndefined(selector) ? {} : selector;
        var list = [{label: "(Select One)", value: ""}];
        ChartAccount.find(selector, {sort: {code: 1}})
            .forEach(function (obj) {
                var accountType = AccountType.findOne(obj.accountTypeId).name;
                list.push({
                    label: Spacebars.SafeString(SpaceChar.space(obj.level * 6) + obj.code + " | " + obj.name + " | " + accountType),
                    value: obj._id
                })
            });
        return list;
    }, chartAccountNBC: function (selector) {
        Meteor.subscribe('acc.chartAccountNBC');

        var selector = _.isUndefined(selector) ? {} : selector;
        var list = [{label: "(Select One)", value: ""}];
        ChartAccountNBC.find(selector, {sort: {code: 1}})
            .forEach(function (obj) {
                list.push({
                    label: obj.code + " | " + obj.name,
                    value: obj._id
                })
            });
        return list;
    }, chartAccountNBCKH: function (selector) {
        Meteor.subscribe('acc.chartAccountNBCKH');

        var selector = _.isUndefined(selector) ? {} : selector;
        var list = [{label: "(Select One)", value: ""}];
        ChartAccountNBCKH.find(selector, {sort: {code: 1}})
            .forEach(function (obj) {
                list.push({
                    label: obj.code + " | " + obj.name,
                    value: obj._id
                })
            });
        return list;
    },
    currency: function (selectAll) {
        Meteor.subscribe('acc.currency');

        var list = [];
        if (!_.isEqual(selectAll, false)) {
            list.push({label: "(Select All)", value: "All"});
        }
        if (_.isEqual(selectAll, false)) {
            list.push({label: "(Select One)", value: ""});
        }
        Currency.find()
            .forEach(function (obj) {
                list.push({label: obj._id, value: obj._id});
            });
        return list;
    }
    ,
    currencyClosing: function () {
        Meteor.subscribe('acc.currency');
        Meteor.subscribe('core.setting');

        var list = [];
        list.push({label: "(Select One)", value: ""});
        var currencyBase = Setting.findOne().baseCurrency;
        Currency.find({_id: {$not: currencyBase}})
            .forEach(function (obj) {
                list.push({label: obj._id, value: obj._id});
            });
        return list;
    }, branchForUser: function (selectOne, userId) {
        Meteor.subscribe('core.branch');

        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "All", value: ""});
        }
        var userId = _.isUndefined(userId) ? Meteor.userId() : userId;
        Meteor.users.findOne(userId).rolesBranch
            .forEach(function (branch) {
                var label = Branch.findOne(branch).enName;
                list.push({label: label, value: branch});
            });
        return list;
    },
    backupAndRestoreTypes: function () {
        return [
            {value: '', label: 'Select One'},
            {value: 'Setting', label: 'Setting'},
            {value: 'Default', label: 'Default'},
            {value: 'Setting,Default', label: 'Setting And Default'}
        ];
    }
};