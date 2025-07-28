import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { fetchMovieById, Movie } from '../services/MovieService';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w400';

const Detail = () => {
    const route = useRoute<RouteProp<{ params: { id: number } }, 'params'>>();
    const { id } = route.params;
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMovieById(id)
            .then(data => setMovie(data))
            .catch(error => console.error(error))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <ActivityIndicator size="large" />;

    if (!movie) return <Text>Movie not found.</Text>;

    return (
        <View style={styles.container}>
            <Image source={{ uri: `${IMAGE_BASE_URL}${movie.poster_path}` }} style={styles.poster} />
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.overview}>{movie.overview}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', padding: 20, backgroundColor: '#fff' },
    poster: { width: 200, height: 300, marginBottom: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    overview: { fontSize: 16, color: '#555' },
});

export default Detail;