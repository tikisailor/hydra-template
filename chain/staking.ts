import { createTypeUnsafe } from "@polkadot/types/create";
import { SubstrateEvent, SubstrateExtrinsic } from "@subsquid/hydra-common";
import { Codec } from "@polkadot/types/types";
import { typeRegistry } from ".";

import { AccountId, Balance, EraIndex } from "@polkadot/types/interfaces";

export namespace Staking {
  /**
   *  The stakers' rewards are getting paid. \[era_index, validator_stash\]
   *
   *  Event parameters: [EraIndex, AccountId, ]
   */
  export class PayoutStartedEvent {
    public readonly expectedParamTypes = ["EraIndex", "AccountId"];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [EraIndex, AccountId] {
      return [
        createTypeUnsafe<EraIndex & Codec>(typeRegistry, "EraIndex", [
          this.ctx.params[0].value,
        ]),
        createTypeUnsafe<AccountId & Codec>(typeRegistry, "AccountId", [
          this.ctx.params[1].value,
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

  /**
   *  The nominator has been rewarded by this amount. \[stash, amount\]
   *
   *  Event parameters: [AccountId, Balance, ]
   */
  export class RewardedEvent {
    public readonly expectedParamTypes = ["AccountId", "Balance"];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [AccountId, Balance] {
      return [
        createTypeUnsafe<AccountId & Codec>(typeRegistry, "AccountId", [
          this.ctx.params[0].value,
        ]),
        createTypeUnsafe<Balance & Codec>(typeRegistry, "Balance", [
          this.ctx.params[1].value,
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
