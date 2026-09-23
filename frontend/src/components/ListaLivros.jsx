import Livro from "./Livro";

function ListaLivros({ livros, onExcluir }) {
  return (
    <div>
      {livros.map((livro) => (
        <Livro key={livro.id} livro={livro} onExcluir={onExcluir} />
      ))}
    </div>
  );
}

export default ListaLivros;
