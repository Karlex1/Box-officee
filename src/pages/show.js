import React from 'react';
import { useParams } from 'react-router-dom';
// import { apiGet } from '../misc/config';
import { useShow } from '../misc/customHooks';
//import Cast from '../shows/Cast';
import Details from '../shows/Details';
import Seasons from '../shows/Seasons';
import ShowMainData from '../shows/showMainData';
import { InfoBlock, ShowPageWrapper } from '../shows/showStyled';
import Webchannel from '../shows/Webchannel';
// value of  state initially in the object.

// function for handle updation of state.

// Main component
const Show = () => {
    const { id } = useParams();
    const { isLoading, error, show } = useShow(id);
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