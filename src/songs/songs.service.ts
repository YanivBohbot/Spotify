import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Song } from './song.entity';
import { Artist } from 'src/artists/artists';
import { CreateSongDTO } from './dto/create_dto_songs';
import { UpdateSongDto } from './dto/update_dto_songs';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class SongsService {
  private readonly songs = [];
  constructor(
    @InjectRepository(Song) private songRepository: Repository<Song>,
    @InjectRepository(Artist) private artistsRepository: Repository<Artist>,
  ) {}

  async create(songDTO: CreateSongDTO): Promise<Song> {
    const song = new Song();
    song.title = songDTO.title;
    song.artists = songDTO.artists;
    song.duration = songDTO.duration;
    song.lyrics = songDTO.lyrics;
    song.releasedDate = songDTO.releasedDate;

    // find all the artists on id
    const artists = await this.artistsRepository.findOneBy(songDTO.artists);
    song.artists = artists;
    return this.songRepository.save(song);
  }

  findAll() {
    return this.songRepository.find();
  }

  findOne(id: number): Promise<Song> {
    return this.songRepository.findOneBy({ id });
  }

  remove(id: number): Promise<DeleteResult> {
    return this.songRepository.delete(id);
  }

  update(id: number, recordtoUpdate: UpdateSongDto): Promise<UpdateResult> {
    return this.songRepository.update(id, recordtoUpdate);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    const queryBuilder = this.songsRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.releasedDate', 'DESC');

    return paginate<Song>(queryBuilder, options);
  }
}
