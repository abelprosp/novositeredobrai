import {useRef, useState} from 'react';
import {divisions} from './solutions.js';

export default function SiteHeader({page}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDivision, setActiveDivision] = useState(null);
  const menuToggle = useRef(null);
  const divisionToggle = useRef(null);

  function closeMenu() {
    setMenuOpen(false);
    setActiveDivision(null);
  }

  function handleEscape(event) {
    if (event.key !== 'Escape') return;
    if (activeDivision) {
      setActiveDivision(null);
      divisionToggle.current?.focus();
      event.preventDefault();
    } else if (menuOpen) {
      closeMenu();
      menuToggle.current?.focus();
      event.preventDefault();
    }
  }

  function toggleDivision(event, id) {
    divisionToggle.current = event.currentTarget;
    setActiveDivision(current => current === id ? null : id);
  }

  return (
    <>
      <header className="site-header" onKeyDown={handleEscape} onBlur={event => {
        if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) closeMenu();
      }}>
        <div className="section-shell header-inner">
          <a className="brand" href={page ? '/' : '#inicio'} aria-label="Redobrai, início" onClick={closeMenu}>
            <img src="/assets/redobrai-logo.png" alt="Redobrai" width="203" height="70" />
          </a>
          <button ref={menuToggle} className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => {
            if (menuOpen) closeMenu();
            else setMenuOpen(true);
          }}>
            {menuOpen ? 'Fechar' : 'Menu'} <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
          </button>
          <nav id="main-nav" className="main-nav" data-open={menuOpen} aria-label="Navegação principal">
            {divisions.map(division => (
              <div className="nav-division" key={division.id}>
                <button className="division-toggle" type="button" aria-expanded={activeDivision === division.id} aria-controls={`submenu-${division.id}`} onClick={event => toggleDivision(event, division.id)}>
                  {division.name}
                  <span className="menu-chevron" aria-hidden="true" />
                </button>
                <div className="mega-menu" id={`submenu-${division.id}`} hidden={activeDivision !== division.id}>
                  <div className="section-shell mega-menu-inner">
                    {division.groups.map(group => (
                      <div className="mega-menu-group" key={group.title}>
                        <h2>{group.title}</h2>
                        <ul>
                          {group.pages.map(item => (
                            <li key={item.path}>
                              <a href={item.path} aria-current={page?.path === item.path ? 'page' : undefined} onClick={closeMenu}>{item.title}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <a href={page ? '/#clientes' : '#clientes'} onClick={closeMenu}>Clientes</a>
            <a className="button button-outline header-cta" href="#contato" onClick={closeMenu}>Fale com a Redobrai <span aria-hidden="true">→</span></a>
          </nav>
        </div>
      </header>
      {(activeDivision || menuOpen) && <div className="nav-backdrop" aria-hidden="true" onClick={closeMenu} />}
    </>
  );
}
