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
      <header className="cabecalho">
        <div className="cabecalho-icone">📚</div>

        <div>
          <h1>Biblioteca Virtual</h1>
          <p>Organize seus livros de forma simples, rápida e prática.</p>
        </div>
      </header>

      <main>
        <div className="formulario-container">
          <div className="titulo-secao">
            <span className="titulo-icone">➕</span>

            <div>
              <h2>Cadastrar livro</h2>
              <p>Adicione um novo livro à sua biblioteca.</p>
            </div>
          </div>

          <FormularioLivro onCadastrar={cadastrarLivro} />
        </div>

        <section className="filtros-container">
          <div className="titulo-secao">
            <span className="titulo-icone">🔎</span>

            <div>
              <h2>Minha biblioteca</h2>
              <p>Pesquise e organize seus livros cadastrados.</p>
            </div>
          </div>

          <div className="biblioteca-resumo">
            <div className="contador">
              <span className="contador-icone">📚</span>

              <div>
                <span>Total de livros</span>
                <strong>{livros.length}</strong>
              </div>
            </div>
          </div>

          <div className="filtros">
            <div className="campo-pesquisa">
              <label>Pesquisar livro</label>

              <input
                type="text"
                placeholder="Digite o título do livro..."
                value={pesquisa}
                onChange={(event) => setPesquisa(event.target.value)}
              />
            </div>

            <div className="campo-ordenacao">
              <label>Ordenar por</label>

              <select
                value={ordem}
                onChange={(event) => setOrdem(event.target.value)}
              >
                <option value="titulo">Título</option>

                <option value="autor">Autor</option>

                <option value="ano">Ano</option>
              </select>
            </div>
          </div>
        </section>

        {erro && <div className="mensagem-erro">{erro}</div>}

        {carregando ? (
          <div className="mensagem-status">
            <span>⏳</span>
            Carregando...
          </div>
        ) : livrosFiltrados.length === 0 ? (
          <div className="mensagem-vazia">
            <span>📚</span>
            <h3>Nenhum item cadastrado.</h3>
            <p>Cadastre seu primeiro livro para começar.</p>
          </div>
        ) : (
          <ListaLivros livros={livrosFiltrados} onExcluir={excluirLivro} />
        )}
      </main>
    </div>
  );
}

export default App;
