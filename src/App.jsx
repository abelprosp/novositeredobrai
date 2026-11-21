import {useEffect, useRef, useState} from 'react';
import AgentSolutions from './AgentSolutions.jsx';
import Integrations from "./Integrations.jsx";
import DataSecurity from "./DataSecurity.jsx";
import SiteHeader from './SiteHeader.jsx';
import SolutionPage from './SolutionPage.jsx';
import UpplaCasePage from './UpplaCase.jsx';
import {detailPages, divisions} from './solutions.js';

const Arrow = () => <span aria-hidden="true" className="arrow">→</span>;

const navigation = [
  ...divisions.map(({id, name}) => [name, `/#${id}`]),
  ['Clientes', '/#clientes'],
];

const highlights = [
  ['Inteligência artificial', 'Agentes de IA', '#redobrai-ia'],
  ['Monitoramento de energia', 'WattSense', '#wattsense'],
  ['Inspeção na produção', 'Visão computacional', '#inspecao'],
];

const [energy, engineering, quality] = divisions[1].groups.map(group => group.pages[0]);

const clients = [
  {name: 'Uppla', logo: 'uppla', width: 374, height: 363},
  {name: 'Luxus Telefonia', logo: 'luxus', width: 171, height: 178},
  {name: 'MecaniDoc', logo: 'mecanidoc', width: 1255, height: 424},
  {name: 'Roma Consultoria'},
  {name: 'EvoluxRH', logo: 'evolux', width: 500, height: 443},
];

