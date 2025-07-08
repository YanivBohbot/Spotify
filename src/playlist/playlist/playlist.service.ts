import { Body, Injectable, Post } from '@nestjs/common';
import { CreatePlaylistDTO } from '../dto/create_playlist_dto';
import { Playlist } from '../playlist.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist) private playlistService: Repository<Playlist>,
    @InjectRepository(Song) private songRepo: Repository<Song>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  @Post()
  async create(
    @Body()
    playlistDTO: CreatePlaylistDTO,
  ): Promise<Playlist> {
    const playList = new Playlist();

    playList.name = playlistDTO.name;

    const songs = await this.songRepo.findByIds(playlistDTO.songs);
    playList.song = songs;

    const user = await this.userRepo.findOneBy({ id: playlistDTO.user });
    playList.user = user;

    return this.playlistService.save(playList);
  }
}
