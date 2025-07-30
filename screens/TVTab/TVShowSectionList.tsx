import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { fetchTVShowsByType, TVShow } from '../../services/TVService';
import Ionicons from 'react-native-vector-icons/Ionicons';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

const TVShowSectionList = ({ title, fetchType, navigation }) => {
  const [tvShows, setTVShows] = useState<TVShow[]>([]);

  useEffect(() => {
    fetchTVShowsByType(fetchType, 1).then(data => setTVShows(data.results.slice(0, 5)));
  }, [fetchType]);

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity style={styles.showMoreContainer} onPress={() => navigation.navigate('TVShowShowMore', { fetchType, title })}>
          <Text style={styles.showMore}>Show More</Text>
          <Ionicons name="chevron-forward" size={16} color="gray" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={tvShows}
        horizontal
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Detail', { id: item.id })}>
            <Image source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }} style={styles.poster} />
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: { marginVertical: 10, gap: 8 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10 },
  title: { fontSize: 18, fontWeight: 'bold' },
  showMore: { color: 'gray', fontSize: 12 },
  poster: { width: 100, height: 150, borderRadius: 8, marginRight: 10 },
  showMoreContainer: { flexDirection: 'row', alignItems: 'center', gap: 4 },
});

export default TVShowSectionList;