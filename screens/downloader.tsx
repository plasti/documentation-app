import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	TouchableNativeFeedback,
	Image,
	ActivityIndicator
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
var RNFS = require('react-native-fs')


const id = new Date().getTime()
export default class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: true,
			success: '0%',
			total: 0,
			ok: false,
			logo: this.props.route.params.data.logo,
			msg: 'Comenzando descarga...',
			id: id,
			path: RNFS.ExternalDirectoryPath +'/'+id,
		}
	}

	componentDidMount() {
		this.createDirs().then(() => {
			let data = this.props.route.params.data
			let name_logo = data.logo.replace(data.host+'/files/', '')
			this.descargarLogo({name_logo: name_logo, url: data.logo}).then((r) => {
				data.logo = r
				this.guardarStorage(data).then(() => {
					this.descargarFile(data.host+'/json/menu.json', this.state.path+'/files/menu.json', 'Descargando menu...').then(() => {
						RNFS.readFile(this.state.path+'/files/menu.json', 'utf8').then(async menu => {
							if(menu.indexOf('{') > -1) {
								menu = JSON.parse(menu)
								let items_to_download = []
								for(let item of menu.menu) {
									if(item.type == 'simple') {
										items_to_download.push(item.id+'_'+item.content+'.json')
									}
									if(item.type == 'details') {
										for(let subitem of item.items) {
											items_to_download.push(subitem.id+'_'+subitem.content+'.json')
										}
									}
								}
								this.setState({total: items_to_download.length})
								for(let i = 0; i <= items_to_download.length - 1; i++) {
									await this.descargarFile(data.host+'/json/content/'+items_to_download[i], this.state.path+'/files/'+items_to_download[i], 'Descargando '+(i+1)+' / '+items_to_download.length)
									let por = (i+1) * 100 / items_to_download.length
									this.setState({success: por+'%'}, () => {
										if(this.state.success == '100%') {
											setTimeout(() => {
												this.setState({ok: true})
											}, 500)
										}
									})
								}
							}else {
								console.log(err)	
							}
						}).catch(err => {
							console.log(err)
						})
					}).catch(err => {
						console.log(err)
					})
				}).catch(err => {
					console.log(err)
				})
			}).catch(err => {
				console.log(err)
			})
		}).catch(err => {
			console.log(err)
		})
	}


	descargarFile(url, to, msg) {
		return new Promise((resolve, reject) => {
			RNFS.downloadFile({
				fromUrl: url,
			  toFile: to,
			  background: true,
			  begin: (res) => this.setState({msg: msg}),
			}).promise.then((data) => {
				if(data.statusCode == 200) {
					resolve()
				}else {
					reject('Ocurrió un error al descargar el logo')
				}
			}).catch(err => {
				reject(err)
			})
		})
	}

	guardarStorage(data) {
		return new Promise((resolve, reject) => {
			AsyncStorage.getItem('@sites').then((sites) => {
				sites = (sites != '' && sites != null && sites != undefined) ? JSON.parse(sites) : []
				sites.push(data)
				AsyncStorage.setItem('@sites', JSON.stringify(sites)).then(() => resolve()).catch((err) => reject(err))
			}).catch((err) => reject(err))
		})
	}

	descargarLogo(data) {
		return new Promise((resolve, reject) => {
			RNFS.downloadFile({
				fromUrl: data.url,
			  toFile: this.state.path+'/images/'+data.name_logo,
			  background: true,
			  begin: (res) => this.setState({msg: 'Descargando logo...'}),
			}).promise.then((result) => {
				if(result.statusCode == 200) {
					resolve(this.state.path+'/images/'+data.name_logo)
				}else {
					reject('Ocurrió un error al descargar el logo')
				}
			}).catch(err => {
				reject(err)
			})
		})
	}

	createDirs(id) {
		return new Promise((resolve, reject) => {
			RNFS.mkdir(this.state.path).then((result) => {
				RNFS.mkdir(this.state.path+'/images').then(() => {
					RNFS.mkdir(this.state.path+'/files').then(() => {
						resolve()
					}).catch((err) => reject(err))
				}).catch((err) => reject(err))
			}).catch((err) => reject(err))
		})
	}


	render() {
		return (
			<View style={styles.container}>
				<View style={[styles.containerImage, {backgroundColor: this.props.route.params.data.primario}]}>
					<Image source={{ uri: this.state.logo }} style={styles.logo}/>
				</View>
				{this.state.ok ? (
					<>
						<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 30}}>
							<Text style={styles.ok}>✓</Text>
							<Text style={{marginLeft: 10}}>Documentación descargada con exito</Text>
						</View>
						<TouchableNativeFeedback onPress={() => {
							this.props.route.params.getContent()
							this.props.navigation.goBack()
						}}>
			      	<View style={styles.containerBtn}>
			      		<Text style={styles.btn}>Finalizar</Text>
			      	</View>
			      </TouchableNativeFeedback>
					</>
				): (
					<>
						<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
							<ActivityIndicator size="small" color="#111"/>
							<Text style={{marginLeft: 10}}>{this.state.msg}</Text>
						</View>
						{this.state.total > 0 && (
							<View style={styles.bar}>
								<View style={[styles.progress, {width: this.state.success, backgroundColor: this.props.route.params.data.terciario}]}/>
							</View>
						)}
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
  	width: 100,
  	height: 100,
  	marginBottom: 20,
  	borderRadius: 10,
  	justifyContent: 'center',
  	alignItems: 'center',
  	elevation: 5
  },
  logo: {
  	width: 70,
  	height: 70,
  	resizeMode: 'contain'
  },
  bar: {
  	marginTop: 10,
  	width: Dimensions.get('window').width - 150,
  	height: 5,
  	backgroundColor: '#fff',
  	borderRadius: 5,
  	overflow: 'hidden',
  },
  progress: {
  	height: 5,
  },
  ok: {
  	width: 25,
  	height: 25,
  	borderRadius: 25/2,
  	textAlign: 'center',
  	lineHeight: 22,
  	color: '#fff',
  	backgroundColor: '#03cf00',
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