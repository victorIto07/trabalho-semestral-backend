import { createElementFromString } from './util.js';

// COMPONENTES SOLTOS
export const inputCustom = ({ value = '', type = 'text', placeholder, id, hidden, tostring = true, label, required = true }) => {
  const string_html = `
    <div id="input-custom-${id}" class="input-container ${hidden ? 'hidden' : ''}">
      <input type="${type}" id="input-${id}" name="${id}" ${required ? 'required=""' : ''} autocomplete="off" value="${value}">
      <label for="input-${id}" class="label">${label || placeholder || ''}</label>
      <div class="underline"></div>
    </div>
  `;
  //   const string_html = `
  //   <div id="input-custom-${id}" class="input-custom ${hidden ? 'hidden' : ''}">
  //     <input id="input-${id}" type="${type}" placeholder=" " name="${id}" autocomplete="off" value="${value}" ${required ? 'required=""' : ''} />
  //     <label>${placeholder || label}</label>
  //   </div>
  // `;

  return tostring ? string_html : createElementFromString(string_html);
}

export const botaoCustom = ({ tostring = true, small, msg, href, id, type = 'info', hidden, extraClasses = '', buttonType = 'button' } = {}) => {
  const string_html = `
  <${href ? 'a' : 'button'} ${id ? `id="botao-${id}"` : ''} ${href ? `href="${href}"` : `type=${buttonType}`} class="botao ${hidden ? ' hidden' : ''} gradient ${type} ${extraClasses} ${small ? 'small' : ''}">
    ${msg}
  </${href ? 'a' : 'button'}>
`;

  return tostring ? string_html : createElementFromString(string_html);
}

export const cardCustom = (html, { center = true, col = true, extraClasses = '', tostring = false } = {}) => {
  const string_html = `
  <div class="card ${center ? 'center' : ''} ${col ? 'col' : ''} ${extraClasses}">
    ${html}
  </div>
`;
  return tostring ? string_html : createElementFromString(string_html);
};

export const headerCustom = (root = false) => createElementFromString(`
  <div class="header">
    <nav>
      <a href="/">
        <div class="header-icone">
          <img src="${root ? '' : '../'}assets/img/favicon.ico" alt="" />
          <h2>
            FecafBook
          </h2>
        </div>
      </a>
      <div id="saudacoes">
      </div>
    </nav>
  </div>
`);

