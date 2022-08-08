import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';
//import Cast from '../shows/Cast';
import Details from '../shows/Details';
import Seasons from '../shows/Seasons';
import ShowMainData from '../shows/showMainData';
import { InfoBlock, ShowPageWrapper } from '../shows/showStyled';
import Webchannel from '../shows/Webchannel';
// value of  state initially in the object.
const initialstate = {
    show: null,
    isLoading: true,
    error: null
}
// function for handle updation of state.
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

// Main component
const Show = () => {

    const [{ isLoading, error, show }, dispatch] = useReducer(reducer, initialstate);
    // const [show, setShow] = useState(null);
    // const [isLoading, setIsLoading] = useState(true);
    // const [error, setError] = useState(null);
    const { id } = useParams();
    useEffect(
        () => {
            let isMounted = 'true';
            apiGet(`/shows/${id}?embed[]=seasons&embed7[]=cast`).then(results => {
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
        }, [id])
    // console.log('show', show);

// for load time and error
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error occured: {error}</div>
    }
 // For display the show details.
    return (
        <ShowPageWrapper>
            <ShowMainData
                image={show.image}
                name={show.name}
                rating={show.rating}
                summary={show.summary}
                tags={show.genres}
            />
            <InfoBlock>
                <h4>Details</h4>
                <Details
                    status={show.status}
                    network={show.network}
                    premiered={show.premiered} />
            </InfoBlock>
            <InfoBlock> <h4>Season</h4>
                < Seasons
                    season={show._embedded.seasons} /></InfoBlock>
            {/* <div><h4>Cast</h4>
                <Cast
                    cast={show._embedded.cast} /></div> */}
<InfoBlock>
            <h4>WEB streaming Platfom</h4>
            <Webchannel
                web_c={show.webChannel} /></InfoBlock>
        </ShowPageWrapper>
    )
}

export default Show