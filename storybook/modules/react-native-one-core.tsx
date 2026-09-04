const ReactNativeOneCoreMock = {};
export default ReactNativeOneCoreMock;

export enum CacheType {
  DID_DOCUMENT = 'DID_DOCUMENT',
  JSON_LD_CONTEXT = 'JSON_LD_CONTEXT',
  JSON_SCHEMA = 'JSON_SCHEMA',
  STATUS_LIST_CREDENTIAL = 'STATUS_LIST_CREDENTIAL',
  TRUST_LIST = 'TRUST_LIST',
  VCT_METADATA = 'VCT_METADATA'
}

export class OneError extends Error {
  readonly operation: string;
  readonly code: string;
  readonly cause?: string;
  readonly originalError: Error;

  constructor(params: { cause?: string; code: string; message: string; operation: string; originalError: Error }) {
    super();
    this.operation = params.operation;
    this.code = params.code;
    this.message = params.message;
    this.originalError = params.originalError;
  }
}

export enum HistoryEntityType {
  BACKUP = 'BACKUP',
  CREDENTIAL = 'CREDENTIAL',
  CREDENTIAL_SCHEMA = 'CREDENTIAL_SCHEMA',
  DID = 'DID',
  KEY = 'KEY',
  ORGANISATION = 'ORGANISATION',
  PROOF = 'PROOF',
  PROOF_SCHEMA = 'PROOF_SCHEMA'
}

export enum HistoryAction {
  ACCEPTED = 'ACCEPTED',
  ACTIVATED = 'ACTIVATED',
  CLAIMS_REMOVED = 'CLAIMS_REMOVED',
  CREATED = 'CREATED',
  CSR_GENERATED = 'CSR_GENERATED',
  DEACTIVATED = 'DEACTIVATED',
  DELETED = 'DELETED',
  ERRORED = 'ERRORED',
  EXPIRED = 'EXPIRED',
  IMPORTED = 'IMPORTED',
  ISSUED = 'ISSUED',
  OFFERED = 'OFFERED',
  PENDING = 'PENDING',
  REACTIVATED = 'REACTIVATED',
  REJECTED = 'REJECTED',
  REMOVED = 'REMOVED',
  REQUESTED = 'REQUESTED',
  RESTORED = 'RESTORED',
  RETRACTED = 'RETRACTED',
  REVOKED = 'REVOKED',
  SHARED = 'SHARED',
  SUSPENDED = 'SUSPENDED',
  UPDATED = 'UPDATED',
  WITHDRAWN = 'WITHDRAWN'
}

export enum DidType {
  LOCAL = 'LOCAL',
  REMOTE = 'REMOTE',
}

export enum CredentialState {
  ACCEPTED = 'ACCEPTED',
  CREATED = 'CREATED',
  ERROR = 'ERROR',
  OFFERED = 'OFFERED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  REVOKED = 'REVOKED',
  SUSPENDED = 'SUSPENDED'
}

export enum ProofState {
  ACCEPTED = 'ACCEPTED',
  CREATED = 'CREATED',
  ERROR = 'ERROR',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  REQUESTED = 'REQUESTED',
  RETRACTED = 'RETRACTED'
}

export enum CredentialSchemaCodeType {
  BARCODE = 'BARCODE',
  MRZ = 'MRZ',
  QR_CODE = 'QR_CODE',
}

export enum DataType {
  Boolean = 'BOOLEAN',
  Date = 'DATE',
  File = 'FILE',
  Number = 'NUMBER',
  Object = 'OBJECT',
  String = 'STRING'
}

export enum FormatFeature {
  RequiresSchemaId = 'REQUIRES_SCHEMA_ID',
  SelectiveDisclosure = 'SELECTIVE_DISCLOSURE',
  SupportsCredentialDesign = 'SUPPORTS_CREDENTIAL_DESIGN'
}

export enum TrustEntityRole {
  BOTH = 'BOTH',
  ISSUER = 'ISSUER',
  VERIFIER = 'VERIFIER'
}

export enum TrustEntityState {
  ACTIVE = 'ACTIVE',
  REMOVED = 'REMOVED',
  REMOVED_AND_WITHDRAWN = 'REMOVED_AND_WITHDRAWN',
  WITHDRAWN = 'WITHDRAWN'
}

export enum IdentifierType {
  CERTIFICATE = 'CERTIFICATE',
  DID = 'DID',
  KEY = 'KEY'
}

export enum IdentifierState {
  ACTIVE = 'ACTIVE',
  DEACTIVATED = 'DEACTIVATED',
}

export enum InstanceStatus {
  ACTIVE = 'ACTIVE',
  ERROR = 'ERROR',
  PENDING = 'PENDING',
  REVOKED = 'REVOKED'
}

export const initializeCore = () => {};

export enum CredentialType {
  BATCH_ITEM = 'BATCH_ITEM',
  BATCH_PARENT = 'BATCH_PARENT',
  SINGLE = 'SINGLE'
}
