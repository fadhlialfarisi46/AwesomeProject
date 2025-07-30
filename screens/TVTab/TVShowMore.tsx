import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { fetchTVShowsByType, TVShow } from '../../services/TVService';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BackButton from '../../components/BackButton';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

type RouteParams = {
  fetchType: string;
  title: string;
};

const TVShowShowMore = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const { fetchType, title } = route.params;

  const [TVShows, setTVShows] = useState<TVShow[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadTVShows = async (pageNumber: number) => {
    if (loading) return;
    setLoading(true);
    try {
      const data = await fetchTVShowsByType(fetchType, pageNumber);
      setTVShows(prev => {
        const existingIds = new Set(prev.map(TVShow => TVShow.id));
        const newTVShows = data.results.filter(TVShow => !existingIds.has(TVShow.id));
        return [...prev, ...newTVShows];
      });
      setPage(pageNumber);
    } catch (error) {
      console.error('Error fetching TVShows:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadTVShows(1);
  }, [fetchType]);

  const loadMore = () => {
    loadTVShows(page + 1);
  };

  const renderItem = ({ item }: { item: TVShow }) => (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        console.log('Navigating to Detail with ID:', item.id);
        navigation.navigate('Detail', { id: item.id })
      }}
    >
      <View style={styles.card}>
        <Image
          source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }}
          style={styles.poster}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.overview} numberOfLines={4}>{item.overview}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <Text style={styles.header}>
        {title}
      </Text>
      <FlatList
        data={TVShows}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'column',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    marginVertical: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2
  },
  poster: {
    width: 100,
    height: 150,
    resizeMode: 'cover'
  },
  textContainer: {
    flex: 1,
    padding: 10
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5
  },
  overview: {
    fontSize: 14,
    color: '#555'
  }
});

export default TVShowShowMore;