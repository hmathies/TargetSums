import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

class RandomNumber extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired
  };
  handelPress = () => {
    if (this.props.isDisabled) {
      return;
    }
    this.props.onPress(this.props.id);
  };
  render() {
    return (
      <TouchableOpacity onPress={this.handelPress}>
        <Text style={[styles.random, this.props.isDisabled && styles.disabled]}>
          {this.props.number}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  random: {
    fontSize: 35,
    backgroundColor: "powderblue",
    textAlign: "center",
    marginHorizontal: 15,
    marginVertical: 25,
    width: 75,
    height: 75
  },
  disabled: {
    opacity: 0.3
  }
});

export default RandomNumber;
