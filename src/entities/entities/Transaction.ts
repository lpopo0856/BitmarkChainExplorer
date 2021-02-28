import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Share } from "./Share";
import { Asset } from "./Asset";
import { Block } from "./Block";

@Index(
  "tx_edition_index",
  ["txAssetId", "txBlockNumber", "txBlockOffset", "txOwner"],
  { unique: true }
)
@Index("transaction_tx_index_head_and_moved", ["txBitmarkId"], {})
@Index("transaction_issue_index", ["txBitmarkId"], { unique: true })
@Index("transaction_tx_index", ["txBitmarkId"], {})
@Index("tx_block_number_previous_index", ["txBlockNumber"], {})
@Index("tx_block_number_index", ["txBlockNumber"], {})
@Index("tx_expires_at_index", ["txExpiresAt"], {})
@Index("transaction_pkey", ["txId"], { unique: true })
@Index("tx_block_owner_index", ["txOwner", "txSequence"], { unique: true })
@Index("tx_owner_sequence_index", ["txOwner", "txSequence"], { unique: true })
@Index("tx_sequence_index", ["txSequence"], {})
@Entity("transaction", { schema: "blockchain" })
export class Transaction {
  @Column("text", { primary: true, name: "tx_id" })
  txId: string;

  @Column("text", { name: "tx_owner", default: () => "''" })
  txOwner: string;

  @PrimaryGeneratedColumn({
    type: "bigint",
    name: "tx_sequence"
  })
  txSequence: string | null;

  @Column("text", { name: "tx_signature" })
  txSignature: string;

  @Column("text", { name: "tx_countersignature", default: () => "''" })
  txCountersignature: string;

  @Column("text", { name: "tx_asset_id", nullable: true })
  txAssetId: string | null;

  @Column("text", { name: "tx_bitmark_id", nullable: true })
  txBitmarkId: string | null;

  @Column("text", { name: "tx_previous_id", nullable: true })
  txPreviousId: string | null;

  @Column("enum", { name: "tx_head", enum: ["prior", "moved", "head"] })
  txHead: "prior" | "moved" | "head";

  @Column("enum", {
    name: "tx_status",
    enum: ["queuing", "pending", "verified", "confirmed"],
  })
  txStatus: "queuing" | "pending" | "verified" | "confirmed";

  @Column("jsonb", { name: "tx_payments", nullable: true })
  txPayments: object | null;

  @Column("text", { name: "tx_pay_id" })
  txPayId: string;

  @Column("jsonb", { name: "tx_shares_info", nullable: true })
  txSharesInfo: object | null;

  @Column("bigint", { name: "tx_block_number", nullable: true })
  txBlockNumber: string | null;

  @Column("bigint", {
    name: "tx_block_offset",
    nullable: true,
    default: () => "0",
  })
  txBlockOffset: string | null;

  @Column("bigint", { name: "tx_edition", nullable: true })
  txEdition: string | null;

  @Column("timestamp with time zone", { name: "tx_expires_at", nullable: true })
  txExpiresAt: Date | null;

  @Column("timestamp with time zone", {
    name: "tx_modified_at",
    nullable: true,
    default: () => "now()",
  })
  txModifiedAt: Date | null;

  @OneToMany(() => Share, (share) => share.share)
  shares: Share[];

  @OneToMany(() => Share, (share) => share.shareTx)
  shares2: Share[];

  @ManyToOne(() => Asset, (asset) => asset.transactions)
  @JoinColumn([{ name: "tx_asset_id", referencedColumnName: "assetId" }])
  txAsset: Asset;

  @OneToOne(() => Transaction, (transaction) => transaction.transaction, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "tx_bitmark_id", referencedColumnName: "txId" }])
  txBitmark: Transaction;

  @OneToOne(() => Transaction, (transaction) => transaction.txBitmark)
  transaction: Transaction;

  @ManyToOne(() => Block, (block) => block.transactions, {
    onDelete: "CASCADE",
  })
  @JoinColumn([
    { name: "tx_block_number", referencedColumnName: "blockNumber" },
  ])
  txBlockNumber2: Block;

  @ManyToOne(() => Transaction, (transaction) => transaction.transactions, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "tx_previous_id", referencedColumnName: "txId" }])
  txPrevious: Transaction;

  @OneToMany(() => Transaction, (transaction) => transaction.txPrevious)
  transactions: Transaction[];
}
