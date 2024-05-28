import React, { FC } from 'react';
import Svg, { Path, Rect, SvgProps } from 'react-native-svg';

import { useAppColorScheme } from '../theme/color-scheme-context';

// https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?type=design&node-id=465-117924&mode=dev
export const OpenLinkIcon: FC<SvgProps> = () => {
  const colorScheme = useAppColorScheme();

  return (
    <Svg fill="none" height={24} viewBox="0 0 24 24" width={24}>
      <Rect fill={colorScheme.white} fillOpacity={0.08} height={24} rx={12} width={24} />
      <Path
        d="M8.07617 19.2764C7.36068 19.2764 6.82292 19.0986 6.46289 18.7432C6.10742 18.3923 5.92969 17.8636 5.92969 17.1572V10.335C5.92969 9.62858 6.10742 9.09993 6.46289 8.74902C6.82292 8.39355 7.36068 8.21582 8.07617 8.21582H10.1338V9.31641H8.08984C7.74805 9.31641 7.486 9.40755 7.30371 9.58984C7.12142 9.77214 7.03027 10.041 7.03027 10.3965V17.0957C7.03027 17.4512 7.12142 17.7201 7.30371 17.9023C7.486 18.0846 7.74805 18.1758 8.08984 18.1758H15.8965C16.2337 18.1758 16.4958 18.0846 16.6826 17.9023C16.8695 17.7201 16.9629 17.4512 16.9629 17.0957V10.3965C16.9629 10.041 16.8695 9.77214 16.6826 9.58984C16.4958 9.40755 16.2337 9.31641 15.8965 9.31641H13.8594V8.21582H15.917C16.6325 8.21582 17.168 8.39355 17.5234 8.74902C17.8835 9.10449 18.0635 9.63314 18.0635 10.335V17.1572C18.0635 17.859 17.8835 18.3877 17.5234 18.7432C17.168 19.0986 16.6325 19.2764 15.917 19.2764H8.07617ZM11.9932 13.9238C11.8473 13.9238 11.7197 13.8714 11.6104 13.7666C11.5055 13.6618 11.4531 13.5365 11.4531 13.3906V6.37012L11.4941 5.34473L11.0293 5.83008L9.99707 6.9375C9.90137 7.04688 9.77604 7.10156 9.62109 7.10156C9.47526 7.10156 9.35677 7.05599 9.26562 6.96484C9.17448 6.8737 9.12891 6.75749 9.12891 6.61621C9.12891 6.48861 9.18132 6.37012 9.28613 6.26074L11.5967 4.03223C11.6696 3.96387 11.7357 3.91602 11.7949 3.88867C11.8587 3.86133 11.9248 3.84766 11.9932 3.84766C12.0661 3.84766 12.1322 3.86133 12.1914 3.88867C12.2552 3.91602 12.3213 3.96387 12.3896 4.03223L14.7002 6.26074C14.8096 6.37012 14.8643 6.48861 14.8643 6.61621C14.8643 6.75749 14.8164 6.8737 14.7207 6.96484C14.625 7.05599 14.5065 7.10156 14.3652 7.10156C14.2148 7.10156 14.0918 7.04688 13.9961 6.9375L12.957 5.83008L12.499 5.34473L12.54 6.37012V13.3906C12.54 13.5365 12.4854 13.6618 12.376 13.7666C12.2712 13.8714 12.1436 13.9238 11.9932 13.9238Z"
        fill={colorScheme.white}
        opacity={0.9}
      />
    </Svg>
  );
};

