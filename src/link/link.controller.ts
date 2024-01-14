import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Redirect,
} from '@nestjs/common';
import { LinkService } from './link.service';
import { UpdateLinkDto } from './dto/update-link.dto';
import { CreateLinkDto } from './dto/create-link.dto';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  create(@Body() createLinkDto: CreateLinkDto) {
    return this.linkService.create(createLinkDto.link);
  }

  @Get(':link')
  @Redirect('', 302)
  async findOne(@Param('link') link: string) {
    return { url: (await this.linkService.findOne(link)).originalLink };
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
