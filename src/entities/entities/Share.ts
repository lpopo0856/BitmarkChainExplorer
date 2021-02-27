import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Block } from "./Block";
import { Transaction } from "./Transaction";

@Index(
  "unique_share_id_owner_tx_id",
  ["shareId", "shareOwner", "shareTxId", "shareType"],
  { unique: true }
)
@Index("unique_share_id_owner_summation", ["shareId", "shareOwner"], {
  unique: true,
})
@Entity("share", { schema: "blockchain" })
export class Share {
  @Column("text", { name: "share_id" })
  shareId: string;

  @Column("text", { name: "share_owner", default: () => "''" })
  shareOwner: string;

  @Column("integer", { name: "share_quantity", default: () => "0" })
  shareQuantity: number;

  @PrimaryGeneratedColumn({
    type: "bigint",
    name: "share_sequence"
  })
  shareSequence: string | null;

  @Column("enum", {
    name: "share_status",
    enum: ["queuing", "pending", "verified", "confirmed"],
  })
  shareStatus: "queuing" | "pending" | "verified" | "confirmed";

  @Column("text", { name: "share_tx_id", nullable: true })
  shareTxId: string | null;

  @Column("enum", {
    name: "share_type",
    enum: ["increment", "decrement", "summation"],
  })
  shareType: "increment" | "decrement" | "summation";

  @Column("timestamp with time zone", {
    name: "share_modified_at",
    nullable: true,
    default: () => "now()",
  })
  shareModifiedAt: Date | null;

  @Column("timestamp with time zone", {
    name: "share_expires_at",
    nullable: true,
    default: () => "now()",
  })
  shareExpiresAt: Date | null;

  @ManyToOne(() => Block, (block) => block.shares, { onDelete: "CASCADE" })
  @JoinColumn([
    { name: "share_block_number", referencedColumnName: "blockNumber" },
  ])
  shareBlockNumber: Block;

  @ManyToOne(() => Transaction, (transaction) => transaction.shares)
  @JoinColumn([{ name: "share_id", referencedColumnName: "txId" }])
  share: Transaction;

  @ManyToOne(() => Transaction, (transaction) => transaction.shares2, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "share_tx_id", referencedColumnName: "txId" }])
  shareTx: Transaction;
}
