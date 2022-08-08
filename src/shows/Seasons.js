import React from 'react'

const Seasons = ({ season }) => {
  return (
    <div>
      <p>
        Seasons in total: <span>{season.length}</span>
      </p>
      <p>
        Episodes in total:{' '}
        <span>
          {season.reduce((acc, season) => acc + season.episodeOrder, 0)}
        </span>
      </p>
      <div>
        {season.map(season => (
          <div key={season.id}>
            <div>
              <p>Season {season.number}</p>
              <p>
                Episodes: <span>{season.episodeOrder}</span>
              </p>
            </div>
            <div>
              Aired:{' '}
              <span>
                {season.premiereDate} - {season.endDate}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Seasons