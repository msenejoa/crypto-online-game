export const SEARCH_COIN = 'SEARCH_COIN';
export const FETCH_COINS_SUCCESS = 'FETCH_COINS_SUCCESS';
export const FETCH_FAILED = 'FETCH_FAILED';
export const FETCHING_COINS = 'FETCHING_COINS';


export function searchCoinId(data){
  return {
    type: SEARCH_COIN,
    data
  }
}

export function recieveCoins(data) {
  return {
    type: FETCH_COINS_SUCCESS,
    data
  };
}

export function fetchingCoins(){
  return{
  type: FETCHING_COINS
  }
}

export function fetchCoins() {
  return (dispatch) => {
      dispatch(fetchingCoins());
      getCoinListAPI()
      .then(response => response.json())
      .then(data => dispatch(recieveCoins(data)))
    .catch(error =>
        dispatch({ type: FETCH_FAILED, error })
    );
  };
}


export function getCoinListAPI(){
  return fetch("https://api.coinmarketcap.com/v1/ticker/?limit=200");
}
