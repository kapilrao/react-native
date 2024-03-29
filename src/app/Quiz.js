import { StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react';
import { fillTheDropDownQuesSchema } from './quiz/QuestionJson.js';
import FillTheDropDown from './quiz/FillTheDropDown/FillTheDropDown';

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
    color: 'white',
    fontSize: 16
  },
  flexRowS_BCenter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  flexRowStartWrap: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  flexRowStartCenterWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  hintBulb: {
    fontSize: 30,
    marginLeft: 5,
    color: '#F9A602'
  },
  quesTimer: {
    backgroundColor: 'white',
    padding: 2,
    borderRadius: 4,
    color: 'gray',
    fontWeight: '500',
    fontSize: 16
  }
});


class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsBank: [],
      questionObject: {},
      questionNumber: 0,
      totalQuestions: 0,
    }
  }

  componentDidMount() {
    this.getQuizQuestions()
  }

  getQuizQuestions = () => {
    if (fillTheDropDownQuesSchema.questions.length > 0) {
      this.setState({
        questionsBank: fillTheDropDownQuesSchema.questions,
        questionObject: fillTheDropDownQuesSchema.questions[0],
        currentQuestionNo: 1,
        totalQuestions: fillTheDropDownQuesSchema.questions.length
      });
    }
  }

  getNextQuestion = currentQuesNo => {
    if (currentQuesNo !== questionsBank.length) {
      this.setState({ questionObject: questionsBank[currentQuesNo], currentQuestionNo: currentQuesNo + 1 })
    } else { }
  }

  renderQuestionType = quesObject => {
    const { currentQuestionNo, totalQuestions, score } = this.state;
    switch (quesObject.type.toLowerCase()) {
      case 'fillthedropdown':
        return (<FillTheDropDown question={quesObject} currentQuestionNo={currentQuestionNo} totalQuestions={totalQuestions} classes={styles} />);

      case 'filltheblanks':
        return (<FillTheDropDown question={quesObject} currentQuestionNo={currentQuestionNo} totalQuestions={totalQuestions} classes={styles} />);

      default:
        return <div>Question not found</div>
    }
  }

  render() {
    const { questionsBank, questionObject } = this.state;
    return (
      <View style={styles.container}>
        {/* {fillTheDropDownQuesSchema.questions.map((item, index) =>
          (
            <FillTheDropDown questions={item}/>
          ))} */}
        {questionsBank.length > 0 && Object.keys(questionObject).length > 0 && this.renderQuestionType(questionObject)}
      </View>
    );
  }
}
export default Quiz;