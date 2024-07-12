import { Livro } from "../model/Livro";
import { LivroRepository } from "../repository/LivroRepository";

export class LivroService{

    livroRepository: LivroRepository = new LivroRepository();

    async cadastrarLivro(livroData: any): Promise<Livro> {
        const {title, author, publishedDate, isbn, pages, language, publisher} = livroData;
        if(!title || !author || !publishedDate || !isbn || !pages || !language || !publisher ){
            throw new Error("Informações incompletas");
        }

        const novoLivro =  await this.livroRepository.insertLivro(title, author, publishedDate, isbn, pages, language, publisher);
        console.log("Service - Insert ", novoLivro);
        return novoLivro;
    }

    async atualizarLivro(livroData: any): Promise<Livro> {
        const { id, title, author, publishedDate, isbn, pages, language, publisher } = livroData;
        if(!id || !title || !author || !publishedDate || !isbn || !pages || !language || !publisher ){
            throw new Error("Informações incompletas");
        }

        const livro =  await this.livroRepository.updateLivro(id,title, author, publishedDate, isbn, pages, language, publisher);
        console.log("Service - Update ", livro);
        return livro;
    }

    async deletarLivro(livroData: any): Promise<Livro> {
        const { id, title, author, publishedDate, isbn, pages, language, publisher } = livroData;
        if(!id || !title || !author || !publishedDate || !isbn || !pages || !language || !publisher ){
            throw new Error("Informações incompletas");
        }

        const livro =  await this.livroRepository.deleteLivro(id,title, author, publishedDate, isbn, pages, language, publisher);
        console.log("Service - Delete ", livro);
        return livro;
    }

    async filtrarProduto(produtoData: any): Promise<Product> {
        if(!produtoData ){
            throw new Error("Informações incompletas");
        }
        const id = parseInt(produtoData, 10);

        const produto =  await this.productRepository.filterProduct(id);
        console.log("Service - Filtrar", produto);
        return produto;
    }

    async listarTodosProdutos(): Promise<Product[]> {
        const produto =  await this.productRepository.filterAllProduct();
        console.log("Service - Filtrar Todos", produto);
        return produto;
    }

}