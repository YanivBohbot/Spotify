import { Injectable } from '@nestjs/common';
import { DevConfigService } from './common/providers/DEvConfigService';

@Injectable()
export class AppService {
  constructor(private devConfigService: DevConfigService) {}
  getHello(): string {
    return `hello is ${this.devConfigService.getDBHOST()}`;
  }
}
