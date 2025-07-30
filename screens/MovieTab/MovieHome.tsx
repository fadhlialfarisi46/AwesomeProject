import React from 'react';
import MovieSectionList from './MovieSectionList';
import { ScrollView } from 'react-native';

const MovieHome = ({ navigation }) => (
  <>
    <ScrollView>
      <MovieSectionList
        title="Now Playing"
        fetchType="now_playing"
        navigation={navigation}
      />
      <MovieSectionList
        title="Popular"
        fetchType="popular"
        navigation={navigation}
      />
      <MovieSectionList
        title="Top Rated"
        fetchType="top_rated"
        navigation={navigation}
      />
    </ScrollView>
  </>
);

export default MovieHome;