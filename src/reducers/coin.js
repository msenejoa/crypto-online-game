//import * as AuthActions from '../actions/auth';
import * as Coin from '../actions/coin'

const initialState = {
  loaded: false,
  graphLoaded: false,
  error: false
};

export function coin(state = initialState, action) {
  switch (action.type) {
    case Coin.FETCH_COIN_FAILED:
      return {
        ...state,
        error: true
      }
    case Coin.FETCHING_COIN:
      return {
        ...state,
        loaded: false
      }
    case Coin.FETCH_COIN_SUCCESS:
      return {
        ...state,
        coin: action.data,
        loaded: true
      }
    case Coin.SETTING_TIMELINE:
      return {
        ...state,
        graphTimeline: action.data,
        graphLoaded: false
      }
    case Coin.FETCH_GRAPH_SUCCESS:
      return {
        ...state,
        graphData: action.data,
        graphLoaded: true
      }
    case Coin.FETCH_GRAPH_FAILED:
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}
