import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UploadReelDto } from './models/upload-reel.dto';

@Controller('reel')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload')
  public async uploadReels(@Body() uploadReelDto: UploadReelDto) {
    try {
      const response = await this.appService.uploadReels(uploadReelDto);
      if (response) {
        if (response?.data?.id) {
          return { id: response.data.id };
        } else {
          throw new HttpException(
            'No id received for uploaded reel',
            HttpStatus.INTERNAL_SERVER_ERROR.valueOf(),
          );
        }
      }
      throw new HttpException(
        'Response after upload is empty',
        HttpStatus.INTERNAL_SERVER_ERROR.valueOf(),
      );
    } catch (e) {
      console.log(e);
      throw new HttpException(
        e.message ?? e,
        e.status ?? HttpStatus.FORBIDDEN.valueOf(),
      );
    }
  }

  @Post('publish/:containerId')
  public async publishReels(@Param('containerId') containerId: string) {
    try {
      const response = await this.appService.publishReels(containerId);
      if (response) {
        if (response?.data?.id) {
          return { id: response.data.id };
        } else {
          throw new HttpException(
            'No id received for published reel',
            HttpStatus.INTERNAL_SERVER_ERROR.valueOf(),
          );
        }
      }
      throw new HttpException(
        'Reel published failed',
        HttpStatus.INTERNAL_SERVER_ERROR.valueOf(),
      );
    } catch (e) {
      console.log(e);
      throw new HttpException(
        e.message ?? e,
        e.status ?? HttpStatus.FORBIDDEN.valueOf(),
      );
    }
  }
}
