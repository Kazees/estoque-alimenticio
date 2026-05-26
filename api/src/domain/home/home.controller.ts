import { Controller, Get } from '@nestjs/common';

@Controller()
export class HomeController {
  @Get()
  getHello(): string {
    return 'Desafio Estoque Alimentício API';
  }
}
