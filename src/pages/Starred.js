import React, {useState,useEffect} from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { apiGet } from '../misc/config';
import { useShows } from "../misc/customHooks";
import ShowGrid from '../shows/ShowsGrid';
const Starred = () => {
  const [starred] = useShows();

  const [shows, setShows] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (starred && starred.length > 0) {
      const promises = starred.map(showId => apiGet(`/shows/${showId}`));
      // the reason of using Promise.all is that we r using a API which doesn't give us a endpoint where  we can send request to fetch multiple data (in one request).
      Promise.all(promises).then(apiData => apiData.map(show => ({ show }))).then(results => {
        setShows(results);
        setIsLoading(false);
      }).catch(err => {
        setIsLoading(false);
        setError(err.message)
      });
    } else { setIsLoading(false); }
   }, [starred]);
  return <MainPageLayout>
    {isLoading && <div>Shows are still loading</div>}
    {error && <div>Error occured: {error}</div>}
    {!isLoading && !shows && <div>No shows were added</div>}
    {!isLoading && !error && shows && <ShowGrid data={shows} />}
  </MainPageLayout>;
};

export default Starred;
