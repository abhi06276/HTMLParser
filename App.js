/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
const cheerio = require('react-native-cheerio');


const instructions = Platform.select({
  ios: 'Check debugger/console for output',
  android: 'Check debugger/console for output',
});

export default class App extends Component {

  componentDidMount(){
    this.scrapeHTMLContent("https://www.amazon.in/?ref=gw_intl_in&pf_rd_p=4c740c5e-7140-40f3-8386-f749c0cf29ca&pf_rd_r=2HTAXTAEYHKAA1QJRFEV")
    .then((response) => {
      console.log('REsponse is '+response)
      this.readData(response);
    })
    .catch(err => console.log(`Error is ${JSON.stringify(err)}`));
  }


  scrapeHTMLContent = (url) => {
    const axios = require('axios');
    return new Promise((resolve, reject) => {
      axios.get(url).then((response) => {
        if (response.status === 200) resolve(response.data);
        else reject(response.data);
      });
    });
  }

  readData = (data) => {
    const $ = cheerio.load(data);
    const mainContent = $('title', '');
    //To find plain string/text from html
    // const mainContent = $('title', '').text();
    console.log('Main content is ',mainContent);

    const footer = $('div', 'footer');
    console.log('Fotter content is ',footer);

  }

  render() {
    return (
      <View style={styles.container}>
          <Text>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
