import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Logger } from '@nestjs/common';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const logRequest = `${req.path}, ${JSON.stringify(req.body)}`;

    Logger.log(logRequest, 'Request');

    return next.handle().pipe(
      tap((data) => {
        Logger.log(`${req.path}, ${JSON.stringify(data)} `, 'Response');
      }),
    );
  }
}
