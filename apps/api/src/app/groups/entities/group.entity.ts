import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn
} from "typeorm"
import { ApiProperty } from "@nestjs/swagger"
import { ReputationAccount } from "../../reputation/entities/reputation-account.entity"
import { Member } from "./member.entity"

@Entity("groups")
export class Group {
    @PrimaryColumn({ length: 32 })
    @Index({ unique: true })
    @ApiProperty()
    id: string

    @Column()
    @ApiProperty()
    name: string

    @Column()
    @ApiProperty()
    description: string

    @Column({ name: "admin_id" })
    @ApiProperty()
    adminId: string

    @Column({ name: "tree_depth" })
    @ApiProperty()
    treeDepth: number

    @Column({ name: "fingerprint_duration" })
    @ApiProperty()
    fingerprintDuration: number

    @OneToMany(() => Member, (member) => member.group, {
        cascade: ["insert"]
    })
    @ApiProperty()
    members: Member[]

    @OneToMany(() => ReputationAccount, (account) => account.group, {
        cascade: ["insert"]
    })
    reputationAccounts: ReputationAccount[]

    @Column({
        type: "simple-json",
        name: "reputation_criteria",
        nullable: true
    })
    @ApiProperty()
    reputationCriteria: any // TODO: Add correct type for reputationCriteria JSON

    @Column({ name: "api_enabled", default: false })
    apiEnabled: boolean

    @Column({ name: "api_key", nullable: true })
    apiKey: string

    @CreateDateColumn({ name: "created_at" })
    @ApiProperty()
    createdAt: Date

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date
}
