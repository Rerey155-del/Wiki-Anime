import react, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from "react-native";
import { Keyboard } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Tambahkan({ navigation }) {
    const [namaDepan, setNamaDepan] = useState('');
    const [namaBelakang, setNamaBelakang] = useState('');

    const onSimpan = async () => {
        // Mengambil data yang ada dari AsyncStorage
        const dataCache = await AsyncStorage.getItem('formMahaSiswa');
        const oldData = dataCache !== null ? JSON.parse(dataCache) : [];

        // Menghasilkan ID unik untuk entri data baru
        const uuid = Math.random().toString().replace('0.', '');

        // Membuat objek data baru
        const data = { id: uuid, namaDepan, namaBelakang };

        // Menambahkan data baru ke data yang ada
        const dataSend = [...oldData, data];

        // Menyimpan data yang diperbarui kembali ke AsyncStorage
        await AsyncStorage.setItem('formMahaSiswa', JSON.stringify(dataSend));

        // Mengatur ulang input form
        setNamaDepan('');
        setNamaBelakang('');

        // Navigasi kembali ke layar 'Beranda' jika tombol simpan di tekan
        navigation.navigate('Beranda');

        // Menutup keyboard
        Keyboard.dismiss();
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Nama Depan</Text>
                <TextInput value={namaDepan} onChangeText={setNamaDepan} placeholder="Nama Depan" style={styles.input} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Nama Belakang</Text>
                <TextInput value={namaBelakang} onChangeText={setNamaBelakang} placeholder="Nama Belakang" style={styles.input} />
            </View>
            <TouchableOpacity style={styles.button} onPress={onSimpan}>
                <Text style={styles.buttonText}>Simpan</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});