import { BaseModel, BooleanField, NumericField, Model, StringField, JSONField } from '@subsquid/warthog';

import BN from 'bn.js';

import * as jsonTypes from '../jsonfields/jsonfields.model';

@Model({ api: {} })
export class Heartbeat extends BaseModel {
  @NumericField({
    nullable: true,

    transformer: {
      to: (entityValue: BN) => (entityValue !== undefined ? entityValue.toString(10) : null),
      from: (dbValue: string) =>
        dbValue !== undefined && dbValue !== null && dbValue.length > 0 ? new BN(dbValue, 10) : undefined,
    },
  })
  blockNumber?: BN;

  @StringField({
    nullable: true,
  })
  authorityId?: string;

  @StringField({
    nullable: true,
  })
  validator?: string;

  @StringField({
    nullable: true,
  })
  peerId?: string;

  @StringField({
    nullable: true,
  })
  networkAddress?: string;

  @BooleanField({
    nullable: true,
  })
  multiAddress?: boolean;

  @StringField({
    nullable: true,
  })
  ipv4?: string;

  constructor(init?: Partial<Heartbeat>) {
    super();
    Object.assign(this, init);
  }
}
