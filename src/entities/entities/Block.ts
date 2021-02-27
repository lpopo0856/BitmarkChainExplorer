import { Column, Entity, Index, OneToMany } from "typeorm";
import { Asset } from "./Asset";
import { Share } from "./Share";
import { Transaction } from "./Transaction";

@Index("block_pkey", ["blockNumber"], { unique: true })
@Entity("block", { schema: "blockchain" })
export class Block {
  @Column("bigint", { primary: true, name: "block_number" })
  blockNumber: string;

  @Column("text", { name: "block_hash" })
  blockHash: string;

  @Column("timestamp with time zone", {
    name: "block_created_at",
    nullable: true,
  })
  blockCreatedAt: Date | null;

  @OneToMany(() => Asset, (asset) => asset.assetBlockNumber2)
  assets: Asset[];

  @OneToMany(() => Share, (share) => share.shareBlockNumber)
  shares: Share[];

  @OneToMany(() => Transaction, (transaction) => transaction.txBlockNumber2)
  transactions: Transaction[];
}
