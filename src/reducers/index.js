import { auth } from './auth'
import { coins } from './coins'
import { coin } from './coin'

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers ({
  auth
})

const reducer = combineReducers({
  auth,
  coins,
  coin,
  routing: routerReducer
});


export default reducer
//export { auth } from './auth'
