import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadReelDto } from './models/upload-reel.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  private readonly api: string;
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.api = `${this.configService.get('api')}/${this.configService.get(
      'api_version',
    )}/${this.configService.get('ig_user_id')}`;
  }

  public async uploadReels(uploadReelDto: UploadReelDto) {
    if (uploadReelDto && uploadReelDto?.videoUrl) {
      const source$ = this.httpService.post(this.api + '/media', void 0, {
        params: {
          video_url: uploadReelDto.videoUrl,
          caption: uploadReelDto.caption,
          share_to_feed: uploadReelDto.shareOnFeed,
          media_type: 'REELS',
          access_token: this.configService.get('page_access_token'),
        },
      });
      return lastValueFrom(source$);
    }
    throw new BadRequestException('No Video url provided for upload');
  }

  public async publishReels(containerId: string) {
    if (containerId) {
      const source$ = this.httpService.post(
        this.api + '/media_publish',
        void 0,
        {
          params: {
            creation_id: containerId,
            access_token: this.configService.get('page_access_token'),
          },
        },
      );
      return lastValueFrom(source$);
    }
    throw new BadRequestException('No containerId provided for publish');
  }
}
