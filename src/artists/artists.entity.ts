import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';
import { ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

export class Artist {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => User)
  user: User;
  @ManyToMany(() => Song, (song) => song.artists)
  songs: Song;
}
