import React, {Component} from 'react';
import {SafeAreaView, StyleSheet,Text,ActivityIndicator, Button} from 'react-native';
import Axios from 'axios';
import data from './data';

// import FlatListExample from './src/Components/FlatListExample'
import FlatList from './src/Components/FlatList'

export default class App extends Component {


       

    
  render() {
    
    return(
      <SafeAreaView style={styles.container} >
        <FlatList />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
  flex:1,
  } 
})