// src/components/ResultadoSimulado.jsx
import Button from "./Button";
import "./ResultadoSimulado.css";

export default function ResultadoSimulado({ dados, questoesOriginal = [], onContinuar }) {
   
    const totalQuestoes = dados?.totalQuestoes || 0;
    const acertos = dados?.acertos || 0;
    const nivel = dados?.nivelVerificado || "iniciante";
    const detalhes = dados?.detalhes || [];
    const porcentagem = totalQuestoes > 0 ? Math.round((acertos / totalQuestoes) * 100) : 0;

    return (
        <div className="auth-card glass-effect resultado-container">
            <div className="resultado-header">
                <h2>Avaliação Concluída! 🎉</h2>
                <p>Analisamos suas respostas com precisão.</p>
            </div>

            {/* Score Principal */}
            <div className="score-badge-box">
                <div className="score-circle">
                    <span className="score-numero">{acertos}/{totalQuestoes}</span>
                    <span className="score-texto">Acertos</span>
                </div>
                <div className="score-info">
                    <h3>Nível Detectado: <span className="nivel-destaque">{nivel.toUpperCase()}</span></h3>
                    <p>Aproveitamento de {porcentagem}% da prova.</p>
                </div>
            </div>

            {/* Lista de Revisão Visual */}
            <div className="revisao-lista">
                <h3>Resumo da sua performance:</h3>
                
                {questoesOriginal.length === 0 ? (
                    <p className="fallback-texto">Carregando detalhes das questões...</p>
                ) : (
                    questoesOriginal.map((questao, idx) => {
                        // Descobre se o usuário acertou esta questão olhando o retorno do backend
                        const feedback = detalhes.find(d => d.questaoId === questao?.id);
                        const acertou = feedback ? feedback.correto : false;

                        // Proteção contra enunciados nulos ou curtos
                        const enunciadoExibicao = questao?.enunciado 
                            ? (questao.enunciado.length > 90 ? `${questao.enunciado.substring(0, 90)}...` : questao.enunciado)
                            : "Enunciado não disponível";

                        return (
                            <div key={questao?.id || idx} className={`revisao-item ${acertou ? "status-acerto" : "status-erro"}`}>
                                <div className="revisao-icone">
                                    {acertou ? "✓" : "✕"}
                                </div>
                                <div className="revisao-texto">
                                    <span>Questão {idx + 1}</span>
                                    <p>{enunciadoExibicao}</p>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            <div className="profile-actions-row" style={{ marginTop: "30px" }}>
                <Button onClick={onContinuar}>
                    Gerar Minha Trilha Personalizada com IA →
                </Button>
            </div>
        </div>
    );
}