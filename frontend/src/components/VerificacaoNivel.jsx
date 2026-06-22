import { useState } from "react";
import Button from "./Button";
import './VerificacaoNivel.css';

export default function VerificacaoNivel({ area, questoes, onCancelar, onEnviar }) {
    const [respostas, setRespostas] = useState({});

    // Array auxiliar para mapear o índice (0, 1, 2...) para letras
    const letrasAlternativas = ['A', 'B', 'C', 'D', 'E'];

    const handleMudarResposta = (questaoId, opcaoIndex) => {
        setRespostas(prev => ({ ...prev, [questaoId]: opcaoIndex }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        // Transforma o objeto local { 12: 3 } no array esperado pela API
        const payload = Object.keys(respostas).map((id) => ({
            questaoId: Number(id),
            respostaUsuario: respostas[id]
        }));

        if (payload.length < questoes.length) {
            if (!confirm("Você não respondeu todas as questões. Enviar assim mesmo?")) return;
        }

        onEnviar(payload);
    };

    return (
        <div className="auth-card glass-effect simulado-container">
            <h2>Simulado de Alinhamento: {area.toUpperCase()}</h2>
            <p className="simulado-warning">Responda às questões abaixo para calibrarmos o seu nível real.</p>
            
            <form onSubmit={handleFormSubmit} className="questoes-lista">
                {questoes.map((questao, qIdx) => (
                    <div key={questao.id} className="questao-card-box">
                        <h4>{qIdx + 1}. {questao.enunciado}</h4>
                        <div className="opcoes-lista">
                            {questao.opcoes.map((opcao, oIdx) => (
                                <label 
                                    key={oIdx} 
                                    className={`opcao-item ${respostas[questao.id] === oIdx ? "opcao-marcada" : ""}`}
                                >
                                    <input 
                                        type="radio" 
                                        name={`questao-${questao.id}`} 
                                        checked={respostas[questao.id] === oIdx}
                                        onChange={() => handleMudarResposta(questao.id, oIdx)}
                                        required
                                    />
                                    <span className="letra-alternativa">
                                        {letrasAlternativas[oIdx]})
                                    </span>
                                    <span className="texto-resposta">{opcao}</span>
                                </label>
                            ))}
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