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

  renderQuestion = question => {
    let imageUrlArray = [], imagePart = [], videoPart = [], videoUrlArray = [],
      paragraphContainer = '';
    let paragraphResources = question.match(
      new RegExp('<p>s*(.+?)s*</p>', 'g')
    );
    let resourceContainer = question.match(
      new RegExp('<figure*(.+?)s*/>', 'g')
    );

    if (resourceContainer && resourceContainer.length > 0) {
      resourceContainer.map(item => {
        if (item.includes('resource-type="video"')) videoPart.push(item);
        else if (item.includes('resource-type="image"')) imagePart.push(item);
      })
    }

    if (videoPart && videoPart.length > 0) {
      videoUrlArray = this.getVideo(videoPart);
    }

    if (imagePart && imagePart.length > 0) {
      imageUrlArray = this.getImage(imagePart);
    }

    if (paragraphResources && paragraphResources.length > 0) {
      paragraphResources.map(item => {
        paragraphContainer = paragraphContainer + `<div style="display:inline-block;paddingRight:3px;">${item}</div>`;
      });
    }

    if (imageUrlArray && imageUrlArray.length > 0 || videoUrlArray && videoUrlArray.length > 0) {
      return this.renderImageView(imageUrlArray, videoUrlArray, paragraphContainer);
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

  getImage = (imagePart) => {
    let imgResources = [], imageUrlArray = [];
    imagePart.forEach(item => {
      let getImageTag = item.match(/<img.*?src="(.*?)"[^\>]+>/g);
      if (getImageTag && getImageTag.length > 0) imgResources.push(getImageTag);
    })
    if (imgResources && imgResources.length > 0) {
      imgResources.map(item => {
        let imgUrl = item[0].match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g);
        let imgCaption = item[0].match(/<img.*?caption="(.*?)"/);
        if (imgUrl && imgUrl.length > 0) {
          let obj = { url: imgUrl[0] };
          if (imgCaption && imgCaption.length > 0) obj.caption = imgCaption[1];
          imageUrlArray.push(obj);
        }
      });
    }
    return imageUrlArray;
  }

  getVideo = (videoPart) => {
    let videoResult = [], videoUrlArray = [];
    videoPart.forEach(item => {
      let temp = item.match(/\$root.displayResourceFullScreen(\(.*)\)/);
      let thumbnailTag = item.match(/<img.*?src="(.*?)"[^\>]+>/g);
      if (temp && temp.length > 0) {
        let obj = { videoDetail: temp };
        if (thumbnailTag && thumbnailTag.length > 0) {
          let thumbnailUrl = thumbnailTag[0].match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g);
          if (thumbnailUrl && thumbnailUrl.length > 0) obj.thumbnail = thumbnailUrl[0]
        }
        videoResult.push(obj);
      }
    });
    if (videoResult && videoResult.length > 0) {
      videoResult.forEach(item => {
        videoString = item.videoDetail[0].replace(/&quot;/g, '');
        videoDetailArray = videoString.split(',');
        videoUrlArray.push({ url: videoDetailArray[4], thumbnail: item.thumbnail });
      });
    }
    return videoUrlArray;
  }

  renderImageView = (imageUrlArray, videoUrlArray, paragraphContainer) => {
    if (imageUrlArray.length > 0 && videoUrlArray.length > 0) {
      return (
        <View style={{ justifyContent: 'flex-start', flexDirection: 'column', flex: 1, flexWrap: 'wrap' }}>
          <View style={{ justifyContent: 'flex-start', flexDirection: 'row', flex: 1 }}>
            <WebView
              originWhitelist={["*"]}
              source={{ html: `${paragraphContainer}` }}
              style={{ backgroundColor: '#D3D3D3' }}
            />
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {imageUrlArray.map((item, index) => {
                return (
                  <TouchableHighlight onPress={() => this.pressme(item)} key={index} style={{ paddingBottom: 10, paddingRight: 10 }}>
                    <Image source={{ uri: item.url }} style={{ width: 175, height: 100 }} />
                  </TouchableHighlight>
                )
              })}
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {videoUrlArray.map((item, index) => {
                return (
                  <TouchableHighlight onPress={() => this.pressme(item)} key={index} style={{ paddingBottom: 10, paddingRight: 10 }}>
                    <Image source={{ uri: item.thumbnail }} style={{ width: 175, height: 100 }} />
                  </TouchableHighlight>
                )
              })}
            </View>
          </View>
        </View>
      );
    } else if (imageUrlArray.length > 0) {
      return (
        <View style={{ flex: 1 }}>
          <WebView
            originWhitelist={["*"]}
            source={{ html: `${paragraphContainer}` }}
            style={{ backgroundColor: '#D3D3D3', flex: 1 }}
          />
          <View style={{ flex: 1, alignItems: 'center' }}>
            {imageUrlArray.map((item, index) => {
              return (
                <TouchableHighlight onPress={() => this.pressme(item)} key={index} style={{ paddingBottom: 10 }}>
                  <Image source={{ uri: item.url }} style={{ width: 175, height: 100 }} />
                </TouchableHighlight>
              )
            })}
          </View>
        </View>
      );
    } else if (videoUrlArray.length > 0) {
      return (
        <View style={{ flex: 1 }}>
          <WebView
            originWhitelist={["*"]}
            source={{ html: `${paragraphContainer}` }}
            style={{ backgroundColor: '#D3D3D3', flex: 1 }}
          />
          <View style={{ flex: 1, alignItems: 'center' }}>
            {videoUrlArray.map((item, index) => {
              return (
                <TouchableHighlight onPress={() => this.pressme(item)} key={index} style={{ paddingBottom: 10 }}>
                  <Image source={{ uri: item.url }} style={{ width: 175, height: 100 }} />
                </TouchableHighlight>
              )
            })}
          </View>
        </View>
      );
    }
  }

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
        <View style={{ paddingTop: 25, flexDirection: 'column', flexWrap: "wrap", flex: 1 }}>
          {question.questionParts.map((item, index) => (
            <View
              style={{
                flexDirection: 'row',
                // alignItems: 'center',
                justifyContent: 'flex-start',
                flexWrap: 'wrap',
                flex: 1
              }}
              key={index}
            >
              {item.type == 'question' ? (
                <View style={{ flex: 1, flexDirection: 'row' }}>{this.renderQuestion(item.question)}</View>
              ) : (
                  <View style={{ flex: 1, flexDirection: 'row' }}>
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
                  </View>
                )}
            </View>
          ))}
        </View>
      </View>
    );
  }
}
export default FillTheDropDown;
