import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { apiGet } from '../misc/config';
import ShowGrid from '../shows/ShowsGrid';
import ActorGrid from '../Actors/ActorsGrid';
import { useLastsearched } from '../misc/customHooks';
import { RadioInputsWrapper, SearchButtonWrapper, SearchInput } from '../components/homeStyled';
import CustomRadio from '../components/customRadio';

const Home = () => {
  const [input, setInput] = useLastsearched();
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');

  const isShowsSearch = searchOption === 'shows';

  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then(result => {
      setResults(result);
    });
  };

  const onInputChange = ev => {
    setInput(ev.target.value);
  };

  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };

  const onRadioChange = ev => {
    setSearchOption(ev.target.value);
  };

  const renderResults = () => {
    if (results && results.length === 0) {
      return <div>No results</div>;
    }

    if (results && results.length > 0) {
      return results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        <ActorGrid data={results} />
      );
    }

    return null;
  };

  return (
    <MainPageLayout>
      <SearchInput
        type="text"
        placeholder="Search for something"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />

      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label='  Shows'
            id="shows-search"
            value="shows"
            checked={isShowsSearch}
            onChange={onRadioChange}
           
          />
        
      </div>

        <div>
          <CustomRadio
            label=' Actors'
            id="actors-search"
            value="people"
            checked={!isShowsSearch}
            onChange={onRadioChange}
          /></div>
      </RadioInputsWrapper>
      <SearchButtonWrapper>
      <button type="button" onClick={onSearch}>
        Search
      </button></SearchButtonWrapper>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