// https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?type=design&node-id=465-111516&mode=dev
export const CopyContentIcon: FC<SvgProps> = () => {
  const colorScheme = useAppColorScheme();

  return (
    <Svg height={24} width={24}>
      <Rect fill="rgba(255, 255, 255, 0.08)" fillOpacity={0.08} height={24} rx={12} width={24} />
      <Path
        d="M8.32227 7.50488V5.60449C8.32227 4.889 8.49772 4.35352 8.84863 3.99805C9.2041 3.63802 9.73503 3.45801 10.4414 3.45801H16.8672C17.5736 3.45801 18.1022 3.63802 18.4531 3.99805C18.8086 4.35807 18.9863 4.89355 18.9863 5.60449V15.0996C18.9863 15.8105 18.8086 16.346 18.4531 16.7061C18.1022 17.0661 17.5736 17.2461 16.8672 17.2461H15.3496V12.4678L10.4346 7.50488H8.32227ZM11.9863 5.80273H15.3223C15.4681 5.80273 15.5775 5.76172 15.6504 5.67969C15.7233 5.59766 15.7598 5.50423 15.7598 5.39941V5.25586C15.7598 5.15104 15.7233 5.05762 15.6504 4.97559C15.5775 4.89355 15.4681 4.85254 15.3223 4.85254H11.9863C11.8359 4.85254 11.7243 4.89355 11.6514 4.97559C11.583 5.05762 11.5488 5.15104 11.5488 5.25586V5.39941C11.5488 5.50423 11.583 5.59766 11.6514 5.67969C11.7243 5.76172 11.8359 5.80273 11.9863 5.80273ZM5.00684 18.5107V9.01562C5.00684 8.30469 5.18229 7.76921 5.5332 7.40918C5.88867 7.04915 6.4196 6.86914 7.12598 6.86914H9.53906C9.92188 6.86914 10.2386 6.91016 10.4893 6.99219C10.7399 7.07422 10.9951 7.24967 11.2549 7.51855L15.0215 11.3535C15.2038 11.5404 15.3405 11.7181 15.4316 11.8867C15.5273 12.0508 15.5911 12.2331 15.623 12.4336C15.6549 12.6341 15.6709 12.8802 15.6709 13.1719V18.5107C15.6709 19.2217 15.4932 19.7572 15.1377 20.1172C14.7868 20.4772 14.2581 20.6572 13.5518 20.6572H7.12598C6.4196 20.6572 5.88867 20.4772 5.5332 20.1172C5.18229 19.7617 5.00684 19.2262 5.00684 18.5107ZM6.10742 18.4902C6.10742 18.832 6.19629 19.0941 6.37402 19.2764C6.55632 19.4632 6.82292 19.5566 7.17383 19.5566H13.4971C13.848 19.5566 14.1146 19.4632 14.2969 19.2764C14.4792 19.0941 14.5703 18.832 14.5703 18.4902V13.2266H10.708C10.2842 13.2266 9.96289 13.1195 9.74414 12.9053C9.52995 12.6911 9.42285 12.3675 9.42285 11.9346V7.96973H7.18066C6.8252 7.96973 6.55632 8.06315 6.37402 8.25C6.19629 8.43229 6.10742 8.69206 6.10742 9.0293V18.4902ZM10.8379 12.1943H14.3584L10.4551 8.22266V11.8115C10.4551 11.9482 10.4847 12.0462 10.5439 12.1055C10.6032 12.1647 10.7012 12.1943 10.8379 12.1943Z"
        fill={colorScheme.white}
        opacity={0.9}
      />
    </Svg>
  );
};

