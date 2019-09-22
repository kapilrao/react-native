import React, { Component } from 'react';
import { View, ScrollView, Modal } from 'react-native';

class ExplanationModel extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { isShowExplanation, toggleExplanationModel, explanationData, renderQuestion } = this.props;
    return (<Modal
      animationType="slide"
      transparent={false}
      visible={isShowExplanation}
      onRequestClose={() => toggleExplanationModel()}
      presentationStyle='formSheet'>
      <ScrollView showsVerticalScrollIndicator={true}>
        <View style={{ flexDirection: 'row', flexWrap: "wrap" }}>
          {explanationData && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                flexWrap: 'wrap',
                // flex: 1
              }}
            >
                <View style={{}}>{renderQuestion(explanationData)}</View>
            </View>
          )}
        </View>
      </ScrollView>
    </Modal>);
  }
}

export default ExplanationModel;