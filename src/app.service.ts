import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  async getHello(): Promise<Object> {
    return {
      name: 'PLANNING POKER API',
      version: '1.1-Release Candidate (RC)',
      date: new Date()
    }
  }
}
