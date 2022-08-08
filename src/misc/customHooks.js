import { useReducer, useEffect, useState } from "react";
import { apiGet } from "./config";


//we r creating a hook named usePersistedReducer For store the id of show in the local storage of  browser.
const showsReducer = (prevState, action) => {
    switch (action.type) {
        case 'ADD': {
            return [...prevState, action.showId]
        }
        case 'REMOVE': {
            return prevState.filter((showId) => (showId !== action.showId));
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

export function useLastsearched(key = 'LastSearch') {
    const [input, setInput] = useState(() => {
        const persisted = sessionStorage.getItem(key)
        return persisted ? JSON.parse(persisted) : '';
    });
    //newState value will be the value of state after updation by uper code.
    const setPersistedInput = newState => {
        setInput(newState);
        sessionStorage.setItem(key, JSON.stringify(newState));
    };

    return [input, setPersistedInput];
};

const reducer = (prevState, action) => {
    switch (action.type) {
        case 'FETCH_SUCESS': {
            return { isLoading: false, show: action.show, error: null }
        }
        case 'FETCH_FAILED': {
            return {
                ...prevState,
                isLoading: false, error: action.error
            }
        }
        default: return prevState;
    }
}

export function useShow(showId) {
    const [state, dispatch] = useReducer(reducer, {
        show: null,
        isLoading: true,
        error: null
    });
    // const [show, setShow] = useState(null);
    // const [isLoading, setIsLoading] = useState(true);
    // const [error, setError] = useState(null);

    useEffect(
        () => {
            let isMounted = 'true';
            apiGet(`/shows/${showId}?embed[]=seasons&embed7[]=cast`).then(results => {
                if (isMounted) {
                    dispatch({ type: 'FETCH_SUCESS', show: results });
                    //    setShow(results);
                    // setIsLoading(false); 
                }
            }).catch(
                err => {
                    dispatch({ type: 'FETCH_FAILED', show: err.message })
                    // setError(err.message);
                    // setIsLoading(false);
                })
            return () => { isMounted = false; }
        }, [showId])
    return state;
}