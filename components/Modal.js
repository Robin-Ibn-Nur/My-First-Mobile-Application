import React, { useContext } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, Keyboard } from 'react-native';
import { AuthContext } from '../context/AuthProvider';
import { socket } from '../utils';




const ModalComponent = () => {


    const { modalVisible, setModalVisible, currentGroupName, setCurrentGroupName } = useContext(AuthContext)

    const handleCreateRoom = () => {
        console.log(currentGroupName);
        socket.emit("createNewGroup", currentGroupName)

        setModalVisible(false);
        setCurrentGroupName('');
        Keyboard.dismiss();
    }
    return (

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TextInput
                        autoCorrect={false}
                        placeholder='Enter your group name'
                        style={styles.logInInput}
                        onChangeText={(value) => setCurrentGroupName(value)}
                        value={currentGroupName}
                    />
                    <View style={styles.buttonContainer}>
                        <Pressable onPress={handleCreateRoom} style={styles.button}>
                            <Text style={styles.buttonText}>ADD</Text>
                        </Pressable>
                        <Pressable onPress={() => setModalVisible(!modalVisible)} style={styles.button}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>

    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    logInInput: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        padding: 10,
        width: '100%',
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
    },
    button: {
        backgroundColor: '#3498db',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        margin: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ModalComponent;