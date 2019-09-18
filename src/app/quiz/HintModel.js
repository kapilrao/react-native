import React, { Component } from 'react';
import { View, ScrollView, Modal } from 'react-native';

class HintModel extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { isShowHint, toggleHintModel, hintArray, renderQuestion } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={isShowHint}
        onRequestClose={() => toggleHintModel()}
        presentationStyle='formSheet'>
        <ScrollView showsVerticalScrollIndicator={true}>
          <View style={{ flexDirection: 'row', flexWrap: "wrap" }}>
            {hintArray && hintArray.length > 0 && hintArray.map((item, index) => (
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
      </Modal>
    );
  }
}

export default HintModel;