import React, { FC } from 'react';
import { View, ViewProps } from 'react-native';

export const Camera: FC<ViewProps> = (props) => {
  return <View {...props} />;
};

export function useCameraDevice(..._: any[]): any {
  return {};
}

export function useCameraPermission(): any {
  return {
    hasPermission: true,
    requestPermission: () => {},
  };
}

export function useCodeScanner(..._: any[]): any {
  return {};
}

export interface Code {}

export type CodeType =
  | 'code-128'
  | 'code-39'
  | 'code-93'
  | 'codabar'
  | 'ean-13'
  | 'ean-8'
  | 'itf'
  | 'upc-e'
  | 'upc-a'
  | 'qr'
  | 'pdf-417'
  | 'aztec'
  | 'data-matrix';
