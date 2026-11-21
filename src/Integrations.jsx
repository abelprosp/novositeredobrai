import {divisions} from './solutions.js';

const nodes = [
  {slug: 'wattsense', label: 'WattSense', x: 13, y: 47, icon: 'M13 2 5 14h6l-1 8 9-13h-7z'},
  {slug: 'infraestrutura-em-nuvem', label: 'Nuvem', x: 64, y: 10, icon: 'M6 18a4 4 0 0 1-1-8 7 7 0 0 1 13-1 4.5 4.5 0 0 1 0 9Z'},
  {slug: 'digitalizacao-3d-e-cad', label: 'CAD 3D', x: 89, y: 59, icon: 'm12 2 9 5v10l-9 5-9-5V7zm-9 5 9 5 9-5m-9 5v10'},
  {slug: 'visao-computacional-industrial', label: 'Visão industrial', x: 30, y: 57, icon: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Zm13 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0Z'},
  {slug: 'analise-em-tempo-real', label: 'Análise de dados', x: 65, y: 52, icon: 'M3 3v17h18M6 15l4-5 4 2 6-7'},
];
const solutions = divisions.flatMap(division => division.groups.flatMap(group => group.pages));

export default function Integrations() {
  return (
    <section id="integracoes" className="integrations section-shell" aria-labelledby="integrations-title">
      <div data-scroll-reveal>
        <h2 id="integrations-title">Integração entre <span>indústria e tecnologia.</span></h2>
        <p>Explore as soluções de energia, engenharia, inspeção e IA que podem compor o seu projeto.</p>
      </div>
      <div className="integration-map">
        <svg className="integration-arcs" viewBox="0 0 640 340" preserveAspectRatio="none" fill="none" aria-hidden="true">
          <defs><linearGradient id="arc-line" x2="0" y2="1" gradientUnits="objectBoundingBox">
            <stop stopColor="#85a894" /><stop offset="1" stopColor="#eaf1ec" />
          </linearGradient></defs>
          {[276, 212, 148, 84].map(r => <path key={r} d={`M${320-r} 302a${r} ${r} 0 0 1 ${2*r} 0`} stroke="url(#arc-line)" />)}
        </svg>
        {nodes.map(({slug, label, x, y, icon}) => (
          <a key={slug} className="integration-node" href={solutions.find(solution => solution.slug === slug).path} style={{left: x+'%', top: y+'%'}}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d={icon} /></svg>
            {label}
          </a>
        ))}
        <img className="integration-brand" src="/assets/redobrai-simbolo.png" width="69" height="66" alt="Redobrai" />
      </div>
    </section>
  );
}
