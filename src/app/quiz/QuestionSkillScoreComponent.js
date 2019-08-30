import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class QuestionSkillScoreComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { skillName, score, classes } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: 'flex-start' }}>
        <View style={classes.flexRowS_BCenter}>
          <Text style={classes.skillHeading}>{skillName}</Text>
          <Text style={[classes.scorePoints, { fontSize: 20 }]}>{score}</Text>
        </View>
      </View>
    );
  }
}

export default QuestionSkillScoreComponent;

 