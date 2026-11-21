export default function SolutionPage({page}) {
  return (
    <>
      <section className="detail-hero" aria-labelledby="detail-title">
        <div className="section-shell">
          <nav className="detail-breadcrumb" aria-label="Caminho da página">
            <a href="/">Início</a>
            <span aria-hidden="true">/</span>
            <a href={`/#${page.division.id}`}>{page.division.name}</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{page.title}</span>
          </nav>
          <div className={page.image ? 'detail-intro detail-intro-with-image' : 'detail-intro'}>
            <div>
              <p className="section-label">{page.group}</p>
              <h1 id="detail-title">{page.title}</h1>
              <p className="detail-description">{page.description}</p>
              <a className="button button-primary" href="#contato">Fale sobre seu projeto <span aria-hidden="true">→</span></a>
            </div>
            {page.image && <img src={page.image} alt={page.imageAlt} width="1536" height="1024" />}
          </div>
        </div>
      </section>

      <section className="division-section detail-body" aria-labelledby="detail-body-title">
        <div className="section-shell">
          <h2 id="detail-body-title">{page.providers ? 'Fornecedores de modelos' : 'Como a solução pode ser aplicada'}</h2>
          <ul className="detail-grid">
            {page.providers
              ? page.providers.map(({name, url, description}) => (
                <li key={name}>
                  <h3>{name}</h3>
                  <p>{description}</p>
                  <a className="text-link" href={url}>Site da {name} <span aria-hidden="true">↗</span></a>
                </li>
              ))
              : page.applications.map(([title, description]) => (
                <li key={title}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </li>
              ))}
          </ul>
          {page.casePath && <a className="text-link detail-case-link" href={page.casePath}>Veja a inspeção de tampinhas no case Uppla <span aria-hidden="true">→</span></a>}
        </div>
      </section>
    </>
  );
}
