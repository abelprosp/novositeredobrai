const symbols = {
  lock: 'M5 10h14v11H5z M8 10V7a4 4 0 0 1 8 0v3 M12 14v3',
  file: 'M6 2h8l5 5v15H6z M14 2v6h5 M9 13h7 M9 17h5',
  key: 'M14 4a5 5 0 1 1-2 9l-7 7H2v-3l8-8a5 5 0 0 1 4-5Z M16 7h1',
  user: 'M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z M4 21v-3a8 6 0 0 1 16 0v3Z',
};

function SecurityGraphic() {
  return (
    <svg className="security-graphic" viewBox="0 0 400 320" fill="none" aria-hidden="true">
      <g stroke="#d8e5dc">
        <circle cx="200" cy="160" r="83" />
        <circle cx="200" cy="160" r="137" strokeDasharray="3 5" />
      </g>
      {[
        [132, 114, 'lock'], [267, 209, 'key'], [292, 59, 'file'], [95, 248, 'user'],
        [183, 24, 'file'], [337, 161, 'lock'], [238, 292, 'user'], [63, 151, 'key'],
      ].map(([x, y, symbol], index) => (
        <g key={index} transform={`translate(${x} ${y})`}>
          <rect x="-16" y="-16" width="32" height="32" fill={index < 4 ? '#e5f6d7' : '#f1f5f2'} />
          <path d={symbols[symbol]} transform="translate(-9 -9) scale(.75)" stroke="#315843" strokeWidth="1.8" />
        </g>
      ))}
      <path d="m200 121 33 12v32c0 17-18 30-33 39-15-9-33-22-33-39v-32z" fill="white" stroke="#a9c6b4" strokeWidth="2" />
      <path d="m200 129 26 9v26c0 13-13 24-26 32-13-8-26-19-26-32v-26z" fill="#89cf62" />
      <path d="m187 160 9 9 18-20" stroke="#163f2c" strokeWidth="4" />
    </svg>
  );
}

export default function DataSecurity() {
  return (
    <section className="security-section" id="seguranca-de-dados" aria-labelledby="security-title">
      <div className="section-shell security-layout">
        <div data-scroll-reveal>
          <p className="section-label">Segurança de dados</p>
          <h2 id="security-title">Seus dados, <span>do treino à operação.</span></h2>
          <p>Em um projeto de IA, a empresa define quais dados podem ser usados e quem pode acessar cada ambiente.</p>
          <ul>
            <li>Selecionar dados autorizados para o treinamento</li>
            <li>Separar os exemplos de treino e de avaliação</li>
            <li>Definir permissões para os ambientes de treino e produção</li>
          </ul>
        </div>
        <SecurityGraphic />
      </div>
    </section>
  );
}
