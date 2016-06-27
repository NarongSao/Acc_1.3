/**
 * List
 */
export const SpaceChar = {
    space: function (num) {
        var char = '';
        var i=1;
       for(i=1 ;i<=num;i++){
           char+='&nbsp;';
       }
        return char;
    }
};
