import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableNativeFeedback, Dimensions} from 'react-native'

export default class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			delete: false,
			docs: [
				{
					title: 'Affogato',
				},
				{
					title: 'Affogato',
				},
				{
					title: 'Affogato',
				},
				{
					title: 'Affogato',
				},
				{
					title: 'Affogato',
				},
				{
					title: 'Affogato',
				},
				{
					title: 'Affogato',
				},
				{
					title: 'Affogato',
				},
				{
					title: 'Affogato',
				},
				{
					title: 'Affogato',
				},
				{
					title: 'Affogato',
				},

				{
					title: 'Affogato',
				}
			]
		}
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
				<TouchableNativeFeedback background={'#000'} onPress={() => this.props.navigation.navigate('Qr')}>
			    	<Text style={styles.btn}>+</Text>
			    </TouchableNativeFeedback>
			)
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<FlatList
					style={{paddingTop: 10}}
					contentContainerStyle={{ paddingBottom: 30 }}
			        data={this.state.docs}
			        numColumns={2}
			        keyExtractor={(item, i) => i}
			        renderItem={({item}) => (
			        	<TouchableNativeFeedback onPress={() => console.log(item)}>
			        		<View style={styles.card}>
			        			<Text>{item.title}</Text>
			        		</View>
			        	</TouchableNativeFeedback>
			        )}
			        ListEmptyComponent={
							<TouchableNativeFeedback onPress={() => console.log('add')}>
								<View style={styles.empty}>
							    	<Text>Agregar tu primera documentación</Text>
								</View>
						    </TouchableNativeFeedback>
			        }
			    />
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
  	margin: 10,
  	justifyContent: 'center',
  	alignItems: 'center',
  	borderRadius: 5,
  	backgroundColor: '#fff',
  	elevation: 2
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