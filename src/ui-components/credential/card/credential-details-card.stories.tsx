import type { Meta, StoryContext, StoryObj } from '@storybook/react';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

import CredentialDetailsCardBackground from '../../../../storybook/assets/CredentialCardBackground.png';
import { Placeholder } from '../../../../storybook/placeholder';
import { CredentialNoticeWarningIcon, CredentialWarningIcon } from '../../icons/credential';
import Selector from '../selector';
import { SelectorStatus } from '../selector-status';
import CredentialDetailsCard, { CredentialDetailsCardProps } from './credential-details-card';
import { CarouselImageType } from './credential-image-carousel';

const style = StyleSheet.create({
  card: {
    margin: 16,
  },
  carouselItem: {
    flex: 1,
  },
  footer: {
    backgroundColor: 'lightgray',
    padding: 12,
  },
});

const Render = (args: CredentialDetailsCardProps, context: StoryContext<CredentialDetailsCardProps>) => {
  const viewport = context.parameters.viewport.viewports[context.userGlobals.viewport];
  const width = parseInt(viewport.styles.width.replace('px', '')) - 32;
  const props = {
    ...args,
    card: {
      ...args.card,
      width,
    },
  };
  return <CredentialDetailsCard {...props} style={style.card} />;
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
        values: [
          {
            id: 'attribute-2-1',
            name: 'Attribute 2-1',
            path: 'Attribute 2/Attribute 2-1',
            value: 'Value 2.1',
            rightAccessory: <Selector status={SelectorStatus.Required} />,
          },
          {
            id: 'attribute-2-2',
            name: 'Attribute 2-2',
            path: 'Attribute 2/Attribute 2-2',
            value: 'Value 2.2',
            rightAccessory: <Selector status={SelectorStatus.Required} />,
          },
          {
            id: 'attribute-2-3',
            name: 'Attribute 2-3',
            path: 'Attribute 2/Attribute 2-3',
            value: 'Value 2.3',
            rightAccessory: <Selector status={SelectorStatus.Required} />,
          },
        ],
        id: 'attribute-2',
        name: 'Attribute 2',
        path: 'Attribute 2',
      },
      {
        id: 'attribute-3',
        name: 'Attribute 3',
        path: 'Attribute 3',
        image: {
          uri: 'https://cdn.pixabay.com/photo/2013/07/12/17/47/test-pattern-152459_1280.png',
        },
        rightAccessory: <Selector status={SelectorStatus.Required} />,
      },
      {
        selected: true,
        id: 'attribute-4',
        name: 'Attribute 4',
        path: 'Attribute 4',
        value: 'Value 4',
        rightAccessory: <Selector status={true ? SelectorStatus.SelectedCheckmark : SelectorStatus.Empty} />,
      },
      {
        id: 'attribute-5',
        name: 'Attribute 5',
        path: 'Attribute 5',
        image: {
          uri: 'https://cdn.pixabay.com/photo/2016/02/17/16/09/vertical-1205295_960_720.jpg',
        },
        rightAccessory: <Selector status={SelectorStatus.Required} />,
      },
      {
        id: 'attribute-6',
        name: 'Attribute 6',
        path: 'Attribute 6',
        value: 'Value 6',
        rightAccessory: <Selector status={false ? SelectorStatus.SelectedCheckmark : SelectorStatus.Empty} />,
      },
      {
        selected: true,
        id: 'attribute-7',
        name: 'Attribute 7',
        path: 'Attribute 7',
        value: 'Value 7',
        rightAccessory: <Selector status={true ? SelectorStatus.SelectedCheckmark : SelectorStatus.Empty} />,
      },
      {
        id: 'attribute-8',
        name: 'Attribute 8',
        path: 'Attribute 8',
        value: 'Value 8',
        rightAccessory: <Selector status={false ? SelectorStatus.SelectedCheckmark : SelectorStatus.Empty} />,
      },
      {
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
        id: 'attribute-9',
        name: 'Attribute 9',
        path: 'Attribute 9',
      },
      {
        values: [
          {
            id: 'attribute-10-1',
            name: 'Attribute 10-1',
            path: 'Attribute 10/Attribute 10.1',
            image: {
              uri: 'https://cdn.pixabay.com/photo/2013/07/12/17/47/test-pattern-152459_1280.png',
            },
          },
          {
            id: 'attribute-10-2',
            name: 'Attribute 10-2',
            path: 'Attribute 10/Attribute 10.2',
            image: {
              uri: 'https://cdn.pixabay.com/photo/2013/07/12/17/47/test-pattern-152459_1280.png',
            },
          },
          {
            id: 'attribute-10-3',
            name: 'Attribute 10-3',
            path: 'Attribute 10/Attribute 10.3',
            image: {
              uri: 'https://cdn.pixabay.com/photo/2013/07/12/17/47/test-pattern-152459_1280.png',
            },
          },
        ],
        id: 'attribute-10',
        name: 'Attribute 10',
        path: 'Attribute 10',
      },
    ],
    card: {
      cardImage: { imageSource: CredentialDetailsCardBackground },
      cardCarouselImages: [
        {
          type: CarouselImageType.Photo,
          element: <Placeholder id="R" style={style.carouselItem} />,
        },
        {
          type: CarouselImageType.Barcode,
          element: <Placeholder id="R" style={style.carouselItem} />,
        },
        {
          type: CarouselImageType.MRZ,
          element: <Placeholder id="R" style={style.carouselItem} />,
        },
        {
          type: CarouselImageType.QrCode,
          element: <Placeholder id="R" style={style.carouselItem} />,
        },
      ],
      color: undefined,
      onHeaderPress: () => {},
      header: {
        credentialDetailPrimary: 'Primary Detail',
        credentialDetailSecondary: 'Secondary Detail',
        credentialDetailTestID: undefined,
        credentialDetailErrorColor: false,
        credentialName: 'Credential Name',
        icon: undefined,
        iconLabelColor: undefined,
        statusIcon: CredentialWarningIcon,
      },
      notice: {
        text: 'Notice related to the credential',
        noticeIcon: CredentialNoticeWarningIcon,
      },
      width: Dimensions.get('screen').width - 32,
    },
    showAllButtonLabel: 'See all',
    expanded: true,
    footer: (
      <View style={style.footer}>
        <Text>Footer view</Text>
      </View>
    ),
  },
  render: Render,
};

export { Basic as CredentialDetailsCard };

export default {
  title: 'credential/card/CredentialDetailsCard',
  component: CredentialDetailsCard,
  argTypes: {
    onImagePreview: { action: 'onImagePreview' },
    onAttributeSelected: { action: 'onAttributeSelected' },
  },
  parameters: {
    backgrounds: {
      default: 'background',
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?type=design&node-id=415-10041&mode=design&t=0DWIGZWyWYB7JzPE-0',
    },
  },
} as Meta<typeof CredentialDetailsCard>;
