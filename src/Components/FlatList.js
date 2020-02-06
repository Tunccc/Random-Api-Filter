import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Text, View, FlatList, Image,TouchableOpacity, TextInput,ActivityIndicator} from 'react-native';
 //import FlatListExample from './src/Components/FlatListExample'
import Axios from 'axios'




export default class App extends Component {


    state={
        text:'',
        contacts: [],
        allContacts: [],
        page:1,
        loading:true,
        refreshing:false
        
    }

    constructor(props){
        super(props);
    }
    
    componentDidMount() {
        this.dataUpdate();
    }

    dataUpdate = async () => {
        this.setState({
            loading:true
        })
        const {data: {results:contacts}} = await Axios.get(`https://randomuser.me/api/?results=30&page=${this.state.page}`);
        const users = [...this.state.contacts, ...contacts]
        if(this.state.refreshing){
            users.reverse();
        }

        this.setState({
            contacts:users,
            allContacts:users,
            loading:false,
            refreshing:false
        })

    }
    loadMore = () => {
       if(!this.duringMomentum){
        this.setState({
            page:this.state.page+1
        },
        () => {this.dataUpdate()}
        );
        this.duringMomentum=false;
       }
    }
    onRefresh=() =>{
        this.setState({
            page:1,
            refreshing:true
        },
        () => {this.dataUpdate()}
        );
    }

    renderItems = ({item, index}) => {
        return (
            <TouchableOpacity style={styles.itemsContainer} >
                <Image 
                    style={styles.avatar}
                    source={{uri:item.picture.thumbnail}}
                />
            
            <View style={styles.textContainer} >
                <Text style={styles.textName}>{item.name.first} {item.name.last}</Text>
                <Text>{item.location.state}</Text>
            </View>
            </TouchableOpacity>
        );
    }
    renderHeader = () => {
        const { text} = this.state;
        return (
            <View style= {styles.inputContainer}>
                <TextInput 
                onFocus={()=> this.duringMomentum=true}
                onBlur={()=> this.duringMomentum=false}
                style={styles.inputStyle}
                placeholder="Search.."
                onChangeText={text=>{
                    this.setState({
                        text,
                    })
                    this.searchFilter(text);
                }
                
            }
                />
            </View>
        );
    }

    searchFilter= (text) => {
        const newData = this.state.allContacts.filter(item => {
            const listItem= `${item.name.first.toLowerCase()} ${item.name.last.toLowerCase()} ${item.location.state.toLowerCase()}`

            return listItem.indexOf(text.toLowerCase()) > -1;
        })
        this.setState({
            contacts:newData
        })
    }
    loadingUpdate = () => {
        if(!this.state.loading) return null;
        return(
            <ActivityIndicator size="large" />
        );
    }
    
  render() {
      const { loading} = this.state;
    return(
      <SafeAreaView style={styles.container} >
        
         
        <FlatList 
            ListHeaderComponent={this.renderHeader}
            renderItem={this.renderItems}
            data={this.state.contacts}
            keyExtractor={item => item.login.uuid}
            ListFooterComponent={this.loadingUpdate}
            onEndReached={this.loadMore}
            onEndReachedThreshold={0}
            onMomentumScrollBegin={()=> this.duringMomentum=false}
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
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
  itemsContainer:{
      flexDirection:'row',
      marginVertical:10,
      borderBottomWidth:1,
      borderBottomColor:'#eee'
  },
  avatar:{
      width:50,
      height:50,
      borderRadius:25,
      marginHorizontal:10
  },
  textContainer:{
      justifyContent:'space-around'
  },
  textName:{
      fontSize:14
  },
  inputContainer:{
      padding:10
  },
  inputStyle:{
      paddingVertical:10,
      padding:10
  }
})