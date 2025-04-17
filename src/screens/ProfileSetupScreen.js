import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    Platform,
    PermissionsAndroid,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import {setProfile} from '../redux/slices/userSlice';

const ProfileSetupScreen = ({ navigation }) => {
    const [nickname, setNickname] = useState('');
    const [avatar, setAvatar] = useState(null);

    const dispatch = useDispatch();

    const requestPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: 'Access Storage Permission',
                    message: 'We need access to your photos to let you choose an avatar.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true;
    };

    const pickAvatar = async () => {
        const hasPermission = await requestPermission();
        if (!hasPermission) return;

        launchImageLibrary(
            {
                mediaType: 'photo',
                maxWidth: 512,
                maxHeight: 512,
                quality: 0.8,
            },
            response => {
                if (!response.didCancel && !response.errorCode) {
                    const uri = response.assets[0].uri;
                    setAvatar(uri);
                }
            }
        );
    };

    const handleSave = () => {
        dispatch(setProfile({
            nickname,
            avatar,
            personalityType: 'The Planner (Organized)',
        }));
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Personalize your profile</Text>
            <Text style={styles.personality}>The Planner (Organized)</Text>

            <TouchableOpacity onPress={pickAvatar}>
                {avatar ? (
                    <Image source={{ uri: avatar }} style={styles.avatar} />
                ) : (
                    <View style={styles.avatarPlaceholder}>
                        <Text style={{ fontSize: 24 }}>🖼️</Text>
                    </View>
                )}
            </TouchableOpacity>

            <TextInput
                placeholder="Nickname"
                placeholderTextColor="#ccc"
                style={styles.input}
                value={nickname}
                onChangeText={setNickname}
            />

            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Ok</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ProfileSetupScreen;

// Стили
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2B46B2',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    personality: {
        backgroundColor: 'white',
        color: '#2B46B2',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
        marginTop: 12,
        fontWeight: 'bold',
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginVertical: 20,
    },
    avatarPlaceholder: {
        width: 120,
        height: 120,
        backgroundColor: '#3b5df7',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    input: {
        width: '100%',
        backgroundColor: '#3b5df7',
        borderRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 14,
        color: 'white',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#ffffff',
        paddingVertical: 14,
        borderRadius: 30,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#2B46B2',
        fontWeight: 'bold',
        fontSize: 16,
    },
    skipText: {
        color: 'white',
        marginTop: 16,
        fontWeight: '600',
    },
});
