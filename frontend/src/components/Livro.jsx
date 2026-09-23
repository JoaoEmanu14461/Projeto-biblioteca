function Livro({ livro, onExcluir }) {
  if (!livro) {
    return null;
  }

  return (
    <div className="livro">
      <div className="livro-topo">
        <div className="livro-icone">📖</div>

        <div className="livro-titulo">
          <h3>{livro.titulo}</h3>

          <span
            className={
              livro.disponivel ? "status disponivel" : "status indisponivel"
            }
          >
            {livro.disponivel ? "Disponível" : "Indisponível"}
          </span>
        </div>
      </div>

      <div className="livro-info">
        <p>
          <strong>Autor</strong>
          <span>{livro.autor}</span>
        </p>

        <p>
          <strong>Ano</strong>
          <span>{livro.ano}</span>
        </p>
      </div>

      <button className="botao-excluir" onClick={() => onExcluir(livro.id)}>
        Excluir livro
      </button>
    </div>
  );
}

export default Livro;
