import React from 'react';
import {
	View,
	Text,
	Modal,
	StyleSheet,
	TouchableOpacity,
	Dimensions
} from 'react-native';


export default function ModalApp(props) {
	return (
		<Modal
	      transparent={true}
	      animationType={'slide'}
	      visible={props.visible}
	      onRequestClose={() => props.onPress()}>
	      <View style={styles.modalBackground}>
	        <View style={styles.container}>
	        	<TouchableOpacity style={styles.btn} onPress={() => props.onPress()} activeOpacity={0.7}>
	        		<Text style={styles.text}>x</Text>
	        	</TouchableOpacity>
	        	{props.children}
	        </View>
	      </View>
	    </Modal>
	);
}


const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  container: {
    width: Dimensions.get("window").width - 12,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  text: {
  	fontSize: 22,
  	fontWeight: 'bold',
  	color: '#fff'
  },
  btn: {
  	position: 'absolute',
  	top: 20,
  	right: 20,
  	backgroundColor: '#111',
  	width: 55,
  	height: 55,
  	borderRadius: 55 / 2,
  	justifyContent: 'center',
	  alignItems: 'center',
  	elevation: 10,
    zIndex: 1000,
	  shadowColor: 'rgba(0,0,0,0.5)', 
    shadowOffset: { 
     width: 0, 
     height: 2 
    },
    shadowRadius: 5, 
		shadowOpacity: 0.8
  }
});