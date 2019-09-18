import React, { Component } from 'react';
import { View, ScrollView, Modal } from 'react-native';

class ExplanationModel extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { isShowExplanation, toggleExplanationModel, ExplanationArray, renderQuestion } = this.props;
    return (<Modal
      animationType="slide"
      transparent={false}
      visible={isShowExplanation}
      onRequestClose={() => toggleExplanationModel()}
      presentationStyle='formSheet'>
      <ScrollView showsVerticalScrollIndicator={true}>
        <View style={{ flexDirection: 'row', flexWrap: "wrap" }}>
          {ExplanationArray && ExplanationArray.length > 0 && ExplanationArray.map((item, index) => (
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
              {item.content && (
                <View style={{}}>{renderQuestion(item.content)}</View>)}
            </View>
          ))}
        </View>
      </ScrollView>
    </Modal>);
  }
}

export default ExplanationModel;