import {useEffect, useRef, useState} from 'react';
import {upplaCase} from './solutions.js';
import {projectCaps} from './upplaMotion.js';

const upplaDashboardUrl = 'https://app.thedobra.cc/embed/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXNoX2lkIjoiMTMxNWRiYWItMTI5Yi00NDZjLTgwNDEtZGQ2YTZkOTQyM2JjIiwiZXhwIjoxODAzNDA3NTgxLCJpYXQiOjE3OTU2MzE1ODIsImp0aSI6ImtOX1Y1N3JrU3BGNVMyVGc3MUU5UmhaUiIsIm9yZ19pZCI6IjlkMDlhNzUwLWMzNjEtNGNhNC05YTk5LTA1YjQyNjAyZmRhNCIsInR5cCI6ImVtYmVkIn0.oelJEefdLDiUugFDqQi70QwauMwhzX7eEIcDk1hG8S8';

const duration = 12;
const stages = [
  {start: 0, preview: 1.3, title: 'Detecção no molde', description: 'O primeiro modelo de IA identifica as tampinhas ainda no molde da injetora.'},
  {start: 2.8, preview: 3.6, title: 'Queda na esteira', description: 'As tampinhas saem do molde e caem na esteira, que as leva até o ponto de inspeção.'},
  {start: 5.2, preview: 7.36, title: 'Triagem por câmeras', description: 'Outro modelo de IA analisa as imagens das câmeras e classifica as tampinhas.'},
  {start: 8.5, preview: duration, title: 'Destino final', description: 'Só as tampinhas aprovadas seguem pelo fluxo. As reprovadas ficam de fora.'},
];

function ProductionLine({time, stage, preview = false}) {
  const container = useRef(null);
  const scene = useRef(null);
  const latestStage = useRef(stage);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    latestStage.current = stage;
    scene.current?.draw(stage);
  }, [stage]);

  useEffect(() => {
    if (preview) return;
    let cancelled = false;

    function disposeScene() {
      scene.current?.canvas.removeEventListener('webglcontextlost', handleContextLost);
      scene.current?.dispose();
      scene.current = null;
    }

    function handleContextLost() {
      disposeScene();
      setReady(false);
    }

    import('./upplaLineScene.js').then(({mountLineScene}) => {
      if (cancelled) return;
      scene.current = mountLineScene(container.current);
      if (!scene.current) return;
      scene.current.canvas.addEventListener('webglcontextlost', handleContextLost);
      scene.current.draw(latestStage.current);
      setReady(true);
    }).catch(() => {
      if (cancelled) return;
      disposeScene();
      setReady(false);
    });

    return () => {
      cancelled = true;
      disposeScene();
    };
  }, [preview]);

  return (
    <div className="uppla-scene" ref={container} data-stage={stage} data-renderer={ready ? 'webgl' : preview ? 'preview' : 'fallback'} aria-hidden="true">
      <img className="uppla-render-preview" src="/assets/uppla-linha-3d.webp" alt="" width="1470" height="600" loading="lazy" />
      {projectCaps(time).map(({x, y, status}, index) => (
        <span key={index} className="uppla-render-cap" data-status={status} style={{left: `${x}%`, top: `${y}%`}} />
      ))}
    </div>
  );
}

export function UpplaCaseSection() {
  return (
    <section className="division-section uppla-section" id="case-uppla" aria-labelledby="uppla-title">
      <div className="section-shell uppla-section-inner">
        <div className="uppla-section-copy">
          <p className="section-label">Case Uppla</p>
          <h2 id="uppla-title">Inspeção de tampinhas em duas etapas</h2>
          <p>{upplaCase.description}</p>
          <p>Só as tampinhas aprovadas seguem para o destino final.</p>
          <a className="button button-primary" href={upplaCase.path}>Veja a linha em movimento <span aria-hidden="true">→</span></a>
        </div>
        <div className="uppla-preview">
          <img src="/assets/clientes/uppla.png" width="374" height="363" alt="Uppla" loading="lazy" />
          <ProductionLine time={stages[0].preview} stage={0} preview />
        </div>
      </div>
    </section>
  );
}

