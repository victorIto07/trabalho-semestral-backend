import { botaoCustom, headerCustom } from "./modelos-html.js";

// LOGIN

// RETORNA USUARIO JA ARMAZENADO
export const loginCache = () => {
  const cache_login = localStorage.getItem('usuario_logado');
  if (!cache_login) return

  return JSON.parse(cache_login);
}

// VALIDA E RETORNA SE HA USUARIO ARMAZENADO E VAI PARA A TELA DE LOGIN CASO CONTRARIO
export const validarLogin = () => {
  const login_cache = loginCache();

  if (!login_cache && !location.pathname.includes('/login') && !location.pathname.includes('/logon')) {
    navigate('/login');
    return;
  }

  return login_cache;
}

// INSERE HEADER NO BODY E INSERE A MENSAGEM DE SAUDACOES SE HA USUARIO LOGADO
export const prepararHeader = (usuario) => {
  document.body.insertBefore(headerCustom(), document.body.firstChild);

  const saudacoes = document.getElementById('saudacoes');
  if (!saudacoes) return

  if (!usuario)
    usuario = loginCache();

  const nome = usuario.nome.split(' ')[0];

  saudacoes.appendChild(createElementFromString(`<span>Bem vindo(a), <strong>${nome[0].toUpperCase() + nome.slice(1).toLowerCase()}</strong>!</span>`))

  const botao_sair = saudacoes.appendChild(botaoCustom({ tostring: false, type: 'danger', small: true, msg: `<svg viewBox="0 0 24.00 24.00" width="15" height="15"fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 16.5V19C15 20.1046 14.1046 21 13 21H6C4.89543 21 4 20.1046 4 19V5C4 3.89543 4.89543 3 6 3H13C14.1046 3 15 3.89543 15 5V8.0625M11 12H21M21 12L18.5 9.5M21 12L18.5 14.5" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>` }));
  botao_sair.addEventListener('click', () => {
    localStorage.removeItem('usuario_logado');
    validarLogin();
  });
}

// CRIA E RETORNA UM ELEMENTO HTML COM BASE NA STRING DA MESMA
export const createElementFromString = (string_html) => {
  if (!string_html) return

  const el = document.createElement('div');
  el.innerHTML = string_html.trim();
  return el.firstElementChild;
};

// PREVENI MULTIPLAS CHAMADAS SEM NECESSIDADE(INPUTS, BOTOES, ETC..)
export const debounce = (func, timeout = 300) => {
  if (!func) throw new Error('funcao nao informada');

  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
};

// TIMER SIMPLES PARA SIMULACAO DE CHAMADAS
export const wait = (ms = 300) => new Promise((resolve) => {
  setTimeout(() => { resolve() }, ms);
});

// RETORNA UM OBJETO COM BASE NOS DADOS DE UM FORMULARIO
export const formData = ({ form, form_id }) => {
  if (!form && form_id)
    form = document.getElementById(form_id)
  else if (!form && !form_id) throw new Error('formulario nao identificado');

  const form_data = new FormData(form);

  const dados_form = {};
  for (const [key, value] of form_data) {
    dados_form[key] = value;
  }

  return dados_form;
}

// NAVEGA PARA OUTRA TELA
export const navigate = (url) => {
  window.location.replace(url);
}
