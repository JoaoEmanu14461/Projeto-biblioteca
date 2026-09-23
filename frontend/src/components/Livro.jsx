function Livro({ livro, onExcluir }) {
  if (!livro) {
    return null;
  }

  return (
    <div className="livro">
      <h3>{livro.titulo}</h3>

      <p>
        <strong>Autor:</strong> {livro.autor}
      </p>

      <p>
        <strong>Ano:</strong> {livro.ano}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        {livro.disponivel ? "Disponível" : "Indisponível"}
      </p>

      <button onClick={() => onExcluir(livro.id)}>Excluir</button>
    </div>
  );
}

export default Livro;
