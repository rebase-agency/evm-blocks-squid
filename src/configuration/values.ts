import { BlockTimestampUnits } from '../constants';

let BLOCK_TIMESTAMP_UNITS: BlockTimestampUnits = BlockTimestampUnits.ms;

if (process.env.BLOCK_TIMESTAMP_UNITS) {
  switch (process.env.BLOCK_TIMESTAMP_UNITS) {
    case BlockTimestampUnits.ms:
    case BlockTimestampUnits.s:
      BLOCK_TIMESTAMP_UNITS = process.env.BLOCK_TIMESTAMP_UNITS;
      break;
    default:
      throw new Error('Invalid BLOCK_TIMESTAMP_UNITS value. Must be "s" or "ms".');
  }
}

export { BLOCK_TIMESTAMP_UNITS };
