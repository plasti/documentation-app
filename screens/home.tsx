import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableNativeFeedback, Dimensions, ActivityIndicator, Image, Platform} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: true,
			delete: false,
			docs: []
		}
	}

	componentDidMount() {
		this.getContent()
		// AsyncStorage.setItem('@sites', '')
	}

	getContent = () => {
		AsyncStorage.getItem('@sites').then((sites) => {
			sites = (sites != '' && sites != null && sites != undefined) ? JSON.parse(sites) : []
			this.setState({loading: false, docs: sites})
		})
	}

	renderBtn() {
		if(this.state.delete){
			return (
				<TouchableNativeFeedback background={'#000'} onPress={() => console.log('delete')}>
			    	<Text style={styles.btn}>+</Text>
			    </TouchableNativeFeedback>
			)
		}else {
			return (
				<TouchableNativeFeedback background={'#000'} onPress={() => this.props.navigation.navigate('Qr', {getContent: this.getContent})}>
			    	<Text style={styles.btn}>+</Text>
			    </TouchableNativeFeedback>
			)
		}
	}

	render() {
		return (
			<View style={styles.container}>
				{this.state.loading ? (
					<View style={{width: '100%', height: Dimensions.get('window').height - 200, justifyContent: 'center', alignItems: 'center'}}>
						<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
							<ActivityIndicator size="small" color="#111"/>
							<Text style={{marginLeft: 10}}>Cargando...</Text>
						</View>
					</View>
				) : (
					<FlatList
						style={{paddingTop: 10}}
						contentContainerStyle={{ paddingBottom: 30 }}
				        data={this.state.docs}
				        numColumns={2}
				        keyExtractor={(item, i) => i}
				        renderItem={({item}) => (
				        	<TouchableNativeFeedback onPress={() => console.log(item)}>
				        		<View style={[styles.card, {backgroundColor: item.primario}]}>
				        			<Image
											  source={{ uri: ((Platform.OS != 'ios') ? 'file://' : '')+item.logo }}
											  style={styles.logo}
											/>
				        		</View>
				        	</TouchableNativeFeedback>
				        )}
				        ListEmptyComponent={
									<TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Qr', {getContent: this.getContent})}>
										<View style={styles.empty}>
									    	<Text>Agregar tu primera documentación</Text>
										</View>
								  </TouchableNativeFeedback>
				        }
				    />
				)}
			  {this.renderBtn()}
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#eaeaea',
  },
  btn: {
  	width: 55,
  	height: 55,
  	fontSize: 30,
  	backgroundColor: '#111',
  	color: '#fff',
  	textAlign: 'center',
  	lineHeight: 53,
  	borderRadius: 55 / 2,
  	position: 'absolute',
  	bottom: 20,
  	right: 20,
  	elevation: 7
  },
  card: {
  	flex: 1,
  	height: Dimensions.get('window').width / 2 - 40,
  	marginTop: 10,
  	marginBottom: 10,
  	marginLeft: 15,
  	marginRight: 15,
  	justifyContent: 'center',
  	alignItems: 'center',
  	borderRadius: 10,
  	backgroundColor: '#fff',
  	elevation: 2
  },
  logo: {
  	width: Dimensions.get('window').width / 2 - 100,
  	height: Dimensions.get('window').width / 2 - 100,
  	resizeMode: 'contain'
  },
  empty: {
		flex: 1,
  	height: Dimensions.get('window').width / 2 - 40,
  	margin: 20,
  	justifyContent: 'center',
  	alignItems: 'center',
  	borderRadius: 5,
  	borderStyle: 'dashed',
  	borderWidth: 2,
  	borderColor: '#111',
  }
});