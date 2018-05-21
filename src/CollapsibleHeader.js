import React, { Component } from 'react';
import { Animated } from 'react-native';

export default class CollapsibleHeader extends Component {
  state = { y: 0, height: 0 };

  _onLayout = () => {
    this._component._component.measure((x, y, width, height, pageX, pageY) => {
      this.setState({ y: pageY, height });
      this.props.onPosition(pageY);
    });
  };

  render() {
    let {
      item,
      expandedHeight,
      collapsedHeight,
      nextHeaderPosition,
      scrollPosition,
      yOffset,
      contentComponent
    } = this.props;

    let inputRange = [
      this.state.y - yOffset,
      expandedHeight - collapsedHeight + this.state.y - yOffset
    ];

    let outputRange = [0, collapsedHeight - expandedHeight];

    let transition = scrollPosition.interpolate({
      inputRange: inputRange.slice(),
      outputRange: [0, 1],
      extrapolate: 'clamp'
    });

    let innerTranslateY = scrollPosition.interpolate({
      inputRange: inputRange.slice(),
      outputRange: [0, expandedHeight - collapsedHeight],
      extrapolate: 'clamp'
    });

    if (nextHeaderPosition) {
      inputRange.push(
        nextHeaderPosition - expandedHeight - yOffset,
        nextHeaderPosition - collapsedHeight - yOffset
      );
      outputRange.push(collapsedHeight - expandedHeight, 0);
    }

    let translateY = scrollPosition.interpolate({
      inputRange,
      outputRange,
      extrapolate: 'clamp'
    });

    return (
      <Animated.View
        ref={c => (this._component = c)}
        onLayout={this._onLayout}
        style={{ overflow: 'hidden', transform: [{ translateY }] }}
      >
        <Animated.View
          style={{ height: expandedHeight, transform: [{ translateY: innerTranslateY }] }}
        >
          {this.props.render({ item, transition, expandedHeight, collapsedHeight })}
        </Animated.View>
      </Animated.View>
    );
  }
}
