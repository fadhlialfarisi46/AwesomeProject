import React from 'react';
import TVShowSectionList from './TVShowSectionList';

const TVShowHome = ({ navigation }) => (
  <>
    <TVShowSectionList
      title="Now Playing"
      fetchType="on_the_air"
      navigation={navigation}
    />
    <TVShowSectionList
      title="Popular"
      fetchType="popular"
      navigation={navigation}
    />
    <TVShowSectionList
      title="Top Rated"
      fetchType="top_rated"
      navigation={navigation}
    />
  </>
);

export default TVShowHome;