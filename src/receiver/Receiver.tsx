import React, { FunctionComponent, ReactNode, useMemo } from 'react';
import { Insets, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import type { SvgProps } from 'react-native-svg';

import { TouchableOpacity } from '../accessibility';
import { HelpIcon } from '../icon/icon';
import { ImageOrComponent, ImageOrComponentSource } from '../image';
import { Typography } from '../text';
import { useAppColorScheme } from '../theme';
import { BackupErrorIcon, BackupGoodIcon, BackupSyncIcon } from './backup-badge-icon';
import { SafeBadgeIcon, TrustedBadgeIcon, WarningBadgeIcon } from './sharing-badge-icon';

export enum ReceiverValidity {
  Trusted = 'trusted',
  Safe = 'safe',
  Warning = 'warning',
}

export enum BackupStatus {
  Good = 'backupGood',
  Syncing = 'backupSyncing',
  Failure = 'backupFailure',
}

export interface ReceiverNotice {
  description: ReactNode;
  error: boolean;
}

export interface ReceiverProps {
  style?: StyleProp<ViewStyle>;
  noticeStyle?: StyleProp<ViewStyle>;
  receiverIcon?: ImageOrComponentSource;
  receiverTitle: string;
  receiverValidity?: ReceiverValidity | BackupStatus;
  receiverLabel: string;
  notice?: ReceiverNotice | ReceiverNotice[];
  detailButtonAccessibilityLabel?: string;
  onDetail?: () => void;
}

const detailButtonHitslop: Insets = { left: 10, right: 10, top: 10, bottom: 10 };

const ValidityIcons: Record<ReceiverValidity, React.ComponentType<SvgProps>> = {
  [ReceiverValidity.Trusted]: TrustedBadgeIcon,
  [ReceiverValidity.Safe]: SafeBadgeIcon,
  [ReceiverValidity.Warning]: WarningBadgeIcon,
};

const BackupIcons: Record<BackupStatus, React.ComponentType<SvgProps>> = {
  [BackupStatus.Good]: BackupGoodIcon,
  [BackupStatus.Syncing]: BackupSyncIcon,
  [BackupStatus.Failure]: BackupErrorIcon,
};

const AllIcons = { ...ValidityIcons, ...BackupIcons };

const Receiver: FunctionComponent<ReceiverProps> = ({
  style,
  noticeStyle,
  receiverIcon,
  receiverTitle,
  receiverValidity,
  receiverLabel,
  notice,
  detailButtonAccessibilityLabel,
  onDetail,
}) => {
  const colorScheme = useAppColorScheme();
  const StatusIcon = receiverValidity ? AllIcons[receiverValidity] : undefined;

  const icon = useMemo<ImageOrComponentSource>(() => {
    if (receiverIcon) {
      return receiverIcon;
    }

    const initials = receiverLabel.split(' ', 3).map((word: string) => word[0]);
    const placeholder = initials.length > 0 ? initials.join('') : '';
    return {
      component: (
        <View style={[styles.avatarPlaceholder, { backgroundColor: colorScheme.accent }]}>
          <Typography color={colorScheme.accentText} style={styles.avatarPlaceholderText}>
            {placeholder}
          </Typography>
        </View>
      ),
    };
  }, [colorScheme, receiverIcon, receiverLabel]);

  const notices = notice ? (Array.isArray(notice) ? notice : [notice]) : undefined;

  return (
    <>
      <View style={styles.contentWrapper}>
        <View style={[styles.receiver, style]}>
          <View accessibilityElementsHidden={true} style={[styles.receiverIconContainer, colorScheme.shadow]}>
            <ImageOrComponent source={icon} style={styles.receiverIcon} />
          </View>
          <View style={styles.receiverLabels}>
            <View style={[styles.receiverName, styles.topRow]}>
              <Typography bold={true} size="sml" caps={true} color={colorScheme.text} style={styles.receiverTitle}>
                {receiverTitle}
              </Typography>
              {onDetail && (
                <View style={styles.detailButtonPlacement}>
                  <View style={styles.detailButtonWrapper}>
                    <TouchableOpacity
                      style={[styles.detailButton, { backgroundColor: colorScheme.background }]}
                      hitSlop={detailButtonHitslop}
                      onPress={onDetail}
                      accessibilityRole="button"
                      accessibilityLabel={detailButtonAccessibilityLabel}>
                      <HelpIcon />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
            <View style={styles.receiverName}>
              {StatusIcon && <StatusIcon style={styles.statusBadge} />}
              <Typography color={colorScheme.text}>{receiverLabel}</Typography>
            </View>
          </View>
        </View>
        {notices
          ? notices.map((notice, i) => (
              <View
                key={`notice-${i}`}
                style={[
                  styles.notice,
                  { backgroundColor: notice.error ? colorScheme.alert : colorScheme.notice },
                  noticeStyle,
                ]}>
                <Typography color={notice.error ? colorScheme.alertText : colorScheme.noticeText} align="center">
                  {notice.description}
                </Typography>
              </View>
            ))
          : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  avatarPlaceholder: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  avatarPlaceholderText: {
    textTransform: 'uppercase',
  },
  contentWrapper: {
    elevation: 2,
  },
  detailButton: {
    borderRadius: 12,
    height: 24,
    width: 24,
  },
  detailButtonPlacement: {
    alignItems: 'center',
    height: 24,
    justifyContent: 'center',
    width: 24,
  },
  detailButtonWrapper: {
    alignItems: 'center',
    height: 44,
    justifyContent: 'center',
    position: 'absolute',
    width: 44,
  },
  notice: {
    marginBottom: 12,
    marginHorizontal: 24,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  receiver: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  receiverIcon: {
    height: '100%',
    width: '100%',
  },
  receiverIconContainer: {
    borderRadius: 36,
    height: 72,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: -1 },
    shadowRadius: 1,
    width: 72,
  },
  receiverLabels: {
    flex: 1,
    marginLeft: 12,
  },
  receiverName: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  receiverTitle: {
    flex: 1,
  },
  statusBadge: {
    marginRight: 4,
  },
  topRow: {
    minHeight: 24,
  },
});

export default Receiver;