// https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?type=design&node-id=454-100241&mode=dev
export const CredentialValidIcon = (
  <Svg fill="none" height={22} viewBox="0 0 22 22" width={22}>
    <Path
      d="M10.5747 20C9.40153 20 8.29753 19.7759 7.2627 19.3276C6.22786 18.8849 5.31478 18.2679 4.52344 17.4766C3.73763 16.6852 3.12061 15.7721 2.67236 14.7373C2.22412 13.7025 2 12.5985 2 11.4253C2 10.2521 2.22412 9.14811 2.67236 8.11328C3.12061 7.07845 3.73763 6.16813 4.52344 5.38232C5.31478 4.59098 6.2251 3.97119 7.25439 3.52295C8.28923 3.07471 9.39323 2.85059 10.5664 2.85059C11.7451 2.85059 12.8519 3.07471 13.8867 3.52295C14.9215 3.97119 15.8346 4.59098 16.626 5.38232C17.4173 6.16813 18.0371 7.07845 18.4854 8.11328C18.9336 9.14811 19.1577 10.2521 19.1577 11.4253C19.1577 12.5985 18.9336 13.7025 18.4854 14.7373C18.0371 15.7721 17.4173 16.6852 16.626 17.4766C15.8346 18.2679 14.9215 18.8849 13.8867 19.3276C12.8519 19.7759 11.7479 20 10.5747 20Z"
      fill="#00D066"
    />
    <Path
      d="M3.81385 18.1812L3.81633 18.1837C4.69776 19.0651 5.71679 19.7536 6.86722 20.2461C8.032 20.7503 9.27117 21 10.5747 21C11.8782 21 13.1174 20.7503 14.2821 20.2461C15.4326 19.7537 16.4516 19.0651 17.3331 18.1837C18.2142 17.3026 18.9051 16.2842 19.403 15.1348C19.9077 13.9694 20.1577 12.7296 20.1577 11.4253C20.1577 10.121 19.9077 8.88117 19.403 7.71581C18.905 6.56624 18.2138 5.55009 17.3318 4.67398C16.451 3.79349 15.4331 3.103 14.2842 2.60533C13.1182 2.10029 11.8755 1.85059 10.5664 1.85059C9.26213 1.85059 8.02228 2.10055 6.85692 2.60533L6.85513 2.60611C5.71136 3.10421 4.69653 3.79502 3.81633 4.67522C2.94015 5.5514 2.25228 6.56718 1.75475 7.71581C1.24997 8.88117 1 10.121 1 11.4253C1 12.7296 1.24997 13.9694 1.75475 15.1348C2.252 16.2828 2.93915 17.3003 3.81385 18.1812Z"
      stroke="white"
      strokeOpacity="0.2"
      strokeWidth="2"
    />
    <Path
      d="M9.91406 15.3828C10.0703 15.3828 10.2135 15.3464 10.3438 15.2734C10.4792 15.1953 10.5938 15.0885 10.6875 14.9531L14.3359 9.3125C14.3932 9.22396 14.4401 9.13021 14.4766 9.03125C14.5182 8.93229 14.5391 8.83333 14.5391 8.73438C14.5391 8.51562 14.4557 8.33854 14.2891 8.20312C14.1276 8.06771 13.9427 8 13.7344 8C13.4583 8 13.2266 8.14844 13.0391 8.44531L9.89062 13.4766L8.44531 11.6641C8.34115 11.5339 8.23698 11.4427 8.13281 11.3906C8.02865 11.3333 7.91146 11.3047 7.78125 11.3047C7.5625 11.3047 7.3776 11.3828 7.22656 11.5391C7.07552 11.6901 7 11.875 7 12.0938C7 12.1979 7.01823 12.2995 7.05469 12.3984C7.09635 12.4922 7.15365 12.5885 7.22656 12.6875L9.10938 14.9531C9.22396 15.099 9.34635 15.2083 9.47656 15.2812C9.60677 15.349 9.7526 15.3828 9.91406 15.3828Z"
      fill="white"
    />
  </Svg>
);

