import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { apiGet } from '../misc/config';
const Home = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');
  
 
  const onInputChange = ev => {
    setInput(ev.target.value);
    
  };

  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };
  const onRadio = (ev) => { setSearchOption(ev.target.value) };
  const isShowchecked = searchOption === 'shows';
  console.log(searchOption);
  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then(result => {
      setResults(result);
      // console.log(result);
    });
  };

  const renderResults = () => {
    if (results && results.length === 0) {
      return <div>No Result</div>
    }
    if (results && results.length > 0) {
      return results[0].shows ? results.map((item) =>
        <div key={item.show.id}>
          {item.show.name}
        </div>) : results.map((item) =>
          <div key={item.person.id}>
            {item.person.name}
          </div>)
    }
    return null;
  };
  return (
    <MainPageLayout>
      <input
        placeholder='Enter ur genre'
        type="text"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <div>
        <label htmlFor="shows">Shows
          <input type="radio" id='shows' value='shows' onChange={onRadio} checked={isShowchecked} />
        </label>
        <label htmlFor="people">Actors
          <input type="radio" id='people' value='people' onChange={onRadio} checked={!isShowchecked} />
        </label>
      </div>
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
