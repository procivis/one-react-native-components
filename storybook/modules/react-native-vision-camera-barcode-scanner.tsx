import React, { FC } from 'react';
import { View, ViewProps } from 'react-native';

export const CodeScanner: FC<ViewProps> = (props) => {
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

export interface Code {}

export type BarcodeFormat =
  | 'unknown'
  | 'code-128'
  | 'code-39'
  | 'code-93'
  | 'codabar'
  | 'data-matrix'
  | 'ean-13'
  | 'ean-8'
  | 'itf'
  | 'qr-code'
  | 'upc-a'
  | 'upc-e'
  | 'pdf-417'
  | 'aztec';

export interface Rect {
  bottom: number;
  left: number;
  right: number;
  top: number;
}
export interface Point {
  x: number;
  y: number;
}

export type BarcodeValueType =
  | 'unknown'
  | 'contact-info'
  | 'email'
  | 'isbn'
  | 'phone'
  | 'product'
  | 'sms'
  | 'text'
  | 'url'
  | 'wifi'
  | 'geo'
  | 'calendar-event'
  | 'driver-license';

export interface Barcode {
  readonly boundingBox: Rect;
  readonly cornerPoints: Point[];
  readonly displayValue: string | undefined;
  readonly format: BarcodeFormat;
  readonly rawBytes: ArrayBuffer | undefined;
  readonly rawValue: string | undefined;
  readonly valueType: BarcodeValueType;
}