// https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?type=design&node-id=544-93347&mode=dev
export const CredentialSuspendedIcon = (
  <Svg fill="none" height={22} viewBox="0 0 22 22" width={22}>
    <Path
      d="M10.5747 20C9.40153 20 8.29753 19.7759 7.2627 19.3276C6.22786 18.8849 5.31478 18.2679 4.52344 17.4766C3.73763 16.6852 3.12061 15.7721 2.67236 14.7373C2.22412 13.7025 2 12.5985 2 11.4253C2 10.2521 2.22412 9.14811 2.67236 8.11328C3.12061 7.07845 3.73763 6.16813 4.52344 5.38232C5.31478 4.59098 6.2251 3.97119 7.25439 3.52295C8.28923 3.07471 9.39323 2.85059 10.5664 2.85059C11.7451 2.85059 12.8519 3.07471 13.8867 3.52295C14.9215 3.97119 15.8346 4.59098 16.626 5.38232C17.4173 6.16813 18.0371 7.07845 18.4854 8.11328C18.9336 9.14811 19.1577 10.2521 19.1577 11.4253C19.1577 12.5985 18.9336 13.7025 18.4854 14.7373C18.0371 15.7721 17.4173 16.6852 16.626 17.4766C15.8346 18.2679 14.9215 18.8849 13.8867 19.3276C12.8519 19.7759 11.7479 20 10.5747 20Z"
      fill="#F7BF0B"
    />
    <Path
      d="M3.81385 18.1812L3.81633 18.1837C4.69776 19.0651 5.71679 19.7536 6.86722 20.2461C8.032 20.7503 9.27117 21 10.5747 21C11.8782 21 13.1174 20.7503 14.2821 20.2461C15.4326 19.7537 16.4516 19.0651 17.3331 18.1837C18.2142 17.3026 18.9051 16.2842 19.403 15.1348C19.9077 13.9694 20.1577 12.7296 20.1577 11.4253C20.1577 10.121 19.9077 8.88117 19.403 7.71581C18.905 6.56624 18.2138 5.55009 17.3318 4.67398C16.451 3.79349 15.4331 3.103 14.2842 2.60533C13.1182 2.10029 11.8755 1.85059 10.5664 1.85059C9.26213 1.85059 8.02228 2.10055 6.85692 2.60533L6.85513 2.60611C5.71136 3.10421 4.69653 3.79502 3.81633 4.67522C2.94015 5.5514 2.25228 6.56718 1.75475 7.71581C1.24997 8.88117 1 10.121 1 11.4253C1 12.7296 1.24997 13.9694 1.75475 15.1348C2.252 16.2828 2.93915 17.3003 3.81385 18.1812Z"
      stroke="white"
      strokeOpacity="0.2"
      strokeWidth="2"
    />
    <Path
      d="M6.74556 12.2289C6.52643 12.2211 6.33665 12.1369 6.17622 11.9765C6.02361 11.8239 5.94535 11.64 5.94143 11.4248C5.94535 11.2096 6.02361 11.0256 6.17622 10.873C6.32882 10.7204 6.51274 10.6461 6.72795 10.65L9.79772 10.6441L11.3649 10.65L14.4405 10.6617C14.6597 10.6617 14.8455 10.738 14.9981 10.8906C15.1507 11.0433 15.2251 11.2272 15.2212 11.4424C15.2251 11.6576 15.1507 11.8415 14.9981 11.9941C14.8494 12.1428 14.6636 12.2191 14.4405 12.223L11.3708 12.2172H9.79772L6.74556 12.2289Z"
      fill="black"
    />
  </Svg>
);

