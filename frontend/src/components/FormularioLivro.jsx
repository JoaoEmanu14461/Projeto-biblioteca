import { useState } from "react";

function FormularioLivro({ onCadastrar }) {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [ano, setAno] = useState("");
  const [disponivel, setDisponivel] = useState(true);
  const [erro, setErro] = useState("");

  function enviarFormulario(event) {
    event.preventDefault();

    if (!titulo.trim() || !autor.trim() || !ano) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }

    setErro("");

    onCadastrar({
      titulo,
      autor,
      ano: Number(ano),
      disponivel,
    });

    setTitulo("");
    setAutor("");
    setAno("");
    setDisponivel(true);
  }

  return (
    <form onSubmit={enviarFormulario}>
      <h2>Cadastrar livro</h2>

      {erro && <p>{erro}</p>}

      <div>
        <label>Título:</label>

        <input
          type="text"
          value={titulo}
          onChange={(event) => setTitulo(event.target.value)}
        />
      </div>

      <div>
        <label>Autor:</label>

        <input
          type="text"
          value={autor}
          onChange={(event) => setAutor(event.target.value)}
        />
      </div>

      <div>
        <label>Ano:</label>

        <input
          type="number"
          value={ano}
          onChange={(event) => setAno(event.target.value)}
        />
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={disponivel}
            onChange={(event) => setDisponivel(event.target.checked)}
          />
          Livro disponível
        </label>
      </div>

      <button type="submit">Cadastrar</button>
    </form>
  );
}

export default FormularioLivro;
