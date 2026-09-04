import { useIsFocused } from '@react-navigation/native';
import React, { FunctionComponent, useMemo } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { useCameraDevice } from 'react-native-vision-camera';
import { Barcode, CodeScanner, TargetBarcodeFormat } from 'react-native-vision-camera-barcode-scanner';

import { useIsAppActive } from '../../utils';
import CameraOverlay from './camera-overlay';

export type QRCodeScannerProps = ViewProps & {
  cameraOverlay?: React.ComponentType<any> | React.ReactElement;
  codeTypes?: TargetBarcodeFormat[];
  noCameraView?: JSX.Element;
  onQRCodeRead: (code: Barcode[]) => void;
};

const QRCodeScanner: FunctionComponent<QRCodeScannerProps> = ({
  cameraOverlay,
  codeTypes = ['qr-code'],
  onQRCodeRead,
  noCameraView = null,
  ...viewProps
}) => {
  const isFocused = useIsFocused();
  const isAppActive = useIsAppActive();

  const device = useCameraDevice('back');

  const cameraOverlayView = useMemo(() => {
    if (!cameraOverlay) {
      return <CameraOverlay />;
    }
    if (React.isValidElement(cameraOverlay)) {
      return cameraOverlay;
    } else {
      const CameraOverlayComponent = cameraOverlay as React.ComponentType<any>;
      return <CameraOverlayComponent />;
    }
  }, [cameraOverlay]);

  if (!device) {
    return noCameraView;
  }

  return (
    <View {...viewProps}>
      <CodeScanner
        barcodeFormats={codeTypes}
        isActive={isFocused && isAppActive !== false}
        onBarcodeScanned={onQRCodeRead}
        onError={() => {}}
        style={StyleSheet.absoluteFill}
      />
      {cameraOverlayView}
    </View>
  );
};

export default QRCodeScanner;
