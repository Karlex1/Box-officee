import React from 'react';
import ShowCard from './ShowsCard';

import IMAGE_NOT_FOUND from '../image/not-found.png';
import { Flexgrid } from '../components/styled';
import { useShows } from '../misc/customHooks';

const ShowGrid = ({ data }) => {
  const [starredShows, dispatchStarred] = useShows();

  

  return (
    <Flexgrid>
      {data.map(({ show }) => {
        const isStarred = starredShows.includes(show.id);
        const onStarClicks = () => {
          if (isStarred) {
            dispatchStarred({ type: 'REMOVE', showId: show.id });
          }
          else { dispatchStarred({ type: 'ADD', showId: show.id }); }
        };
        return(
        <ShowCard
          key={show.id}
          id={show.id}
          name={show.name}
          image={show.image ? show.image.medium : IMAGE_NOT_FOUND}
            summary={show.summary}
            onStarClicks={onStarClicks}
            isStarred={isStarred}
        />)
      })}
    </Flexgrid>
  );
};

export default ShowGrid;
