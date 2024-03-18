import React, { FunctionComponent, ReactNode, useCallback, useRef, useState } from 'react';
import { Image, StyleSheet, View, ViewStyle } from 'react-native';
import { CameraStatus, RNCamera, TakePictureOptions } from 'react-native-camera';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAccessibilityFocus } from '../accessibility/accessibility';
import { TouchableOpacity, TouchableOpacityRef } from '../accessibility/accessibilityHistoryWrappers';
import { BackButton } from '../buttons';
import { Typography } from '../text';
import { theme, useAppColorScheme } from '../theme';
import ContrastingStatusBar from '../utils/contrasting-status-bar';
import BlinkingDot from './blinking-dot';

const cameraOverlayImage = require('./avatar-camera-overlay.png');

interface Props {
  imageSize?: number;
  cameraOverlay?: ReactNode;
  overlayContentStyle?: ViewStyle;
  pointerTitle?: ReactNode;
  title?: ReactNode;
  androidCameraPermissionOptions?: {
    title: string;
    message: string;
  };
  accessibilityLabelButton?: string;
  notAuthorizedView?: JSX.Element;
  onPictureCaptured: (uri: string) => void;
  backButton?: JSX.Element;
  onBackPressed?: () => void;
  onError?: (error: Error) => void;
}

const AvatarCamera: FunctionComponent<Props> = ({
  imageSize = 400,
  cameraOverlay = <Image style={styles.cameraOverlay} source={cameraOverlayImage} resizeMode="cover" />,
  overlayContentStyle,
  pointerTitle = 'look here',
  title,
  androidCameraPermissionOptions = {
    title: 'Permission to use camera',
    message: 'We need your permission to use your camera',
  },
  accessibilityLabelButton = 'take picture',
  notAuthorizedView,
  onPictureCaptured,
  backButton,
  onBackPressed,
  onError,
}) => {
  const colorScheme = useAppColorScheme();
  const isCapturing = useRef(false);
  const camera = useRef<RNCamera | null>(null);
  const [cameraStatus, setCameraStatus] = useState<keyof CameraStatus>();

  const takePicture = useCallback(async () => {
    if (cameraStatus === 'READY' && !isCapturing.current) {
      isCapturing.current = true; // Prevent execution multiple times
      camera.current?.stopRecording(); // Make absolutely sure the camera is not recording
      const options: TakePictureOptions = {
        quality: 1,
        base64: false,
        width: imageSize,
        doNotSave: false,
        fixOrientation: true,
        forceUpOrientation: true,
        orientation: 'portrait',
        mirrorImage: true,
      };

      try {
        const data = await camera.current?.takePictureAsync(options);
        const picturePath = data?.uri;
        isCapturing.current = false;
        if (picturePath) {
          onPictureCaptured(picturePath);
        }
      } catch (e) {
        onError?.(e as Error);
      }
    }
  }, [cameraStatus, imageSize, onError, onPictureCaptured]);

  const [announcementFinished, setAnnouncementFinished] = useState(false);
  const accessibilityFocus = useAccessibilityFocus<TouchableOpacityRef>(announcementFinished);

  const renderOverlay = useCallback(() => {
    const overlayRootStyle: ViewStyle = {
      ...styles.root,
      ...overlayContentStyle,
    };

    const captureBorderStyle: ViewStyle = {
      ...styles.captureBorder,
      borderColor: colorScheme.lighterGrey,
    };

    return (
      <>
        {cameraOverlay}
        <SafeAreaView style={styles.container}>
          <View style={overlayRootStyle}>
            <View>
              <View style={styles.header}>
                <View style={styles.flex}>
                  {backButton ??
                    (onBackPressed ? (
                      <BackButton style={styles.backButton} type="white" onPress={onBackPressed} />
                    ) : undefined)}
                </View>
                <View style={[styles.blinkingDotContainer, styles.flex]}>
                  <BlinkingDot style={styles.blinkingDot} color={colorScheme.accent} />
                  <Typography accessible={false} align="center" color="white" size="sml">
                    {pointerTitle}
                  </Typography>
                </View>
                <View style={styles.flex} />
              </View>
              <View style={styles.textWrapper}>
                <Typography
                  announcementActive={true}
                  onAnnouncementFinished={setAnnouncementFinished}
                  color="white"
                  align="center">
                  {title}
                </Typography>
              </View>
            </View>
            <View style={styles.footer}>
              <View style={styles.flex}>
                <TouchableOpacity
                  ref={accessibilityFocus}
                  accessibilityRole="button"
                  accessibilityLabel={accessibilityLabelButton}
                  onPress={takePicture}
                  style={styles.capture}>
                  <View style={captureBorderStyle} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }, [
    cameraOverlay,
    onBackPressed,
    overlayContentStyle,
    takePicture,
    title,
    accessibilityFocus,
    accessibilityLabelButton,
    backButton,
    pointerTitle,
    colorScheme,
  ]);

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
        type={RNCamera.Constants.Type.front}
        captureAudio={false}
        androidCameraPermissionOptions={androidCameraPermissionOptions}
        notAuthorizedView={notAuthorizedView}
        ref={camera}
        onStatusChange={cameraStatusChangeHandler}>
        {renderOverlay()}
      </RNCamera>
    </>
  );
};

const styles = StyleSheet.create({
  backButton: {
    marginLeft: theme.padding,
  },
  blinkingDot: {
    alignSelf: 'center',
    height: 50,
    marginTop: -4,
    width: 50,
  },
  blinkingDotContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: 4,
  },
  camera: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  cameraOverlay: {
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
  capture: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 40,
    height: 80,
    justifyContent: 'center',
    marginVertical: 20,
    width: 80,
  },
  captureBorder: {
    borderRadius: 36,
    borderWidth: 2,
    height: 72,
    width: 72,
  },
  container: {
    flex: 1,
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 150,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  root: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: theme.padding,
  },
  textWrapper: {
    paddingHorizontal: 30,
  },
});

export default AvatarCamera;
