import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { fetchMovies, Movie } from '../services/MovieService';
import { useNavigation } from '@react-navigation/native';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

const Home = () => {
    const navigation = useNavigation();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const loadMovies = async (pageNumber: number) => {
        if (loading) return;
        setLoading(true);
        await fetchMovies(pageNumber)
            .then(data => {
                setMovies(prev => {
                    const existingIds = new Set(prev.map(movie => movie.id));
                    const newMovies = data.results.filter(movie => !existingIds.has(movie.id));
                    return [...prev, ...newMovies];
                });
                setPage(pageNumber);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            }); 
                
        setLoading(false);

    };

    useEffect(() => {
        loadMovies(1);
    }, []);

    const loadMore = () => {
        loadMovies(page + 1);
    };

    const renderItem = ({ item }: { item: Movie }) => (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('Detail', { id: item.id })}
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
            <FlatList
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
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

export default Home;