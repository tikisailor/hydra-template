import { createTypeUnsafe } from "@polkadot/types/create";
import { SubstrateEvent, SubstrateExtrinsic } from "@subsquid/hydra-common";
import { Codec } from "@polkadot/types/types";
import { typeRegistry } from ".";

import { AuthorityId } from "@polkadot/types/interfaces";

export namespace ImOnline {
  /**
   *  A new heartbeat was received from `AuthorityId` \[authority_id\]
   *
   *  Event parameters: [AuthorityId, ]
   */
  export class HeartbeatReceivedEvent {
    public readonly expectedParamTypes = ["AuthorityId"];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [AuthorityId] {
      return [
        createTypeUnsafe<AuthorityId & Codec>(typeRegistry, "AuthorityId", [
          this.ctx.params[0].value,
        ]),
      ];
    }

    validateParams(): boolean {
      if (this.expectedParamTypes.length !== this.ctx.params.length) {
        return false;
      }
      let valid = true;
      this.expectedParamTypes.forEach((type, i) => {
        if (type !== this.ctx.params[i].type) {
          valid = false;
        }
      });
      return valid;
    }
  }
}
