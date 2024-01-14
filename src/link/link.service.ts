import { Injectable } from '@nestjs/common';
import { UpdateLinkDto } from './dto/update-link.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Link {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  shortenedLink: string;

  @Column({ type: 'text' })
  originalLink: string;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;
}

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private linkRepo: Repository<Link>,
  ) {}

  create(originalLink: string) {
    const linkObj: Link = new Link();
    linkObj.shortenedLink = this.generateLink();
    linkObj.originalLink = originalLink;
    linkObj.createdAt = new Date();
    linkObj.updatedAt = new Date();
    this.linkRepo.save(linkObj);
    return linkObj;
  }

  async findOne(link: string) {
    const found = await this.linkRepo.findOneBy({ shortenedLink: link });
    return found;
  }

  update(id: number, updateLinkDto: UpdateLinkDto) {
    return `This action updates a #${id} link`;
  }

  remove(id: number) {
    return `This action removes a #${id} link`;
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
