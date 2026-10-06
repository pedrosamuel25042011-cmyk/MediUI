import { Injectable, CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, ip, user } = request;
    
    const startTime = Date.now();

    return next.handle().pipe(
      tap((response) => {
        // Em um ambiente real, aqui injetaríamos o PrismaService para gravar no banco.
        // Simulando a gravação assíncrona na tabela AuditLog (Trilha de Auditoria)
        const executionTime = Date.now() - startTime;
        
        console.log(`[AUDIT_LOG_ENTRY]`);
        console.log(`User ID: ${user?.id || 'Anonymous'}`);
        console.log(`Action: ${method}`);
        console.log(`Endpoint: ${url}`);
        console.log(`IP: ${ip}`);
        console.log(`Execution Time: ${executionTime}ms`);
        
        // Regra LGPD: Se o método foi acesso (GET) a dados sensíveis, deve ser registrado.
        if (url.includes('/patients') && method === 'GET') {
           console.log(`[LGPD ALERTA] Acesso de visualização a dados do paciente registrado.`);
        }
      }),
    );
  }
}
