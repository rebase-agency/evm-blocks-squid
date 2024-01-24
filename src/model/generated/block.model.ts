import {
  Entity as Entity_,
  Column as Column_,
  PrimaryColumn as PrimaryColumn_,
  Index as Index_,
} from 'typeorm';
import * as marshal from './marshal';

@Entity_()
export class Block {
  constructor(props?: Partial<Block>) {
    Object.assign(this, props);
  }

  @PrimaryColumn_()
  id!: string;

  @Index_({ unique: true })
  @Column_('numeric', { transformer: marshal.bigintTransformer, nullable: false })
  number!: bigint;

  @Index_()
  @Column_('numeric', { transformer: marshal.bigintTransformer, nullable: false })
  timestamp!: bigint;

  @Column_('text', { nullable: true })
  parentHash!: string | undefined | null;

  @Column_('text', { nullable: true })
  author!: string | undefined | null;

  @Column_('numeric', { transformer: marshal.bigintTransformer, nullable: true })
  difficulty!: bigint | undefined | null;

  @Column_('numeric', { transformer: marshal.bigintTransformer, nullable: true })
  totalDifficulty!: bigint | undefined | null;

  @Column_('numeric', { transformer: marshal.bigintTransformer, nullable: true })
  gasUsed!: bigint | undefined | null;

  @Column_('numeric', { transformer: marshal.bigintTransformer, nullable: true })
  gasLimit!: bigint | undefined | null;

  @Column_('text', { nullable: true })
  receiptsRoot!: string | undefined | null;

  @Column_('text', { nullable: true })
  transactionsRoot!: string | undefined | null;

  @Column_('text', { nullable: true })
  stateRoot!: string | undefined | null;

  @Column_('numeric', { transformer: marshal.bigintTransformer, nullable: true })
  size!: bigint | undefined | null;

  @Column_('text', { nullable: true })
  unclesHash!: string | undefined | null;
}
