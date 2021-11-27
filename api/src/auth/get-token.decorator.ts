import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const GetToken = createParamDecorator((data: any, req: Request) => req.headers.authorization);