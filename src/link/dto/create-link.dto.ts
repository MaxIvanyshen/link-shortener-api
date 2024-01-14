export class CreateLinkDto {
  customLink: string;
  originalLink: string;
  maxUsages: number;
  activeUntil: Date;
}
