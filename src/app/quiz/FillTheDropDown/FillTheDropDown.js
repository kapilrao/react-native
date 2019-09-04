import { StyleSheet, Text, View, Picker } from 'react-native';
import React, { Component } from 'react';
import QuestionSkillScoreComponent from '../QuestionSkillScoreComponent';
import { FontAwesome } from '@expo/vector-icons';
import { WebView } from 'react-native';

const styles = StyleSheet.create({
});


class FillTheDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      timer: 0
    }
  }

  renderHtml = quesPartsArray => {
    let imageUrlContainer = [], imageString = '', imgResources = quesPartsArray.match(/<img.*?src="(.*?)"[^\>]+>/g), paragraphContainer = '', paragraphResources = quesPartsArray.match(new RegExp('<p>\s*(.+?)\s*</p>', 'g'));
    console.log('peragraph', paragraphResources);
    if (paragraphResources && paragraphResources.length > 0) {
      paragraphResources.map(item => {
        paragraphContainer = paragraphContainer + item;
      })
    }
    if (imgResources && imgResources.length > 0) {
      imgResources.map(item => {
        imageUrlContainer.push(item.match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g));
      })
    }
    if (imageUrlContainer && imageUrlContainer.length > 0) {
      imageUrlContainer.map(item => {
        imageString = imageString + `<img src=${item} height="180px" width="180px" />`;
      })
      return `<div>${paragraphContainer + imageString}</div>`;
    } else return paragraphContainer;

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
            <Text style={[classes.scorePoints]}>{`Fill The Drop Down`}</Text>
          </View>
          <Text style={classes.quesTimer}>00:00</Text>
          <View style={classes.flexRowS_BCenter}>
            <Text style={[classes.scorePoints]}>0/1</Text>
            <FontAwesome name={'lightbulb-o'} style={classes.hintBulb} />
          </View>
        </View>
        {question.questionParts.map((item, index) => (<View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', flex: 1, flexWrap: 'wrap' }}>{item.type == 'question' ? (<WebView
          key={index}
          originWhitelist={["*"]}
          source={{ html: `${this.renderHtml(item.question)}` }}
          style={{ backgroundColor: '#D3D3D3' }}
          javaScriptEnabled={true}
        />) : (<Picker
          key={index}
          selectedValue={this.state.language}
          style={{ minWidth: 100 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ language: itemValue })
          }>
          {item.values.map((subitems, i) => (<Picker.Item key={i} label={subitems.toUpperCase()} value={subitems} />))}
        </Picker>)}
        </View>))}
      </View>
    );
  }
}
export default FillTheDropDown;