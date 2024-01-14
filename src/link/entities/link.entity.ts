import { Table, Column, Model, Unique } from 'sequelize-typescript';

@Table({ tableName: 'link' })
export class Link extends Model {
  @Unique
  @Column({ type: 'text' })
  shortenedLink: string;

  @Column({ type: 'text' })
  originalLink: string;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  activeUntil: Date;

  @Column({ type: 'int' })
  maxUsages: number;

  @Column({ type: 'int' })
  currentUsages: number;

  @Column({ type: 'boolean' })
  hasCustomShortLink: boolean;

  public isActive(): boolean {
    if (
      (this.maxUsages != null && this.currentUsages >= this.maxUsages) ||
      (this.activeUntil && new Date() >= this.activeUntil)
    ) {
      return false;
    }
    return true;
  }
}
