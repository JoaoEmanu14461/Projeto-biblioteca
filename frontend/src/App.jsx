import { useEffect, useState } from "react";
import FormularioLivro from "./components/FormularioLivro";
import ListaLivros from "./components/ListaLivros";
import "./App.css";

const API_URL = "http://127.0.0.1:8000/api/livros/";

function App() {
  const [livros, setLivros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [pesquisa, setPesquisa] = useState("");
  const [ordem, setOrdem] = useState("titulo");

  async function buscarLivros() {
    try {
      setCarregando(true);
      setErro("");

      const resposta = await fetch(API_URL);

      if (!resposta.ok) {
        throw new Error("Não foi possível carregar os livros.");
      }

      const dados = await resposta.json();

      setLivros(dados);
    } catch (error) {
      setErro("Não foi possível carregar os livros. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarLivros();
  }, []);

  async function cadastrarLivro(novoLivro) {
    try {
      setErro("");

      const resposta = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoLivro),
      });

      if (!resposta.ok) {
        throw new Error("Erro ao cadastrar livro.");
      }

      const livroCadastrado = await resposta.json();

      setLivros((livrosAtuais) => [...livrosAtuais, livroCadastrado]);
    } catch (error) {
      setErro("Não foi possível cadastrar o livro.");
    }
  }

  async function excluirLivro(id) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este livro?",
    );

    if (!confirmar) {
      return;
    }

    try {
      setErro("");

      const resposta = await fetch(`${API_URL}${id}/`, {
        method: "DELETE",
      });

      if (!resposta.ok) {
        throw new Error("Erro ao excluir livro.");
      }

      setLivros((livrosAtuais) =>
        livrosAtuais.filter((livro) => livro.id !== id),
      );
    } catch (error) {
      setErro("Não foi possível excluir o livro.");
    }
  }

  const livrosFiltrados = livros
    .filter((livro) =>
      livro.titulo.toLowerCase().includes(pesquisa.toLowerCase()),
    )
    .sort((a, b) => {
      if (ordem === "titulo") {
        return a.titulo.localeCompare(b.titulo);
      }

      if (ordem === "autor") {
        return a.autor.localeCompare(b.autor);
      }

      if (ordem === "ano") {
        return a.ano - b.ano;
      }

      return 0;
    });

  return (
    <div className="app">
      <header>
        <h1>Biblioteca Virtual</h1>

        <p>Gerencie seus livros de forma simples e rápida.</p>
      </header>

      <FormularioLivro onCadastrar={cadastrarLivro} />

      <section>
        <h2>Livros cadastrados</h2>

        <p>
          Total de livros: <strong>{livros.length}</strong>
        </p>

        <input
          type="text"
          placeholder="Pesquisar livro..."
          value={pesquisa}
          onChange={(event) => setPesquisa(event.target.value)}
        />

        <select
          value={ordem}
          onChange={(event) => setOrdem(event.target.value)}
        >
          <option value="titulo">Ordenar por título</option>
          <option value="autor">Ordenar por autor</option>
          <option value="ano">Ordenar por ano</option>
        </select>
      </section>

      {erro && <p>{erro}</p>}

      {carregando ? (
        <p>Carregando...</p>
      ) : livrosFiltrados.length === 0 ? (
        <p>Nenhum item cadastrado.</p>
      ) : (
        <ListaLivros livros={livrosFiltrados} onExcluir={excluirLivro} />
      )}
    </div>
  );
}

export default App;
