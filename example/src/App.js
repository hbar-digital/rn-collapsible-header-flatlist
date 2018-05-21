import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import RNCollapsibleHeaderFlatList from 'rn-collapsible-header-flatlist';

import FeedHeader from './FeedHeader';
import FeedActivity from './FeedActivity';

import data from './data/data.js';

export default class App extends Component {
  state = { data };

  _renderTitle = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Feed</Text>
    </View>
  );

  _renderItem = data => <FeedActivity {...data} />;

  _renderHeader = data => <FeedHeader {...data} />;

  _getHeaderIndices = () =>
    this.state.data.reduce((acc, d, i) => (d.month ? [...acc, i] : acc), []);

  render() {
    return (
      <View style={styles.container}>
        {this._renderTitle()}
        <RNCollapsibleHeaderFlatList
          data={this.state.data}
          keyExtractor={item => item.id}
          renderItem={this._renderItem}
          renderHeader={this._renderHeader}
          stickyHeaderIndices={this._getHeaderIndices()}
          headerExpandedHeight={80}
          headerCollapsedHeight={40}
          useNativeDriver={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA'
  },
  headerContainer: {
    paddingTop: 22
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    paddingVertical: 12
  }
});
