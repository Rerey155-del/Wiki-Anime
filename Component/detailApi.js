import React from 'react'; 
import { View, Text, StyleSheet, Image, FlatList } from 'react-native'; 

const Detail = ({ route }) => { 
  const { character } = route.params; // Mengambil parameter 'character' dari route params yang dikirim ke komponen Detail

  const details = [ 
    { key: 'Name', value: character.name }, // Menambahkan detail 'Name' dengan nilai dari character.name
    { key: 'About', value: character.about }, // Menambahkan detail 'About' dengan nilai dari character.about
    // Tambahkan detail lain jika diperlukan
  ];

  const renderItem = ({ item }) => (
    <View style={styles.item}> 
      <Text style={styles.itemKey}>{item.key}</Text> 
      <Text style={styles.itemValue}>{item.value}</Text>  
    </View>
  );

  return (
    <View style={styles.container}> 
      <Image 
        source={{ uri: character.images.jpg.image_url }} // Menampilkan gambar karakter dari URL yang ada di character.images.jpg.image_url
        style={styles.image} 
      /> 
      <FlatList
        data={details} // Menggunakan data details untuk ditampilkan dalam list
        renderItem={renderItem} // Menggunakan fungsi renderItem untuk merender setiap item dalam list
        keyExtractor={(item) => item.key} // Menggunakan key dari setiap item sebagai key unik di FlatList
      />
    </View>
  );
};

const styles = StyleSheet.create({ 
  container: {
    flex: 1, 
    padding: 10, 
    backgroundColor: '#fff', // Memberikan warna latar belakang putih untuk komponen
  },
  image: {
    width: '100%', 
    height: 300, 
    resizeMode: 'cover', // Mengatur ukuran gambar agar menutupi area yang tersedia
    borderRadius: 10, // Membuat sudut gambar menjadi melengkung
    marginBottom: 10 // Memberikan jarak bawah sebesar 10 unit
  },
  item: {
    flex: 1, 
    margin: 10, 
    padding: 10, 
    borderWidth: 1, 
    borderColor: '#ccc', // Warna garis tepi abu-abu muda
    borderRadius: 5, // Membuat sudut komponen item menjadi melengkung
    backgroundColor: '#f9f9f9', // Memberikan warna latar belakang abu-abu sangat muda
  },
  itemKey: {
    fontSize: 16, 
    fontWeight: 'bold', // Menjadikan teks itemKey tebal
  },
  itemValue: {
    fontSize: 14, // Ukuran font untuk itemValue lebih kecil
  },
});

export default Detail; // Mengekspor komponen Detail agar bisa digunakan di bagian lain aplikasi
