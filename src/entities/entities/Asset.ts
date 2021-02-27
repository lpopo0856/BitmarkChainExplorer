import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Block } from "./Block";
import { Transaction } from "./Transaction";

@Index("asset_block_number_index", ["assetBlockNumber"], {})
@Index("asset_expires_at_index", ["assetExpiresAt"], {})
@Index("asset_pkey", ["assetId"], { unique: true })
@Index(
  "asset_registrant_sequence_index",
  ["assetRegistrant", "assetSequence"],
  { unique: true }
)
@Index("asset_sequence_index", ["assetSequence"], {})
@Entity("asset", { schema: "blockchain" })
export class Asset {
  @Column("text", { primary: true, name: "asset_id" })
  assetId: string;

  @Column("text", { name: "asset_name" })
  assetName: string;

  @Column("text", { name: "asset_fingerprint" })
  assetFingerprint: string;

  @Column("jsonb", { name: "asset_metadata" })
  assetMetadata: object;

  @Column("bytea", { name: "asset_raw_metadata", nullable: true })
  assetRawMetadata: Buffer | null;

  @Column("text", { name: "asset_registrant" })
  assetRegistrant: string;

  @PrimaryGeneratedColumn({
    type: "bigint",
    name: "asset_sequence"
  })
  assetSequence: string | null;

  @Column("text", { name: "asset_signature" })
  assetSignature: string;

  @Column("enum", {
    name: "asset_status",
    enum: ["queuing", "pending", "verified", "confirmed"],
    default: () => "'pending'",
  })
  assetStatus: "queuing" | "pending" | "verified" | "confirmed";

  @Column("bigint", {
    name: "asset_block_number",
    nullable: true,
    default: () => "0",
  })
  assetBlockNumber: string | null;

  @Column("bigint", {
    name: "asset_block_offset",
    nullable: true,
    default: () => "0",
  })
  assetBlockOffset: string | null;

  @Column("timestamp with time zone", {
    name: "asset_expires_at",
    nullable: true,
  })
  assetExpiresAt: Date | null;

  @ManyToOne(() => Block, (block) => block.assets, { onDelete: "CASCADE" })
  @JoinColumn([
    { name: "asset_block_number", referencedColumnName: "blockNumber" },
  ])
  assetBlockNumber2: Block;

  @OneToMany(() => Transaction, (transaction) => transaction.txAsset)
  transactions: Transaction[];
}