export default function UpplaCasePage() {
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const running = playing && time < duration;
  const stage = stages.reduce((current, {start}, index) => time >= start ? index : current, 0);

  useEffect(() => {
    if (!running) return;
    let previous = performance.now();
    let frame;

    function advance(now) {
      const delta = Math.max(0, Math.min((now - previous) / 1000, .25));
      previous = now;
      setTime(current => Math.min(duration, current + delta));
      frame = requestAnimationFrame(advance);
    }

    frame = requestAnimationFrame(advance);
    return () => cancelAnimationFrame(frame);
  }, [running]);

  function selectStage(preview) {
    setPlaying(false);
    setTime(preview);
  }

  function togglePlaying() {
    if (time === duration) setTime(0);
    setPlaying(!running);
  }

  return (
    <>
      <section className="detail-hero" aria-labelledby="case-page-title">
        <div className="section-shell">
          <nav className="detail-breadcrumb" aria-label="Caminho da página">
            <a href="/">Início</a>
            <span aria-hidden="true">/</span>
            <a href="/#redobrai-industria">Redobrai Indústrias</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Case Uppla</span>
          </nav>
          <div className="detail-intro">
            <p className="section-label">Case Uppla</p>
            <h1 id="case-page-title">Do molde à seleção final</h1>
            <p className="detail-description">{upplaCase.description}</p>
            <a className="button button-primary" href="#animacao">Ver a animação <span aria-hidden="true">↓</span></a>
            {' '}
            <a className="button button-outline" href="#dashboard">Ver o dashboard <span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </section>

      <section className="division-section uppla-demo" id="animacao" aria-labelledby="uppla-demo-title">
        <div className="section-shell">
          <div className="section-intro">
            <h2 id="uppla-demo-title">Acompanhe o percurso das tampinhas</h2>
            <p>Inicie a animação ou selecione uma etapa para ver como funciona. A simulação ilustra o processo da Uppla.</p>
          </div>
          <div className="uppla-player">
            <div className="uppla-actions">
              <button className="button button-primary" type="button" onClick={togglePlaying}>
                {running ? 'Pausar' : time === duration ? 'Repetir' : time === 0 ? 'Iniciar animação' : 'Continuar'}
              </button>
              <button className="button button-outline" type="button" onClick={() => selectStage(0)}>Voltar ao início</button>
            </div>
            <ProductionLine time={time} stage={stage} />
            <div className="uppla-player-body">
              <ul className="uppla-legend">
                <li><span className="uppla-mark-pending" /> Em avaliação</li>
                <li><span className="uppla-mark-approved" /> Aprovada</li>
                <li><span className="uppla-mark-held" /> Reprovada</li>
              </ul>
              <ol className="uppla-steps" aria-label="Etapas da inspeção">
                {stages.map(({title, preview}, index) => (
                  <li key={title}>
                    <button type="button" aria-current={index === stage ? 'step' : undefined} onClick={() => selectStage(preview)}>
                      <span>{index + 1}</span>{title}
                    </button>
                  </li>
                ))}
              </ol>
              <p className="uppla-stage-description" aria-live="polite">{stages[stage].description}</p>
            </div>
          </div>
          <p className="uppla-references">
            O modelo ilustrativo usa como referências a
            {' '}<a href="https://www.arburg.com/en/gb/product-world/injection-moulding-machines/hybrid-machines/allrounder-hidrive/">injetora ARBURG</a>, a
            {' '}<a href="https://www.dornerconveyors.com/europe/products/2200-series/2200-belted-conveyor-eu">esteira Dorner</a> e a
            {' '}<a href="https://www.baslerweb.com/en/shop/a2a2448-23gmbas/">câmera Basler</a>.
          </p>
        </div>
      </section>

      <section className="division-section" id="dashboard" aria-labelledby="uppla-dashboard-title">
        <div className="section-shell">
          <div className="section-intro">
            <h2 id="uppla-dashboard-title">Dashboard de inspeção das tampas</h2>
            <p>Explore uma demonstração de como os dados da inspeção das tampas são visualizados.</p>
          </div>
          <iframe
            className="uppla-dashboard"
            src={upplaDashboardUrl}
            title="Dashboard demonstrativo de inspeção das tampas da Uppla"
            width="100%"
            height="640"
            loading="lazy"
            allowFullScreen
          />
          <p className="uppla-references">
            <a href={upplaDashboardUrl} target="_blank" rel="noopener noreferrer">Abrir dashboard em nova aba</a>
          </p>
        </div>
      </section>
    </>
  );
}