// https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?type=design&node-id=544-93350&mode=dev
export const CredentialSuspendedTempIcon = (
  <Svg fill="none" height={22} viewBox="0 0 22 22" width={22}>
    <Path
      d="M10.5747 20C9.40153 20 8.29753 19.7759 7.2627 19.3276C6.22786 18.8849 5.31478 18.2679 4.52344 17.4766C3.73763 16.6852 3.12061 15.7721 2.67236 14.7373C2.22412 13.7025 2 12.5985 2 11.4253C2 10.2521 2.22412 9.14811 2.67236 8.11328C3.12061 7.07845 3.73763 6.16813 4.52344 5.38232C5.31478 4.59098 6.2251 3.97119 7.25439 3.52295C8.28923 3.07471 9.39323 2.85059 10.5664 2.85059C11.7451 2.85059 12.8519 3.07471 13.8867 3.52295C14.9215 3.97119 15.8346 4.59098 16.626 5.38232C17.4173 6.16813 18.0371 7.07845 18.4854 8.11328C18.9336 9.14811 19.1577 10.2521 19.1577 11.4253C19.1577 12.5985 18.9336 13.7025 18.4854 14.7373C18.0371 15.7721 17.4173 16.6852 16.626 17.4766C15.8346 18.2679 14.9215 18.8849 13.8867 19.3276C12.8519 19.7759 11.7479 20 10.5747 20Z"
      fill="#F7BF0B"
    />
    <Path
      d="M3.81385 18.1812L3.81633 18.1837C4.69776 19.0651 5.71679 19.7536 6.86722 20.2461C8.032 20.7503 9.27117 21 10.5747 21C11.8782 21 13.1174 20.7503 14.2821 20.2461C15.4326 19.7537 16.4516 19.0651 17.3331 18.1837C18.2142 17.3026 18.9051 16.2842 19.403 15.1348C19.9077 13.9694 20.1577 12.7296 20.1577 11.4253C20.1577 10.121 19.9077 8.88117 19.403 7.71581C18.905 6.56624 18.2138 5.55009 17.3318 4.67398C16.451 3.79349 15.4331 3.103 14.2842 2.60533C13.1182 2.10029 11.8755 1.85059 10.5664 1.85059C9.26213 1.85059 8.02228 2.10055 6.85692 2.60533L6.85513 2.60611C5.71136 3.10421 4.69653 3.79502 3.81633 4.67522C2.94015 5.5514 2.25228 6.56718 1.75475 7.71581C1.24997 8.88117 1 10.121 1 11.4253C1 12.7296 1.24997 13.9694 1.75475 15.1348C2.252 16.2828 2.93915 17.3003 3.81385 18.1812Z"
      stroke="white"
      strokeOpacity="0.2"
      strokeWidth="2"
    />
    <Path
      d="M6.74556 12.2289C6.52643 12.2211 6.33665 12.1369 6.17622 11.9765C6.02361 11.8239 5.94535 11.64 5.94143 11.4248C5.94535 11.2096 6.02361 11.0256 6.17622 10.873C6.32882 10.7204 6.51274 10.6461 6.72795 10.65L9.79772 10.6441L11.3649 10.65L14.4405 10.6617C14.6597 10.6617 14.8455 10.738 14.9981 10.8906C15.1507 11.0433 15.2251 11.2272 15.2212 11.4424C15.2251 11.6576 15.1507 11.8415 14.9981 11.9941C14.8494 12.1428 14.6636 12.2191 14.4405 12.223L11.3708 12.2172H9.79772L6.74556 12.2289Z"
      fill="black"
    />
    <Path
      d="M15.1328 20.6719C15.5521 20.8542 15.9987 20.9453 16.4727 20.9453C16.9421 20.9453 17.3864 20.8542 17.8057 20.6719C18.2249 20.4896 18.5941 20.2389 18.9131 19.9199C19.2367 19.6009 19.4896 19.2318 19.6719 18.8125C19.8542 18.3932 19.9453 17.9466 19.9453 17.4727C19.9453 16.9941 19.8542 16.5452 19.6719 16.126C19.4941 15.7067 19.2458 15.3376 18.9268 15.0186C18.6077 14.6995 18.2386 14.4512 17.8193 14.2734C17.4001 14.0911 16.9512 14 16.4727 14C15.9987 14 15.5521 14.0911 15.1328 14.2734C14.7135 14.4512 14.3444 14.7018 14.0254 15.0254C13.7064 15.3444 13.4557 15.7135 13.2734 16.1328C13.0911 16.5475 13 16.9941 13 17.4727C13 17.9512 13.0911 18.4001 13.2734 18.8193C13.4557 19.2386 13.7064 19.6077 14.0254 19.9268C14.3444 20.2458 14.7135 20.4941 15.1328 20.6719Z"
      fill="#0D0E10"
    />
    <Path
      d="M16.5068 18.0059H14.8457C14.7272 18.0059 14.627 17.9626 14.5449 17.876C14.4629 17.7939 14.4219 17.696 14.4219 17.582C14.4219 17.4681 14.4629 17.3701 14.5449 17.2881C14.6315 17.2061 14.7318 17.165 14.8457 17.165H16.083V15.4492C16.083 15.3353 16.124 15.2396 16.2061 15.1621C16.2881 15.0801 16.3883 15.0391 16.5068 15.0391C16.6208 15.0391 16.7188 15.0801 16.8008 15.1621C16.8828 15.2396 16.9238 15.3353 16.9238 15.4492V17.582C16.9238 17.7005 16.8828 17.8008 16.8008 17.8828C16.7233 17.9648 16.6253 18.0059 16.5068 18.0059Z"
      fill="white"
    />
  </Svg>
);
