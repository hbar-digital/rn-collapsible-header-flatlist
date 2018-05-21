import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import moment from 'moment';

import Stats from './Stats';

export default ({ item: { content, views, likes, comments, avatar, name, image, createdAt } }) => (
  <View style={styles.card}>
    <View style={styles.infoContainer}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <View style={{ justifyContent: 'space-evenly' }}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.date}>{moment(createdAt).fromNow()}</Text>
      </View>
    </View>
    <Text style={styles.content}>{content}</Text>
    <View style={styles.imageContainer}>
      <Image source={{ uri: image }} style={styles.image} />
    </View>
    <Stats size={24} {...{ views, likes, comments }} />
  </View>
);

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    paddingBottom: 10,
    backgroundColor: 'white',
    borderRadius: 4,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 }
  },
  infoContainer: { marginBottom: 12, flexDirection: 'row' },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  name: { fontSize: 16, fontWeight: '700' },
  date: { color: '#9aa0a0' },
  imageContainer: { height: 200, marginVertical: 12 },
  image: { position: 'absolute', ...StyleSheet.absoluteFillObject },
  content: { color: '#9aa0a0' }
});
