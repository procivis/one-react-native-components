import React, { FunctionComponent, useCallback, useRef, useState } from 'react';
import { Insets, StyleSheet, View } from 'react-native';
import { CameraStatus, RNCamera, TakePictureOptions, TakePictureResponse } from 'react-native-camera';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TouchableOpacity } from '../accessibility/accessibilityHistoryWrappers';
import { BackButton } from '../buttons';
import { Typography } from '../text';
import { useAppColorScheme } from '../theme';
import ContrastingStatusBar from '../utils/contrasting-status-bar';

export interface DocumentCameraProps {
  onBack?: () => void;
  title: string;
  androidCameraPermissionOptions?: {
    title: string;
    message: string;
  };
  accessibilityLabelButton?: string;
  notAuthorizedView?: JSX.Element;
  pictureOptions?: Partial<TakePictureOptions>;
  onPictureCaptured: (picture: TakePictureResponse) => void;
  onError?: (error: Error) => void;
}

const backButtonHitSlop: Insets = { top: 8, bottom: 12, left: 24, right: 24 };

const DocumentCamera: FunctionComponent<DocumentCameraProps> = ({
  title,
  androidCameraPermissionOptions = {
    title: 'Permission to use camera',
    message: 'We need your permission to use your camera',
  },
  accessibilityLabelButton = 'take picture',
  notAuthorizedView,
  pictureOptions,
  onPictureCaptured,
  onBack,
  onError,
}) => {
  const colorScheme = useAppColorScheme();
  const isCapturing = useRef(false);
  const camera = useRef<RNCamera>(null);
  const [cameraStatus, setCameraStatus] = useState<keyof CameraStatus>();

  const insets = useSafeAreaInsets();

  const takePicture = useCallback(async () => {
    if (cameraStatus === 'READY' && !isCapturing.current) {
      isCapturing.current = true; // Prevent execution multiple times
      camera.current?.stopRecording(); // Make absolutely sure the camera is not recording
      const options: TakePictureOptions = {
        quality: 1,
        base64: false,
        doNotSave: false,
        fixOrientation: true,
        forceUpOrientation: true,
        orientation: 'portrait',
        ...pictureOptions,
      };

      try {
        const data = await camera.current?.takePictureAsync(options);
        isCapturing.current = false;
        if (data) {
          onPictureCaptured(data);
        }
      } catch (e) {
        isCapturing.current = false;
        onError?.(e as Error);
      }
    }
  }, [cameraStatus, onError, onPictureCaptured, pictureOptions]);

  const cameraStatusChangeHandler = useCallback(
    (event: { cameraStatus: keyof CameraStatus }) => {
      setCameraStatus(event.cameraStatus);
    },
    [setCameraStatus],
  );

  return (
    <>
      <ContrastingStatusBar backgroundColor="black" />
      <RNCamera
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}
        androidCameraPermissionOptions={androidCameraPermissionOptions}
        notAuthorizedView={notAuthorizedView}
        ref={camera}
        onStatusChange={cameraStatusChangeHandler}>
        <View style={styles.overlay}>
          <View style={[styles.header, { backgroundColor: colorScheme.overlay, paddingTop: insets.top }]}>
            <View style={styles.backButtonWrapper}>
              {onBack ? <BackButton onPress={onBack} hitSlop={backButtonHitSlop} type="white" /> : null}
            </View>
            <Typography
              color={colorScheme.white}
              bold={true}
              size="h1"
              align="center"
              accessibilityRole="header"
              style={styles.title}>
              {title}
            </Typography>
          </View>

          <View
            style={[
              styles.footer,
              { backgroundColor: colorScheme.overlay, paddingBottom: Math.max(insets.bottom, 24) },
            ]}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={accessibilityLabelButton}
              onPress={takePicture}
              style={[styles.capture, { borderColor: colorScheme.lighterGrey, backgroundColor: colorScheme.white }]}
            />
          </View>
        </View>
      </RNCamera>
    </>
  );
};

const styles = StyleSheet.create({
  backButtonWrapper: {
    minHeight: 38,
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  camera: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  capture: {
    borderRadius: 36,
    borderWidth: 9,
    height: 72,
    width: 72,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    paddingBottom: 24,
    width: '100%',
  },
  overlay: {
    height: '100%',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    alignSelf: 'center',
    paddingTop: 6,
  },
});

export default DocumentCamera;
