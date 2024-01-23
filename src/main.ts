import { Block } from './model';
import { DataHandlerContext } from '@subsquid/evm-processor/src/processor';
import { Fields, processor } from './processor';
import { Store, TypeormDatabase } from '@subsquid/typeorm-store';

const blocksHandler = async (ctx: DataHandlerContext<Store, Fields>) => {
  const blocks: Block[] = [];

  for (const block of ctx.blocks) {
    blocks.push(
      new Block({
        id: block.header.id,
        number: BigInt(block.header.height),
        timestamp: BigInt(block.header.timestamp),
        parentHash: block.header?.parentHash,
        author: block.header.miner,
        difficulty: block.header.difficulty,
        totalDifficulty: block.header.totalDifficulty,
        gasUsed: block.header.gasUsed,
        gasLimit: block.header.gasLimit,
        receiptsRoot: block.header.receiptsRoot,
        transactionsRoot: block.header.transactionsRoot,
        stateRoot: block.header.stateRoot,
        size: block.header.size,
        unclesHash: block.header?.sha3Uncles,
      }),
    );
  }

  const startBlock = ctx.blocks.at(0)?.header.height ?? 0;
  const endBlock = ctx.blocks.at(-1)?.header.height ?? 0;
  const blocksQuantity = endBlock - startBlock;

  await ctx.store.upsert(blocks);
  ctx.log.info(`Saved ${blocksQuantity} block(s): from ${startBlock} to ${endBlock}`);
};

processor.run(
  new TypeormDatabase({
    supportHotBlocks: true,
  }),
  blocksHandler,
);
