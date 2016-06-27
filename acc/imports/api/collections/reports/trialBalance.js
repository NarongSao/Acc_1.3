Acc.Schema.TrialBalanceReport = new SimpleSchema({
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
    currencyId: {
        type: String,
        label: "Currency",
        autoform: {
            type: "select2",
            defaultValue: "All",
            options: function () {
                return Acc.List.currency();
            }
        }
    },
    date: {
        type: String,
        label: "Date As",
        defaultValue: function () {
            var currentDate = moment(ReactiveMethod.call("currentDate"), 'YYYY-MM-DD H:mm:ss').format('YYYY-MM-DD');
            return currentDate;
        }
    },
    exchangeDate: {
        type: String,
        label: "Exchange Date",
        autoform: {
            type: "select2",
            options: function () {
                return Acc.ListForReport.exchange();
            }
        }

    }
})
