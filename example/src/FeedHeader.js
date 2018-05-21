import React, { Component } from 'react';
import { Animated, View, Text, Image, StyleSheet } from 'react-native';

import Stats from './Stats';

export default class FeedHeader extends Component {
  render() {
    let {
      item: { month, views, likes, comments },
      transition
    } = this.props;

    let opacity = transition.interpolate({
      inputRange: [0, 0.5],
      outputRange: [1, 0]
    });

    let scale = transition.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.75]
    });

    return (
      <View style={styles.container}>
        <Animated.View style={{ left: '-50%', transform: [{ scale }] }}>
          <Text style={[styles.month]}>{month}</Text>
        </Animated.View>
        <Animated.View style={{ opacity }}>
          <Stats size={32} {...{ views, likes, comments }} />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 16
  },
  month: {
    left: '50%',
    fontSize: 32
  }
});
