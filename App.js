/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

const onPressLeft = () => {
  console.log('Left pressed');
}

const onPressRight = () => {
  console.log('Right pressed');
}

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.main}>
        <View style={styles.drummerContainer}></View>
        <View style={styles.footer}>
          <TouchableOpacity onPress={onPressLeft} style={styles.textContainer}>
            <Text style={styles.text}>Left</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressLeft} style={styles.textContainer}>
            <Text style={styles.text}>Right</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  drummerContainer: {
    flex: 4,
    backgroundColor: 'pink'
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    fontWeight: "500",
    fontSize: 26
  }
});

export default App;
