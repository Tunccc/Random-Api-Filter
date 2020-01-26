import React, {Component} from 'react';
import {View,SafeAreaView,Text, FlatList, Image,StyleSheet,TouchableOpacity, TextInput} from 'react-native';
import data from '../../data'
import axios from 'axios'



export default class App extends Component {

    state = {
        text:'',
        contacts:[]
    }
    getContacts = async () => {

        const {data: {results: contacts}} = await axios.get('https://randomuser.me/api/?results=30');
        this.setState({
            contacts
        })
    
    }
    componentDidMount() {
        this.getContacts();
    }
 
  renderItemContacts = ({item, index}) => {
    return(
      <TouchableOpacity style={[styles.container, { backgroundColor: index % 2 ===1 ? '#fafafa' : ''}]}>
        <Image 
          style={styles.avatar}
          source = {{ uri: item.picture.thumbnail }}
        />
        <View style={styles.nameContainer}>
          <Text > {item.name.first} {item.name.last} </Text>
          <Text style={styles.name}> {item.location.state} </Text>
        </View>
      </TouchableOpacity>
    );
  }

  searchFilter = text => {

    const newData = data.filter( item =>{
        const listItem = `${item.name.toLocaleLowerCase()} ${item.company.toLocaleLowerCase()}`
        return listItem.indexOf(text.toLocaleLowerCase()) > -1;
    });

    this.setState({
        contacts:newData,
    })
   
  };
 
  renderHeader = () => {
      const {text} = this.state;
    return (
      <View style= {styles.myInputContainer} > 
        <TextInput 
          onChangeText= {text => {
              this.setState({
                  text,
              });
              this.searchFilter(text);   
          }}
          placeholder= " Search.."
          style = {styles.myInputStyle}
          value={text}
        />
        
      </View>
    );
  }
  

  render() {

    return(
      <SafeAreaView>
          <FlatList 
           ListHeaderComponent= {this.renderHeader}
           data= {this.state.contacts}
           renderItem = {this.renderItemContacts}
           keyExtractor={(item, index) => index.toString()}
          />
        
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'row',
    paddingVertical:10,
  },
  avatar:{
    width:50,
    height:50,
    borderRadius:25,
    marginHorizontal:10
    
  },
  nameContainer: {
    justifyContent:'space-around'
  },
  name:{
    fontSize:10
  },
  myInputContainer: {
    padding:10
  },
  myInputStyle: {
    fontSize:14,
    borderRadius:4,
    backgroundColor:'#f9f9f9'
    
  }
})