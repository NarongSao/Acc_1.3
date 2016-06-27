Acc.Schema.BalanceSheetNBCReport=new SimpleSchema({
    date: {
        type: String,
        label: "Date As" ,
        defaultValue: function () {
            var currentDate = moment(ReactiveMethod.call("currentDate"), 'YYYY-MM-DD H:mm:ss').format('YYYY-MM-DD');
            return currentDate;
        }
    },
    branchId: {
        type: String,
        label: "Branch",
        max: 100,
        defaultValue: "All",
        autoform: {
            type: "select2",
            options: function () {
                return Acc.ListForReport.branch();
            }
        }
    },
    exchangeDate: {
        type: String,
        label: "Exchange Date",
        autoform: {
            type: "select2",
            options: function () {
                return Acc.ListForReport.exchangeNBC();
            }
        }

    }

})