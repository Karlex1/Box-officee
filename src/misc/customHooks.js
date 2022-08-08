import { useReducer, useEffect } from "react";


//we r creating a hook named usePersistedReducer For store the id of show in the local storage of  browser.
const showsReducer = (prevState, action) => { 
    switch (action.type) {
        case 'ADD': {
            return [...prevState,action.showId]
        }
        case 'REMOVE': {
            return prevState.filter((showId) => ( showId !== action.showId ));
            }
        default: return prevState;
    };
};
function usePersistedReducer(reducer, initialState, key) {
    const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
        const persisted = localStorage.getItem(key)
        return persisted ? JSON.parse(persisted) : initial;
    })
    //we use JSON.parse() for change the string (we store data in localStoraage in string)in object.s
    //WE use the useEffect  to synchronise our state i.e; every time whenever the state changes the useEffect will run and w can say it used for write the stae in localStorage.

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [state, key]);
    return [state, dispatch];
}

export function useShows(key = 'shows') {
    return usePersistedReducer(showsReducer, [], key);
 };