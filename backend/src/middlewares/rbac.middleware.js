//RBAC   recebe os dados do auth controller
export function concederAcesso(...rolesPermitidas) {
    return (req, res, next) => {
        // 1. Verifica se o middleware de autenticação já rodou e preencheu o req.user
        if (!req.user) {
            return res.status(401).json({ message: "Não autenticado." });
        }

        // 2. Verifica se a role do usuário logado está na lista de roles permitidas para esta rota
        if (!rolesPermitidas.includes(req.user.role)) {
            return res.status(403).json({ 
                message: "Acesso negado: você não tem permissão para acessar este recurso." 
            });
        }

        // 3. Se tiver permissão, segue o fluxo
        return next();
    };
}