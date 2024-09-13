import { navigate, loginCache, wait } from './util.js';

// const PREFIXO_ENDPOINT = 'http://localhost:8081';
const PREFIXO_ENDPOINT = 'http://vitu.app.br:8080';

// ENDPOINTS INFORMADOS NO DRIVE DO TRABALHO
// | previnir chamadas a links invalidos
const SERVICOS = {
  'Login': { url: `${PREFIXO_ENDPOINT}/access/login`, metodo: 'POST' },
  'Logon': { url: `${PREFIXO_ENDPOINT}/access/logon`, metodo: 'POST' },
  'BuscarContatos': { url: `${PREFIXO_ENDPOINT}/contact`, metodo: 'GET' },
  'BuscarContato': { url: `${PREFIXO_ENDPOINT}/contact/{{id}}`, metodo: 'GET' },
  'CadastrarContato': { url: `${PREFIXO_ENDPOINT}/contact`, metodo: 'POST' },
  'AtualizarContato': { url: `${PREFIXO_ENDPOINT}/contact/{{id}}`, metodo: 'PUT' },
  'ExcluirContato': { url: `${PREFIXO_ENDPOINT}/contact/{{id}}`, metodo: 'DELETE' },
}

// METODOS VALIDOS
const METODOS_VALIDOS = ['GET', 'POST', 'PUT', 'DELETE'];

export const chamadaAPI = (
  servico,
  dados_url,
  body,
  usuario
) => {
  return new Promise(async (resolve, reject) => {
    let { url, metodo } = SERVICOS[servico]

    if (!url)
      reject('endpoint invalido');
    if (!METODOS_VALIDOS.includes(metodo))
      reject('metodo invalido');

    try {
      // FUNCAO SIMPLES PARA SUBSTITUIR DADOS DO ENDPOINT COM BASE NO OBJETO INFORMADO
      if (dados_url && Object.keys(dados_url).length) {
        Object.keys(dados_url).forEach(key => {
          url = url.replaceAll(`{{${key}}}`, dados_url[key]);
        })
      }

      // PRAPARAR REQUISICAO
      const requisicao_parametros = {
        method: metodo,
        uri: url,
        headers: {
          "Content-Type": "application/json"
        }
      };

      if (!usuario)
        usuario = loginCache();

      if (usuario && usuario.token)
        requisicao_parametros.headers["authorization"] = usuario.token;

      if (metodo != 'GET')
        requisicao_parametros['body'] = JSON.stringify(body);

      const res = await fetch(url, requisicao_parametros);
      const json = await res.json();

      // RETORNAR ERRO SE CHAMADA NAO FOI OK
      if (res.status == 403) {
        localStorage.removeItem('usuario_logado');
        navigate('/login')
      }
      else if (res.status >= 200 && res.status < 400)
        resolve(json);
      else
        reject(new Error(json.message));

    } catch (error) {
      console.log(`erro ao fazer requisicao: ${metodo} ${url}`);
      reject(error);
    }
  });
};

// FAZER LOGIN E ARMAZENAR OS DADOS DO USUARIO NO LOCALSTORAGE PARA NAO PRECISAR DE LOGIN TODA HORA
export const Login = async (email, password) => {
  const login_cache = loginCache();
  if (login_cache) {
    console.log('utilizando usuário logado no cache');
    navigate('/');
  }

  const dados_login = await chamadaAPI('Login', null, { email, password });
  console.log(dados_login);
  if (!dados_login.token) throw new Error('Email ou senha inválidos.');

  console.log('cacheando usuario');
  localStorage.setItem('usuario_logado', JSON.stringify(dados_login))

  navigate('/');
  return dados_login;
}

// CADASTRAR USUARIO TEMPORARIO
export const Logon = async (dados_logon) => {
  const retorno_logon = await chamadaAPI('Logon', null, dados_logon);
  console.log(retorno_logon);
  localStorage.setItem('usuario_logado', JSON.stringify(retorno_logon));
  navigate('/');
}

export const BuscarListaContato = async () => {
  const contatos = await chamadaAPI('BuscarContatos');
  return contatos;
}

export const BuscarContato = async (id) => {
  if (!id) throw new Error('informe o id do usuário');

  const contato = await chamadaAPI('BuscarContato', { id });
  if (!contato) throw new Error('erro ao buscar usuário');

  return contato;
}

export const CadastrarContato = async ({ name, email, phone_number, image_url }) => {
  if (!(name && email && phone_number && image_url))
    throw new Error('dados do usuário inválidos');

  return await chamadaAPI('CadastrarContato', null, { name, email, phone_number, image_url });
}

export const AtualizarContato = async ({ id, name, email, phone_number, image_url }) => {
  if (!(name && email && phone_number && image_url && id))
    throw new Error('dados do usuário inválidos');


  return await chamadaAPI('AtualizarContato', { id }, { name, email, phone_number, image_url });
}

export const ExcluirContato = async (id) => {
  if (!id)
    throw new Error('id não informado');

  return await chamadaAPI('ExcluirContato', { id });
}
