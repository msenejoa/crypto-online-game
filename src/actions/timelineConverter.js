//API translate
var translate = function (time){
  switch (time){
    case  'year':
      return {
        agg: 2,
        limit: 182,
        time: 'histoday'
      }
      //month needs to be calculated
    case  'month':
      return {
        agg: 4,
        limit: 180,
        time: 'histohour'
      }
    case  'week':
      return {
        agg: 1,
        limit: 168,
        time: 'histohour'
      }
    case  'day':
      return {
        agg: 8,
        limit: 180,
        time: 'histominute'
      }
    case  'hour':
      return {
        agg: 1,
        limit: 60,
        time: 'histominute'
      }
    default:
      return {
        agg: 1,
        limit:60,
        time:'histominute'
      }
    }
};

module.exports = translate;

