import { StyleSheet, Text, View, Picker, Image, TouchableHighlight } from 'react-native';
import React, { Component } from 'react';
import QuestionSkillScoreComponent from '../QuestionSkillScoreComponent';
import { FontAwesome } from '@expo/vector-icons';
import { WebView } from 'react-native';

const styles = StyleSheet.create({});

class FillTheDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      timer: 0,
      imageUrl: '',
    };
  }

  pressme = e => {
    console.log('working', e);
    this.setState({ imageUrl: e });
  };

  renderHtml = quesPartsArray => {
    //     var result = myString.match(/\((.*)\)/);
    // let main = result[1].split('this).scope().$root.displayResourceFullScreen(');
    // let res = main.toString().replace('&quot;','"');
    let imageUrlContainer = [],
      imageString = '',
      imgResources = quesPartsArray.match(/<img.*?src="(.*?)"[^\>]+>/g),
      paragraphContainer = '',
      paragraphResources = quesPartsArray.match(
        new RegExp('<p>s*(.+?)s*</p>', 'g')
      );
    let init = quesPartsArray.split('angular.element(this).scope().$root.displayResourceFullScreen(');
    let fin = init.split(')');
    console.log('init', init);
    console.log('fin', fin);
    // console.log('peragraph', paragraphResources);
    if (paragraphResources && paragraphResources.length > 0) {
      paragraphResources.map(item => {
        paragraphContainer = paragraphContainer + `<div style="display:inline-block;padding:3px;">${item}</div>`;
      });
    }
    if (imgResources && imgResources.length > 0) {
      imgResources.map(item => {
        imageUrlContainer.push(
          item.match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g)
        );
      });
    }
    if (imageUrlContainer && imageUrlContainer.length > 0) {
      console.log('container', paragraphContainer[0]);
      return (
        <View style={{ flex: 1 }}>
          <WebView
            originWhitelist={["*"]}
            source={{ html: `${paragraphContainer}` }}
            style={{ backgroundColor: '#D3D3D3', flex: 1 }}
          />
          <View style={{ flex: 1, alignItems: 'center' }}>
            {imageUrlContainer.map((item, index) => {
              return (
                <TouchableHighlight onPress={() => this.pressme(item[0])} key={index} style={{ paddingBottom: 10 }}>
                  <Image source={{ uri: item[0] }} style={{ width: 175, height: 100 }} />
                </TouchableHighlight>
              )
            })}
          </View>
        </View>
      );
    } else {
      return (
        <WebView
          originWhitelist={['*']}
          source={{ html: `${paragraphContainer}` }}
          style={{ backgroundColor: '#D3D3D3' }}
        />
      );
    }
  };
  render() {
    const { score } = this.state;
    const { question, classes, currentQuestionNo, totalQuestions } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: 'flex-start' }}>
        <View style={[classes.flexRowS_BCenter]}>
          <QuestionSkillScoreComponent
            skillName={question.skills[0].name}
            score={score}
            classes={classes}
          />
        </View>
        <View style={[classes.flexRowS_BCenter, { paddingTop: 25 }]}>
          <View style={{ flexDirection: 'column' }}>
            <Text
              style={[classes.scorePoints]}
            >{`Question ${currentQuestionNo}/${totalQuestions}`}</Text>
            <Text style={[classes.scorePoints]}>{`Fill The Drop Down`}</Text>
          </View>
          <Text style={classes.quesTimer}>00:00</Text>
          <View style={classes.flexRowS_BCenter}>
            <Text style={[classes.scorePoints]}>0/1</Text>
            <FontAwesome name={'lightbulb-o'} style={classes.hintBulb} />
          </View>
        </View>
        {question.questionParts.map((item, index) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              flex: 1,
              // flexWrap: 'wrap'
            }}
          >
            {item.type == 'question' ? (
              this.renderHtml(item.question)
            ) : (
                <Picker
                  key={index}
                  selectedValue={this.state.language}
                  style={{ minWidth: 100, flex: 1 }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ language: itemValue })
                  }
                >
                  {item.values.map((subitems, i) => (
                    <Picker.Item
                      key={i}
                      label={subitems.toUpperCase()}
                      value={subitems}
                    />
                  ))}
                </Picker>
              )}
          </View>
        ))}
      </View>
    );
  }
}
export default FillTheDropDown;
