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
  HeartbeatCreateInput,
  HeartbeatCreateManyArgs,
  HeartbeatUpdateArgs,
  HeartbeatWhereArgs,
  HeartbeatWhereInput,
  HeartbeatWhereUniqueInput,
  HeartbeatOrderByEnum,
} from '../../warthog';

import { Heartbeat } from './heartbeat.model';
import { HeartbeatService } from './heartbeat.service';

@ObjectType()
export class HeartbeatEdge {
  @Field(() => Heartbeat, { nullable: false })
  node!: Heartbeat;

  @Field(() => String, { nullable: false })
  cursor!: string;
}

@ObjectType()
export class HeartbeatConnection {
  @Field(() => Int, { nullable: false })
  totalCount!: number;

  @Field(() => [HeartbeatEdge], { nullable: false })
  edges!: HeartbeatEdge[];

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
export class HeartbeatConnectionWhereArgs extends ConnectionPageInputOptions {
  @Field(() => HeartbeatWhereInput, { nullable: true })
  where?: HeartbeatWhereInput;

  @Field(() => HeartbeatOrderByEnum, { nullable: true })
  orderBy?: [HeartbeatOrderByEnum];
}

@Resolver(Heartbeat)
export class HeartbeatResolver {
  constructor(@Inject('HeartbeatService') public readonly service: HeartbeatService) {}

  @Query(() => [Heartbeat])
  async heartbeats(
    @Args() { where, orderBy, limit, offset }: HeartbeatWhereArgs,
    @Fields() fields: string[]
  ): Promise<Heartbeat[]> {
    return this.service.find<HeartbeatWhereInput>(where, orderBy, limit, offset, fields);
  }

  @Query(() => Heartbeat, { nullable: true })
  async heartbeatByUniqueInput(
    @Arg('where') where: HeartbeatWhereUniqueInput,
    @Fields() fields: string[]
  ): Promise<Heartbeat | null> {
    const result = await this.service.find(where, undefined, 1, 0, fields);
    return result && result.length >= 1 ? result[0] : null;
  }

  @Query(() => HeartbeatConnection)
  async heartbeatsConnection(
    @Args() { where, orderBy, ...pageOptions }: HeartbeatConnectionWhereArgs,
    @Info() info: any
  ): Promise<HeartbeatConnection> {
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
      result = await this.service.findConnection<HeartbeatWhereInput>(where, orderBy, pageOptions, rawFields);
    } catch (err: any) {
      console.log(err);
      // TODO: should continue to return this on `Error: Items is empty` or throw the error
      if (!(err.message as string).includes('Items is empty')) throw err;
    }

    return result as Promise<HeartbeatConnection>;
  }
}
