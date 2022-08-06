import React from 'react';
import { Link } from 'react-router-dom';
import { ExtendedSearchcard } from '../components/ExtendedstyleforShows';


const ShowCard = ({ id, image, name, summary }) => {
  const summaryAsText = summary
    ? `${summary.split(' ').slice(0, 10).join(' ').replace(/<.+?>/g, '')}...`
    : 'No description';

  return (
    <ExtendedSearchcard
    >
      <div className='img-wrapper'>
        <img src={image} alt="show" />
      </div>

      <h1>{name}</h1>

      <p>{summaryAsText}</p>

      <div className='btns'>
        <Link to={`/show/${id}`}>Read more</Link>
        <button type="button">Star me</button>
      </div>
    </ExtendedSearchcard>
  );
};

export default ShowCard;
