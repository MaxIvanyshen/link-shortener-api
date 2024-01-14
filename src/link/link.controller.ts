import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Redirect,
  HttpStatus,
  Req,
  HttpException,
  Query,
} from '@nestjs/common';
import { LinkService } from './link.service';
import { UpdateLinkDto } from './dto/update-link.dto';
import { CreateLinkDto } from './dto/create-link.dto';
import ShortLinkPipe from './pipes/shortLinkPipe.pipe';
import { Request } from 'express';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  async create(@Body(ShortLinkPipe) createLinkDto: CreateLinkDto) {
    if (
      createLinkDto.customLink &&
      (await this.linkService.findByShortenedLink(createLinkDto.customLink))
    ) {
      throw new HttpException(
        'Custom link taken. Try another one',
        HttpStatus.CONFLICT,
      );
    }
    return await this.linkService.create(createLinkDto);
  }

  @Get()
  async findAll(@Query() query: { offset: number; limit: number }) {
    return this.linkService.findAll(query.offset, query.limit);
  }

  @Get(':link')
  @Redirect('', 302)
  async findByShortenedLink(@Param('link') link: string) {
    const found = await this.linkService.findByShortenedLink(link);
    if (!found.isActive()) {
      throw new HttpException('Link has expired', HttpStatus.NOT_FOUND);
    }
    found.currentUsages++;
    found.save();
    return {
      url: found.originalLink,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.linkService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLinkDto: UpdateLinkDto) {
    return this.linkService.update(+id, updateLinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linkService.remove(+id);
  }
}
