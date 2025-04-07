import React, { FC } from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';

const ListPageLoadingIndicator: FC<ActivityIndicatorProps> = (props) => {
  return <ActivityIndicator {...props} />;
};

export default ListPageLoadingIndicator;
