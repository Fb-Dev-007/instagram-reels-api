import { ApiProperty } from '@nestjs/swagger';

export class UploadReelDto {
  @ApiProperty({
    type: 'string',
  })
  caption = '';

  @ApiProperty({
    type: 'string',
  })
  videoUrl: string;

  @ApiProperty({
    type: 'string',
  })
  coverUrl: string;

  @ApiProperty({
    type: 'boolean',
  })
  shareOnFeed = true;
}
