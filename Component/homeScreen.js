import React, { useState, useEffect } from "react"; // Mengimpor React dan hook useState serta useEffect
import { Text, TouchableOpacity, View, StyleSheet, ScrollView, Dimensions } from "react-native"; // Mengimpor komponen dan modul dari React Native
import AsyncStorage from "@react-native-async-storage/async-storage"; // Mengimpor AsyncStorage untuk penyimpanan data lokal

const { width } = Dimensions.get('window'); // Mengambil lebar layar perangkat

export default function Beranda({ navigation }) { // Mendefinisikan komponen Beranda dan menerima prop 'navigation'
    const [userData, setUserData] = useState([]); // Mendefinisikan state userData untuk menyimpan data pengguna

    useEffect(() => {
        const fetchData = async () => { // Fungsi untuk mengambil data dari AsyncStorage
            const dataCache = await AsyncStorage.getItem('formMahaSiswa'); // Mengambil data yang disimpan dengan kunci 'formMahaSiswa'
            if (dataCache !== null) {
                setUserData(JSON.parse(dataCache)); // Jika data ditemukan, update state userData dengan data yang diambil
            }
        };

        const focusListener = navigation.addListener('focus', fetchData); // Menambahkan listener untuk mengambil data setiap kali layar berfokus
        return focusListener; // Membersihkan listener saat komponen unmount
    }, [navigation]); // Dependency array berisi 'navigation' agar listener hanya diinisialisasi ulang saat navigation berubah

    const handleDelete = async (userId) => { // Fungsi untuk menghapus data pengguna
        const updatedUserData = userData.filter(user => user.id !== userId); // Memfilter data untuk menghapus user dengan id yang dipilih
        setUserData(updatedUserData); // Mengupdate state userData dengan data yang sudah dihapus
        await AsyncStorage.setItem('formMahaSiswa', JSON.stringify(updatedUserData)); // Menyimpan data yang sudah diupdate kembali ke AsyncStorage
    };

    return (
        <ScrollView> {/* Membungkus konten dalam ScrollView untuk membuatnya bisa di-scroll */}
            <View style={styles.container}> {/* Mengatur tata letak komponen utama */}
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TampilanTambahan')}> {/* Tombol untuk navigasi ke layar 'TampilanTambahan' */}
                    <Text style={styles.buttonText}>Tambahkan Data</Text> {/* Teks dalam tombol */}
                </TouchableOpacity>
                
                {userData.length > 0 ? ( // Jika userData memiliki isi, maka tampilkan data pengguna
                    userData.map((user) => ( // Mengiterasi setiap item dalam userData dan menampilkannya
                        <View key={user.id} style={styles.userCard}> {/* Setiap item pengguna ditampilkan dalam komponen View dengan gaya 'userCard' */}
                            <Text style={styles.userText}>Nama Depan: {user.namaDepan}</Text> {/* Menampilkan nama depan pengguna */}
                            <Text style={styles.userText}>Nama Belakang: {user.namaBelakang}</Text> {/* Menampilkan nama belakang pengguna */}
                            <View style={styles.buttonContainer}> {/* Kontainer untuk tombol aksi */}
                                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(user.id)}> {/* Tombol untuk menghapus pengguna */}
                                    <Text style={styles.deleteButtonText}>Delete</Text> {/* Teks dalam tombol delete */}
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                ) : (
                    <Text>No data available</Text> // Jika userData kosong, tampilkan teks ini
                )}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center', // Mengatur konten agar berada di tengah secara horizontal
        padding: 20,
        backgroundColor: '#f5f5f5', // Memberikan warna latar belakang abu-abu muda
    },
    button: {
        backgroundColor: '#007BFF', // Warna latar belakang biru pada tombol
        padding: 10,
        borderRadius: 5, // Membuat sudut tombol menjadi melengkung
        alignItems: 'center',
        marginBottom: 20,
        width: '90%', // Lebar tombol diatur 90% dari lebar kontainer
    },
    buttonText: {
        color: '#fff', // Warna teks putih pada tombol
        fontSize: 16, // Ukuran font teks pada tombol
    },
    userCard: {
        backgroundColor: '#fff', // Warna latar belakang putih untuk setiap kartu pengguna
        padding: 20,
        marginVertical: 10, // Memberikan margin vertikal pada setiap kartu
        borderRadius: 10, // Membuat sudut kartu menjadi melengkung
        shadowColor: '#000', // Warna bayangan hitam
        shadowOffset: { width: 0, height: 2 }, // Mengatur offset bayangan
        shadowOpacity: 0.1, // Mengatur opasitas bayangan
        shadowRadius: 5, // Mengatur radius bayangan
        elevation: 7, // Menambahkan efek bayangan pada Android
        width: '90%',
        alignSelf: 'center', // Mengatur kartu agar berada di tengah
    },
    userText: {
        fontSize: 16, // Ukuran font teks dalam kartu
        marginBottom: 10, // Memberikan margin bawah pada setiap teks dalam kartu
    },
    buttonContainer: {
        flexDirection: 'row', // Mengatur tombol dalam kartu pengguna agar berjajar secara horizontal
        justifyContent:'center' // Menjajarkan tombol di tengah secara horizontal
    },
    deleteButton: {
        backgroundColor: '#FF0000', // Warna latar belakang merah untuk tombol delete
        padding: 10,
        borderRadius: 5, // Membuat sudut tombol delete menjadi melengkung
        alignItems: 'center',
        marginVertical: 5,
        width: '45%', // Lebar tombol delete diatur 45% dari lebar kontainer
    },
    deleteButtonText: {
        color: '#fff', // Warna teks putih pada tombol delete
        fontSize: 14, // Ukuran font teks pada tombol delete
    },
});
