import { StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react';
import QuestionSkillScoreComponent from '../QuestionSkillScoreComponent'
const styles = StyleSheet.create({
});


class FillTheDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0
    }
  }

  render() {
    const { score } = this.state;
    const { question, classes, currentQuestionNo, totalQuestions } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: 'flex-start' }}>
        <View style={[classes.flexRowS_BCenter]}>
          <QuestionSkillScoreComponent skillName={question.skills[0].name} score={score} classes={classes} />
        </View>
        <View style={[classes.flexRowS_BCenter, { paddingTop: 25 }]}>
          <View style={{ flexDirection: 'column' }}>
            <Text style={[classes.scorePoints]}>{`Question ${currentQuestionNo}/${totalQuestions}`}</Text>
            <Text style={[classes.scorePoints]}>{`type: Fill The Drop Down`}</Text>
          </View>
          <Text style={[classes.scorePoints]}>00:00</Text>
          <Text style={[classes.scorePoints]}>0/1</Text>
        </View>
      </View>
    );
  }
}
export default FillTheDropDown;