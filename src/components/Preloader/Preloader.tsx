import React, { FC, memo } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const Preloader: FC<{ visible: boolean }> = ({ visible }) =>
  visible ? (
    <View style={styles.container}>
      <ActivityIndicator animating />
    </View>
  ) : null;

export default memo(Preloader);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
});
