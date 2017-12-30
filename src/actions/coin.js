import translate from './timelineConverter';

export const FETCH_COIN_SUCCESS = 'FETCH_COIN_SUCCESS';
export const FETCH_COIN_FAILED = 'FETCH_COIN_FAILED';
export const FETCHING_COIN = 'FETCHING_COIN';
export const FETCH_GRAPH_FAILED = 'FETCH_GRAPH_FAILED';
export const SETTING_TIMELINE = 'SETTING_TIMELINE';
export const FETCH_GRAPH_SUCCESS = 'FETCH_GRAPH_SUCCESS';



export function recieveCoin(data) {
  return {
    type: FETCH_COIN_SUCCESS,
    data
  };
}

export function recieveGraph(data){
  return {
  type: FETCH_GRAPH_SUCCESS,
  data
};
}

export function fetchingCoin(){
  return{
  type: FETCHING_COIN
  }
}

export function setTimeline(data){
  return{
  type: SETTING_TIMELINE,
  data
  }
}

export function graphFailuer(err){
  return{
    type: FETCH_GRAPH_FAILED,
    err
  }
}

{/*
export function fetchGraphData(sym, time){
  return(dispatch)=> {
    dispatch(setTimeline(time));
    getGraphFromAPI(sym, time)
    .then(response => response.json())
    .then(data => dispatch(recieveGraph(data)))
  .catch(error => { type: FETCH_COIN_FAILED, error }
    );
  };
}
*/}
export function fetchCoin(id) {
  return (dispatch) => {
      dispatch(fetchingCoin());
      getCoinFromAPI(id)
      .then(response => response.json())
      .then(data => dispatch(recieveCoin(data)))
    .catch(error =>
        dispatch({ type: FETCH_COIN_FAILED, error })
    );
  };
}

export function fetchGraphData(sym, time) {
  return (dispatch) => {
      dispatch(setTimeline(time));
      getGraphFromAPI(sym, time)
      .then(response => response.json())
      .then(data => {dispatch(recieveGraph(data.Data))})
    .catch(error =>
        dispatch({ type: FETCH_COIN_FAILED})
    );
  };
}


export function getCoinFromAPI(id){
  return fetch(("https://api.coinmarketcap.com/v1/ticker/" + id));
}

export function getGraphFromAPI(sym, time){

  let timeline = translate(time)
  console.log(timeline)
  return fetch(('https://min-api.cryptocompare.com/data/' + timeline.time + '?fsym=' + sym + '&tsym=USD&limit=' + timeline.limit + '&aggregate='+ timeline.agg + '&e=CCCAGG'));
}