export const alertCustom = ({ msg = 'Oops.. Algo deu errado', tostring = false, center = false, type = 'warning' } = {}) => {
  let icon;
  if (['info', 'default', 'success'].includes(type))
    icon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"> </path> </svg>`;
  else
    icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff"> <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd"></path> </svg>`;

  const string_html = `
  <div class="alert ${center ? 'center' : ''}">
    <div class="gradient ${type}">
      ${icon}
      ${msg}
    </div>
  </div>
`;

  return tostring ? string_html : createElementFromString(string_html);
};

export const spinner = (absolute) => `
  <div role="status" class="spinner ${absolute ? 'absolute' : ''}">
    <svg aria-hidden="true" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span>Loading...</span>
  </div>
`;

export const homeFiltro = () => createElementFromString(`
  <div id="field-filtro" class="filtro">
    ${cardCustom(
  botaoCustom({ msg: 'Novo Contato', type: 'success', href: '/cadastro' }) +
  inputCustom({ id: 'filtro', label: 'Filtro' })
  , { col: false, center: false, tostring: true })
  }
  </div>
`);

export const gridContatos = () => createElementFromString(`
  <div id="grid-contatos" class="grid-contatos">
  </div>
`);


export const carregamentoSpinner = () => createElementFromString(`
  <div class="carregamento-spinner">
    <div class="acrylic">
    </div>
    ${spinner(true)}
  </div>
`);

export const cardContato = (contato) => contato ? cardCustom(`
  <div id="foto" class="contato-foto home ${contato.id ? '' : 'hidden'}">
    <img src="${contato.image_url}" alt=" "/>
    ${botaoCustom({ type: 'info', href: `/cadastro/index.html?id=${contato.id}`, small: true, extraClasses: 'botao-editar-foto', msg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff"> <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#fff" stroke-width="1.9200000000000004" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#fff" stroke-width="1.9200000000000004" stroke-linecap="round" stroke-linejoin="round"></path> </g> </svg>` })}
  </div>
  <strong class="descricao-nome">
    ${contato.name}
  </strong>
  <h4 class="descricao">
    <strong>N°:</strong>${contato.phone_number}
  </h4>
  <h4 class="descricao">
    <strong>E-mail:</strong>${contato.email}
  </h4>
`) : null;

// TELAS
export const cardContatoCadastro = ({ id, nome = '', email = '', telefone = '', image = '' }) => cardCustom(`
  <h1 class="contato-cadastro-titulo">
    ${id ? 'Editar Contato' : 'Criar Novo Contato'}
  </h1>
  <div id="foto" class="contato-foto ${id ? '' : 'hidden'}">
    <img src="${image}" alt=" "/>
    ${botaoCustom({ type: 'info', id: 'editar-foto', small: true, extraClasses: 'botao-editar-foto', msg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff"> <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#fff" stroke-width="1.9200000000000004" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#fff" stroke-width="1.9200000000000004" stroke-linecap="round" stroke-linejoin="round"></path> </g> </svg>` })}
  </div>
  <form id="formulario-cadastro" class="contato-form" action="">
    ${id ? inputCustom({ value: id, id: 'id', hidden: true, label: '#ID' }) : ''}
    ${inputCustom({ value: image, id: 'image', label: 'Link da Imagem', hidden: !!id })}
    ${inputCustom({ value: nome, id: 'nome', label: 'Nome' })}
    ${inputCustom({ value: email, id: 'email', label: 'E-mail' })}
    ${inputCustom({ value: telefone, id: 'telefone', label: 'n° Contato' })}
    <div id="erro-requisicao" class="erro-requisicao"></div>
    <div class="contato-form-botoes">
      ${botaoCustom({ buttonType: 'submit', msg: 'salvar', type: 'success' })}
      ${botaoCustom({ href: '/', msg: 'cancelar', type: 'default' })}
      ${botaoCustom({ type: 'danger', id: 'excluir', hidden: !id, extraClasses: 'ml-auto', msg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff"> <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke="#fff" stroke-width="1.7759999999999998" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 12V17" stroke="#fff" stroke-width="1.7759999999999998" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#fff" stroke-width="1.7759999999999998" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#fff" stroke-width="1.7759999999999998" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#fff" stroke-width="1.7759999999999998" stroke-linecap="round" stroke-linejoin="round"></path> </g> </svg>' })}
    </div>
  <form>
`);

export const loginCard = (tipo = 'login') => createElementFromString(`
  <div id="card-${tipo}" class="login">
    <div class="login-icone">
      <img src="../assets/img/favicon.ico" alt="logo">
    </div>
    <div id="card" class="login-card">
      <div class="login-card-content">
        <h1>
          ${tipo == 'login' ? 'Conecte-se à sua conta' : 'Crie sua conta'}
        </h1>
        <form id="formulario-${tipo}" action="">
          ${inputCustom({ id: 'email', label: 'E-mail', type: 'email', tostring: true })}
          ${inputCustom({ id: 'senha', label: 'Senha', type: 'password' })}
          ${tipo == 'logon' ? inputCustom({ id: 'nome', label: 'Nome' }) : ''}
          <div id="erro-requisicao" class="erro-requisicao"></div>
          <button type="submit" class="login-botao">
            ${tipo == 'login' ? 'Conectar' : 'Criar'}
          </button>
          <p>
            ${tipo == 'login' ? 'Ainda não tem sua conta?' : 'Já possui uma conta?'}
            <a href="/${tipo == 'login' ? 'logon' : 'login'}">
              ${tipo == 'login' ? 'Cadastrar-se' : 'Entrar'}
            </a>
          </p>
        </form>
      </div>
    </div>
  </div>
`);
