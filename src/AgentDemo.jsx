import {useEffect, useRef, useState} from 'react';

const conversations = {
  'agentes-para-suporte': [
    ['Cliente', 'Como faço para acompanhar meu pedido?'],
    ['Agente', 'Abra a área Meus pedidos e selecione Acompanhar entrega. O histórico mostra a última atualização.'],
    ['Cliente', 'A previsão já passou. Vocês conseguem verificar?'],
    ['Agente', 'Posso encaminhar o atraso à equipe de entregas com o histórico desta conversa. Qual é o número do pedido?'],
  ],
  'apoio-a-decisoes-industriais': [
    ['Supervisora', 'Por onde começamos a investigar a queda de produção no turno da manhã?'],
    ['Agente', 'Os registros mostram três paradas na Linha 2 após a troca de lote. Foi o maior tempo de parada do turno.'],
    ['Supervisora', 'O que precisamos conferir com a equipe?'],
    ['Agente', 'Compare os horários das paradas com o registro da troca de lote e valide as ocorrências com a manutenção.'],
  ],
  'analise-em-tempo-real': [
    ['Operador', 'Avise se a temperatura da linha passar de 75 °C.'],
    ['Agente', 'Às 10h42, o sensor registrou 78 °C, três graus acima do limite.'],
    ['Operador', 'A temperatura voltou à faixa esperada?'],
    ['Agente', 'A medição das 10h44 chegou a 74 °C. O pico ficou registrado para revisão.'],
  ],
};

const objects = [
  {name: 'Tampa azul', color: '#4a9af0'},
  {name: 'Tampa verde', color: '#43bd86'},
  {name: 'Tampa laranja', color: '#ec9459'},
];

export default function AgentDemo({slug}) {
  const [take, setTake] = useState(0);
  const card = useRef(null);
  const messages = conversations[slug];
  const vision = slug === 'agentes-de-visao-computacional';

  useEffect(() => {
    if (!card.current) return;
    if (!('IntersectionObserver' in window)) {
      setTake(current => current || 1);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setTake(current => current || 1);
      observer.disconnect();
    }, {threshold: .25});
    observer.observe(card.current);
    return () => observer.disconnect();
  }, []);

  if (!messages && !vision) return null;

  return (
    <section className="division-section agent-demo" aria-labelledby="agent-demo-title">
      <div className="section-shell">
        <div className="section-intro">
          <h2 id="agent-demo-title">{vision ? 'Reconhecimento de objetos em ação' : 'Uma conversa com o agente'}</h2>
          <p>{vision ? 'Nesta simulação, a câmera identifica três tampas na esteira e destaca cada objeto detectado.' : 'Conversa simulada com dados fictícios.'}</p>
        </div>
        <div className="agent-demo-card" ref={card} data-playing={take > 0}>
          {vision ? (
            <div className="agent-vision" key={take}>
              <span className="agent-vision-scan" aria-hidden="true" />
              <ul className="agent-vision-objects" aria-label="Objetos identificados na simulação">
                {objects.map(({name, color}, index) => (
                  <li key={name} style={{'--object-color': color, '--delay': `${.65 + index * .8}s`}}>
                    <span className="agent-vision-cap" aria-hidden="true" />
                    <span className="agent-vision-detection">{name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <ol className="agent-chat" key={take} aria-label="Conversa simulada">
              {messages.map(([speaker, message], index) => (
                <li key={message} data-agent={speaker === 'Agente'} style={{'--delay': `${index * 1.2}s`}}>
                  <strong>{speaker}</strong>
                  <p>{message}</p>
                </li>
              ))}
            </ol>
          )}
          <div className="agent-demo-controls">
            <button type="button" className="button button-outline" onClick={() => setTake(current => current + 1)}>Reproduzir novamente</button>
          </div>
        </div>
      </div>
    </section>
  );
}
