//import * as AuthActions from '../actions/auth';
import * as CoinSearch from '../actions/coins'

const initialState = {
  name: '',
  coins: {},
  loaded: false
};

export function coins(state = initialState, action) {
  switch (action.type) {
    case CoinSearch.SEARCH_COIN:
      return {
        ...state,
        name: action.data
      }
    case CoinSearch.FETCH_FAILED:
      return {
        ...state,
        coins: action.data
      }
    case CoinSearch.FETCHING_COINS:
      return {
        ...state,
        loaded: false
      }
    case CoinSearch.FETCH_COINS_SUCCESS:
      return {
        ...state,
        coins: action.data,
        loaded: true
      }

    default:
      return state
  }
}
