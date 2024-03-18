import React, { FC, ReactElement } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { TouchableOpacity } from '../accessibility/accessibilityHistoryWrappers';
import { useAccessibilityTranslation } from '../accessibility/accessibilityLanguage';
import { FloatingButton } from '../buttons';
import { DeleteIcon } from '../icon/icon';
import { Typography } from '../text';
import { useAppColorScheme } from '../theme';

interface BaseFile {
  name: string | null;
}

export interface FileInputProps {
  disabled?: boolean;
  label: string;
  files?: BaseFile[];
  onAddPress?: () => void;
  onDeletePress?: (file: BaseFile) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * Generic file input component
 * @see https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=1010-10139&t=WXQdtgcyBKjCDkiV-4
 */
const FileInput: FC<FileInputProps> = ({
  disabled = false,
  files,
  label,
  onAddPress,
  onDeletePress,
  style,
}): ReactElement => {
  const colorScheme = useAppColorScheme();
  const t = useAccessibilityTranslation();

  return (
    <View style={style}>
      {files && files.length > 0 ? (
        files.map((file, index) => (
          <View
            key={file.name}
            style={[styles.file, index === 0 && styles.fileFirst, { backgroundColor: colorScheme.background }]}>
            <View style={styles.fileName}>
              <Typography bold ellipsizeMode="tail" numberOfLines={1}>
                {file.name}
              </Typography>
            </View>

            <TouchableOpacity
              accessibilityLabel={t('accessibility.control.delete')}
              accessibilityRole="button"
              onPress={() => onDeletePress?.(file)}>
              <DeleteIcon />
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <FloatingButton disabled={disabled} icon="add" onPress={onAddPress} label={label} style={styles.addButton} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    marginHorizontal: 0,
  },
  file: {
    alingItems: 'center',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
    marginTop: 8,
    padding: 12,
  },
  fileFirst: {
    marginTop: 0,
  },
  fileName: {
    flex: 1,
  },
});

FileInput.displayName = 'FileInput';

export default FileInput;
