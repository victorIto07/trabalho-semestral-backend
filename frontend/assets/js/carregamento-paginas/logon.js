import { Logon } from '../servicos.js';
import { carregamentoSpinner, loginCard } from '../modelos-html.js';
import { formData, navigate, validarLogin } from '../util.js';

const usuario_logado = validarLogin();
if (usuario_logado) navigate('/');

document.addEventListener("DOMContentLoaded", async () => {
  document.body.appendChild(loginCard('logon'));
  prepararForm();
});

const prepararForm = () => {
  const _form = document.getElementById('formulario-logon');

  _form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const _spinner_loader = document.getElementById('card').appendChild(carregamentoSpinner());

    try {
      const dados_logon = formData({ form: _form });
      Logon(dados_logon);
    } catch (e) {
      console.error(e);
      _spinner_loader.remove();
    }
  });
}
