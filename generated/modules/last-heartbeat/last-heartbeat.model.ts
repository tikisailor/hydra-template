import { BaseModel, Model, StringField, JSONField } from '@subsquid/warthog';

import * as jsonTypes from '../jsonfields/jsonfields.model';

@Model({ api: {} })
export class LastHeartbeat extends BaseModel {
  @StringField({})
  heartbeatId!: string;

  constructor(init?: Partial<LastHeartbeat>) {
    super();
    Object.assign(this, init);
  }
}
