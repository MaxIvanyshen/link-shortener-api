import { Injectable } from '@nestjs/common';
import { UpdateLinkDto } from './dto/update-link.dto';
import { CreateLinkDto } from './dto/create-link.dto';
import { Link } from './entities/link.entity';
import { Inject } from '@nestjs/common';

@Injectable()
export class LinkService {
  constructor(
    @Inject('LINK_REPOSITORY')
    private linkRepo: typeof Link,
  ) {}

  async create(createLinkDto: CreateLinkDto) {
    const linkObj: Link = Link.build({
      shortenedLink: createLinkDto.customLink
        ? createLinkDto.customLink
        : this.generateLink(),
      originalLink: createLinkDto.originalLink,
      createdAt: new Date(),
      activeUntil: createLinkDto.activeUntil
        ? new Date(createLinkDto.activeUntil)
        : undefined,
      maxUsages: createLinkDto.maxUsages ? createLinkDto.maxUsages : undefined,
      currentUsages: 0,
    });

    await linkObj.save();

    return linkObj.dataValues;
  }

  async findAll(offset: number, limit: number) {
    const paginated = await this.linkRepo.findAndCountAll({
      offset: offset,
      limit: limit,
    });
    return paginated;
  }

  findOne(id: number) {
    return this.linkRepo.findByPk(id);
  }

  findByShortenedLink(link: string) {
    return this.linkRepo.findOne({ where: { shortenedLink: link } });
  }

  async update(id: number, updateLinkDto: UpdateLinkDto) {
    const link = await this.linkRepo.findByPk(id);
    if (updateLinkDto.shortenedLink) {
      link.shortenedLink = updateLinkDto.shortenedLink;
    }
    if (updateLinkDto.originalLink) {
      link.originalLink = updateLinkDto.originalLink;
    }
    await link.save();
    return link;
  }

  async remove(id: number) {
    const link = await this.linkRepo.findByPk(id);
    link.destroy();
  }

  private generateLink(): string {
    let text = '';
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return text;
  }
}
