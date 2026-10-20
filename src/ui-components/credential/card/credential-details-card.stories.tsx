import type { Meta, StoryContext, StoryObj } from '@storybook/react';
import React from 'react';
import { Dimensions, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { fn } from 'storybook/test';

import CredentialDetailsCardBackground from '../../../../storybook/assets/CredentialCardBackground.png';
import { ExtendedContext } from '../../../../storybook/context';
import { Placeholder } from '../../../../storybook/placeholder';
import {
  CredentialNoticeWarningIcon,
  CredentialWarningIcon,
} from '../../icons/credential';
import Selector from '../selector';
import { SelectorStatus } from '../selector-status';
import CredentialDetailsCard, {
  CredentialDetailsCardProps,
} from './credential-details-card';
import { CarouselImageType } from './credential-image-carousel';

const style = StyleSheet.create({
  card: {
    margin: 16,
  },
  carouselItem: {
    flex: 1,
  },
  footer: {
    padding: 12,
  },
});

const Render = (
  args: CredentialDetailsCardProps,
  context: StoryContext<CredentialDetailsCardProps>,
) => {
  const extendedContext =
    context as ExtendedContext<CredentialDetailsCardProps>;
  const viewport =
    extendedContext.parameters.viewport.options[
      extendedContext.userGlobals.viewport.value ??
        extendedContext.initialGlobals.viewport.value
    ];
  const width = parseInt(viewport.styles.width.replace('px', ''), 10) - 32;
  const props = {
    ...args,
    card: {
      ...args.card,
      width,
    },
  };
  return <CredentialDetailsCard {...props} style={style.card} />;
};

const backgroundStyle: ViewStyle = {
  backgroundColor: 'lightgray',
};

const Basic: StoryObj<typeof CredentialDetailsCard> = {
  args: {
    attributes: [
      {
        attributes: [
          {
            id: 'attribute-1-1',
            name: 'Attribute 1.1',
            path: 'Attribute 1/Attribute 1.1',
            value: 'Value 1.1',
          },
          {
            attributes: [
              {
                id: 'attribute-1-2-1',
                name: 'Attribute 1.2.1',
                path: 'Attribute 1/Attribute 1.1/Attribute 1.2.1',
                value: 'Value 1.2.1',
              },
              {
                id: 'attribute-1-2-2',
                name: 'Attribute 1.2.2',
                path: 'Attribute 1/Attribute 1.1/Attribute 1.2.2',
                value: 'Value 1.2.2',
              },
            ],
            id: 'attribute-1-2',
            name: 'Attribute 1.2',
            path: 'Attribute 1/Attribute 1.2',
          },
        ],
        id: 'attribute-1',
        name: 'Attribute 1',
        path: 'Attribute 1',
      },
      {
        id: 'attribute-2',
        name: 'Attribute 2',
        path: 'Attribute 2',
        values: [
          {
            id: 'attribute-2-1',
            name: 'Attribute 2-1',
            path: 'Attribute 2/Attribute 2-1',
            rightAccessory: <Selector status={SelectorStatus.Required} />,
            value: 'Value 2.1',
          },
          {
            id: 'attribute-2-2',
            name: 'Attribute 2-2',
            path: 'Attribute 2/Attribute 2-2',
            rightAccessory: <Selector status={SelectorStatus.Required} />,
            value: 'Value 2.2',
          },
          {
            id: 'attribute-2-3',
            name: 'Attribute 2-3',
            path: 'Attribute 2/Attribute 2-3',
            rightAccessory: <Selector status={SelectorStatus.Required} />,
            value: 'Value 2.3',
          },
        ],
      },
      {
        id: 'attribute-3',
        image: {
          uri: 'https://cdn.pixabay.com/photo/2013/07/12/17/47/test-pattern-152459_1280.png',
        },
        name: 'Attribute 3',
        path: 'Attribute 3',
        rightAccessory: <Selector status={SelectorStatus.Required} />,
      },
      {
        id: 'attribute-4',
        name: 'Attribute 4',
        path: 'Attribute 4',
        rightAccessory: <Selector status={SelectorStatus.SelectedCheckmark} />,
        selected: true,
        value: 'Value 4',
      },
      {
        id: 'attribute-5',
        image: {
          uri: 'https://cdn.pixabay.com/photo/2016/02/17/16/09/vertical-1205295_960_720.jpg',
        },
        name: 'Attribute 5',
        path: 'Attribute 5',
        rightAccessory: <Selector status={SelectorStatus.Required} />,
      },
      {
        id: 'attribute-6',
        name: 'Attribute 6',
        path: 'Attribute 6',
        rightAccessory: <Selector status={SelectorStatus.Empty} />,
        value: 'Value 6',
      },
      {
        id: 'attribute-7',
        name: 'Attribute 7',
        path: 'Attribute 7',
        rightAccessory: <Selector status={SelectorStatus.SelectedCheckmark} />,
        selected: true,
        value: 'Value 7',
      },
      {
        id: 'attribute-8',
        name: 'Attribute 8',
        path: 'Attribute 8',
        rightAccessory: <Selector status={SelectorStatus.Empty} />,
        value: 'Value 8',
      },
      {
        id: 'attribute-9',
        name: 'Attribute 9',
        path: 'Attribute 9',
        values: [
          {
            attributes: [
              {
                id: 'attribute-9-1-1',
                name: 'Attribute 9.1.1',
                path: 'Attribute 9/0/Attribute 9.1.1',
                value: 'Value 9.1.1',
              },
              {
                id: 'attribute-9-1-2',
                name: 'Attribute 9.1.2',
                path: 'Attribute 9/0/Attribute 9.1.2',
                value: 'Value 9.1.2',
              },
            ],
            id: 'attribute-9-1',
            name: 'Attribute 9-1',
            path: 'Attribute 9/0',
          },
          {
            attributes: [
              {
                id: 'attribute-9-2-1',
                name: 'Attribute 9.2.1',
                path: 'Attribute 9/1/Attribute 9.2.1',
                value: 'Value 9.2.1',
              },
              {
                id: 'attribute-9-2-2',
                name: 'Attribute 9.2.2',
                path: 'Attribute 9/1/Attribute 9.2.2',
                value: 'Value 9.2.2',
              },
            ],
            id: 'attribute-9-2',
            name: 'Attribute 9-2',
            path: 'Attribute 9/1',
          },
          {
            attributes: [
              {
                id: 'attribute-9-3-1',
                name: 'Attribute 9.3.1',
                path: 'Attribute 9/2/Attribute 9.3.1',
                value: 'Value 9.3.1',
              },
              {
                id: 'attribute-9-3-2',
                name: 'Attribute 9.3.2',
                path: 'Attribute 9/2/Attribute 9.3.2',
                value: 'Value 9.3.2',
              },
            ],
            id: 'attribute-9-3',
            name: 'Attribute 9-3',
            path: 'Attribute 9/2',
          },
        ],
      },
      {
        id: 'attribute-10',
        name: 'Attribute 10',
        path: 'Attribute 10',
        values: [
          {
            id: 'attribute-10-1',
            image: {
              uri: 'https://cdn.pixabay.com/photo/2013/07/12/17/47/test-pattern-152459_1280.png',
            },
            name: 'Attribute 10-1',
            path: 'Attribute 10/Attribute 10.1',
          },
          {
            id: 'attribute-10-2',
            image: {
              uri: 'https://cdn.pixabay.com/photo/2013/07/12/17/47/test-pattern-152459_1280.png',
            },
            name: 'Attribute 10-2',
            path: 'Attribute 10/Attribute 10.2',
          },
          {
            id: 'attribute-10-3',
            image: {
              uri: 'https://cdn.pixabay.com/photo/2013/07/12/17/47/test-pattern-152459_1280.png',
            },
            name: 'Attribute 10-3',
            path: 'Attribute 10/Attribute 10.3',
          },
        ],
      },
    ],
    card: {
      cardCarouselImages: [
        {
          element: <Placeholder id="R" style={style.carouselItem} />,
          type: CarouselImageType.Photo,
        },
        {
          element: <Placeholder id="R" style={style.carouselItem} />,
          type: CarouselImageType.Barcode,
        },
        {
          element: <Placeholder id="R" style={style.carouselItem} />,
          type: CarouselImageType.MRZ,
        },
        {
          element: <Placeholder id="R" style={style.carouselItem} />,
          type: CarouselImageType.QrCode,
        },
      ],
      cardImage: { imageSource: CredentialDetailsCardBackground },
      color: undefined,
      header: {
        credentialDetailErrorColor: false,
        credentialDetailPrimary: 'Primary Detail',
        credentialDetailSecondary: 'Secondary Detail',
        credentialDetailTestID: undefined,
        credentialName: 'Credential Name',
        icon: undefined,
        iconLabelColor: undefined,
        statusIcon: CredentialWarningIcon,
      },
      notice: {
        noticeIcon: CredentialNoticeWarningIcon,
        text: 'Notice related to the credential',
      },

      onHeaderPress: fn(),
      width: Dimensions.get('screen').width - 32,
    },
    expanded: true,
    footer: (
      <View style={[style.footer, backgroundStyle]}>
        <Text>Footer view</Text>
      </View>
    ),
    showAllButtonLabel: 'See all',
  },
  render: Render,
};

export { Basic as CredentialDetailsCard };

export default {
  argTypes: {
    onAttributeSelected: { action: 'onAttributeSelected' },
    onImagePreview: { action: 'onImagePreview' },
  },
  component: CredentialDetailsCard,
  parameters: {
    backgrounds: {
      default: 'background',
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?type=design&node-id=415-10041&mode=design&t=0DWIGZWyWYB7JzPE-0',
    },
  },
  title: 'credential/card/CredentialDetailsCard',
} as Meta<typeof CredentialDetailsCard>;
