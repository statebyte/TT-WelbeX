import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { User } from './User'

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    content!: string

    @Column({ nullable: true })
    mediaUrl!: string

    @Column()
    createdAt!: Date

    @ManyToOne(() => User)
    author!: User
}
