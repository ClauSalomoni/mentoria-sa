
import helmet from 'helmet'

//abaixo sugestao do que incluir dependendo
// export const configHelmet = helmet({
//   contentSecurityPolicy: {
//     directives: {
//       // 1. O que é permitido por padrão (apenas o seu próprio domínio)
//       "default-src": ["'self'"],
      
//       // 2. Onde seu front pode buscar scripts (ex: CDNs, Google Analytics)
//       "script-src": ["'self'", "https://apis.google.com", "https://cdn.jsdelivr.net"],
      
//       // 3. De onde podem vir as imagens (seu site, Cloudinary, S3, ou data: para base64)
//       "img-src": ["'self'", "data:", "https://res.cloudinary.com"],
      
//       // 4. Quais APIs externas seu front pode chamar diretamente
//       "connect-src": ["'self'", "https://api.seuservico.com"],
      
//       // 5. Onde as fontes estão hospedadas
//       "font-src": ["'self'", "https://fonts.gstatic.com"],
      
//       // 6. Impede que seu site seja colocado em iframes de outros sites
//       "frame-ancestors": ["'none'"],
      
//       // Força o navegador a usar HTTPS
//       "upgradeInsecureRequests": [],
//     },
//   },
//   // Outras proteções do Helmet (já vêm ativas, mas você pode tunar)
//   referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
// });

export const configHelmet = helmet({

  // impede incorporação em iframes de outros domínios
  frameguard: { action: 'deny' },

  // remove o cabeçalho X-Powered-By: Express
  hidePoweredBy: true,

  // impede MIME sniffing
  noSniff: true,

  // força HTTPS por 1 ano (só em produção com SSL)
  hsts: {
    maxAge: 31536000, // 1 ano em segundos
    includeSubDomains: true,
  },

  // política de referrer
  referrerPolicy: { policy: 'no-referrer' },

  // Content-Security-Policy — para APIs REST, pode ser false
  // pois não servimos HTML. Para apps full-stack, configure.
  contentSecurityPolicy: false,
});