import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { LicenseService } from '../services/license.service';

@Injectable()
export class LicenseSchedule {

  constructor(
    private licenseService: LicenseService
  ) { }

  // @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
  @Cron('23 16 * * *', {
    timeZone: 'Europe/Bucharest'
  })
  async checkStatus() {
    await this.licenseService.checkLicenseStatus();
  }

}
