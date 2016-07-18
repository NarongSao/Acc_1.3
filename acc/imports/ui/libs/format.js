Template.registerHelper('formatMoney',function(val){
    return numeral(val).format('0,0.00');
});
Template.registerHelper('formatPercentage',function(val){
    return numeral(val/100).format('0%');
});