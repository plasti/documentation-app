import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	TouchableNativeFeedback,
	ActivityIndicator,
	Image,
	TextInput
} from 'react-native'
import Modal from '../components/modal'

export default class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: true,
			title: '',
			description: '',
			url: this.props.route.params.url,
			logo: '',
			primario: '',
			secundario: '',
			terciario: '',
			facebook: '',
			instagram: '',
			linkedin: '',
			whatsapp: '',
			youtube: '',
			email: '',
			phone: '',
			code_login: '',
			// -------------
			compare_code: '',
			modal_code: false,
		}
	}

	componentDidMount() {
		let url = this.props.route.params.url+'/json/config.json'
		fetch(url).then(d => d.text()).then(res => {
			if(res.indexOf('{') > -1) {
				res = JSON.parse(res);
				let {config} = res
				this.setState({
					title: config.title,
					description: config.description,
					logo: this.props.route.params.url+'/files/'+config.logo,
					primario: config.primario,
					secundario: config.secundario,
					terciario: config.terciario,
					facebook: config.facebook,
					instagram: config.instagram,
					linkedin: config.linkedin,
					whatsapp: config.whatsapp,
					youtube: config.youtube,
					email: config.email,
					phone: config.phone,
					code_login: config.code_login,
					loading: false,
				})
			}
		}).catch(err => {
			console.log(err)
		})
	}

	validCode() {
		if(this.state.code_login != '' && this.state.code_login != null) {
			this.setState({modal_code: true})
		}else {
			this.descargar()
		}
	}


	descargar() {
		this.props.navigation.replace('Downloader', {
			getContent: this.props.route.params.getContent,
			data: {
				host: this.props.route.params.url,
				title: this.state.title,
				description: this.state.description,
				logo: this.state.logo,
				primario: this.state.primario,
				secundario: this.state.secundario,
				terciario: this.state.terciario,
				facebook: this.state.facebook,
				instagram: this.state.instagram,
				linkedin: this.state.linkedin,
				whatsapp: this.state.whatsapp,
				youtube: this.state.youtube,
				email: this.state.email,
				phone: this.state.phone,
			}
		})
	}

	render() {
		return (
			<View style={styles.container}>
				{this.state.loading ? (
					<View>
						<Text style={{marginBottom: 10}}>Cargando...</Text>
						<ActivityIndicator size="large" color="#111"/>
					</View>
				) : (
					<>
						<Modal visible={this.state.modal_code} onPress={() => this.setState({modal_code: false})}>
							<View style={styles.bodyModal}>
								<Text style={{fontSize: 20, textAlign: 'center'}}>Ingresa el código para descargar la documentación</Text>
								<TextInput
					        style={styles.input}
					        placeholder="####"
					        placeholderTextColor="#bbb"
					        onChangeText={code => {
					        	if(this.state.code_login == code) {
					        		this.descargar()
					        	}
					        }}
					      />
							</View>
						</Modal>

						<View style={[styles.containerImage, {backgroundColor: this.state.primario}]}>
							<Image
							  source={{ uri: this.state.logo }}
							  style={styles.logo}
							/>
						</View>
						<Text style={styles.title}>{this.state.title}</Text>
						<Text style={styles.description}>{this.state.description}</Text>
						<TouchableNativeFeedback onPress={() => this.validCode()}>
			      	<View style={styles.containerBtn}>
			      		<Text style={styles.btn}>Descargar documentación</Text>
			      	</View>
			      </TouchableNativeFeedback>
					</>
				)}
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#eaeaea',
    justifyContent: 'center',
   	alignItems: 'center',
   	paddingVertical: 10,
  	paddingHorizontal: 10,
  },
  containerImage: {
  	width: Dimensions.get('window').width / 2 + 50,
  	height: Dimensions.get('window').width / 2 + 50,
  	marginBottom: 20,
  	borderRadius: 10,
  	justifyContent: 'center',
  	alignItems: 'center',
  	elevation: 5
  },
  logo: {
  	width: Dimensions.get('window').width / 2 - 100,
  	height: Dimensions.get('window').width / 2 - 100,
  	resizeMode: 'contain'
  },
  title: {
  	fontSize: 30,
  	fontWeight: 'bold',
  	marginBottom: 10,
  	textAlign: 'center',
  },
  description: {
  	textAlign: 'center',
  	marginBottom: 20
  },
  bodyModal: {
  	flex: 1,
  	justifyContent: 'center',
  	alignItems: 'center',
  	width: Dimensions.get('window').width,
  	backgroundColor: '#eaeaea',
  	paddingVertical: 10,
  	paddingHorizontal: 10,
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