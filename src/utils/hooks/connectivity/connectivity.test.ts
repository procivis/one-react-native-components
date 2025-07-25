import { getInvitationUrlTransports, Transport } from './connectivity';

jest.mock('@procivis/react-native-one-core', () => ({
  initializeCore: () => Promise.resolve({} as any),
}));

jest.mock('@sentry/react-native', () => ({
  captureException: () => {},
}));

jest.mock('../core/core-config', () => ({
  getEnabledTransports: () => [],
  useCoreConfig: () => ({}),
}));

jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: () => { },
}));

jest.mock('react-native-bluetooth-state-manager', () => ({
  onStateChange: () => { },
}));

describe('getInvitationUrlTransports', () => {
  test('BLE OpenID4VP url', () => {
    const transports = getInvitationUrlTransports(
      'OPENID4VP://connect?name=XFwsduA5&key=24c810cb01a8b12200bdb66dc5a7ac9b49a4cfdd5c4b89f51e03206be3abac5b',
      'mdoc-openid4vp',
    );
    expect(transports).toStrictEqual([Transport.Bluetooth]);
  });
  test('MQTT OpenID4VP url', () => {
    const transports = getInvitationUrlTransports(
      'OPENID4VP://connect?key=24c810cb01a8b12200bdb66dc5a7ac9b49a4cfdd5c4b89f51e03206be3abac5b&brokerUrl=mqtt://dev.procivis-one.com&topicId=540684a4-430c-441c-b188-786653f5ab35',
      'mdoc-openid4vp',
    );
    expect(transports).toStrictEqual([Transport.MQTT]);
  });
  test('Mixed BLE/MQTT OpenID4VP url', () => {
    const transports = getInvitationUrlTransports(
      'OPENID4VP://connect?name=XFwsduA5&key=24c810cb01a8b12200bdb66dc5a7ac9b49a4cfdd5c4b89f51e03206be3abac5b&brokerUrl=mqtt://dev.procivis-one.com&topicId=540684a4-430c-441c-b188-786653f5ab35',
      'mdoc-openid4vp',
    );
    expect(transports).toStrictEqual([Transport.Bluetooth, Transport.MQTT]);
  });
  test('BLE OpenID4VP url with custom scheme', () => {
    const transports = getInvitationUrlTransports(
      'MDOC-OPENID4VP://connect?name=XFwsduA5&key=24c810cb01a8b12200bdb66dc5a7ac9b49a4cfdd5c4b89f51e03206be3abac5b',
      'mdoc-openid4vp',
    );
    expect(transports).toStrictEqual([Transport.Bluetooth]);
  });
  test('MQTT OpenID4VP url with custom scheme', () => {
    const transports = getInvitationUrlTransports(
      'MDOC-OPENID4VP://connect?key=24c810cb01a8b12200bdb66dc5a7ac9b49a4cfdd5c4b89f51e03206be3abac5b&brokerUrl=mqtt://dev.procivis-one.com&topicId=540684a4-430c-441c-b188-786653f5ab35',
      'mdoc-openid4vp',
    );
    expect(transports).toStrictEqual([Transport.MQTT]);
  });
  test('Mixed BLE/MQTT OpenID4VP url with custom scheme', () => {
    const transports = getInvitationUrlTransports(
      'MDOC-OPENID4VP://connect?name=XFwsduA5&key=24c810cb01a8b12200bdb66dc5a7ac9b49a4cfdd5c4b89f51e03206be3abac5b&brokerUrl=mqtt://dev.procivis-one.com&topicId=540684a4-430c-441c-b188-786653f5ab35',
      'mdoc-openid4vp',
    );
    expect(transports).toStrictEqual([Transport.Bluetooth, Transport.MQTT]);
  });
  test('HTTP OpenID4VP url', () => {
    const transports = getInvitationUrlTransports(
      'openid4vp://?response_type=vp_token&state=25fdb134-487d-4bcd-9fdf-777e7f74f128&nonce=DZE2qP6FaDksHxkfOdYJC1LWgVyf5Ibc&client_id_scheme=redirect_uri&client_id=https%3A%2F%2Fcore.dev.procivis-one.com%2Fssi%2Foidc-verifier%2Fv1%2Fresponse&response_mode=direct_post&response_uri=https%3A%2F%2Fcore.dev.procivis-one.com%2Fssi%2Foidc-verifier%2Fv1%2Fresponse&client_metadata_uri=https%3A%2F%2Fcore.dev.procivis-one.com%2Fssi%2Foidc-verifier%2Fv1%2F89973de1-75ba-4367-89ef-4d928de88933%2Fclient-metadata&presentation_definition_uri=https%3A%2F%2Fcore.dev.procivis-one.com%2Fssi%2Foidc-verifier%2Fv1%2F89973de1-75ba-4367-89ef-4d928de88933%2Fpresentation-definition',
      'mdoc-openid4vp',
    );
    expect(transports).toStrictEqual([Transport.HTTP]);
  });
  test('HTTP OpenID4VP url with custom scheme', () => {
    const transports = getInvitationUrlTransports(
      'mdoc-openid4vp://?response_type=vp_token&state=25fdb134-487d-4bcd-9fdf-777e7f74f128&nonce=DZE2qP6FaDksHxkfOdYJC1LWgVyf5Ibc&client_id_scheme=redirect_uri&client_id=https%3A%2F%2Fcore.dev.procivis-one.com%2Fssi%2Foidc-verifier%2Fv1%2Fresponse&response_mode=direct_post&response_uri=https%3A%2F%2Fcore.dev.procivis-one.com%2Fssi%2Foidc-verifier%2Fv1%2Fresponse&client_metadata_uri=https%3A%2F%2Fcore.dev.procivis-one.com%2Fssi%2Foidc-verifier%2Fv1%2F89973de1-75ba-4367-89ef-4d928de88933%2Fclient-metadata&presentation_definition_uri=https%3A%2F%2Fcore.dev.procivis-one.com%2Fssi%2Foidc-verifier%2Fv1%2F89973de1-75ba-4367-89ef-4d928de88933%2Fpresentation-definition',
      'mdoc-openid4vp',
    );
    expect(transports).toStrictEqual([Transport.HTTP]);
  });
  test('HTTP OpenID4VP url with requestUri', () => {
    const transports = getInvitationUrlTransports(
      'openid4vp://?client_id=https%3A%2F%2Fcore.dev.procivis-one.com%2Fssi%2Foidc-verifier%2Fv1%2Fresponse&request_uri=https%3A%2F%2Fcore.dev.procivis-one.com%2Fssi%2Foidc-verifier%2Fv1%2F6e442f9d-bc14-4362-8786-504d7b79c402%2Fclient-request',
      'mdoc-openid4vp',
    );
    expect(transports).toStrictEqual([Transport.HTTP]);
  });
  test('HTTP OpenID credential offer url', () => {
    const transports = getInvitationUrlTransports(
      'openid-credential-offer://?credential_offer_uri=https%3A%2F%2Fcore.dev.procivis-one.com%2Fssi%2Foidc-issuer%2Fv1%2F0c2cd9a6-1eff-4536-9505-98d7bd87aad1%2Foffer%2F275c09b2-4f4f-4738-85fc-35399acad176',
      'mdoc-openid4vp',
    );
    expect(transports).toStrictEqual([Transport.HTTP]);
  });

  test('Invalid link', () => {
    const transports = getInvitationUrlTransports('invalid');
    expect(transports).toStrictEqual([]);
  });
});
