import {divisions} from './solutions.js';

function Node({x, y, label, accent = false}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-36" y="-12" width="72" height="24" fill={accent ? '#d9f7b7' : '#fff'} stroke={accent ? '#80af5e' : '#d4dfd8'} />
      <text textAnchor="middle" y="4">{label}</text>
    </g>
  );
}

const diagrams = {
  'agentes-para-suporte': (
    <>
      <path d="M76 39H90Q98 39 98 47V69H125 M76 99H90Q98 99 98 91V69 M195 69H216V39H240 M216 69V99H240" />
      <Node x={43} y={39} label="Chamados" /><Node x={43} y={99} label="Dúvidas" />
      <Node x={160} y={69} label="Triagem" accent />
      <Node x={276} y={39} label="Resposta" /><Node x={276} y={99} label="Equipe" />
    </>
  ),
  'apoio-a-decisoes-industriais': (
    <>
      <path d="M60 41V72H160V87 M160 41V87 M260 41V72H160" />
      <Node x={60} y={38} label="Dados" /><Node x={160} y={38} label="Registros" />
      <Node x={260} y={38} label="Desvios" /><Node x={160} y={99} label="Prioridades" accent />
    </>
  ),
  'analise-em-tempo-real': (
    <>
      {[28, 53, 78, 103].map(y => <path key={y} d={`M20 ${y}H300`} strokeDasharray="3 5" />)}
      <path d="M20 102C39 102 39 66 56 66S76 88 92 88S116 44 134 44S156 83 174 83S197 52 216 52S239 78 258 78S282 48 300 48" stroke="#439447" strokeWidth="2.5" />
      <circle cx="134" cy="44" r="5" fill="#c8ed9e" stroke="#439447" />
      <Node x={184} y={22} label="Alerta" accent />
    </>
  ),
  'agentes-de-visao-computacional': (
    <>
      <path d="M85 66H122 M198 66H220V42H240 M220 66V95H240" />
      <rect x="16" y="39" width="70" height="55" fill="white" />
      <path d="M25 54V47H34 M68 47H77V54 M25 79V86H34 M68 86H77V79" stroke="#38824c" />
      <path d="M39 60L51 54L64 60V74L51 81L39 74Z M39 60L51 67L64 60 M51 67V81" fill="#dcf4ca" stroke="#599454" />
      <Node x={160} y={66} label="Inspeção" accent />
      <Node x={276} y={42} label="Segue" /><Node x={276} y={95} label="Revisão" />
    </>
  ),
};

export default function AgentSolutions() {
  return (
    <section className="agent-section section-shell" id="solucoes-agenticas" aria-labelledby="agent-title">
      <h2 id="agent-title">Soluções agênticas<span> para atender clientes e apoiar decisões.</span></h2>
      <div className="agent-grid">
        {divisions[0].groups[0].pages.map(({slug, title, description, path}) => (
          <article key={slug} data-scroll-reveal>
            <a className="agent-card" href={path}>
              <h3>{title} <span aria-hidden="true">↗</span></h3>
              <p>{description}</p>
              <div className="agent-visual" aria-hidden="true">
                <svg viewBox="0 0 320 132" fill="none" stroke="#bdcec1">{diagrams[slug]}</svg>
              </div>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
