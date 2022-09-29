import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	TextInput,
	KeyboardAvoidingView,
	ScrollView,
	TouchableNativeFeedback
} from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner';

export default class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			url: null
		}
	}

	onReadQr(data) {
		if(data.indexOf('http') > -1) {
			this.setState({url: data}, () => {
				this.next()
			})
		}else {
			alert('Código QR no compatible')
		}
	}


	next() {
		if(this.state.url != null && this.state.url != '') {
			console.log('nav')
		}else {
			alert('URL no válida')
		}
	}


	render() {
		return (
				<KeyboardAvoidingView style={styles.container} animated={true}>
					<ScrollView>
						<View style={styles.contentQr}>
							<QRCodeScanner
				        onRead={(e) => this.onReadQr(e.data)}
				        cameraProps={{captureAudio: false}}
				      />
				      <View  style={styles.cube}/>
						</View>
						<View style={styles.containerText}>
							<Text numberOfLines={2} style={styles.centerText}>Escanea el código Qr para descargar la documentación o copia y pega la URL en el siguiente campo:</Text>
							<TextInput
				        style={styles.input}
				        placeholder="https://"
				        placeholderTextColor="#bbb"
				        onChangeText={newText => this.setState({url: newText})}
				        value={this.state.url}
				      />
				      <TouchableNativeFeedback onPress={() => console.log(this.state.url)}>
				      	<View style={styles.containerBtn}>
				      		<Text style={styles.btn}>Verificar ❯</Text>
				      	</View>
				      </TouchableNativeFeedback>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#eaeaea',
    justifyContent: 'flex-start',
   	alignItems: 'flex-start'
  },
  contentQr: {
  	width: Dimensions.get('window').width,
  	height: Dimensions.get('window').height / 2,
  	backgroundColor: '#eaeaea',
  	overflow: 'hidden',
  	justifyContent: 'center',
  	alignItems: 'center',
  },
  cube: {
  	width: Dimensions.get('window').width - 100,
  	height: Dimensions.get('window').width - 100,
  	borderWidth: 4,
  	borderColor: '#fff',
  	position: 'absolute',
  	borderRadius: 4
  },
  containerText: {
  	paddingVertical: 10,
  	paddingHorizontal: 10,
  	justifyContent: 'center',
  	width: Dimensions.get('window').width,
  },
  centerText: {
  	textAlign: 'center',
  	width: '100%',
  	justifyContent: 'center',
  	alignItems: 'center',
  	marginLeft: 'auto',
  	marginRight: 'auto',
  	fontWeight: 'bold'
  },
  input: {
  	height: 55,
  	backgroundColor: '#fff',
  	color: '#111',
  	width: '100%',
  	marginLeft: 'auto',
  	marginRight: 'auto',
  	marginTop: 20,
  	marginBottom: 20,
  	borderRadius: 5,
  	paddingHorizontal: 10
  },
  containerBtn: {
  	backgroundColor: '#111',
  	width: '100%',
  	elevation: 7,
  	height: 55,
  	borderRadius: 5,
  	marginBottom: 20,
  	justifyContent: 'center',
  	alignItems: 'center'
  },
  btn: {
  	color: '#fff',
  	textAlign: 'center',
  	fontSize: 20,
  }
});