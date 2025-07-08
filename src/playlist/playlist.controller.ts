import { Body, Controller, Post } from '@nestjs/common';
import { PlaylistService } from './playlist/playlist.service';
import { CreatePlaylistDTO } from './dto/create_playlist_dto';
import { Playlist } from './playlist.entity';

@Controller('playlist')
export class PlaylistController {
  constructor(private playlistService: PlaylistService) {}

  @Post()
  create(@Body() playlistDTO: CreatePlaylistDTO): Promise<Playlist> {
    return this.playlistService.create(playlistDTO);
  }
}
