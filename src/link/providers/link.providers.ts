import { Link } from '../entities/link.entity';

export const linkProviders = [
  {
    provide: 'LINK_REPOSITORY',
    useValue: Link,
  },
];
