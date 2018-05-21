import React from 'react';
import { View, Text } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stat = ({ icon, color, value, size }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Icon name={icon} size={size} color={color} style={{ marginRight: 4 }} />
    <Text style={{ fontSize: size / 2, color: '#474e4f' }}>{value.toLocaleString()}</Text>
  </View>
);

export default ({ views, likes, comments, size }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <Stat icon="eye" color="#0083ff" value={views} size={size} />
    <Stat icon="heart" color="#F94258" value={likes} size={size} />
    <Stat icon="message-reply-text" color="#666" value={comments} size={size} />
  </View>
);
