import { BadRequestException, PipeTransform } from '@nestjs/common';
import { CreateLinkDto } from '../dto/create-link.dto';

export default class ShortLinkPipe implements PipeTransform {
  transform(reqBody: CreateLinkDto) {
    const re = new RegExp(
      '(https://www.|http://www.|https://|http://)?[a-zA-Z0-9]{2,}(.[a-zA-Z0-9]{2,})(.[a-zA-Z0-9]{2,})?',
    );
    if (!reqBody.originalLink || !re.test(reqBody.originalLink)) {
      throw new BadRequestException('Invalid url');
    }

    return reqBody;
  }
}
