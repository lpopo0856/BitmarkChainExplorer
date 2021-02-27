import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("event_pkey", ["id"], { unique: true })
@Entity("event", { schema: "blockchain" })
export class Event {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "name" })
  name: string;

  @Column("text", { name: "value" })
  value: string;

  @Column("timestamp with time zone", {
    name: "updated_at",
    nullable: true,
    default: () => "now()",
  })
  updatedAt: Date | null;

  @Column("timestamp with time zone", { name: "expires_at", nullable: true })
  expiresAt: Date | null;

  @Column("timestamp with time zone", { name: "processing_at", nullable: true })
  processingAt: Date | null;

  @Column("boolean", {
    name: "notified",
    nullable: true,
    default: () => "false",
  })
  notified: boolean | null;
}
