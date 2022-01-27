import 'graphql-import-node'; // Needed so you can import *.graphql files 

import { makeBindingClass, Options } from 'graphql-binding'
import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { IResolvers } from 'graphql-tools/dist/Interfaces'
import * as schema from  './schema.graphql'

export interface Query {
    heartbeats: <T = Array<Heartbeat>>(args: { offset?: Int | null, limit?: Int | null, where?: HeartbeatWhereInput | null, orderBy?: Array<HeartbeatOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    heartbeatByUniqueInput: <T = Heartbeat | null>(args: { where: HeartbeatWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    heartbeatsConnection: <T = HeartbeatConnection>(args: { first?: Int | null, after?: String | null, last?: Int | null, before?: String | null, where?: HeartbeatWhereInput | null, orderBy?: Array<HeartbeatOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    lastHeartbeats: <T = Array<LastHeartbeat>>(args: { offset?: Int | null, limit?: Int | null, where?: LastHeartbeatWhereInput | null, orderBy?: Array<LastHeartbeatOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    lastHeartbeatByUniqueInput: <T = LastHeartbeat | null>(args: { where: LastHeartbeatWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    lastHeartbeatsConnection: <T = LastHeartbeatConnection>(args: { first?: Int | null, after?: String | null, last?: Int | null, before?: String | null, where?: LastHeartbeatWhereInput | null, orderBy?: Array<LastHeartbeatOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Mutation {}

export interface Subscription {
    stateSubscription: <T = ProcessorState>(args?: {}, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> 
  }

export interface Binding {
  query: Query
  mutation: Mutation
  subscription: Subscription
  request: <T = any>(query: string, variables?: {[key: string]: any}) => Promise<T>
  delegate(operation: 'query' | 'mutation', fieldName: string, args: {
      [key: string]: any;
  }, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<any>;
  delegateSubscription(fieldName: string, args?: {
      [key: string]: any;
  }, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<any>>;
  getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;
}

export interface BindingConstructor<T> {
  new(...args: any[]): T
}

export const Binding = makeBindingClass<BindingConstructor<Binding>>({ schema: schema as any })

/**
 * Types
*/

export type HeartbeatOrderByInput =   'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'deletedAt_ASC' |
  'deletedAt_DESC' |
  'blockNumber_ASC' |
  'blockNumber_DESC' |
  'authorityId_ASC' |
  'authorityId_DESC' |
  'validator_ASC' |
  'validator_DESC' |
  'peerId_ASC' |
  'peerId_DESC' |
  'networkAddress_ASC' |
  'networkAddress_DESC' |
  'multiAddress_ASC' |
  'multiAddress_DESC' |
  'ipv4_ASC' |
  'ipv4_DESC'

export type LastHeartbeatOrderByInput =   'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'deletedAt_ASC' |
  'deletedAt_DESC' |
  'heartbeatId_ASC' |
  'heartbeatId_DESC'

export interface BaseWhereInput {
  id_eq?: String | null
  id_in?: String[] | String | null
  createdAt_eq?: String | null
  createdAt_lt?: String | null
  createdAt_lte?: String | null
  createdAt_gt?: String | null
  createdAt_gte?: String | null
  createdById_eq?: String | null
  updatedAt_eq?: String | null
  updatedAt_lt?: String | null
  updatedAt_lte?: String | null
  updatedAt_gt?: String | null
  updatedAt_gte?: String | null
  updatedById_eq?: String | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: String | null
  deletedAt_lt?: String | null
  deletedAt_lte?: String | null
  deletedAt_gt?: String | null
  deletedAt_gte?: String | null
  deletedById_eq?: String | null
}

export interface HeartbeatCreateInput {
  blockNumber?: String | null
  authorityId?: String | null
  validator?: String | null
  peerId?: String | null
  networkAddress?: String | null
  multiAddress?: Boolean | null
  ipv4?: String | null
}

export interface HeartbeatUpdateInput {
  blockNumber?: String | null
  authorityId?: String | null
  validator?: String | null
  peerId?: String | null
  networkAddress?: String | null
  multiAddress?: Boolean | null
  ipv4?: String | null
}

export interface HeartbeatWhereInput {
  id_eq?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  createdAt_eq?: DateTime | null
  createdAt_lt?: DateTime | null
  createdAt_lte?: DateTime | null
  createdAt_gt?: DateTime | null
  createdAt_gte?: DateTime | null
  createdById_eq?: ID_Input | null
  createdById_in?: ID_Output[] | ID_Output | null
  updatedAt_eq?: DateTime | null
  updatedAt_lt?: DateTime | null
  updatedAt_lte?: DateTime | null
  updatedAt_gt?: DateTime | null
  updatedAt_gte?: DateTime | null
  updatedById_eq?: ID_Input | null
  updatedById_in?: ID_Output[] | ID_Output | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: DateTime | null
  deletedAt_lt?: DateTime | null
  deletedAt_lte?: DateTime | null
  deletedAt_gt?: DateTime | null
  deletedAt_gte?: DateTime | null
  deletedById_eq?: ID_Input | null
  deletedById_in?: ID_Output[] | ID_Output | null
  blockNumber_eq?: BigInt | null
  blockNumber_gt?: BigInt | null
  blockNumber_gte?: BigInt | null
  blockNumber_lt?: BigInt | null
  blockNumber_lte?: BigInt | null
  blockNumber_in?: BigInt[] | BigInt | null
  authorityId_eq?: String | null
  authorityId_contains?: String | null
  authorityId_startsWith?: String | null
  authorityId_endsWith?: String | null
  authorityId_in?: String[] | String | null
  validator_eq?: String | null
  validator_contains?: String | null
  validator_startsWith?: String | null
  validator_endsWith?: String | null
  validator_in?: String[] | String | null
  peerId_eq?: String | null
  peerId_contains?: String | null
  peerId_startsWith?: String | null
  peerId_endsWith?: String | null
  peerId_in?: String[] | String | null
  networkAddress_eq?: String | null
  networkAddress_contains?: String | null
  networkAddress_startsWith?: String | null
  networkAddress_endsWith?: String | null
  networkAddress_in?: String[] | String | null
  multiAddress_eq?: Boolean | null
  multiAddress_in?: Boolean[] | Boolean | null
  ipv4_eq?: String | null
  ipv4_contains?: String | null
  ipv4_startsWith?: String | null
  ipv4_endsWith?: String | null
  ipv4_in?: String[] | String | null
  AND?: HeartbeatWhereInput[] | HeartbeatWhereInput | null
  OR?: HeartbeatWhereInput[] | HeartbeatWhereInput | null
}

export interface HeartbeatWhereUniqueInput {
  id: ID_Output
}

export interface LastHeartbeatCreateInput {
  heartbeatId: String
}

export interface LastHeartbeatUpdateInput {
  heartbeatId?: String | null
}

export interface LastHeartbeatWhereInput {
  id_eq?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  createdAt_eq?: DateTime | null
  createdAt_lt?: DateTime | null
  createdAt_lte?: DateTime | null
  createdAt_gt?: DateTime | null
  createdAt_gte?: DateTime | null
  createdById_eq?: ID_Input | null
  createdById_in?: ID_Output[] | ID_Output | null
  updatedAt_eq?: DateTime | null
  updatedAt_lt?: DateTime | null
  updatedAt_lte?: DateTime | null
  updatedAt_gt?: DateTime | null
  updatedAt_gte?: DateTime | null
  updatedById_eq?: ID_Input | null
  updatedById_in?: ID_Output[] | ID_Output | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: DateTime | null
  deletedAt_lt?: DateTime | null
  deletedAt_lte?: DateTime | null
  deletedAt_gt?: DateTime | null
  deletedAt_gte?: DateTime | null
  deletedById_eq?: ID_Input | null
  deletedById_in?: ID_Output[] | ID_Output | null
  heartbeatId_eq?: String | null
  heartbeatId_contains?: String | null
  heartbeatId_startsWith?: String | null
  heartbeatId_endsWith?: String | null
  heartbeatId_in?: String[] | String | null
  AND?: LastHeartbeatWhereInput[] | LastHeartbeatWhereInput | null
  OR?: LastHeartbeatWhereInput[] | LastHeartbeatWhereInput | null
}

export interface LastHeartbeatWhereUniqueInput {
  id: ID_Output
}

export interface BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
}

export interface DeleteResponse {
  id: ID_Output
}

export interface BaseModel extends BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
}

export interface BaseModelUUID extends BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
}

export interface Heartbeat extends BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
  blockNumber?: BigInt | null
  authorityId?: String | null
  validator?: String | null
  peerId?: String | null
  networkAddress?: String | null
  multiAddress?: Boolean | null
  ipv4?: String | null
}

export interface HeartbeatConnection {
  totalCount: Int
  edges: Array<HeartbeatEdge>
  pageInfo: PageInfo
}

export interface HeartbeatEdge {
  node: Heartbeat
  cursor: String
}

export interface LastHeartbeat extends BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
  heartbeatId: String
}

export interface LastHeartbeatConnection {
  totalCount: Int
  edges: Array<LastHeartbeatEdge>
  pageInfo: PageInfo
}

export interface LastHeartbeatEdge {
  node: LastHeartbeat
  cursor: String
}

export interface PageInfo {
  hasNextPage: Boolean
  hasPreviousPage: Boolean
  startCursor?: String | null
  endCursor?: String | null
}

export interface ProcessorState {
  lastCompleteBlock: Float
  lastProcessedEvent: String
  indexerHead: Float
  chainHead: Float
}

export interface StandardDeleteResponse {
  id: ID_Output
}

/*
GraphQL representation of BigInt
*/
export type BigInt = string

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

/*
The javascript `Date` as string. Type represents date and time as the ISO Date string.
*/
export type DateTime = Date | string

/*
The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point).
*/
export type Float = number

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.
*/
export type Int = number

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string