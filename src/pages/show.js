import React, { useEffect,useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';

const initialstate = {
    show: null,
    isLoading: true,
    error: null
}
const reducer = (prevState,action) => {
    switch (action.type) {
        case 'FETCH_SUCESS': {
            return{isLoading:false,show:action.show,error:null}
        }
        case 'FETCH_FAILED': {
            return {...prevState,
              isLoading:false,error:action.error
            }
            }
        default: return prevState;
    }
}

const Show = () => {

   const [{isLoading,error,show},dispatch]= useReducer(reducer,initialstate);
    // const [show, setShow] = useState(null);
    // const [isLoading, setIsLoading] = useState(true);
    // const [error, setError] = useState(null);
    const { id } = useParams();
    useEffect(
        () => {
            let isMounted = 'true';
            apiGet(`/shows/${id}?embed[]=seasons&embed7[]=cast`).then(results => {
                if (isMounted) {
                    dispatch({type:'FETCH_SUCESS',show:results})
                //    setShow(results);
                // setIsLoading(false); 
                }}).catch(
                    err => {
                        dispatch({ type: 'FETCH_FAILED', show: err.message })
                    // setError(err.message);
                    // setIsLoading(false);
                })
            return () => { isMounted = false; }
        }, [id])
    console.log('show', show);
    if (isLoading) {
       return <div>Loading...</div>
    }
    if (error) {
        return <div>Error occured: { error}</div>
    }
    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <div>show</div>
    )
}

export default Show