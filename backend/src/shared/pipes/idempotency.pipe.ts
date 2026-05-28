import {
  Injectable,
  PipeTransform,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class IdempotencyPipe implements PipeTransform {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async transform(value: any) {
    if (!value || !value.idempotencyKey) {
      return value;
    }

    const { idempotencyKey } = value;

    const existing = await this.cacheManager.get(
      `idempotency:${idempotencyKey}`,
    );

    if (existing) {
      throw new HttpException(
        'It has been already created.',
        HttpStatus.CREATED,
      );
    }

    await this.cacheManager.set(
      `idempotency:${idempotencyKey}`,
      true,
      86400000,
    );

    return value;
  }
}
