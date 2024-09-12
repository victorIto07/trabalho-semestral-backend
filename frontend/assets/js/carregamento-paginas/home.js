import { cardContato, cardCustom, alertCustom, spinner, homeFiltro, gridContatos } from '../modelos-html.js'
import { BuscarListaContato } from '../servicos.js';
import { validarLogin, prepararHeader, debounce, wait } from '../util.js';

const usuario = validarLogin();

document.addEventListener("DOMContentLoaded", async () => {
  prepararHeader(usuario);
  const [_filtro] = carregarTela();

  carregarFiltro(_filtro);

  carregarGrid();
});

const carregarTela = () => {
  const _filtro = document.body.appendChild(homeFiltro());
  const _grid = document.body.appendChild(gridContatos());
  return [_filtro, _grid];
}

const carregarFiltro = (_filtro) => {
  const _input_filtro = _filtro.querySelector('#input-filtro');

  const debounce_filtro = debounce(async (filtro) => {
    carregarGrid(filtro);
  });

  _input_filtro.addEventListener('input', async (event) => {
    debounce_filtro(event.target.value);
  })
}

const carregarGrid = async (filtro) => {
  const _grid = document.getElementById('grid-contatos');
  if (!_grid) return

  _grid.classList.add('grid');
  _grid.innerHTML = '';

  const _field_filtro = document.getElementById('field-filtro');
  if (_field_filtro.children.length > 1)
    _field_filtro.lastElementChild.remove();

  const _gridNovoConteudo = _grid.cloneNode(true);

  _grid.appendChild(cardCustom(spinner(), { center: false }));

  try {
    let contatos = await BuscarListaContato();

    if (!contatos || !contatos?.length) {
      _gridNovoConteudo.classList.remove('grid');
      _gridNovoConteudo.appendChild(alertCustom({ type: 'info', msg: 'Nenhum contato foi retornado' }));
    }
    else if (filtro) {
      contatos = contatos.filter(contato =>
        contato.nome == filtro ||
        contato.email == filtro ||
        contato.telefone == filtro ||
        contato.nome.toLowerCase().includes(filtro.toLowerCase()) ||
        contato.email.toLowerCase().includes(filtro.toLowerCase()) ||
        contato.telefone.toLowerCase().includes(filtro.toLowerCase())
      );

      if (!contatos.length) {
        const _alert = _field_filtro.appendChild(alertCustom({ msg: 'Seu filtro desconsideirou todos os resultados.', type: 'info' }));
        wait(3000).then(() => { _alert.remove() });

        // const _filtro = document.querySelector('#input-filtro')
        // if (!filtro) return

        // _filtro.value = '';
      }
    }

    if (contatos?.length)
      for (let contato of contatos) {
        let template_card = cardContato(contato);
        if (!template_card) continue

        _gridNovoConteudo.appendChild(template_card);
      }

  } catch (error) {
    console.error(error);
    _gridNovoConteudo.classList.remove('grid');
    _gridNovoConteudo.appendChild(alertCustom({ type: 'danger', msg: error.message || error.toString() }));
  }

  _grid.replaceWith(_gridNovoConteudo);
}

