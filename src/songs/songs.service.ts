import { Injectable, Scope } from '@nestjs/common';

@Injectable()
export class SongsService {
  private readonly songs = [];

  create(song: any) {
    this.songs.push(song);
    return this.songs;
  }

  findAll() {
    return this.songs;
  }
}
