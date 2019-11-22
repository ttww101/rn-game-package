import { View, ActivityIndicator } from 'react-native'
import React from 'react';

export default function LoadingPage() {
  return <View style={{justifyContent: 'center', flex: 10, flexGrow: 10}}>
    <ActivityIndicator size="large" color="#aaa" />
  </View>
  
}