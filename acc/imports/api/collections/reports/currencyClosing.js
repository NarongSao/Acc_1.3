Acc.Schema.CurrencyClosing = new SimpleSchema({
  branchId: {
    type: String,
    label: "Branch",
    max: 100,
    defaultValue: "All",
    autoform: {
      type: "select2",
      options: function() {
        return Acc.ListForReport.branchByClosing();
      }
    }
  },
  currencyId: {
    type: String,
    label: "Currency",
    autoform: {
      type: "select2",
      defaultValue: "",
      options: function() {
        return Acc.List.currencyClosing();
      }
    }
  },
  date: {
    type: String,
    label: "Date",
    defaultValue: function() {
      var today = new Date();
      var year = today.getFullYear();
      var month = today.getMonth() + 1;
      if (month < 10) {
        month = '0' + month;
      }

      var lastDayOfMonth = (new Date(today.getFullYear(), today.getMonth() +
        1, 1)).getUTCDate();

      var currentDate = year + '-' + month + '-' + "01" + " To " + year +
        '-' + month + '-' + lastDayOfMonth;
      return currentDate;
    }
  },
  exchangeDate: {
    type: String,
    label: "Exchange Date",
    autoform: {
      type: "select2",
      options: function() {
        return Acc.ListForReport.exchange();
      }
    }

  }
})
