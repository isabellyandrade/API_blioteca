import { Request, Response } from "express";
import { LivroService } from "../service/LivroService";

const livroService = new LivroService();

export async function cadastrarLivro (req: Request, res: Response){
    try {
        const novoLivro = await livroService.cadastrarLivro(req.body);
        res.status(201).json(
            {
                mensagem:"Livro adicionado com sucesso!",
                livro:novoLivro
            }
        );
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
};

export async function atualizarProduto (req: Request, res: Response){
    try {
        const livro = await livroService.atualizarLivro(req.body);
        res.status(200).json(
            {
                mensagem:"Livro atualizado com sucesso!",
                livro:livro
            }
        );
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
};

export async function deletarLivro (req: Request, res: Response){
    try {
        const livro = await livroService.deletarLivro(req.body);
        res.status(200).json(
            {
                mensagem:"Livro deletado com sucesso!",
                livro:livro
            }
        );
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
};

export async function filtrarLivroPorId (req: Request, res: Response){
    try {
        const livro = await livroService.filtrarLivroPorId(req.query.id);
        res.status(200).json(
            {
                mensagem:"Livro encontrado com sucesso!",
                livro:livro
            }
        );
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
};

export async function listarTodosProduto (req: Request, res: Response){
    try {
        const produtos = await productService.listarTodosProdutos();
        res.status(200).json(
            {
                mensagem:"Produtos listados com sucesso!",
                produtos:produtos
            }
            );
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
};