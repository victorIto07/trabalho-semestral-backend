import { Login } from '../servicos.js';
import { carregamentoSpinner, loginCard } from '../modelos-html.js';
import { formData, navigate, validarLogin } from '../util.js';

const usuario_logado = validarLogin();
if (usuario_logado) navigate('/');

document.addEventListener("DOMContentLoaded", async () => {
  document.body.appendChild(loginCard());
  prepararForm();
});

const prepararForm = () => {
  const _form = document.getElementById('formulario-login');

  _form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const _spinner_loader = document.getElementById('card').appendChild(carregamentoSpinner());

    try {
      const dados_login = formData({ form: _form });
      await Login(dados_login['email'], dados_login['password']);
    } catch (e) {
      document.getElementById('erro-requisicao').innerText = '* ' + e.message || e;
    }

    _spinner_loader.remove();
  });
}
