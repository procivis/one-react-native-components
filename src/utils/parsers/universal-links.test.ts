import { parseUniversalLink } from './universal-links';

jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: () => {},
}));

jest.mock('react-native-bluetooth-state-manager', () => ({
  onStateChange: () => {},
}));

describe('parseUniversalLink', () => {
  test('Credential schema universal link url', () => {
    const parsedLink = parseUniversalLink(
      'https://desk.dev.procivis-one.com/app-link/schema?url=https%3A%2F%2Fcore.dev.procivis-one.com%2Fssi%2Fschema%2Fv1%2F2c986182-0bca-4342-b0e0-4e149b1818c7',
    );
    expect(parsedLink).toStrictEqual(
      'https://core.dev.procivis-one.com/ssi/schema/v1/2c986182-0bca-4342-b0e0-4e149b1818c7',
    );
  });
  test('OpenID4VC credential offer universal link url', () => {
    const parsedLink = parseUniversalLink(
      'https://desk.dev.procivis-one.com/app-link/openid-credential-offer?credential_offer_uri=https%3A%2F%2Fcore.dev.procivis-one.com%2Fssi%2Foidc-issuer%2Fv1%2Ffde1ca86-3ea1-410e-9da4-b210355e5dd2%2Foffer%2F4e626c92-9f20-4031-992d-242563ab5ef3',
    );
    expect(parsedLink).toStrictEqual(
      'openid-credential-offer://?credential_offer_uri=https%3A%2F%2Fcore.dev.procivis-one.com%2Fssi%2Foidc-issuer%2Fv1%2Ffde1ca86-3ea1-410e-9da4-b210355e5dd2%2Foffer%2F4e626c92-9f20-4031-992d-242563ab5ef3',
    );
  });
  test('OpenID4VP proof request universal link url', () => {
    const parsedLink = parseUniversalLink(
      'https://desk.dev.procivis-one.com/app-link/openid4vp?client_id=https%3A%2F%2Fcore.dev.procivis-one.com%2Fssi%2Foidc-verifier%2Fv1%2Fresponse&client_id_scheme=verifier_attestation&request_uri=https%3A%2F%2Fcore.dev.procivis-one.com%2Fssi%2Foidc-verifier%2Fv1%2F74fe0d75-d568-4178-9f73-5cd4e3f5a2ae%2Fclient-request',
    );
    expect(parsedLink).toStrictEqual(
      'openid4vp://?client_id=https%3A%2F%2Fcore.dev.procivis-one.com%2Fssi%2Foidc-verifier%2Fv1%2Fresponse&client_id_scheme=verifier_attestation&request_uri=https%3A%2F%2Fcore.dev.procivis-one.com%2Fssi%2Foidc-verifier%2Fv1%2F74fe0d75-d568-4178-9f73-5cd4e3f5a2ae%2Fclient-request',
    );
  });

  test('Invalid link', () => {
    const parsedLink = parseUniversalLink('invalid');
    expect(parsedLink).toStrictEqual(undefined);
  });
  test('Non-universal link', () => {
    const parsedLink = parseUniversalLink(
      'openid4vp://?client_id=https%3A%2F%2Fcore.dev.procivis-one.com%2Fssi%2Foidc-verifier%2Fv1%2Fresponse&client_id_scheme=verifier_attestation&request_uri=https%3A%2F%2Fcore.dev.procivis-one.com%2Fssi%2Foidc-verifier%2Fv1%2F74fe0d75-d568-4178-9f73-5cd4e3f5a2ae%2Fclient-request',
    );
    expect(parsedLink).toStrictEqual(undefined);
  });
  test('Invalid https universal link url', () => {
    const parsedLink = parseUniversalLink(
      'https://desk.dev.procivis-one.com/app-schema/link?url=https%3A%2F%2Fcore.dev.procivis-one.com%2Fssi%2Fschema%2Fv1%2F2c986182-0bca-4342-b0e0-4e149b1818c7',
    );
    expect(parsedLink).toStrictEqual(undefined);
  });
  test('Schema universal link url with invalid params', () => {
    const parsedLink = parseUniversalLink('https://desk.dev.procivis-one.com/app-link/schema?key=value');
    expect(parsedLink).toStrictEqual(undefined);
  });
});
