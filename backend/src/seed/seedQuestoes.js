export const BANCO_DE_QUESTOES = [
  // =========================================================================
  // ÁREA: JAVASCRIPT (5 Questões)
  // =========================================================================
  {
    area: "javascript",
    nivel: "iniciante",
    enunciado: "Qual é a principal diferença entre os operadores de igualdade '==' (igualdade ampla) e '===' (igualdade estrita) em JavaScript?",
    opcoes: [
      "O operador '==' compara apenas o tipo de dado, enquanto '===' compara o valor e o tipo.",
      "O operador '==' compara os valores permitindo coerção de tipo (type coercion), enquanto '===' compara o valor e o tipo sem permitir coerção.",
      "Não há diferença prática; ambos funcionam da mesma forma em navegadores modernos.",
      "O operador '===' é usado apenas para objetos e funções, enquanto '==' é usado para tipos primitivos.",
      "O operador '===' foi descontinuado no ECMAScript 6 e substituído por Object.is()."
    ],
    respostaCorreta: 1
  },
  {
    area: "javascript",
    nivel: "intermediario",
    enunciado: "Considere o seguinte trecho de código:\n\nconsole.log(1);\nsetTimeout(() => console.log(2), 0);\nPromise.resolve().then(() => console.log(3));\nconsole.log(4);\n\nQual será a ordem correta de saída no console de acordo com a Event Loop do JavaScript?",
    opcoes: [
      "1, 2, 3, 4",
      "1, 4, 2, 3",
      "1, 4, 3, 2",
      "1, 3, 4, 2",
      "4, 1, 3, 2"
    ],
    respostaCorreta: 2
  },
  {
    area: "javascript",
    nivel: "intermediario",
    enunciado: "O que é um 'Closure' em JavaScript e qual é a sua principal utilidade prática?",
    opcoes: [
      "É um método para fechar conexões de banco de dados e evitar vazamento de memória automaticamente.",
      "É a capacidade de uma função lembrar e acessar seu escopo léxico mesmo quando está sendo executada fora dele, sendo útil para encapsulamento de dados privados.",
      "É uma sintaxe especial do ES6 para declarar classes anônimas que não podem ser herdadas.",
      "É um erro em tempo de execução que ocorre quando duas funções criam uma dependência circular.",
      "É um mecanismo que impede que variáveis declaradas com 'var' sofram Hoisting."
    ],
    respostaCorreta: 1
  },
  {
    area: "javascript",
    nivel: "avancado",
    enunciado: "Ao utilizar o método Object.freeze(obj) em um objeto que possui outros sub-objetos aninhados, o que acontece com a mutabilidade das propriedades internas mais profundas?",
    opcoes: [
      "Todo o objeto e suas propriedades internas, independentemente da profundidade, tornam-se completamente imutáveis.",
      "O JavaScript lança um erro em tempo de execução (TypeError) se o objeto contiver propriedades aninhadas.",
      "O método realiza um congelamento raso (shallow freeze); as propriedades do objeto raiz tornam-se imutáveis, mas os sub-objetos aninhados ainda podem ser modificados.",
      "As propriedades tornam-se privadas e só podem ser alteradas através de métodos getters e setters definidos previamente.",
      "O objeto se transforma em um Proxy imutável que intercepta qualquer tentativa de escrita disparando alertas."
    ],
    respostaCorreta: 2
  },
  {
    area: "javascript",
    nivel: "avancado",
    enunciado: "Qual é a finalidade principal do objeto 'Proxy' introduzido no ECMAScript 6 (ES6)?",
    opcoes: [
      "Permitir que requisições HTTP do tipo Fetch ignorem a política de CORS do navegador.",
      "Encapsular funções assíncronas para que elas rodem em uma thread separada em segundo plano.",
      "Definir comportamentos customizados para operações fundamentais em objetos (ex: interceptar leitura, escrita, enumeração de propriedades).",
      "Substituir o uso de Promises por uma sintaxe mais limpa orientada a eventos puros.",
      "Criar cópias profundas (deep clones) de estruturas complexas de dados de forma altamente performática."
    ],
    respostaCorreta: 2
  },

  // =========================================================================
  // ÁREA: POSTGRESQL (5 Questões)
  // =========================================================================
  {
    area: "postgresql",
    nivel: "iniciante",
    enunciado: "Qual é a principal diferença entre as restrições PRIMARY KEY e UNIQUE em uma tabela do PostgreSQL?",
    opcoes: [
      "A tabela só pode ter uma UNIQUE, mas múltiplas PRIMARY KEYs.",
      "PRIMARY KEY indexa a coluna automaticamente, enquanto a restrição UNIQUE não cria índices.",
      "A coluna com PRIMARY KEY não aceita valores nulos (NULL), enquanto colunas com restrição UNIQUE aceitam múltiplos valores NULL (comportamento padrão).",
      "PRIMARY KEY é usada apenas para chaves numéricas do tipo SERIAL, enquanto UNIQUE é para strings.",
      "Não há diferenças conceituais; ambas impedem valores duplicados e tratam nulos exatamente da mesma maneira."
    ],
    respostaCorreta: 2
  },
  {
    area: "postgresql",
    nivel: "intermediario",
    enunciado: "Você precisa realizar uma busca na tabela 'produtos' onde a descrição contenha a palavra 'cadeira', independente de estar escrita em maiúsculas ou minúsculas (Case-Insensitive). Qual operador é o mais adequado no PostgreSQL?",
    opcoes: [
      "WHERE descricao LIKE '%cadeira%'",
      "WHERE descricao ILIKE '%cadeira%'",
      "WHERE descricao == '%cadeira%'",
      "WHERE descricao REGEXP_BINARY 'cadeira'",
      "WHERE descricao INCLUDES ('cadeira')"
    ],
    respostaCorreta: 1
  },
  {
    area: "postgresql",
    nivel: "intermediario",
    enunciado: "Para que serve a palavra-chave EXPLAIN antes de uma consulta SQL no PostgreSQL?",
    opcoes: [
      "Para exportar os dados da consulta em formato de texto descritivo para relatórios.",
      "Para fazer o banco de dados rodar a query em modo de segurança, simulando os inserts sem alterar o disco.",
      "Para exibir o plano de execução planejado pelo otimizador de consultas do banco, ajudando a identificar gargalos de performance e uso de índices.",
      "Para traduzir comandos PL/pgSQL complexos em sintaxe ANSI SQL purista.",
      "Para gerar documentação técnica automática das tabelas envolvidas na consulta."
    ],
    respostaCorreta: 2
  },
  {
    area: "postgresql",
    nivel: "avancado",
    enunciado: "Qual é a principal vantagem de utilizar o tipo de dado JSONB em vez do tipo JSON tradicional no PostgreSQL?",
    opcoes: [
      "O tipo JSONB armazena o texto idêntico ao enviado, tornando a escrita muito mais rápida que o JSON convencional.",
      "O tipo JSONB suporta indexação (como índices GIN), permitindo consultas rápidas e performáticas dentro das chaves e valores do objeto.",
      "JSONB aceita funções e códigos JavaScript nativos que rodam direto dentro da engine do banco.",
      "JSONB não consome espaço no disco rígido porque usa compressão quântica em memória RAM.",
      "JSONB remove automaticamente qualquer campo que possua string vazia para economizar memória."
    ],
    respostaCorreta: 1
  },
  {
    area: "postgresql",
    nivel: "avancado",
    enunciado: "Em cenários de alta concorrência, o que caracteriza o fenômeno de 'Phantom Read' (Leitura Fantasma) e qual nível de isolamento de transação o previne totalmente no PostgreSQL?",
    opcoes: [
      "Ocorre quando uma transação lê dados modificados por outra transação que ainda não deu COMMIT; resolvido com READ COMMITTED.",
      "Ocorre quando uma transação lê uma linha e, ao tentar reler, descobre que os dados daquela linha foram alterados; resolvido com REPEATABLE READ.",
      "Ocorre quando uma transação executa uma consulta que retorna um conjunto de linhas que satisfazem uma condição e, após outra transação inserir novas linhas com a mesma condição e dar COMMIT, a primeira transação repete a busca e vê linhas adicionais; resolvido com SERIALIZABLE.",
      "Ocorre quando o índice da tabela corrompe momentaneamente durante buscas com INNER JOIN; resolvido reiniciando a transação.",
      "Ocorre quando travas exclusivas (Exclusive Locks) se anulam gerando loops infinitos; resolvido com LOCK TABLE."
    ],
    respostaCorreta: 2
  },

  // =========================================================================
  // ÁREA: LOGICA (5 Questões)
  // =========================================================================
  {
    area: "logica",
    nivel: "iniciante",
    enunciado: "Dadas duas variáveis lógicas, A = TRUE e B = FALSE, qual será o resultado da expressão lógica: !(A && B) || (A && B)?",
    opcoes: [
      "FALSE",
      "TRUE",
      "Null",
      "Undefined",
      "Depende do valor atribuído ao escopo"
    ],
    respostaCorreta: 1
  },
  {
    area: "logica",
    nivel: "iniciante",
    enunciado: "Um algoritmo precisa percorrer uma lista de tamanho N e procurar por um item específico utilizando busca linear (item por item). No pior cenário possível, quantas comparações o algoritmo precisará fazer?",
    opcoes: [
      "1 comparação.",
      "N / 2 comparações.",
      "Log(N) comparações.",
      "N comparações.",
      "N^2 comparações."
    ],
    respostaCorreta: 3
  },
  {
    area: "logica",
    nivel: "intermediario",
    enunciado: "O que caracteriza uma função recursiva na lógica de programação?",
    opcoes: [
      "Uma função que só pode ser executada uma única vez por ciclo do processador.",
      "Uma função que chama a si mesma para resolver subproblemas menores, necessitando obrigatoriamente de uma condição de parada (caso base).",
      "Uma função que converte dados síncronos em fluxos assíncronos de forma oculta.",
      "Uma função que não aceita argumentos e sempre retorna void (vazio).",
      "Um bloco de código estruturado que elimina o uso de estruturas condicionais como o 'if'."
    ],
    respostaCorreta: 1
  },
  {
    area: "logica",
    nivel: "intermediario",
    enunciado: "Qual estrutura de dados baseia-se no princípio LIFO (Last In, First Out - O último a entrar é o primeiro a sair)?",
    opcoes: [
      "Fila (Queue)",
      "Árvore Binária (Binary Tree)",
      "Pilha (Stack)",
      "Lista Encadeada (Linked List)",
      "Tabela Hash (Hash Map)"
    ],
    respostaCorreta: 2
  },
  {
    area: "logica",
    nivel: "avancado",
    enunciado: "Em termos de análise de complexidade de algoritmos (Notação Big-O), qual das alternativas abaixo representa o algoritmo mais performático para buscar um elemento em um array que já se encontra previamente ordenado?",
    opcoes: [
      "O(N^2) - Busca Quadrática",
      "O(N) - Busca Linear",
      "O(1) - Complexidade Constante imediata",
      "O(log N) - Busca Binária",
      "O(N log N) - Busca por Agrupamento"
    ],
    respostaCorreta: 3
  },

  // =========================================================================
  // ÁREA: FULLSTACK (5 Questões)
  // =========================================================================
  {
    area: "fullstack",
    nivel: "iniciante",
    enunciado: "Ao construir um SPA (Single Page Application) utilizando React e Vite, qual é o papel principal do bundler do Vite durante o build de produção?",
    opcoes: [
      "Hospedar o banco de dados temporariamente na memória RAM do usuário.",
      "Compilar, empacotar e minificar os arquivos JS, JSX, CSS de forma otimizada para que o navegador possa lê-los como arquivos estáticos puros de forma rápida.",
      "Gerenciar os tokens JWT de autenticação do lado do servidor Node.js.",
      "Substituir o HTML tradicional por arquivos binários inacessíveis a hackers.",
      "Criar uma ponte de comunicação via gRPC diretamente com o banco de dados relacional."
    ],
    respostaCorreta: 1
  },
  {
    area: "fullstack",
    nivel: "intermediario",
    enunciado: "No ecossistema do React, para que serve o hook 'useEffect'?",
    opcoes: [
      "Para interceptar e alterar estilos CSS de componentes antes da renderização de tela.",
      "Para gerenciar e persistir as credenciais do usuário diretamente no banco PostgreSQL via API.",
      "Para lidar com efeitos colaterais nos componentes (ex: sincronização de dados, chamadas de API (fetch), timers) baseando-se em um array de dependências.",
      "Para recarregar a página HTML inteira sempre que uma variável de estado mudar.",
      "Para transformar componentes funcionais em classes estáticas tradicionais."
    ],
    respostaCorreta: 2
  },
  {
    area: "fullstack",
    nivel: "intermediario",
    enunciado: "Ao projetar uma arquitetura de API RESTful, qual é o comportamento esperado e correto para o uso dos métodos HTTP POST e PUT, respectivamente?",
    opcoes: [
      "POST é usado exclusivamente para deletar registros; PUT insere dados ignorando validações.",
      "POST envia dados pela URL de forma aberta; PUT envia dados criptografados pelo cabeçalho (headers).",
      "POST cria um novo recurso no servidor; PUT atualiza um recurso existente ou o substitui por completo de forma idempotente.",
      "Ambos realizam exatamente as mesmas funções, sendo diferenciados apenas pelo limite de bytes suportado.",
      "POST cria tabelas novas no banco de dados; PUT insere linhas nessas tabelas."
    ],
    respostaCorreta: 2
  },
  {
    area: "fullstack",
    nivel: "avancado",
    enunciado: "Por que não devemos armazenar Tokens JWT (JSON Web Tokens) contendo informações sensíveis diretamente no LocalStorage do navegador em aplicações de produção?",
    opcoes: [
      "Porque o LocalStorage apaga todos os dados guardados assim que o usuário fecha a aba do navegador.",
      "Porque o LocalStorage é limitado a armazenar apenas 50 caracteres, truncando assinaturas criptográficas complexas.",
      "Porque o LocalStorage é acessível via scripts JavaScript maliciosos injetados na página (ataques XSS - Cross-Site Scripting), expondo o token do usuário.",
      "Porque o protocolo HTTP impede que o LocalStorage trafegue dados em conexões seguras HTTPS.",
      "Porque o banco de dados PostgreSQL bloqueia requisições vindas de chaves lidas pelo LocalStorage por padrão de segurança."
    ],
    respostaCorreta: 2
  },
  {
    area: "fullstack",
    nivel: "avancado",
    enunciado: "No React, qual é o benefício de se utilizar o hook 'useMemo' ou a função 'memo' em componentes filhos de listas grandes?",
    opcoes: [
      "Forçar o componente a realizar chamadas HTTP repetitivas em busca de atualizações.",
      "Armazenar em cache (memoizar) o resultado computado de cálculos caros ou evitar re-renderizações desnecessárias de componentes filhos cujas propriedades (props) não mudaram, otimizando a performance.",
      "Criar cópias automáticas do estado local no SessionStorage do usuário.",
      "Ignorar o ciclo de renderização do Virtual DOM e interagir diretamente no DOM nativo do navegador.",
      "Criptografar as props do componente para evitar engenharia reversa no front-end."
    ],
    respostaCorreta: 1
  },
  {
    area: "javascript",
    nivel: "iniciante",
    enunciado: "Qual das seguintes alternativas descreve corretamente o comportamento das variáveis declaradas com 'let' e 'const' em relação ao Hoisting?",
    opcoes: [
      "Elas não sofrem hoisting de forma alguma e são tratadas como inexistentes até a linha de declaração.",
      "Elas sofrem hoisting para o topo do bloco, mas entram em uma 'Zona Temporal Morta' (Temporal Dead Zone), impedindo seu acesso antes da linha de declaração.",
      "Elas funcionam exatamente como o 'var', sendo inicializadas automaticamente com o valor 'undefined'.",
      "Apenas variáveis 'let' sofrem hoisting, enquanto 'const' gera um erro de compilação imediato.",
      "Elas sofrem hoisting apenas se forem declaradas dentro de uma arrow function."
    ],
    respostaCorreta: 1
  },
  {
    area: "javascript",
    nivel: "iniciante",
    enunciado: "O que o método 'Array.prototype.map()' retorna quando executado em um array?",
    opcoes: [
      "Um novo array contendo apenas os elementos que passaram em uma validação condicional.",
      "O valor acumulado final após processar todos os elementos (como uma soma).",
      "Um novo array com o mesmo número de elementos, onde cada elemento é o resultado da função de callback aplicada.",
      "Modifica o array original diretamente sem retornar nenhuma estrutura de dados.",
      "O índice do primeiro elemento que satisfaz a condição informada na função."
    ],
    respostaCorreta: 2
  },
  {
    area: "javascript",
    nivel: "intermediario",
    enunciado: "Qual é a principal diferença entre os métodos 'Function.prototype.call()' e 'Function.prototype.apply()'?",
    opcoes: [
      "O método 'call' executa a função assincronamente, enquanto 'apply' roda de forma síncrona.",
      "O método 'call' aceita os argumentos da função separados por vírgula, enquanto 'apply' aceita os argumentos encapsulados dentro de um array.",
      "O método 'apply' cria uma nova cópia permanente da função vinculando o escopo 'this', enquanto 'call' não.",
      "O método 'call' foi descontinuado no ES6, restando apenas o uso do 'apply'.",
      "Não há diferença na passagem de parâmetros, apenas no fato de que 'apply' consome menos memória RAM."
    ],
    respostaCorreta: 1
  },
  {
    area: "javascript",
    nivel: "intermediario",
    enunciado: "Qual será o comportamento do seguinte código em JavaScript?\n\nconst obj = { nome: 'Dev' };\nconsole.log(obj.idade?.toString());",
    opcoes: [
      "Irá lançar um erro em tempo de execução (TypeError: Cannot read properties of undefined).",
      "Irá imprimir a string 'undefined' no console.",
      "Irá retornar o valor 'null' imediatamente.",
      "Irá retornar 'undefined' e não disparará um erro devido ao operador de encadeamento opcional (?.).",
      "O código gerará um erro de sintaxe e impedirá a execução do script."
    ],
    respostaCorreta: 3
  },
  {
    area: "javascript",
    nivel: "intermediario",
    enunciado: "Ao trabalhar com herança em JavaScript (antes e depois das classes do ES6), qual conceito fundamental sustenta o compartilhamento de métodos entre objetos?",
    opcoes: [
      "Injeção de Dependência nativa via runtime.",
      "A Cadeia de Protótipos (Prototype Chain).",
      "Alocação de ponteiros estáticos na memória Heap.",
      "Compilação Just-In-Time (JIT) realizada pelo motor V8.",
      "Mapeamento de herança linear baseada em interfaces estruturais."
    ],
    respostaCorreta: 1
  },
  {
    area: "javascript",
    nivel: "intermediario",
    enunciado: "Qual é a finalidade do operador de coalescência nula (??) em JavaScript?",
    opcoes: [
      "Retornar o operando do lado direito se o lado esquerdo for 'falsy' (como 0, false, ou string vazia).",
      "Retornar o operando do lado direito apenas se o lado esquerdo for estritamente 'null' ou 'undefined'.",
      "Verificar se duas variáveis possuem o mesmo endereço físico de memória.",
      "Transformar qualquer valor em uma variável booleana equivalente.",
      "Concatenar duas strings ignorando caracteres de escape."
    ],
    respostaCorreta: 1
  },
  {
    area: "javascript",
    nivel: "avancado",
    enunciado: "No ecossistema assíncrono do JavaScript, o que acontece se uma Promise dentro de uma função 'Promise.all()' for rejeitada?",
    opcoes: [
      "O 'Promise.all' aguarda as outras resolverem e retorna um array misto de resultados e erros.",
      "A rejeição é ignorada e o método retorna apenas as Promises resolvidas com sucesso.",
      "O 'Promise.all' rejeita imediatamente (comportamento fail-fast), descartando os resultados das outras Promises, mesmo que tenham resolvido.",
      "O JavaScript pausa a thread principal até que o desenvolvedor capture o erro com um bloco catch.",
      "A execução entra em loop infinito tentando refazer a requisição da Promise falha."
    ],
    respostaCorreta: 2
  },
  {
    area: "javascript",
    nivel: "avancado",
    enunciado: "Qual estrutura de dados nativa do JavaScript permite armazenar chaves de qualquer tipo (incluindo objetos e funções) e mantém a ordem de inserção dos elementos?",
    opcoes: [
      "Object tradicional.",
      "WeakSet.",
      "Map.",
      "Array associativo bidimensional.",
      "JSON indexável."
    ],
    respostaCorreta: 2
  },
  {
    area: "javascript",
    nivel: "avancado",
    enunciado: "Como o comportamento de uma 'Arrow Function' difere de uma função tradicional declarada com a palavra-chave 'function' em relação à palavra-chave 'this'?",
    opcoes: [
      "As Arrow Functions mudam o valor de 'this' dinamicamente a cada nova linha de execução do código.",
      "As Arrow Functions não possuem seu próprio contexto de 'this'; em vez disso, elas herdam o 'this' do escopo léxico onde foram criadas.",
      "Arrow Functions só aceitam o 'this' se ele for explicitamente injetado através do método '.bind()'.",
      "Funções tradicionais impedem o uso do 'this' quando o modo estrito ('use strict') está ativo.",
      "Arrow Functions alteram o 'this' global para torná-lo imutável dentro de objetos."
    ],
    respostaCorreta: 1
  },
  {
    area: "javascript",
    nivel: "avancado",
    enunciado: "Em gerenciamento de memória em JavaScript, qual é o papel principal de um 'WeakMap'?",
    opcoes: [
      "Permitir buscas rápidas O(1) usando chaves do tipo numéricas inteiras.",
      "Manter referências fracas para suas chaves (que devem ser objetos), permitindo que o Garbage Collector colete o objeto se não houver outras referências a ele, evitando vazamento de memória.",
      "Impedir que qualquer propriedade salva nele sofra modificações (funciona como um freeze automático).",
      "Armazenar dados permanentemente no LocalStorage sem expirar.",
      "Criar uma fila ordenada FIFO de alto desempenho para objetos de renderização de interface."
    ],
    respostaCorreta: 1
  },

  // =========================================================================
  // ÁREA: POSTGRESQL (+10 Questões)
  // =========================================================================
  {
    area: "postgresql",
    nivel: "iniciante",
    enunciado: "Em uma consulta SQL utilizando o PostgreSQL, qual cláusula deve ser usada para agrupar linhas que têm os mesmos valores em colunas de resumo, frequentemente combinada com funções agregadas como SUM ou COUNT?",
    opcoes: [
      "ORDER BY",
      "HAVING",
      "GROUP BY",
      "SORT BY",
      "JOIN ON"
    ],
    respostaCorreta: 2
  },
  {
    area: "postgresql",
    nivel: "iniciante",
    enunciado: "Ao definir uma tabela no PostgreSQL, qual é a principal característica do tipo de dado SERIAL?",
    opcoes: [
      "Ele converte os dados em uma sequência de strings criptografadas com hash SHA-256.",
      "Ele cria automaticamente um número inteiro auto-incrementável atrelado a uma SEQUENCE de banco de dados.",
      "É usado exclusivamente para armazenar arquivos binários e imagens pesadas de forma fatiada.",
      "Garante que o campo aceitará apenas números de ponto flutuante de precisão simples.",
      "Transforma a coluna em uma chave estrangeira condicional indexada na memória RAM."
    ],
    respostaCorreta: 1
  },
  {
    area: "postgresql",
    nivel: "intermediario",
    enunciado: "Qual é a diferença conceitual e prática entre o operador INNER JOIN e o LEFT JOIN (ou LEFT OUTER JOIN) no PostgreSQL?",
    opcoes: [
      "O INNER JOIN traz registros nulos de ambas as tabelas; o LEFT JOIN descarta qualquer linha nula.",
      "O INNER JOIN retorna apenas as linhas onde há correspondência em ambas as tabelas; o LEFT JOIN retorna todas as linhas da tabela à esquerda e as correspondentes da tabela à direita, preenchendo com NULL onde não houver match.",
      "O LEFT JOIN é exclusivo para tabelas guardadas em partições de disco secundárias.",
      "O INNER JOIN realiza a busca de forma síncrona e bloqueante, enquanto o LEFT JOIN roda em background de forma assíncrona.",
      "Não há diferenças práticas, ambos geram o mesmo plano de execução (Execution Plan) no otimizador do Postgres."
    ],
    respostaCorreta: 1
  },
  {
    area: "postgresql",
    nivel: "intermediario",
    enunciado: "Ao gerenciar concorrência e integridade em chaves estrangeiras, o que o comando 'ON DELETE CASCADE' faz?",
    opcoes: [
      "Impede que uma linha na tabela pai seja deletada se houver registros vinculados na tabela filha.",
      "Modifica o valor da chave estrangeira da tabela filha para NULL se o registro pai for removido.",
      "Apaga automaticamente todos os registros correspondentes na tabela filha quando a linha referenciada na tabela pai é deletada.",
      "Move o registro deletado para uma tabela de backup oculta chamada 'cascade_history'.",
      "Dispara um gatilho (trigger) de erro crítico paralisando o servidor PostgreSQL por segurança."
    ],
    respostaCorreta: 2
  },
  {
    area: "postgresql",
    nivel: "intermediario",
    enunciado: "Para que serve a cláusula HAVING em uma consulta SQL no PostgreSQL?",
    opcoes: [
      "Para ordenar a saída dos registros em ordem alfabética reversa.",
      "Para filtrar linhas individuais da tabela antes que ocorra qualquer tipo de agrupamento de dados.",
      "Para aplicar condições de filtragem sobre grupos criados pela cláusula GROUP BY ou funções de agregação.",
      "Para renomear colunas dinamicamente no cabeçalho da resposta do banco.",
      "Para limitar a quantidade de linhas retornadas pela query (equivalente ao LIMIT)."
    ],
    respostaCorreta: 2
  },
  {
    area: "postgresql",
    nivel: "intermediario",
    enunciado: "Qual índice padrão é criado pelo PostgreSQL ao definir uma coluna como PRIMARY KEY e qual a sua estrutura básica?",
    opcoes: [
      "Índice Hash, otimizado para buscas por aproximação usando LIKE.",
      "Índice GIN, ideal para documentos JSON complexos.",
      "Índice B-Tree (Árvore B), otimizado para buscas de igualdade e intervalos de valores.",
      "Índice GiST, focado em dados geométricos e coordenadas geográficas.",
      "Índice BRIN, exclusivo para tabelas com mais de 100 milhões de registros ordenados fisicamente."
    ],
    respostaCorreta: 2
  },
  {
    area: "postgresql",
    nivel: "avancado",
    enunciado: "O que caracteriza uma CTE (Common Table Expression), definida através da palavra-chave 'WITH' no PostgreSQL?",
    opcoes: [
      "É um comando para criar tabelas físicas permanentes que sobrecarregam o cache do disco.",
      "É um conjunto de resultados temporário e nomeado que existe apenas durante a execução de uma única consulta, melhorando a legibilidade e permitindo recursividade.",
      "É um recurso usado exclusivamente para fazer sharding de bancos relacionais.",
      "Uma sintaxe antiga para forçar o Postgres a ignorar o uso de chaves estrangeiras durante inserts.",
      "Uma ferramenta externa para monitoramento de tráfego de conexões ativas no banco de dados."
    ],
    respostaCorreta: 1
  },
  {
    area: "postgresql",
    nivel: "avancado",
    enunciado: "Em termos de arquitetura e performance no PostgreSQL, o que o comando VACUUM faz?",
    opcoes: [
      "Apaga a tabela inteira do disco e recria os arquivos do zero sem fragmentação.",
      "Remove permanentemente linhas 'mortas' deixadas por operações de UPDATE e DELETE, liberando espaço em disco ou marcando o espaço como reutilizável para novas inserções.",
      "Reinicia a contagem de todas as tabelas que usam o tipo de dados SERIAL.",
      "Criptografa os logs de transação (WAL) para aumentar o nível de conformidade com a LGPD.",
      "Cria réplicas de leitura síncronas de forma automatizada na memória cache."
    ],
    respostaCorreta: 1
  },
  {
    area: "postgresql",
    nivel: "avancado",
    enunciado: "As Window Functions (Funções de Janela), introduzidas pela cláusula OVER(), têm qual característica principal que as diferencia do GROUP BY?",
    opcoes: [
      "Elas exigem que a tabela seja dividida fisicamente em múltiplas partições de disco rígido.",
      "Elas realizam cálculos agregados em um conjunto de linhas, mas mantêm a identidade de cada linha individual na saída final da consulta, em vez de colapsá-las em uma única linha.",
      "Elas só podem ser aplicadas em colunas do tipo JSONB ou texto puro.",
      "Elas rodam de forma isolada em transações paralelas que ignoram o nível de concorrência atual.",
      "Substituem completamente o uso de INNER JOINs em qualquer subquery."
    ],
    respostaCorreta: 1
  },
  {
    area: "postgresql",
    nivel: "avancado",
    enunciado: "No PostgreSQL, qual é a finalidade dos logs conhecidos como WAL (Write-Ahead Logging)?",
    opcoes: [
      "Gerar arquivos de log legíveis para o desenvolvedor analisar erros de sintaxe no código Node.js.",
      "Registrar todas as consultas do tipo SELECT para fins de auditoria de performance.",
      "Garantir a durabilidade e atomicidade dos dados (propriedades ACID), gravando as alterações no log antes que as páginas de dados modificadas sejam escritas no disco, permitindo recuperação em caso de queda do servidor.",
      "Substituir o cache do sistema operacional para agilizar a leitura de índices B-Tree.",
      "Armazenar credenciais de usuários e senhas hash encriptadas em nível de cluster."
    ],
    respostaCorreta: 2
  },
  
  {
    "area": "logica",
    "nivel": "iniciante",
    "enunciado": "Três amigos, Alan, Beto e Caio, estão em uma fila. Alan não é o primeiro. Caio está em algum lugar atrás de Beto. Quem está na primeira posição da fila?",
    "opcoes": [
      "Alan",
      "Beto",
      "Caio",
      "Não é possível determinar com as informações dadas",
      "A fila está vazia"
    ],
    "respostaCorreta": 1
  },
  {
    "area": "javascript",
    "nivel": "iniciante",
    "enunciado": "Qual é o comportamento esperado ao tentar redeclarar uma variável utilizando a palavra-chave 'let' dentro do mesmo escopo em JavaScript?",
    "opcoes": [
      "A variável é redefinida silenciosamente substituindo o valor anterior.",
      "O JavaScript ignora a segunda declaração e mantém o valor da primeira.",
      "É lançado um erro de sintaxe (SyntaxError) impedindo a execução do código.",
      "A variável automaticamente se transforma em uma constante ('const').",
      "O valor da variável passa a ser obrigatoriamente 'undefined'."
    ],
    "respostaCorreta": 2
  },
  {
    "area": "postgresql",
    "nivel": "iniciante",
    "enunciado": "Qual comando SQL é utilizado para remover completamente uma tabela e toda a sua estrutura do banco de dados PostgreSQL?",
    "opcoes": [
      "DELETE TABLE nome_tabela;",
      "REMOVE TABLE nome_tabela;",
      "TRUNCATE TABLE nome_tabela;",
      "DROP TABLE nome_tabela;",
      "CLEAR TABLE nome_tabela;"
    ],
    "respostaCorreta": 3
  },
  {
    "area": "fullstack",
    "nivel": "intermediario",
    "enunciado": "Ao desenvolver uma aplicação Fullstack, qual é a principal diferença conceitual entre autenticação baseada em Sessão (Session-based) e autenticação baseada em Token (como JWT)?",
    "opcoes": [
      "A autenticação por sessão guarda o estado do usuário no servidor, enquanto o JWT é stateless e armazena os dados cifrados no próprio cliente.",
      "O JWT exige uma consulta ao banco de dados a cada requisição, enquanto a sessão valida os dados localmente no navegador.",
      "Sessões só funcionam em conexões HTTP normais e JWT funciona exclusivamente sob o protocolo HTTPS.",
      "Tokens JWT são armazenados apenas no LocalStorage e cookies são proibidos de guardar tokens.",
      "Sessões são usadas apenas para aplicações Mobile e JWT apenas para aplicações Web de página única (SPA)."
    ],
    "respostaCorreta": 0
  },
  {
    "area": "javascript",
    "nivel": "intermediario",
    "enunciado": "O que caracteriza o fenômeno conhecido como 'Closure' em JavaScript?",
    "opcoes": [
      "A habilidade de uma função acelerar loops através da compilação JIT do navegador.",
      "O fechamento automático de conexões de rede quando uma função assíncrona termina.",
      "A capacidade de uma função lembrar e acessar seu escopo léxico original, mesmo quando está sendo executada fora dele.",
      "Uma técnica de minificação de código que remove espaços em branco para proteger a propriedade intelectual.",
      "O encapsulamento que impede estritamente que funções internas acessem variáveis globais."
    ],
    "respostaCorreta": 2
  },
  {
    "area": "postgresql",
    "nivel": "intermediario",
    "enunciado": "Em uma estratégia de modelagem e performance no PostgreSQL, qual é o principal objetivo de criar uma View Materializada (Materialized View) em vez de uma View padrão?",
    "opcoes": [
      "Permitir que usuários façam inserts e updates diretamente na View, atualizando a tabela original de forma síncrona.",
      "Armazenar fisicamente o resultado da consulta em disco para leituras muito mais rápidas, necessitando de uma atualização (refresh) manual ou agendada.",
      "Ocultar a estrutura das tabelas por motivos estritos de criptografia de ponta a ponta.",
      "Forçar o banco de dados a usar tabelas temporárias voláteis na memória RAM a cada nova query.",
      "Impedir que a View sofra com problemas de concorrência ou deadlocks."
    ],
    "respostaCorreta": 1
  },
  {
    "area": "logica",
    "nivel": "avancado",
    "enunciado": "Considere a seguinte proposição lógica: 'Se o sistema está sobrecarregado, então o tempo de resposta aumenta'. Qual das alternativas apresenta a contrapositiva logicamente equivalente a essa afirmação?",
    "opcoes": [
      "Se o tempo de resposta aumenta, então o sistema está sobrecarregado.",
      "Se o sistema não está sobrecarregado, então o tempo de resposta não aumenta.",
      "Se o tempo de resposta não aumenta, então o sistema não está sobrecarregado.",
      "O sistema está sobrecarregado ou o tempo de resposta não aumenta.",
      "Se o tempo de resposta não aumenta, o sistema continua sobrecarregado."
    ],
    "respostaCorreta": 2
  },
  {
    "area": "javascript",
    "nivel": "avancado",
    "enunciado": "Como funciona o mecanismo de 'Prototypal Inheritance' (Herança Prototipal) no JavaScript quando tentamos acessar uma propriedade de um objeto?",
    "opcoes": [
      "O JavaScript faz uma busca binária compilada em uma tabela estática de classes clonadas em memória.",
      "A propriedade é buscada no próprio objeto; se não for encontrada, o motor percorre a cadeia de protótipos ([[Prototype]]) para cima até encontrá-la ou chegar a 'null'.",
      "O motor do JavaScript cria cópias profundas (deep clones) de todos os métodos do pai diretamente no objeto filho no momento da instanciação.",
      "Caso a propriedade não exista no objeto, ocorre um erro em tempo de compilação antes mesmo do script rodar.",
      "O objeto filho consulta um serviço de injeção de dependência global para mapear classes abstratas."
    ],
    "respostaCorreta": 1
  },
  {
    "area": "postgresql",
    "nivel": "avancado",
    "enunciado": "No PostgreSQL, qual é o impacto direto do mecanismo de MVCC (Multi-Version Concurrency Control) na manutenção de tabelas que sofrem constantes atualizações (UPDATES) e deleções (DELETES)?",
    "opcoes": [
      "As linhas antigas são deletadas do disco instantaneamente, zerando o uso de fragmentação.",
      "O banco trava a tabela inteira para qualquer operação de leitura enquanto um UPDATE é executado.",
      "Ocorre o acúmulo de 'dead tuples' (linhas mortas), tornando necessário o processo de VACUUM para liberar espaço em disco e atualizar as estatísticas.",
      "O PostgreSQL corrompe os índices automaticamente se houver mais de 1000 transações simultâneas por segundo.",
      "Ocorre a conversão automática de todas as tabelas afetadas para o formato do sistema NoSQL."
    ],
    "respostaCorreta": 2
  },
  {
    "area": "fullstack",
    "nivel": "avancado",
    "enunciado": "Ao configurar uma política de CORS (Cross-Origin Resource Sharing) em uma arquitetura Fullstack robusta, qual é a função exata de uma requisição do tipo 'Preflight' (feita via método OPTIONS)?",
    "opcoes": [
      "Compactar o payload da requisição principal utilizando algoritmos GZIP ou Brotli.",
      "Verificar antecipadamente com o servidor se a origem, o método e os cabeçalhos da requisição real são seguros e permitidos antes de enviá-la de fato.",
      "Autenticar o usuário criando um túnel WebSocket persistente para transmissão de mídia.",
      "Limpar o cache do navegador do cliente para garantir que os dados recebidos sejam sempre os mais recentes.",
      "Registrar logs de auditoria na CDN para mitigar ataques distribuídos de negação de serviço (DDoS)."
    ],
    "respostaCorreta": 1
  },
  
  {
    "area": "logica",
    "nivel": "iniciante",
    "enunciado": "Se todos os programadores gostam de café e Mariana é programadora, qual conclusão é logicamente válida?",
    "opcoes": [
      "Mariana não gosta de café.",
      "Todo mundo que gosta de café é programador.",
      "Mariana gosta de café.",
      "Mariana gosta de café apenas quando está programando.",
      "Nenhuma conclusão pode ser tomada."
    ],
    "respostaCorreta": 2
  },
  {
    "area": "javascript",
    "nivel": "iniciante",
    "enunciado": "Qual dos seguintes métodos é utilizado para adicionar um ou mais elementos ao final de um array em JavaScript e retorna o novo comprimento desse array?",
    "opcoes": [
      "pop()",
      "shift()",
      "push()",
      "unshift()",
      "join()"
    ],
    "respostaCorreta": 2
  },
  {
    "area": "postgresql",
    "nivel": "iniciante",
    "enunciado": "Qual cláusula do comando SELECT é utilizada no PostgreSQL para filtrar registros baseando-se em uma condição específica?",
    "opcoes": [
      "ORDER BY",
      "GROUP BY",
      "HAVING",
      "WHERE",
      "LIMIT"
    ],
    "respostaCorreta": 3
  },
  {
    "area": "fullstack",
    "nivel": "iniciante",
    "enunciado": "No desenvolvimento web, qual é o papel principal do protocolo HTTP (Hypertext Transfer Protocol)?",
    "opcoes": [
      "Estilizar páginas HTML utilizando regras de CSS estruturadas.",
      "Compilar códigos de backend para linguagem de máquina.",
      "Reger a comunicação, transferência de dados e requisições/respostas entre o cliente (navegador) e o servidor.",
      "Garantir o armazenamento seguro e criptografado de senhas no banco de dados.",
      "Criar animações interativas na interface do usuário."
    ],
    "respostaCorreta": 2
  },
  {
    "area": "logica",
    "nivel": "intermediario",
    "enunciado": "Uma negação lógica para a afirmação 'Nenhum desenvolvedor trabalha aos domingos' é:",
    "opcoes": [
      "Todos os desenvolvedores trabalham aos domingos.",
      "Pelo menos um desenvolvedor trabalha aos domingos.",
      "Nenhum desenvolvedor trabalha aos sábados.",
      "Todos os desenvolvedores não trabalham aos domingos.",
      "Se é domingo, nenhum desenvolvedor trabalha."
    ],
    "respostaCorreta": 1
  },
  {
    "area": "javascript",
    "nivel": "intermediario",
    "enunciado": "Qual é a principal diferença entre métodos assíncronos que usam 'async/await' e aqueles que usam 'Promises' puras com '.then()'?",
    "opcoes": [
      "'async/await' bloqueia a thread principal do JavaScript, enquanto as Promises puras rodam em background de forma multi-thread.",
      "'async/await' é apenas um açúcar sintático (syntactic sugar) construído sobre Promises, permitindo escrever código assíncrono com uma aparência e fluxo síncronos mais legíveis.",
      "Funções 'async' não podem retornar Promises, apenas valores primitivos.",
      "O tratamento de erros com 'async/await' é impossível, exigindo sempre o uso secundário de '.catch()'.",
      "Promises puras foram completamente banidas do ecossistema moderno do JavaScript runtime."
    ],
    "respostaCorreta": 1
  },
  {
    "area": "postgresql",
    "nivel": "intermediario",
    "enunciado": "Ao utilizar restrições (constraints) no PostgreSQL, qual é a diferença entre uma chave primária (PRIMARY KEY) e uma restrição de unicidade (UNIQUE)?",
    "opcoes": [
      "A coluna UNIQUE permite múltiplos valores nulos (NULL), enquanto a PRIMARY KEY não permite valores nulos e serve como identificador principal da linha.",
      "A restrição UNIQUE pode ser aplicada apenas a colunas do tipo texto, enquanto PRIMARY KEY aplica-se apenas a números.",
      "Não há diferença prática; ambas criam os mesmos índices e possuem as mesmas regras para valores nulos.",
      "A tabela pode ter infinitas PRIMARY KEYs, mas apenas uma restrição UNIQUE por tabela.",
      "A restrição UNIQUE bloqueia a tabela para leitura sempre que um dado duplicado é inserido."
    ],
    "respostaCorreta": 0
  },
  {
    "area": "fullstack",
    "nivel": "intermediario",
    "enunciado": "Em uma arquitetura de API RESTful, quais métodos HTTP são considerados estritamente 'Idempotentes' (onde múltiplas requisições idênticas produzem o mesmo efeito que uma única requisição)?",
    "opcoes": [
      "POST e PATCH",
      "GET, PUT e DELETE",
      "POST, GET e OPTIONS",
      "Apenas o método POST",
      "Nenhum método HTTP é idempotente por padrão conceitual."
    ],
    "respostaCorreta": 1
  },
  {
    "area": "logica",
    "nivel": "avancado",
    "enunciado": "Em uma ilha, existem apenas dois tipos de habitantes: os que sempre falam a verdade e os que sempre mentem. Você encontra um habitante X e ele diz: 'Eu sempre minto'. O que se pode concluir logicamente sobre X?",
    "opcoes": [
      "X fala a verdade.",
      "X é um mentiroso.",
      "X é um estrangeiro que não pertence à ilha.",
      "Esta situação é um paradoxo lógico; tal habitante não poderia existir nessa ilha.",
      "X fala a verdade metade do tempo."
    ],
    "respostaCorreta": 3
  },
  {
    "area": "javascript",
    "nivel": "avancado",
    "enunciado": "O que acontece ao utilizar a API de 'Proxy' do JavaScript (recurso introduzido no ES6)?",
    "opcoes": [
      "Permite criar uma conexão VPN criptografada direto através da engine do V8.",
      "Permite interceptar e customizar operações fundamentais em um objeto alvo (como leitura de propriedades, atribuição, enumeração, invocação de funções, etc.).",
      "Serve estritamente para contornar bloqueios de CORS em requisições feitas com a Fetch API.",
      "Altera o hardware do cliente para acelerar o processamento gráfico de canvas 3D.",
      "Substitui completamente o uso de módulos (import/export) clonando objetos em tempo de execução."
    ],
    "respostaCorreta": 1
  },
  {
    "area": "postgresql",
    "nivel": "avancado",
    "enunciado": "Para que servem os níveis de isolamento de transação (Transaction Isolation Levels) como REPEATABLE READ e SERIALIZABLE no PostgreSQL?",
    "opcoes": [
      "Para definir a velocidade com que os dados mudam de estado físico na memória RAM.",
      "Para gerenciar e mitigar fenômenos de concorrência entre transações simultâneas, controlando problemas como leituras sujas (dirty reads), leituras não-repetíveis e leituras fantasmas.",
      "Para forçar o banco a ler as tabelas em ordem alfabética de colunas e otimizar queries pesadas.",
      "Para criptografar as query strings enviadas pelos clientes antes de irem para os logs do sistema.",
      "Para garantir que conexões ociosas (idle) sejam encerradas após determinado período."
    ],
    "respostaCorreta": 1
  },
  {
    "area": "fullstack",
    "nivel": "avancado",
    "enunciado": "Durante o processo de Server-Side Rendering (SSR) combinado com hidratação (Hydration) em frameworks modernos de frontend (como Next.js ou Nuxt), qual o significado exato de 'Hidratação'?",
    "opcoes": [
      "O ato de injetar código SQL limpo dentro do banco de dados a partir da interface do usuário.",
      "O processo no cliente onde o JavaScript baixa, executa e anexa ouvintes de eventos (event listeners) ao HTML estático que foi previamente renderizado pelo servidor.",
      "Mecanismo de segurança focado em limpar strings maliciosas que tentam efetuar Cross-Site Scripting (XSS).",
      "Compactação de arquivos binários no servidor usando compressão de pacotes dinâmicos.",
      "O carregamento assíncrono de imagens otimizadas em formato WebP de forma progressiva."
    ],
    "respostaCorreta": 1
  },
  {
    "area": "logica",
    "nivel": "iniciante",
    "enunciado": "Se a afirmação 'Todo bug é irritante' for verdadeira, qual das seguintes alternativas deve ser obrigatoriamente verdadeira?",
    "opcoes": [
      "Se algo é irritante, então é um bug.",
      "Se algo não é irritante, então não é um bug.",
      "Não existem coisas irritantes que não sejam bugs.",
      "Alguns bugs não são irritantes.",
      "Nenhum sistema possui bugs."
    ],
    "respostaCorreta": 1
  },
  {
    "area": "javascript",
    "nivel": "iniciante",
    "enunciado": "Qual método global do JavaScript analisa uma string contendo um JSON válido e a transforma em um objeto ou array correspondente?",
    "opcoes": [
      "JSON.stringify()",
      "JSON.toObject()",
      "JSON.parse()",
      "JSON.serialize()",
      "JSON.convert()"
    ],
    "respostaCorreta": 2
  },
  {
    "area": "postgresql",
    "nivel": "iniciante",
    "enunciado": "Qual operador ou palavra-chave é utilizada no PostgreSQL para buscar correspondências parciais de texto ignorando a diferença entre maiúsculas e minúsculas (case-insensitive)?",
    "opcoes": [
      "LIKE",
      "ILIKE",
      "MATCH",
      "IN",
      "CONTAINS"
    ],
    "respostaCorreta": 1
  },
  {
    "area": "fullstack",
    "nivel": "iniciante",
    "enunciado": "Qual elemento da arquitetura web é responsável por converter nomes de domínio amigáveis (como 'exemplo.com') em endereços IP legíveis por máquinas?",
    "opcoes": [
      "Servidor FTP",
      "Gateway API",
      "DNS (Domain Name System)",
      "Load Balancer",
      "Firewall de Aplicação Web (WAF)"
    ],
    "respostaCorreta": 2
  },
  {
    "area": "javascript",
    "nivel": "intermediario",
    "enunciado": "O que acontece ao tentar acessar uma propriedade que não existe em um objeto JavaScript comum (ex: const obj = {}; console.log(obj.idade);)?",
    "opcoes": [
      "O programa lança imediatamente um 'NullPointerException' e para de rodar.",
      "O retorno obtido é o valor primitivo 'undefined'.",
      "O retorno obtido é o valor 'null'.",
      "O JavaScript cria automaticamente essa propriedade com o valor 0.",
      "O console exibe uma mensagem de aviso, mas o código congela."
    ],
    "respostaCorreta": 1
  },
  {
    "area": "postgresql",
    "nivel": "intermediario",
    "enunciado": "Qual é o principal benefício de definir uma chave estrangeira (FOREIGN KEY) com a cláusula 'ON DELETE CASCADE' no PostgreSQL?",
    "opcoes": [
      "Impedir permanentemente a deleção do registro pai se houver registros filhos atrelados.",
      "Remover automaticamente as linhas da tabela filha se a linha correspondente na tabela pai for deletada.",
      "Mover os registros deletados para uma tabela de lixeira histórica de auditoria.",
      "Criptografar os dados da tabela filha em cascata.",
      "Aumentar a velocidade das buscas feitas por meio de INNER JOIN."
    ],
    "respostaCorreta": 1
  },
  {
    "area": "fullstack",
    "nivel": "avancado",
    "enunciado": "Ao estruturar uma arquitetura baseada em Microserviços, qual padrão de design (design pattern) é frequentemente empregado para agregar dados de múltiplos serviços em uma única chamada de cliente e resolver problemas de chamadas excessivas na rede (chatter)?",
    "opcoes": [
      "Singleton Pattern",
      "API Gateway / Backends for Frontends (BFF)",
      "Observer Pattern",
      "Factory Method",
      "Active Record Pattern"
    ],
    "respostaCorreta": 1
  },
  {
    "area": "logica",
    "nivel": "avancado",
    "enunciado": "Cinco pessoas estão sentadas ao redor de uma mesa redonda. Algumas sempre falam a verdade, outras sempre mentem. Cada uma diz: 'Ambos os meus vizinhos (esquerda e direita) são mentirosos'. Quantos mentirosos existem, no máximo, ao redor desta mesa?",
    "opcoes": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "respostaCorreta": 2
  }
  
]

