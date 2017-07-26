import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Bubbles } from 'react-native-loader';

const Loading = (props) => (
  <View style={{ paddingTop: 6 }}>
    <Bubbles
      size={3}
      color={props.color}
    />
  </View>
);

Loading.propTypes = {
  color: PropTypes.string.isRequired,
};

export default Loading;
