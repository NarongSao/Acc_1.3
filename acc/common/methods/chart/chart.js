Meteor.methods({
    getNetIncome(param){
        var currentDate = new Date();

        var data={};
        /* var startDate = moment(moment(selector.year + "-01-01").toDate()).format("YYYY-MM-DD");
         var endDate = moment(moment(selector.year + "-12-31").add('days', 1).toDate()).format("YYYY-MM-DD");*/

        var selector = {};
        selector.year = param.year;
        var netIncome = Acc.Collection.NetInCome.find(selector).fetch();
        data = {
            labels: [],
            datasets: [{
                label: "My Dollar",
                fillColor: "teal",
                strokeColor: "teal",
                pointColor: "#ffff00",
                pointStrokeColor: "#e65100",
                pointHighlightFill: "#e65100",
                pointHighlightStroke: "#e65100",
                data: []
            }]
        };
        var arr = [];
        if (netIncome.count() > 0) {
            var i = 1;
            netIncome.forEach((obj)=> {
                if (param.currency == "usd") {
                    data.labels.push(getMonthName(i));
                    arr.push(obj.dollar);
                } else if (param.currency == "khr") {
                    data.labels.push(getMonthName(i));
                    arr.push(obj.riel);
                } else if (param.currency == "baht") {
                    data.labels.push(getMonthName(i));
                    arr.push(obj.baht);
                }
                i++;
            });
        }

        data.datasets[0].data = arr;

        return data;

    }
});

let getMonthName = (number) => {
    let month = '';
    switch (number) {
        case 1:
            month = 'មករា'
            break;
        case 2:
            month = 'កុម្ភៈ​'
            break;
        case 3:
            month = 'មិនា'
            break;
        case 4:
            month = 'មេសា'
            break;
        case 5:
            month = 'ឧសភា'
            break;
        case 6:
            month = 'មិថុនា'
            break;
        case 7:
            month = 'កក្កដា'
            break;
        case 8:
            month = 'សីហា'
            break;
        case 9:
            month = 'កញ្ញា'
            break;
        case 10:
            month = 'តុលា'
            break;
        case 11:
            month = 'វិច្ឆិកា'
            break;
        case 12:
            month = 'ធ្នូ'
            break;

    }
    return month;
}