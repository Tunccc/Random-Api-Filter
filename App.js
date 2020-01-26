import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Button} from 'react-native';
import FlatListExample from './src/Components/FlatListExample'



export default class App extends Component {
  

  render() {


    
    return(
      <SafeAreaView style={styles.container} >
     
          <FlatListExample />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
 
  }
})