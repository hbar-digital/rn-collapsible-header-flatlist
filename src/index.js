import React, { Component } from 'react';
import { Animated, FlatList, View } from 'react-native';

import produce from 'immer';

import CollapsibleHeader from './CollapsibleHeader';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default class CollapsibleHeaderFlatList extends Component {
  _scrollPosition = new Animated.Value(0);

  state = { y: 0, headerPositions: {} };

  constructor(props) {
    super(props);

    let { useNativeDriver = true } = props;

    this._onScroll = Animated.event(
      [{ nativeEvent: { contentOffset: { y: this._scrollPosition } } }],
      { useNativeDriver }
    );
  }

  _onLayout = () => {
    this._container.measure((x, y, width, height, pageX, pageY) => {
      this.setState({ y: pageY });
    });
  };

  _setHeaderPosition = (i, y) => {
    this.setState(
      produce(({ headerPositions }) => {
        headerPositions[i] = y;
      })
    );
  };

  _renderHeader = ({ item, index: i }) => {
    let nextHeaderIndex = this.props.stickyHeaderIndices.find(h => h > i);
    let nextHeaderPosition = this.state.headerPositions[nextHeaderIndex];
    let { headerExpandedHeight, headerCollapsedHeight } = this.props;

    return (
      <CollapsibleHeader
        item={item}
        expandedHeight={headerExpandedHeight}
        collapsedHeight={headerCollapsedHeight}
        scrollPosition={this._scrollPosition}
        nextHeaderPosition={nextHeaderPosition}
        yOffset={this.state.y}
        onPosition={y => this._setHeaderPosition(i, y)}
        render={this.props.renderHeader}
      />
    );
  };

  _renderItemOrHeader = data => {
    let isHeader = this.props.stickyHeaderIndices.includes(data.index);

    if (isHeader) return this._renderHeader(data);

    return this.props.renderItem(data);
  };

  render() {
    let { renderItem, ...props } = this.props;
    return (
      <View ref={container => (this._container = container)} onLayout={this._onLayout}>
        <AnimatedFlatList
          extraData={this.state}
          renderItem={this._renderItemOrHeader}
          onScroll={this._onScroll}
          {...props}
        />
      </View>
    );
  }
}
