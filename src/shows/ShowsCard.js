import React from 'react';
import { Link } from 'react-router-dom';
import { ExtendedSearchcard } from '../components/ExtendedstyleforShows';
import { Star } from '../components/styled';

const ShowCard = ({ id, image, name, summary,onStarClicks ,isStarred}) => {
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
        <button type="button" onClick={onStarClicks}><Star active={isStarred} /></button>
      </div>
    </ExtendedSearchcard>
  );
};

export default ShowCard;
