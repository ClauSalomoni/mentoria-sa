import { useState } from "react";
import Button from "./Button";
import './VerificacaoNivel.css';

export default function VerificacaoNivel({ area, questoes, onCancelar, onEnviar }) {
    // Armazena as respostas associando o índice da questão (0, 1, 2...) ao texto da alternativa escolhida
    const [respostas, setRespostas] = useState({});

    // Array auxiliar para mapear o índice (0, 1, 2...) para letras visuais
    const letrasAlternativas = ['A', 'B', 'C', 'D', 'E'];

    const handleMudarResposta = (qIdx, textoAlternativa) => {
        setRespostas(prev => ({ ...prev, [qIdx]: textoAlternativa }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        // 🌟 Transforma o objeto de respostas no formato que o seu backend espera
        // Mapeia usando o índice para garantir o envio ordenado das respostas
        const payload = Object.keys(respostas).map((idx) => ({
            questaoIndex: Number(idx),
            respostaUsuario: respostas[idx] // Envia o texto puro (ou a letra, dependendo do prompt do seu back)
        }));

        if (payload.length < (questoes?.length || 0)) {
            if (!confirm("Você não respondeu todas as questões. Enviar assim mesmo?")) return;
        }

        onEnviar(payload);
    };

    return (
        <div className="auth-card glass-effect simulado-container">
            <h2>Simulado de Alinhamento: {area?.toUpperCase()}</h2>
            <p className="simulado-warning">Responda às questões abaixo para calibrarmos o seu nível real.</p>
            
            <form onSubmit={handleFormSubmit} className="questoes-lista">
                {/* 🌟 Ajustado para usar encadeamento opcional e evitar quebras de renderização */}
                {questoes?.map((questao, qIdx) => (
                    <div key={qIdx} className="questao-card-box">
                        {/* 🌟 Correção: Mapeado de 'enunciado' para 'pergunta' */}
                        <h4>{qIdx + 1}. {questao.pergunta}</h4>
                        
                        <div className="opcoes-lista">
                            
                            {questao.alternativas?.map((opcao, oIdx) => {
                                // Extrai apenas a letra do marcador se a IA retornar "A) texto" ou usa a letra do array auxiliar
                                const letraVisual = opcao.match(/^[A-E]\)/) ? "" : `${letrasAlternativas[oIdx]}) `;
                                
                                return (
                                    <label 
                                        key={oIdx} 
                                        className={`opcao-item ${respostas[qIdx] === opcao ? "opcao-marcada" : ""}`}
                                    >
                                        <input 
                                            type="radio" 
                                            name={`questao-${qIdx}`} 
                                            checked={respostas[qIdx] === opcao}
                                            onChange={() => handleMudarResposta(qIdx, opcao)}
                                            required
                                        />
                                        <span className="letra-alternativa">
                                            {letraVisual}{opcao.match(/^[A-E]\)/) ? "" : ""}
                                        </span>
                                        {/* Exibe o texto da alternativa gerada pela IA */}
                                        <span className="texto-resposta">{opcao}</span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                ))}

                <div className="profile-actions-row" style={{ marginTop: "30px" }}>
                    <Button type="button" variant="link" onClick={onCancelar}>
                        Desistir e Voltar
                    </Button>
                    <Button type="submit">
                        Enviar Respostas e Avaliar Nível
                    </Button>
                </div>
            </form>
        </div>
    );
}