// seed.js (Rode no terminal: node seed.js)
// Para Vídeos (YouTube Gratuito)
// Não copie o link comum da barra de endereços (ex: https://www.youtube.com/watch?v=XYZ). Esse link bloqueia a reprodução dentro de outros sites por segurança.

// Vá no vídeo do YouTube, clique em Compartilhar e depois em Incorporar (Embed).

// O YouTube vai te dar um código em HTML. Desse código, extraia apenas o link que está dentro do atributo src="".

// O formato correto para salvar no banco é:
// https://www.youtube.com/embed/CÓDIGO_DO_VÍDEO       rodar node seed.js para criar

import 'dotenv/config';
import bcrypt from 'bcryptjs';
import sequelize from "./src/database/db.js";
import { User } from "./src/models/user.model.js";
import { Curso } from "./src/models/curso.model.js";
import { Aula } from "./src/models/aula.model.js";

async function inicializarEPopular() {

    
    try {
        console.log("🔄 Conectando e sincronizando banco de dados...");
        // Sincroniza os modelos na ordem correta respeitando as Chaves Estrangeiras
        await sequelize.sync({ alter: true }) 
        console.log("✅ Tabelas 'cursos' e 'aulas' criadas/atualizadas com sucesso!");

        const emailAdmin = "admin@plataforma.com";
    
        // Verifica se o admin já existe para não duplicar
        const adminExiste = await User.findOne({ where: { email: emailAdmin } });
    
        if (!adminExiste) {
            const senhaHash = await bcrypt.hash("clau1234", 10); // Senha padrão de teste
            
            await User.create({
                nome: "Administrador Geral",
                email: emailAdmin,
                senha: senhaHash,
                role: "admin", // <-- Aqui definimos a regra de ouro
                ativo: true
            });
            console.log("➡️ Usuário Admin criado com sucesso! Login: admin@plataforma.com | Senha: clau1234");
        } else {
            console.log("➡️ O usuário Admin já existe no banco.");
        }

        
        // 2. Criamos Cursos de Teste
        const cursoDados = await Curso.create({
            titulo: "Python para Iniciantes",
            cor: "#8b0000"
           
        });

        // 3. Criamos as Aulas para esse curso com vídeos reais do YouTube (incorporados)
        await Aula.bulkCreate([
            {
                titulo: "01 - Introdução",
                ordem: 1,
                videoUrl: "https://www.youtube.com/embed/S9uPNppGsGo", // Guanabara
                materialUrl: null,
                descricao: "Nesta aula vamos configurar o ambiente de desenvolvimento Python utilizando o VS Code.",
                cursoId: cursoDados.id
            },
            {
                titulo: "02 - Para que serve Python",
                ordem: 2,
                videoUrl: "https://www.youtube.com/embed/Mp0vhMDI7fA",
                materialUrl: null,
                descricao: "Aprenda a manipular as principais estruturas de dados para análise.",
                cursoId: cursoDados.id
            },
            {
                titulo: "03 - Ambiente Python",
                ordem: 3,
                videoUrl: "https://www.youtube.com/embed/VuKvR1J2LQE",
                materialUrl: null,
                descricao: "Aprenda a manipular as principais estruturas de dados para análise.",
                cursoId: cursoDados.id
            },
            {
                titulo: "04 - Primeiros comandos em Python",
                ordem: 4,
                videoUrl: "https://www.youtube.com/embed/31llNGKWDdo",
                materialUrl: null,
                descricao: "Aprenda a manipular as principais estruturas de dados para análise.",
                cursoId: cursoDados.id
            },
            {
                titulo: "05 - Para tudo serve Python",
                ordem: 5,
                videoUrl: "https://www.youtube.com/embed/ElRd0cbXIv4",
                materialUrl: null,
                descricao: "Aprenda a manipular as principais estruturas de dados para análise.",
                cursoId: cursoDados.id
            }
        ]);

        // -------------------------------------------------------------
        // CURSO 2: SQL QUERIES EXPERT
        // -------------------------------------------------------------
        console.log("📚 Criando Curso 2...");
        const cursoSQL = await Curso.create({
            titulo: "SQL Queries Expert",
            cor: "#003366"
        });

        await Aula.bulkCreate([
            {
                titulo: "01 - O que é Banco de Dados Relacional",
                ordem: 1,
                videoUrl: "https://www.youtube.com/embed/Ofktsne-utM",
                descricao: "O que é um Banco de Dados",
                cursoId: cursoSQL.id
            },
            {
                titulo: "02 - O que é Banco de Dados Relacional",
                ordem: 1,
                videoUrl: "https://www.youtube.com/embed/5JbAOWJbgIA",
                descricao: "Instalando MySQL",
                cursoId: cursoSQL.id
            },
            {
                titulo: "03 - O que é Banco de Dados Relacional",
                ordem: 1,
                videoUrl: "https://www.youtube.com/embed/R2HrwSQ6EPM",
                descricao: "Instalando XAMPP",
                cursoId: cursoSQL.id
            }
        ]);

        // -------------------------------------------------------------
        // CURSO 3: POWER BI AVANÇADO
        // -------------------------------------------------------------
        console.log("📚 Criando Curso 3...");
        const cursoBI = await Curso.create({
            titulo: "Power BI Avançado",
            cor: "#2d5a27"
        });

        await Aula.bulkCreate([
            {
                titulo: "01 - Introdução ao Business Intelligence",
                ordem: 1,
                videoUrl: "https://www.youtube.com/embed/4mG9YIYUUQ8",
                descricao: "Como transformar dados brutos em decisões inteligentes.",
                cursoId: cursoBI.id
            }
        ]);

        console.log("🚀 Dados de teste inseridos com sucesso! Abra o seu Front-end.");
        process.exit(0);

    } catch (error) {
        console.error("❌ Erro durante o seed do banco:", error);
        process.exit(1);
    }
}

inicializarEPopular();