import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
 





const reducer = combineReducers({
    
     
});

let initiateState = {
    
};

const middleware = [thunk];

const store = createStore( 
    reducer,
    initiateState,
    composeWithDevTools(applyMiddleware(...middleware))
);



export default store;