import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	TouchableNativeFeedback
} from 'react-native'

export default class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: true,
		}
	}



	render() {
		return (
			<View style={styles.container}>
				{this.state.loading ? (
					<Text>Cargando</Text>
				) : (
					<>
						<View style={styles.containerImage}>
						</View>
						<Text style={styles.title}>{this.state.title}</Text>
						<Text style={styles.description}>{this.state.description}</Text>
						<Text>URL: {this.state.url}</Text>
						<TouchableNativeFeedback onPress={() => console.log(this.state.url)}>
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
    justifyContent: 'flex-start',
   	alignItems: 'flex-start'
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