import React from 'react';
import ShowCard from './ShowsCard';

import IMAGE_NOT_FOUND from '../image/not-found.png';
import { Flexgrid } from '../components/styled';

const ShowGrid = ({ data }) => {
  return (
    <Flexgrid>
      {data.map(({ show }) => (
        <ShowCard
          key={show.id}
          id={show.id}
          name={show.name}
          image={show.image ? show.image.medium : IMAGE_NOT_FOUND}
          summary={show.summary}
        />
      ))}
    </Flexgrid>
  );
};

export default ShowGrid;
