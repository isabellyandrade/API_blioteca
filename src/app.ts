import express from 'express';
import { cadastrarLivro, atualizarLivro , deletarLivro, filtrarLivroPorId, listarTodosLivros } from './controller/LivroController';

const app = express();

const PORT = 3000;

app.use(express.json());

app.post("/api/livro", cadastrarLivro)
app.put("/api/livro", atualizarLivro)
app.delete("/api/livro", deletarLivro)
app.get("/api/livro", filtrarLivroPorId)
app.get("/api/livro", listarTodosLivros)

app.listen(PORT, ()=> console.log("API online na porta: " + PORT));