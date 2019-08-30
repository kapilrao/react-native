import { StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react';
import { fillTheDropDownQuesSchema } from './quiz/QuestionJson.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 10
  },
  skillHeading: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
    marginRight: 10,
    flex: 0.8
  },
  scorePoints: {
    fontWeight: '500',
    color: 'white'
  }
});

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        {fillTheDropDownQuesSchema.questions.map((item, index) =>
          (<View key={index} style={{ flex: 1, justifyContent: 'flex-start' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={styles.skillHeading}>{item.skills[0].name}</Text>
              <Text style={[styles.scorePoints,{fontSize:20}]}>00</Text>
          </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 5 }}>
              <Text style={[styles.scorePoints,{fontSize:16}]}>{`Question ${index}/${fillTheDropDownQuesSchema.questions.length}`}</Text>
              <Text style={[styles.scorePoints,{fontSize:16}]}>00:00</Text>
            </View>
          </View>
        ))}
      </View>
    );
  }
}
export default Layout;