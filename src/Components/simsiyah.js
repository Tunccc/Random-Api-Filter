import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Text, View, FlatList, Image,TouchableOpacity, TextInput} from 'react-native';
 //import FlatListExample from './src/Components/FlatListExample'
import data from '../../data'


export default class App extends Component {
    state={
    text:'',
    Contatcs:data
    }

  renderContactsItem = ({item,index}) => {
    return (
      <TouchableOpacity style={[styles.itemContainer, { backgroundColor: index % 2 === 0 ? '#fafafa' : '' }]}>
        <Image 
        style={styles.avatar}
          source={{uri:item.picture}}
        />
        <View style={styles.textContainer} >
        <Text>{item.name}</Text>
        <Text>{item.company}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  searchFilter = text=> {

    const newData = data.filter(item => {
        const listItem = `${item.name.toLowerCase()} ${item.company.toLowerCase()}`

        return listItem.indexOf(text.toLowerCase()) > -1;
    })

    this.setState({
        Contatcs:newData
    })

  }
  
  renderHeader = () => {
      const { text } = this.state;
    return(
      <View style={styles.searchContainer} > 
        <TextInput
        data={text}
        onChangeText={text => {
            this.setState({
                text
            })
            this.searchFilter(text);
        }}
      style={styles.searchInput}
      placeholder='Search..'
    />
      </View>
    );
  }
  render() {
    return(
      <SafeAreaView style={styles.container} >
        <FlatList
          data={this.state.Contatcs}
          ListHeaderComponent={this.renderHeader}
          renderItem={this.renderContactsItem}
          keyExtractor={item => item._id}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer:{
    flex:1,
    flexDirection:'row',
    marginVertical:10,
    
  },
  avatar:{
    width:50,
    height:50,
    borderRadius:25,
    marginHorizontal:10,
    
  },
  textContainer: {
    justifyContent:'space-around',
    fontSize:14
  },
  searchContainer:{
    padding:10
  },
  searchInput:{
    fontSize:16,
    backgroundColor:'#f9f9f9',
    padding:10
  }

})