import BN from 'bn.js'
import { DatabaseManager, EventContext, StoreContext, ExtrinsicContext, SubstrateExtrinsic } from '@subsquid/hydra-common'
import { Heartbeat, LastHeartbeat } from '../generated/model'
import { ImOnline, Staking, Timestamp } from '../chain'
import { Logger } from '../generated/server/logger'
import { Heartbeat as SubstrateHeartbeat } from "@polkadot/types/interfaces/imOnline";

interface HB {
	blockNumber: number,
	networkState: {
		peerId: string
		externalAddresses: Array<any>
	},
	sessionIndex: number,
	validatorsLen: number,
	authorityIndex: number
}

export async function handleHeartbeat({
  store,
  event,
  block,
  extrinsic,
}: EventContext & StoreContext): Promise<void> {
	const heartbeat = new Heartbeat();
	const [authId] = new ImOnline.HeartbeatReceivedEvent(event).params
	heartbeat.authorityId = authId.toHuman();
	await store.save(heartbeat);
	Logger.log(authId.toHuman());
	const ext = await event.extrinsic as SubstrateExtrinsic;
	Logger.log(ext);
	Logger.log(ext.args);
	const shb = ext.args[0].value as unknown as HB
	// Logger.log(ext.args[0]);
	Logger.log(shb.networkState.externalAddresses);
}

export async function handlePayout({
										  store,
										  event,
										  block,
										  extrinsic,
									  }: EventContext & StoreContext): Promise<void> {

}

export async function handleReward({
									   store,
									   event,
									   block,
									   extrinsic,
								   }: EventContext & StoreContext): Promise<void> {

}

export async function handleTimestampSet({
									   store,
									   event,
									   block,
									   extrinsic,
								   }: ExtrinsicContext & StoreContext): Promise<void> {

}
//
//   const [from, to, value] = new Balances.TransferEvent(event).params
//   const tip = extrinsic ? new BN(extrinsic.tip.toString(10)) : new BN(0)
//
//   const fromAcc = await getOrCreate(store, Account, from.toHex())
//   fromAcc.wallet = from.toHuman()
//   fromAcc.balance = fromAcc.balance || new BN(0)
//   fromAcc.balance = fromAcc.balance.sub(value)
//   fromAcc.balance = fromAcc.balance.sub(tip)
//   await store.save(fromAcc)
//
//   const toAcc = await getOrCreate(store, Account, to.toHex())
//   toAcc.wallet = to.toHuman()
//   toAcc.balance = toAcc.balance || new BN(0)
//   toAcc.balance = toAcc.balance.add(value)
//   await store.save(toAcc)
//
//   const hbFrom = new HistoricalBalance()
//   hbFrom.account = fromAcc;
//   hbFrom.balance = fromAcc.balance;
//   hbFrom.timestamp = new BN(block.timestamp)
//   await store.save(hbFrom)
//
//   const hbTo = new HistoricalBalance()
//   hbTo.account = toAcc;
//   hbTo.balance = toAcc.balance;
//   hbTo.timestamp = new BN(block.timestamp)
//   await store.save(hbTo)
// }
//
//
// async function getOrCreate<T extends {id: string}>(
//   store: DatabaseManager,
//   entityConstructor: EntityConstructor<T>,
//   id: string
// ): Promise<T> {
//
//   let e = await store.get(entityConstructor, {
//     where: { id },
//   })
//
//   if (e == null) {
//     e = new entityConstructor()
//     e.id = id
//   }
//
//   return e
// }
//
//
// type EntityConstructor<T> = {
//   new (...args: any[]): T
// }