import { BuscarContato, CadastrarContato, AtualizarContato, ExcluirContato } from '../servicos.js';
import { cardContatoCadastro, spinner, carregamentoSpinner, cardCustom } from '../modelos-html.js';
import { debounce, formData, validarLogin, prepararHeader, navigate } from '../util.js';

const usuario = validarLogin();

document.addEventListener("DOMContentLoaded", async () => {
  prepararHeader(usuario);

  const url_params = new URLSearchParams(window.location.search);
  const id = url_params.get('id');

  await carregarContato(id);

  prepararMudancasFoto();
  prepararSalvar();
  prepararExclusao(id);
});

const carregarContato = async (id) => {
  const _spinner_sem_conteudo = document.body.appendChild(cardCustom(spinner()));

  const contato = id ? await BuscarContato(id) : {};
  const _template_contato = cardContatoCadastro(contato);
  _template_contato.id = 'card-cadastro-contato';

  _spinner_sem_conteudo.remove();
  document.body.appendChild(_template_contato);
}

const prepararMudancasFoto = () => {
  const _botao_editar_foto = document.getElementById('botao-editar-foto');

  _botao_editar_foto.addEventListener('click', () => {
    const _field_foto = document.getElementById('input-custom-image_url');
    _field_foto.classList.toggle('hidden');
    _input_link_foto.focus();
  });

  const _input_link_foto = document.getElementById('input-image_url');

  const debounceLinkFoto = debounce((link) => {
    const _foto = document.getElementById('foto');
    _foto.firstElementChild.src = link;
    _foto.classList.remove('hidden');
  }, 500);

  _input_link_foto.addEventListener('input', () => {
    debounceLinkFoto(_input_link_foto.value);
  });
}

const exibirSpinner = () => document.getElementById('card-cadastro-contato').appendChild(carregamentoSpinner());

const prepararSalvar = () => {
  const _form = document.getElementById('formulario-cadastro');
  _form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const _spinner_loader = exibirSpinner();

    try {
      const dados_contato = formData({ form: _form });

      let retorno_api;
      if (dados_contato.id)
        retorno_api = await AtualizarContato(dados_contato);
      else
        retorno_api = await CadastrarContato(dados_contato);

      navigate('/');
    } catch (e) {
      document.getElementById('erro-requisicao').innerText = '* ' + e.message || e;
    }

    _spinner_loader.remove();
  });
}

const prepararExclusao = (_id) => {
  const _botao_excluir = document.getElementById('botao-excluir');
  if (!_botao_excluir) return

  _botao_excluir.addEventListener('click', async () => {
    const _spinner_loader = exibirSpinner();

    try {
      await ExcluirContato(_id);
      navigate('/');
    } catch (e) {
      console.error(e);
    }

    _spinner_loader.remove();
  });
}
