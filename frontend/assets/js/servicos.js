import { navigate, loginCache, wait } from './util.js';

// const PREFIXO_ENDPOINT = 'http://localhost:8081';
const PREFIXO_ENDPOINT = 'http://vitu.app.br:8080';

// ENDPOINTS INFORMADOS NO DRIVE DO TRABALHO
// | previnir chamadas a links invalidos
const SERVICOS = {
  'Login': { url: `${PREFIXO_ENDPOINT}/usuarios`, metodo: 'GET' },
  'BuscarContatos': { url: `${PREFIXO_ENDPOINT}/contact`, metodo: 'GET' },
  'BuscarContato': { url: `${PREFIXO_ENDPOINT}/contact/{{id}}`, metodo: 'GET' },
  'CadastrarContato': { url: `${PREFIXO_ENDPOINT}/contact/{{id}}`, metodo: 'POST' },
  'AtualizarContato': { url: `${PREFIXO_ENDPOINT}/contact/{{id}}`, metodo: 'PUT' },
  'ExcluirContato': { url: `${PREFIXO_ENDPOINT}/contact/{{id}}`, metodo: 'DELETE' },
}

// METODOS VALIDOS
const METODOS_VALIDOS = ['GET', 'POST', 'PUT', 'DELETE'];

export const chamadaAPI = (
  servico,
  dados_url,
  body
) => {
  return new Promise(async (resolve, reject) => {
    const { url, metodo } = SERVICOS[servico]

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
      };

      if (metodo != 'GET') {
        requisicao_parametros['body'] = JSON.stringify(body);
        requisicao_parametros['headers'] = {
          "Content-Type": "application/json",
        };
        requisicao_parametros['redirect'] = 'follow';
      }

      const res = await fetch(url, requisicao_parametros);
      const json = await res.json();

      // RETORNAR ERRO SE CHAMADA NAO FOI OK
      if (!json.status_code || json.status_code.toString()[0] == 2)
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
export const Login = async (email, senha) => {
  const login_cache = loginCache();
  if (login_cache) {
    console.log('utilizando usuário logado no cache');
    navigate('/');
  }

  const dados_login = await chamadaAPI('Login');
  if (!dados_login || !dados_login.length) throw new Error('erro ao buscar dados para efetuar o login');

  const login_valido = dados_login.find(f => f.email == email && f.senha == senha);
  if (!login_valido) throw new Error('email ou senha inválidos');

  console.log('cacheando usuario');
  localStorage.setItem('usuario_logado', JSON.stringify(login_valido))

  navigate('/');
  return login_valido;
}

// CADASTRAR USUARIO TEMPORARIO
export const Logon = async (dados_logon) => {
  localStorage.setItem('usuario_logado', JSON.stringify(dados_logon));
  await wait(1000);
  navigate('/');
}

export const BuscarListaContato = async () => {
  const dados_contatos = await chamadaAPI('BuscarContatos');
  const { contatos } = dados_contatos;

  return contatos;
}

export const BuscarContato = async (id) => {
  if (!id) throw new Error('informe o id do usuário');

  const dados_contato = await chamadaAPI('BuscarContato', { id });
  if (!dados_contato) throw new Error('erro ao buscar usuário');

  return dados_contato.contato[0];
}

export const CadastrarContato = async ({ nome, email, telefone, image }) => {
  if (!(nome && email && telefone && image))
    throw new Error('dados do usuário inválidos');

  return await chamadaAPI('CadastrarContato', null, { nome, email, telefone, image });
}

export const AtualizarContato = async ({ id, nome, email, telefone, image }) => {
  if (!(nome && email && telefone && image && id))
    throw new Error('dados do usuário inválidos');


  return await chamadaAPI('AtualizarContato', { id }, { nome, email, telefone, image });
}

export const ExcluirContato = async (id) => {
  if (!id)
    throw new Error('id não informado');

  return await chamadaAPI('ExcluirContato', { id });
}
