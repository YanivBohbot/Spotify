import { Playlist } from 'src/playlist/playlist.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstname: string;
  @Column()
  lastname: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @OneToMany(() => Playlist, (Playlist) => Playlist.user)
  playlist: Playlist[];
}
