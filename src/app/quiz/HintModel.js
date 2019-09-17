import React, { Component } from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';

class HintModel extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { isShowHint, toggleHintModel } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={isShowHint}
        onRequestClose={() => toggleHintModel()}
        presentationStyle='formSheet'>
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <View style={{
            width: 300,
            height: 300
          }}>
            <Text>Hint</Text>
          </View>
        </View>
      </Modal>
    );
  }
}

export default HintModel;