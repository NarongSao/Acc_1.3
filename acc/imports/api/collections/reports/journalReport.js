Acc.Schema.JournalReport = new SimpleSchema({
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
  currencyId: {
    type: String,
    label: "Currency",
    autoform: {
      type: "select2",
      defaultValue: "All",
      options: function() {
        return Acc.List.currency();
      }
    }
  },
  branchId: {
    type: String,
    label: "Branch",
    max: 100,
    defaultValue: "All",
    autoform: {
      type: "select2",
      options: function() {
        return Acc.ListForReport.branch();
      }
    }
  },
  accountType: {
    type: [String],
    label: "Account Type",
    autoform: {
      type: "select-multiple",
      options: function() {
        return Acc.ListForReport.accountType();
      }
    }
  },
  chartAccount: {
    type: String,
    label: "Chart Account",
    autoform: {
      type: "select2",
      defaultValue: "All",
      options: function() {
        return Acc.ListForReport.chartAccountId();
      }
    }

  }

})
