import { Artist } from 'src/artists/artists.entity';
import { Playlist } from 'src/playlist/playlist.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('varchar', { array: true })
  artists: string[];

  @Column('date')
  releasedDate: Date;

  @Column('time')
  duration: Date;

  @Column('text')
  lyrics: string;

  @ManyToMany(() => Artist, (artist) => artist.songs, { cascade: true })
  @JoinTable({ name: 'songs_artists' })
  artist: Artist[];

  /**
   * Many songs can belong to playlist for each unique user
   */
  @ManyToOne(() => Playlist, (playList) => playList.songs)
  playList: Playlist;
}
