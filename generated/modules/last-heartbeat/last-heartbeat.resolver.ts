import {
  Arg,
  Args,
  Mutation,
  Query,
  Root,
  Resolver,
  FieldResolver,
  ObjectType,
  Field,
  Int,
  ArgsType,
  Info,
  Ctx,
} from 'type-graphql';
import graphqlFields from 'graphql-fields';
import { Inject } from 'typedi';
import { Min } from 'class-validator';
import {
  Fields,
  StandardDeleteResponse,
  UserId,
  PageInfo,
  RawFields,
  NestedFields,
  BaseContext,
} from '@subsquid/warthog';

import {
  LastHeartbeatCreateInput,
  LastHeartbeatCreateManyArgs,
  LastHeartbeatUpdateArgs,
  LastHeartbeatWhereArgs,
  LastHeartbeatWhereInput,
  LastHeartbeatWhereUniqueInput,
  LastHeartbeatOrderByEnum,
} from '../../warthog';

import { LastHeartbeat } from './last-heartbeat.model';
import { LastHeartbeatService } from './last-heartbeat.service';

@ObjectType()
export class LastHeartbeatEdge {
  @Field(() => LastHeartbeat, { nullable: false })
  node!: LastHeartbeat;

  @Field(() => String, { nullable: false })
  cursor!: string;
}

@ObjectType()
export class LastHeartbeatConnection {
  @Field(() => Int, { nullable: false })
  totalCount!: number;

  @Field(() => [LastHeartbeatEdge], { nullable: false })
  edges!: LastHeartbeatEdge[];

  @Field(() => PageInfo, { nullable: false })
  pageInfo!: PageInfo;
}

@ArgsType()
export class ConnectionPageInputOptions {
  @Field(() => Int, { nullable: true })
  @Min(0)
  first?: number;

  @Field(() => String, { nullable: true })
  after?: string; // V3: TODO: should we make a RelayCursor scalar?

  @Field(() => Int, { nullable: true })
  @Min(0)
  last?: number;

  @Field(() => String, { nullable: true })
  before?: string;
}

@ArgsType()
export class LastHeartbeatConnectionWhereArgs extends ConnectionPageInputOptions {
  @Field(() => LastHeartbeatWhereInput, { nullable: true })
  where?: LastHeartbeatWhereInput;

  @Field(() => LastHeartbeatOrderByEnum, { nullable: true })
  orderBy?: [LastHeartbeatOrderByEnum];
}

@Resolver(LastHeartbeat)
export class LastHeartbeatResolver {
  constructor(@Inject('LastHeartbeatService') public readonly service: LastHeartbeatService) {}

  @Query(() => [LastHeartbeat])
  async lastHeartbeats(
    @Args() { where, orderBy, limit, offset }: LastHeartbeatWhereArgs,
    @Fields() fields: string[]
  ): Promise<LastHeartbeat[]> {
    return this.service.find<LastHeartbeatWhereInput>(where, orderBy, limit, offset, fields);
  }

  @Query(() => LastHeartbeat, { nullable: true })
  async lastHeartbeatByUniqueInput(
    @Arg('where') where: LastHeartbeatWhereUniqueInput,
    @Fields() fields: string[]
  ): Promise<LastHeartbeat | null> {
    const result = await this.service.find(where, undefined, 1, 0, fields);
    return result && result.length >= 1 ? result[0] : null;
  }

  @Query(() => LastHeartbeatConnection)
  async lastHeartbeatsConnection(
    @Args() { where, orderBy, ...pageOptions }: LastHeartbeatConnectionWhereArgs,
    @Info() info: any
  ): Promise<LastHeartbeatConnection> {
    const rawFields = graphqlFields(info, {}, { excludedFields: ['__typename'] });

    let result: any = {
      totalCount: 0,
      edges: [],
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
    // If the related database table does not have any records then an error is thrown to the client
    // by warthog
    try {
      result = await this.service.findConnection<LastHeartbeatWhereInput>(where, orderBy, pageOptions, rawFields);
    } catch (err: any) {
      console.log(err);
      // TODO: should continue to return this on `Error: Items is empty` or throw the error
      if (!(err.message as string).includes('Items is empty')) throw err;
    }

    return result as Promise<LastHeartbeatConnection>;
  }
}
