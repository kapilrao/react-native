import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import Layout from './Layout';
export default function App() {
  return (
    <View style={styles.container}>
      {/* <View style={{ flex: 1 }}>
        <ImageBackground source={{ uri: 'http://startupglobe.org/wp-content/uploads/2019/02/traditional-wallpaper-pearl-scroll-by-home-fashions-patterns-background-hd-design.jpg' }} style={{ width: '100%', height: '100%', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}></ImageBackground>
      </View> */}
      <Layout />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BDEDFF',
    flexDirection: 'column',
    alignItems: "stretch",
    justifyContent: 'flex-end',
    marginTop:25
  },
});
