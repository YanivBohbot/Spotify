import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create_dto_songs';
import { Connection } from 'src/common/constants/connections';

@Controller('songs')
export class SongsController {
  constructor(
    private songService: SongsService,
    @Inject('CONNECTION') private connection: Connection,
  ) {
    console.log(connection);
  }

  @Get()
  findAll() {
    try {
      return this.songService.findAll();
    } catch (e) {
      throw new HttpException(
        'Error in db while fetching record',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  findbyOnebyID(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return `find with the ${id}`;
  }

  @Put(':id')
  update() {
    return 'update the song';
  }

  @Delete(':id')
  delete() {
    return 'delete the song';
  }

  @Post()
  createSong(@Body() CreateSongDTO: CreateSongDTO) {
    return this.songService.create(CreateSongDTO);
  }
}
