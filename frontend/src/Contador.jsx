import { useState } from 'react';
import './Contador.css'; // <--- IMPORTANTE: Importe o CSS aqui!

export function Contador() {
  const [count, setCount] = useState(0);

  const incrementar = () => setCount(count + 1);
  const decrementar = () => {
    if (count > 0) setCount(count - 1);
  };

  return (
    <div className="container">
      <h2>Meu Contador</h2>
      {/* Aplicando lógica de cor via JS no CSS (Injeção de estilo dinâmico) */}
      <p className="numero" style={{ color: count >= 5 ? 'green' : 'black' }}>
        {count}
      </p>
      
      <div className="button-group">
        <button onClick={decrementar} className="btn">Diminuir</button>
        <button onClick={incrementar} className="btn">Aumentar</button>
      </div>
      
      <button onClick={() => setCount(0)} className="reset">Resetar</button>
    </div>
  );
}