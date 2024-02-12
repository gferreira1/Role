import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-modal';
import '../src/Style/cadastrar.css';

const Cadastro = () => {
  const [etapa, setEtapa] = useState(1);
  const [nome, setNome] = useState('');
  const [Sobrenome, setSobrenome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [identificacao, setIdentificacao] = useState('');
  const [email, setEmail] = useState('');
  const [cidade, setCidade] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [perfilUsuario, setPerfilUsuario] = useState('');
  const [tipoCadastro, setTipoCadastro] = useState('');
  const [telefoneValido, setTelefoneValido] = useState(true);
  const [dadosCadastrados, setDadosCadastrados] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const avancarEtapa = () => {
    if (etapa < 11) {
      const dadosEtapaAtual = {
        etapa,
        tipoCadastro,
        nome,
        Sobrenome,
        dataNascimento,
        telefone,
        identificacao,
        email,
        cidade,
        senha,
        confirmarSenha,
        perfilUsuario,
      };

      setDadosCadastrados([...dadosCadastrados, dadosEtapaAtual]);
      setEtapa(etapa + 1);
    } else {
      // Limite de etapas alcançado
    }
  };

  const retornarEtapa = () => {
    if (etapa > 1) {
      setEtapa(etapa - 1);
    } else {
      // Limite de etapas alcançado
    }
  };

  const handleCadastro = () => {
    const informacoes = {
      etapa,
      tipoCadastro,
      nome,
      Sobrenome,
      dataNascimento,
      telefone,
      identificacao,
      email,
      cidade,
      senha,
      confirmarSenha,
      perfilUsuario,
    };

    setDadosCadastrados([...dadosCadastrados, informacoes]);
    limparEstado();
  };

  const handleConfirmacaoCadastro = () => {
    const confirmacao = window.confirm('Deseja realmente cadastrar com as informações fornecidas?');

    if (confirmacao) {
      handleCadastro();
    }
  };

  const limparEstado = () => {
    setNome('');
    setSobrenome('');
    setDataNascimento('');
    setTelefone('');
    setIdentificacao('');
    setEmail('');
    setCidade('');
    setSenha('');
    setConfirmarSenha('');
    setPerfilUsuario('');
    setTipoCadastro('');
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const formatarTelefone = (telefone) => {
    const match = telefone.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return telefone;
  };

  const handleTelefoneChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, '');
    const contemLetras = /[a-zA-Z]/.test(e.target.value);

    if (contemLetras) {
      setTelefoneValido(false);
    } else {
      const telefoneValido = /^\d{0,11}$/.test(inputValue);
      setTelefone(formatarTelefone(inputValue));
      setTelefoneValido(telefoneValido);

      if (inputValue.length > 10) {
        e.target.disabled = true;
      }
    }
  };

  const renderizarListaDados = () => {
    return (
      <div className="dados-container">
        <h3>Dados Cadastrados:</h3>
        <ul className="list-group list-group-flush">
          {dadosCadastrados.length > 0 && (
            <li>
              {Object.entries(dadosCadastrados[dadosCadastrados.length - 1]).map(([campo, valor]) => (
                <div className="list-group-item" key={campo}>
                  <strong>{campo}:</strong> {valor}
                </div>
              ))}
            </li>
          )}
        </ul>
      </div>
    );
  };

  const renderizarEtapa = () => {
    switch (etapa) {
      case 1:
        return (
          <div className="formulario">
            <label>
              Tipo de Cadastro:
              <select id="tIpodecadastro" className="form-control" value={tipoCadastro} onChange={(e) => setTipoCadastro(e.target.value)}>
                <option value="">Selecione</option>
                <option value="OferecerCarona">Oferecer Carona</option>
                <option value="CriarEvento">Criar Evento</option>
                <option value="PedirCarona">Pedir Carona</option>
                <option value="ProcurarEvento">Procurar Evento</option>
              </select>
            </label>
            <br />
            <button type="button" onClick={avancarEtapa} disabled={!tipoCadastro}>
              Próximo
            </button>
          </div>
        );
      case 2:
        return (
          <div className="formulario">
            <label>Nome:</label>
            <input type="text" id="nome" maxLength={32} className="form-control" value={nome} onChange={(e) => setNome(e.target.value)} />
            <br />
            <button type="button" onClick={retornarEtapa}>
              Voltar
            </button>
            <button type="button" onClick={avancarEtapa} disabled={!nome}>
              Próximo
            </button>
          </div>
        );
      case 3:
        return (
          <div className="formulario">
            <label>Sobrenome:</label>
            <input type="text" maxLength={22} className="form-control" value={Sobrenome} onChange={(e) => setSobrenome(e.target.value)} />
            <br />
            <button type="button" onClick={retornarEtapa}>
              Voltar
            </button>
            <button type="button" onClick={avancarEtapa} disabled={!Sobrenome}>
              Próximo
            </button>
          </div>
        );
      case 4:
        const hoje = new Date();
        const dataMinima = new Date(hoje.getFullYear() - 18, hoje.getMonth(), hoje.getDate());

        return (
          <div className="formulario">
            <label>Data de Nascimento:</label>
            <input
              type="date"
              className="form-control"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              max={formatarData(dataMinima)}
            />
            <br />
            <button type="button" onClick={retornarEtapa}>
              Voltar
            </button>
            <button type="button" onClick={verificarIdade} disabled={!dataNascimento}>
              Próximo
            </button>
          </div>
        );

      case 5:
        return (
          <div className="formulario">
            <label>
              Telefone:
              <input
                type="tel"
                className="form-control"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="(51) 00000-0000"
                value={formatarTelefone(telefone)}
                onChange={handleTelefoneChange}
              />
            </label>
            <br />
            <button type="button" onClick={retornarEtapa}>
              Voltar
            </button>
            <button type="button" onClick={avancarEtapa} disabled={telefone.length <= 10}>
              Próximo
            </button>
            {telefoneValido === false && <p style={{ color: 'red' }}>Digite apenas números no telefone.</p>}
          </div>
        );
      case 6:
        return (
          <div className="formulario">
            <label htmlFor="setor">Você se identifica como?</label>
            <select
              className="form-control"
              id="setor"
              value={identificacao}
              onChange={(e) => setIdentificacao(e.target.value)}
              name="setor"
              required=""
            >
              <option value="Prefiro não informar">Prefiro não informar</option>
              <option value="sr">Sr.</option>
              <option value="sra">Sra.</option>
            </select>
            <br />
            <button type="button" onClick={retornarEtapa}>
              Voltar
            </button>
            <button type="button" onClick={avancarEtapa} disabled={!identificacao}>
              Próximo
            </button>
          </div>
        );
      case 7:
        return (
          <div className="formulario">
            <label>E-mail:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {email && !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email) && (
              <p className="error-message">Please enter a valid email address.</p>
            )}
            <br />
            <button type="button" onClick={retornarEtapa}>
              Voltar
            </button>
            <button
              type="button"
              onClick={avancarEtapa}
              disabled={!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
            >
              Próximo
            </button>
          </div>
        );
      case 8:
        return (
          <div className="formulario">
            <label htmlFor="cidade">Cidade:</label>
            <select
              className="form-control"
              id="cidade"
              value={cidade}
              name="cidade"
              required=""
              onChange={(e) => setCidade(e.target.value)}
            >
              <option value="" disabled="">
                Selecione uma Cidade
              </option>
              <option value="Santa Cruz do Sul">Santa Cruz do Sul</option>
              <option value="torres">Torres</option>
            </select>
            <br />
            <button type="button" onClick={retornarEtapa}>
              Voltar
            </button>
            <button type="button" onClick={avancarEtapa} disabled={!cidade}>
              Próximo
            </button>
          </div>
        );
      case 9:
        return (
          <div className="formulario">
            <label>Senha:</label>
            <input
              type="password"
              className="form-control"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <br />
            {senha && !/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/.test(senha) && (
              <p className="error-message" style={{ color: 'red' }}>
                A senha deve conter pelo menos 8 caracteres, uma letra maiúscula e um caractere especial.
              </p>
            )}
            <br />
            <button type="button" onClick={retornarEtapa}>
              Voltar
            </button>
            <button
              type="button"
              onClick={avancarEtapa}
              disabled={!senha || !/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/.test(senha)}
            >
              Próximo
            </button>
          </div>
        );
      case 10:
        return (
          <div className="formulario">
            <label>Senha:</label>
            <input
              type="password"
              className="form-control"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <br />
            <label>Confirmar Senha:</label>
            <input
              type="password"
              className="form-control"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
            <br />
            {(senha || confirmarSenha) && senha !== confirmarSenha && (
              <p className="error-message">As senhas não coincidem.</p>
            )}
            {senha && !/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/.test(senha) && (
              <p className="error-message">
                A senha deve conter pelo menos 8 caracteres, uma letra maiúscula e um caractere especial.
              </p>
            )}
            <br />
            <button type="button" onClick={retornarEtapa}>
              Voltar
            </button>
            <button
              type="button"
              onClick={avancarEtapa}
              disabled={
                !senha ||
                !confirmarSenha ||
                senha !== confirmarSenha ||
                !/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/.test(senha)
              }
            >
              Próximo
            </button>
          </div>
        );
      case 11:
        return (
          <div className="formulario">
            <label htmlFor="perfilUsuario">Perfil do Usuário:</label>
            <br />
            <textarea
              id="perfilUsuario"
              value={perfilUsuario}
              className="form-control"
              placeholder="Eu sou amante da natureza, amo conhecer lugares novos e pessoas...."
              onChange={(e) => setPerfilUsuario(e.target.value)}
            />
            <br />
            <button type="button" onClick={retornarEtapa}>
              Voltar
            </button>
            <button
  type="button"
  onClick={() => setIsModalOpen(true)} // Abre o pop-up personalizado
  disabled={!perfilUsuario || perfilUsuario.length <= 10}
>
  Cadastrar
</button>
          </div>
        );
      default:
        return null;
    }
  };

  const formatarData = (data) => {
    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const dia = data.getDate().toString().padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  };

  const verificarIdade = () => {
    const hoje = new Date();
    const dataNascimentoDate = new Date(dataNascimento);
    const diferencaAnos = hoje.getFullYear() - dataNascimentoDate.getFullYear();

    if (diferencaAnos < 18) {
      alert('Você deve ter pelo menos 18 anos para prosseguir.');
    } else {
      avancarEtapa();
    }
  };

  return (
    <div className="cadastro-container">
      <h3>Cadastro</h3>
      <div className="form-container">
        {renderizarEtapa()}
        {renderizarListaDados()}
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={handleModalClose} contentLabel="Confirmação de Cadastro">
        <div>
          <p>Deseja realmente cadastrar com as informações Gio</p>
          <button onClick={handleCadastro}>Cadastrar</button>
          <button onClick={handleModalClose}>Voltar</button>
        </div>
      </Modal>
    </div>
  );
};

export default Cadastro;
