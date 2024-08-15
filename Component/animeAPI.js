import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Card } from 'react-native-elements';

// Komponen utama API
const API = ({ navigation }) => {
  // State untuk menyimpan daftar karakter dan status loading
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect untuk mengambil data dari API saat komponen pertama kali dirender
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mengambil data dari API menggunakan axios
        const response = await axios.get("https://api.jikan.moe/v4/characters?data");
        // Menyimpan data karakter di state movies
        setMovies(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        // Mengubah status loading menjadi false setelah data diambil
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Menampilkan indikator loading saat data sedang diambil
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Fungsi untuk merender setiap item karakter di dalam FlatList
  const anime = ({ item }) => {
    const imageUrl = item.images.jpg.image_url;

    return (
      <Card containerStyle={styles.card}>
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.image}
        />
        
        <Card.Title style={styles.title}>{item.name}</Card.Title>
        {/* TouchableOpacity yang menangani navigasi ke halaman detail karakter */}
        <TouchableOpacity style={styles.tombolDetail} onPress={() => navigation.navigate('Detail', { character: item })}>
          <Text style={styles.buttonText}>Detail</Text>
        </TouchableOpacity>
      </Card>
    );
  };

  // Merender FlatList dengan data karakter
  return (
    <FlatList
      style={styles.container}
      data={movies}
      renderItem={anime}
      keyExtractor={(item) => item.mal_id.toString()}
      numColumns={2}
    />
  );
};

// StyleSheet untuk styling komponen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,

  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 20
  },
  card: {
    backgroundColor: "blue",
    flex: 1,
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  title: {
    color: 'white',
  },
  tombolDetail: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  },
});

// Ekspor komponen Movies
export default API;