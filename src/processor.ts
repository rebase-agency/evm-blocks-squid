import {
  BlockHeader,
  DataHandlerContext,
  EvmBatchProcessor,
  EvmBatchProcessorFields,
  Log as _Log,
  Transaction as _Transaction,
} from '@subsquid/evm-processor';
import { assertNotNull } from '@subsquid/util-internal';
import { lookupArchive } from '@subsquid/archive-registry';

export const processor = new EvmBatchProcessor()
  .setRpcEndpoint({
    url: assertNotNull(process.env.RPC_ENDPOINT),
    capacity: process.env.RPC_ENDPOINT_CAPACITY
      ? parseInt(process.env.RPC_ENDPOINT_CAPACITY)
      : undefined,
    rateLimit: process.env.RPC_ENDPOINT_MAX_REQUESTS_PER_SECOND
      ? parseInt(process.env.RPC_ENDPOINT_MAX_REQUESTS_PER_SECOND)
      : undefined,
    requestTimeout: process.env.RPC_ENDPOINT_REQUEST_TIMEOUT
      ? parseInt(process.env.RPC_ENDPOINT_REQUEST_TIMEOUT)
      : undefined,
    maxBatchCallSize: process.env.RPC_ENDPOINT_MAX_BATCH_CALL_SIZE
      ? parseInt(process.env.RPC_ENDPOINT_MAX_BATCH_CALL_SIZE)
      : undefined,
  })
  .setFinalityConfirmation(
    process.env.BLOCKS_FINALITY_CONFIRMATIONS
      ? parseInt(process.env.BLOCKS_FINALITY_CONFIRMATIONS)
      : 75,
  )
  .setFields({
    block: {
      timestamp: true,
      miner: true,
      difficulty: true,
      totalDifficulty: true,
      gasUsed: true,
      gasLimit: true,
      receiptsRoot: true,
      transactionsRoot: true,
      stateRoot: true,
      size: true,
      sha3Uncles: true,
    },
  })
  .includeAllBlocks({
    from: process.env.BLOCKS_RANGE_FROM ? parseInt(process.env.BLOCKS_RANGE_FROM) : 0,
    to: process.env.BLOCKS_RANGE_TO ? parseInt(process.env.BLOCKS_RANGE_TO) : undefined,
  });

if (process.env.SUBSQUID_GATEWAY_NETWORK || process.env.SUBSQUID_GATEWAY_URL) {
  processor.setGateway({
    url: process.env.SUBSQUID_GATEWAY_NETWORK
      ? lookupArchive(process.env.SUBSQUID_GATEWAY_NETWORK)
      : assertNotNull(
          process.env.SUBSQUID_GATEWAY_URL,
          'Specify valid string values for the SUBSQUID_GATEWAY_URL or SUBSQUID_GATEWAY_NETWORK environment variables',
        ),
    requestTimeout: process.env.SUBSQUID_GATEWAY_REQUEST_TIMEOUT
      ? parseInt(process.env.SUBSQUID_GATEWAY_REQUEST_TIMEOUT)
      : undefined,
  });
}

export type Fields = EvmBatchProcessorFields<typeof processor>;

export type Block = BlockHeader<Fields>;

export type Log = _Log<Fields>;

export type Transaction = _Transaction<Fields>;

export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>;
