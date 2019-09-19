import { StyleSheet, Text, View, Picker, Image, TouchableHighlight, ScrollView, WebView, TouchableOpacity, Alert } from 'react-native';
import React, { Component } from 'react';
import QuestionSkillScoreComponent from '../QuestionSkillScoreComponent';
import { FontAwesome } from '@expo/vector-icons';
import icon_hint_bulb from '../QuizIcons/icon_hint_bulb.png';
import HintModel from '../HintModel';
import ExplanationModel from '../ExplanationModel';

const styles = StyleSheet.create({
  submit: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#68a0cf',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#fff'
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20
  }
});

class FillTheDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      timer: 0,
      imageUrl: '',
      isShowHint: false,
      isShowExplanation: true
    };
  }

  pressme = e => {
    console.log('working', e);
    this.setState({ imageUrl: e });
  };

  renderQuestion = question => {
    let imageWithoutFigureTag = [], imageUrlArray = [], imagePart = [], videoPart = [], videoUrlArray = [],
      paragraphContainer = [];
    let paragraphResources = question.match(
      new RegExp('<p>(.*?)<\/p>', 'g')
    );
    let resourceContainer = question.match(
      new RegExp('<figure*(.+?)s*/>', 'g')
    );
    let withoutFigureTag = question.replace(new RegExp('<figure*(.+?)s*/>', 'g'), '')
    imageWithoutFigureTag = withoutFigureTag.match(
      new RegExp('<img*(.+?)s*/>', 'g')
    );

    if (resourceContainer && resourceContainer.length > 0) {
      resourceContainer.map(item => {
        if (item.includes('resource-type="video"')) videoPart.push(item);
        else if (item.includes('resource-type="image"')) imagePart.push(item);
      })
    }
    if (imageWithoutFigureTag && imageWithoutFigureTag.length > 0) {
      imagePart = [...imagePart, ...imageWithoutFigureTag];
    }

    if (videoPart && videoPart.length > 0) {
      videoUrlArray = this.getVideo(videoPart);
    }

    if (imagePart && imagePart.length > 0) {
      imageUrlArray = this.getImage(imagePart);
    }

    if (paragraphResources && paragraphResources.length > 0) {
      let linkArray = []
      paragraphResources.map(item => {
        // paragraphContainer = paragraphContainer + `<div style="display:inline-block;paddingRight:3px;">${item}</div>`;
        let link = item.match(/<a[\s]+([^>]+)>((?:.(?!\<\/a\>))*.)<\/a>/g);
        if (link && link.length > 0) {
          link.map(item => {
            let x = item.match(/href\s*=\s*(['"])(https?:\/\/.+?)\1/g);
            if (x && x.length > 0) {
              x.map(item => { linkArray.push(item.replace(/\'|href=/g, '')) })
            }
          })
        }
        let xyz = item.replace(/<\/?p>|<img*(.+?)s*\/>|<a[\s]+([^>]+)>((?:.(?!\<\/a\>))*.)<\/a>|<br \/>/g, '');
        paragraphContainer.push(xyz.replace(/&nbsp;|↵/g, ''));
      });
      if (linkArray && linkArray.length > 0) { paragraphContainer = [...paragraphContainer, ...linkArray]; }
    }

    if (imageUrlArray && imageUrlArray.length > 0 || videoUrlArray && videoUrlArray.length > 0) {
      return this.renderImageView(imageUrlArray, videoUrlArray, paragraphContainer);
    } else if (paragraphContainer && paragraphContainer.length > 0) {
      return (
        // <WebView
        //   originWhitelist={['*']}
        //   source={{ html: `${paragraphContainer}` }}
        //   style={{ backgroundColor: '#D3D3D3' }}
        // />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingLeft: 5 }}>{paragraphContainer.map((item, i) => {
          let key = this.validURL(item);
          if (key) return (<Text key={i} style={{ paddingRight: 3, fontSize: 18 }}>{item}</Text>);
          else return <Text key={i} style={{ paddingRight: 3, fontSize: 18, color: 'blue' }} onPress={() => console.log(item)}>{item}</Text>;
        })}</View>
      );
    }
  };

  validURL = (str) => {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (!!regex.test(str)) {
      return false;
    } else {
      return true;
    }
  }

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
        <View style={{ justifyContent: 'flex-start', flexDirection: 'row', flexWrap: 'wrap', padding: 5 }}>
          {/* <View style={{ justifyContent: 'flex-start', flexDirection: 'row', flex: 1 }}>
            <WebView
              originWhitelist={["*"]}
              source={{ html: `${paragraphContainer}` }}
              style={{ backgroundColor: '#D3D3D3' }}
            />
          </View> */}
          {paragraphContainer.length > 0 && <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{paragraphContainer.map((item, i) => {
            return (<Text style={{ paddingRight: 3, fontSize: 18 }} key={i}>{item}</Text>)
          })}</View>}
          <View style={{ flexDirection: 'row', paddingTop: 5, flexWrap: 'wrap' }}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {imageUrlArray.map((item, index) => {
                return (
                  <TouchableHighlight onPress={() => this.pressme(item)} key={index} style={{ padding: 3 }}>
                    <Image source={{ uri: item.url }} style={{ width: 175, height: 110 }} />
                  </TouchableHighlight>
                )
              })}
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {videoUrlArray.map((item, index) => {
                return (
                  <TouchableHighlight onPress={() => this.pressme(item)} key={index} style={{ padding: 3 }}>
                    <Image source={{ uri: item.thumbnail }} style={{ width: 175, height: 110 }} />
                  </TouchableHighlight>
                )
              })}
            </View>
          </View>
        </View>
      );
    } else if (imageUrlArray.length > 0) {
      return (
        <View style={{ justifyContent: 'flex-start', flexDirection: 'row', flexWrap: 'wrap' }}>
          {/* <WebView
            originWhitelist={["*"]}
            source={{ html: `${paragraphContainer}` }}
            style={{ backgroundColor: '#D3D3D3', flex: 1 }}
          /> */}
          {paragraphContainer.length > 0 && <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{paragraphContainer.map((item, i) => {
            return (<Text style={{ paddingRight: 3, fontSize: 18 }} key={i}>{item}</Text>)
          })}</View>}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {imageUrlArray.map((item, index) => {
              return (
                <TouchableHighlight onPress={() => this.pressme(item)} key={index} style={{ paddingBottom: 10 }}>
                  <Image source={{ uri: item.url }} style={{ width: 150, height: 100 }} />
                </TouchableHighlight>
              )
            })}
          </View>
        </View>
      );
    } else if (videoUrlArray.length > 0) {
      return (
        <View style={{ justifyContent: 'flex-start', flexDirection: 'row', flexWrap: 'wrap' }}>
          {/* <WebView
            originWhitelist={["*"]}
            source={{ html: `${paragraphContainer}` }}
            style={{ backgroundColor: '#D3D3D3', flex: 1 }}
          /> */}
          {paragraphContainer.length > 0 && <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{paragraphContainer.map((item, i) => {
            return (<Text style={{ paddingRight: 3, fontSize: 18 }} key={i}>{item}</Text>)
          })}</View>}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {videoUrlArray.map((item, index) => {
              return (
                <TouchableHighlight onPress={() => this.pressme(item)} key={index} style={{ paddingBottom: 10 }}>
                  <Image source={{ uri: item.url }} style={{ width: 150, height: 100 }} />
                </TouchableHighlight>
              )
            })}
          </View>
        </View>
      );
    }
  }

  toggleHintModel = () => {
    this.setState({ isShowHint: !this.state.isShowHint })
  }

  toggleExplanationModel = () => {
    this.setState({ isShowExplanation: !this.state.isShowExplanation });
  }

  render() {
    const { score, isShowHint, isShowExplanation } = this.state;
    const { question, classes, currentQuestionNo, totalQuestions } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: 'flex-start' }}>

        {isShowHint && <HintModel toggleHintModel={this.toggleHintModel} isShowHint={isShowHint} hintArray={question.hints} renderQuestion={this.renderQuestion} />}
        {isShowExplanation && <ExplanationModel toggleExplanationModel={this.toggleExplanationModel} isShowHint={isShowExplanation} explanationData={question.explanation} renderQuestion={this.renderQuestion} />}

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
            {/* <FontAwesome name={'lightbulb-o'} style={classes.hintBulb} /> */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.toggleHintModel()}
            >
              <Image source={icon_hint_bulb} style={{ height: 50, width: 50 }} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={true}>
          <View style={{ paddingTop: 25, flexDirection: 'row', flexWrap: "wrap" }}>
            {question.questionParts.map((item, index) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  flexWrap: 'wrap',
                  // flex: 1
                }}
                key={index}
              >
                {item.type == 'question' ? (
                  <View style={{}}>{this.renderQuestion(item.question)}</View>
                ) : (
                    <Picker
                      key={index}
                      selectedValue={this.state[`dropdown_${index + 1}`]}
                      style={{ minWidth: 120 }}
                      onValueChange={(itemValue, itemIndex) => {
                        itemValue !== 0 && this.setState({ [`dropdown_${index + 1}`]: itemValue });
                        console.log(this.state);
                      }
                      }
                    >
                      <Picker.Item
                        label='select item..'
                        value={0}
                        style={{ display: 'hidden' }}
                        enabled={false}
                      />
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
        </ScrollView>
        <TouchableHighlight
          style={styles.submit}
          onPress={() => Alert.alert('Simple Button pressed')}
          underlayColor='#fff'>
          <Text style={[styles.submitText]}>Submit</Text>
        </TouchableHighlight>
      </View >
    );
  }
}
export default FillTheDropDown;