function App() {
  const path = window.location.pathname.replace(/\/?$/, '/');
  const page = detailPages.get(path);
  const contactDialog = useRef(null);
  const main = useRef(null);
  const [formNote, setFormNote] = useState('O botão abre um rascunho no seu aplicativo de e-mail.');

  useEffect(() => {
    if (!window.IntersectionObserver) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const animations = new Set();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        if (motion.matches) continue;
        const animation = entry.target.animate([
          {opacity: 0.7, translate: '0 10px'},
          {opacity: 1, translate: '0 0'},
        ], {duration: 560, easing: 'cubic-bezier(.2,.65,.3,1)'});
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      }
    });
    for (const block of main.current.querySelectorAll('[data-scroll-reveal]')) {
      if (block.getBoundingClientRect().top >= window.innerHeight) observer.observe(block);
    }
    function cancelAnimations() {
      for (const animation of animations) animation.cancel();
      animations.clear();
    }
    motion.addEventListener('change', cancelAnimations);
    return () => {
      observer.disconnect();
      motion.removeEventListener('change', cancelAnimations);
      cancelAnimations();
    };
  }, [page]);

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();
    const subject = encodeURIComponent(`Vamos conversar — ${name}`);
    const body = encodeURIComponent(`Olá, Redobrai!\n\n${message}\n\nMeu nome: ${name}\nMeu e-mail: ${email}`);
    setFormNote('Abrindo seu aplicativo de e-mail com a mensagem pronta…');
    window.location.href = `mailto:contato@redobrai.com?subject=${subject}&body=${body}`;
  }

  useEffect(() => {
    if (page) document.title = `${page.title} | ${page.division.name}`;
  }, [page]);

  return (
    <>
      <a className="skip-link" href="#inicio">Pular para o conteúdo</a>
      <SiteHeader page={page} />

      <main ref={main} id="inicio" tabIndex={-1}>
        {page?.kind === 'case' && <UpplaCasePage />}
        {page && page.kind !== 'case' && <SolutionPage page={page} />}
        {!page && (
          <>
            <section className="hero" aria-labelledby="hero-title">
              <div className="section-shell hero-inner">
                <div className="hero-copy">
                  <h1 id="hero-title">IA para os negócios.<br /> <span>Engenharia para a indústria.</span></h1>
                  <p>Desenvolvemos agentes de IA e soluções para monitorar energia, digitalizar produtos e inspecionar linhas de produção.</p>
                  <div className="hero-actions">
                    <a className="button button-primary" href="#solucoes">Explore as soluções <Arrow /></a>
                    <a className="text-link" href="#contato">Fale com a equipe</a>
                  </div>
                </div>
                <div className="hero-media" aria-hidden="true">
                  <img src="/assets/hero-engenharia.webp" alt="" width="802" height="920" fetchPriority="high" />
                </div>
              </div>
            </section>

            <section className="featured" aria-labelledby="featured-title">
              <div className="section-shell featured-inner">
                <h2 id="featured-title">Em destaque</h2>
                <ul>
                  {highlights.map(([category, title, href]) => (
                    <li key={href}>
                      <a href={href}>
                        <span className="feature-label">{category}</span>
                        <strong>{title}</strong>
                        <Arrow />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="division-section portfolio" id="solucoes" aria-labelledby="solutions-title">
              <div className="section-shell">
                <div className="section-intro" data-scroll-reveal>
                  <p className="section-label">Soluções</p>
                  <h2 id="solutions-title">Soluções da Redobrai</h2>
                  <p>Tecnologia de ponta para o chão de fábrica, com IA, monitoramento de energia e inspeção inteligente.</p>
                </div>

                <article className="product-feature" data-scroll-reveal id="wattsense">
                  <div className="product-copy">
                    <p className="section-label">Solução em destaque</p>
                    <h3>WattSense</h3>
                    <p>Medidor industrial para acompanhar tensão, corrente e consumo de energia na operação.</p>
                    <a className="text-link" href={energy.path}>Conheça o WattSense <Arrow /></a>
                  </div>
                  <img src="/assets/wattsense.png" alt="Medidor industrial WattSense com tela de consumo, tensão e corrente" width="1536" height="1024" loading="lazy" />
                </article>

                <div className="solutions-grid">
                  <article className="solution-card" data-scroll-reveal id="redobrai-ia">
                    <div className="solution-icon ai-icon" aria-hidden="true"><span /></div>
                    <h3>Redobrai IA</h3>
                    <p>Agentes de IA para atender clientes, interpretar dados e apoiar as decisões da sua equipe.</p>
                    <a className="button button-outline agent-entry" href="#solucoes-agenticas">Explore as soluções agênticas <Arrow /></a>
                  </article>

                  <article className="solution-card" data-scroll-reveal id="redobrai-industria">
                    <div className="solution-icon industry-icon" aria-hidden="true"><span /></div>
                    <h3>Redobrai Indústrias</h3>
                    <p>Monitoramento de energia, digitalização de produtos para CAD e inspeção na linha de produção.</p>
                    <details className="solution-details">
                      <summary className="button">Explore as soluções industriais</summary>
                      <ul className="solution-list">
                        <li>
                          <h4><a href={engineering.path}>{engineering.title} <Arrow /></a></h4>
                          <p>Transforme um produto físico em um modelo 3D para visualização e revisão de projeto. Use IA para auxiliar nas modificações em CAD.</p>
                          <a className="text-link" href="#contato">Fale sobre seu projeto 3D <Arrow /></a>
                        </li>
                        <li id="inspecao">
                          <h4><a href={quality.path}>{quality.title} <Arrow /></a></h4>
                          <p>Use imagens para identificar itens e apoiar a detecção de falhas. Na Uppla, a aplicação foi voltada à inspeção de tampinhas na linha de produção.</p>
                          <a className="text-link" href="#contato">Converse sobre inspeção visual <Arrow /></a>
                        </li>
                      </ul>
                    </details>
                  </article>
                </div>
              </div>
            </section>

            <AgentSolutions />
            <DataSecurity />
            <Integrations />

            <section className="division-section clients-section" id="clientes" aria-labelledby="clients-title">
              <div className="section-shell" data-scroll-reveal>
                <p className="section-label">Clientes</p>
                <h2 id="clients-title">Clientes da Redobrai</h2>
                <ul className="clients-list">
                  {clients.map(({name, logo, width, height}) => (
                    <li key={name}>
                      {logo ? (
                        <div className={`client-logo client-logo-${logo}`}>
                          <img src={`/assets/clientes/${logo}.png`} alt={name} width={width} height={height} loading="lazy" />
                        </div>
                      ) : name}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </>
        )}

      </main>

      <dialog className="contact-dialog" id="contact-dialog" ref={contactDialog} aria-labelledby="contact-dialog-title">
        <div className="contact-dialog-header">
          <h2 id="contact-dialog-title">Entrar em contato</h2>
          <button className="dialog-close" type="button" aria-label="Fechar formulário" onClick={() => contactDialog.current.close()}>×</button>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>Seu nome<input name="name" type="text" autoComplete="name" required /></label>
          <label>Seu e-mail<input name="email" type="email" autoComplete="email" required /></label>
          <label>O desafio<textarea name="message" rows="4" required /></label>
          <button className="button button-primary" type="submit">Preparar mensagem <Arrow /></button>
          <p className="form-note" aria-live="polite">{formNote}</p>
        </form>
      </dialog>

      <footer className="site-footer">
        <section className="footer-invitation" id="contato" aria-labelledby="contact-title">
          <div className="section-shell">
            <h2 id="contact-title">Conte sobre seu projeto<span> para a Redobrai.</span></h2>
            <div className="footer-actions">
              <button className="button button-primary" type="button" aria-haspopup="dialog" aria-controls="contact-dialog" onClick={() => contactDialog.current.showModal()}>
                Entrar em contato <Arrow />
              </button>
              <a className="button button-outline" href="/#solucoes">Explore as soluções <Arrow /></a>
            </div>
          </div>
        </section>
        <div className="section-shell">
          <div className="footer-columns">
            <section>
              <h2>Sobre a Redobrai</h2>
              <p>Desenvolvemos agentes de IA e soluções para monitorar energia, digitalizar produtos e inspecionar linhas de produção.</p>
              <a className="brand" href={page ? "/" : "#inicio"} aria-label="Redobrai, voltar ao início">
                <img src="/assets/redobrai-logo.png" alt="Redobrai" width="203" height="70" />
              </a>
            </section>
            {divisions.map(division => (
              <section key={division.id}>
                <h2>{division.name}</h2>
                <ul>{division.groups.flatMap(group => group.pages).map(item => (
                  <li key={item.path}><a href={item.path}>{item.title}</a></li>
                ))}</ul>
              </section>
            ))}
            <section>
              <h2>Clientes</h2>
              <ul>
                <li><a href="/#clientes">Clientes da Redobrai</a></li>
                <li><a href="/cases/uppla/">Case Uppla</a></li>
              </ul>
            </section>
            <section>
              <h2>Contato</h2>
              <ul>
                <li><a href="#contato">Fale com a Redobrai</a></li>
                <li><a href="mailto:contato@redobrai.com">contato@redobrai.com</a></li>
                <li><a href="tel:+5551995501677">(51) 99550-1677</a></li>
              </ul>
            </section>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="section-shell">
            <nav aria-label="Navegação no rodapé">
              {navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
              <a href="#contato">Contato</a>
            </nav>
            <small>© {new Date().getFullYear()} Redobrai Corp.</small>
          </div>
        </div>
      </footer>
      <a className="whatsapp-link"
        href="https://wa.me/5551995501677?text=vim%20do%20site%20da%20Redobrai"
        aria-label="Conversar com a Redobrai pelo WhatsApp">
        <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" aria-hidden="true">
          <path d="M20.52 3.48A11.88 11.88 0 0 0 12.04 0C5.43 0 .06 5.37.06 11.98c0 2.11.55 4.17 1.6 5.99L0 24l6.34-1.66a11.98 11.98 0 0 0 5.7 1.45h.01c6.61 0 11.99-5.37 11.99-11.98 0-3.2-1.25-6.21-3.52-8.33ZM12.05 21.77c-1.78 0-3.52-.48-5.04-1.38l-.36-.21-3.76.98 1-3.67-.24-.38a9.92 9.92 0 0 1-1.52-5.13c0-5.49 4.46-9.95 9.95-9.95a9.94 9.94 0 0 1 9.94 9.95c0 5.49-4.46 9.79-9.97 9.79ZM17.5 14.3c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.8-1.48-1.78-1.66-2.08-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
        </svg>
      </a>
    </>
  );
}

export default App;
