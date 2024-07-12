import { executarComandoSQL } from "../database/mysql";
import { Livro } from "../model/Livro";

export class LivroRepository{

    constructor(){
        this.createTable();
    }

    private async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS Novo.Livro (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            author VARCHAR(255) NOT NULL,
            publishedDate VARCHAR(255) NOT NULL,
            isbn VARCHAR(255) NOT NULL,
            pages INT NOT NULL.
            language VARCHAR(255) NOT NULL,
            publisher VARCHAR(255) NOT NULL
        )`;

        try {
                const resultado =  await executarComandoSQL(query, []);
                console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async insertLivro(title: string, author:string, publishedDate:string, isbn:string, pages: number, language:string, publisher:string) :Promise<Livro>{
        const query = "INSERT INTO Novo.Livro (title, author, publishedDate, isbn, pages, language, publisher) VALUES (?, ?)" ;

        try {
            const resultado = await executarComandoSQL(query, [title, author, publishedDate, isbn, pages, language, publisher]);
            console.log('Livro inserido com sucesso, ID: ', resultado.insertId);
            const livro = new Livro(resultado.insertId,title, author, publishedDate, isbn, pages, language, publisher);
            return new Promise<Livro>((resolve)=>{
                resolve(livro);
            })
        } catch (err) {
            console.error('Erro ao inserir o livro:', err);
            throw err;
        }
    }

    async updateLivro(id: number, title: string, author:string, publishedDate:string, isbn:string, pages: number, language:string, publisher:string) :Promise<Livro>{
        const query = "UPDATE Novo.Livro set title = ?, author = ?, publishedDate = ?, isbn = ?, pages = ?, language = ?, publisher = ?, where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [title, author, publishedDate, isbn, pages, language, publisher, id]);
            console.log('Livro atualizado com sucesso, ID: ', resultado);
            const livro = new Livro(id, title, author, publishedDate, isbn, pages, language, publisher);
            return new Promise<Livro>((resolve)=>{
                resolve(livro);
            })
        } catch (err:any) {
            console.error(`Erro ao atualizar o livro de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async deleteLivro(id: number, title: string, author:string, publishedDate:string, isbn:string, pages: number, language:string, publisher:string) :Promise<Livro>{
        const query = "DELETE FROM Novo.Livro where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log('Livro deletado com sucesso, ID: ', resultado);
            const livro = new Livro(id, title, author, publishedDate, isbn, pages, language, publisher);
            return new Promise<Livro>((resolve)=>{
                resolve(livro);
            })
        } catch (err:any) {
            console.error(`Falha ao deletar o livro de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterProduct(id: number) :Promise<Product>{
        const query = "SELECT * FROM vendas.product where id = ?" ;

        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log('Produto localizado com sucesso, ID: ', resultado);
            return new Promise<Product>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar o produto de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterAllProduct() :Promise<Product[]>{
        const query = "SELECT * FROM vendas.product" ;

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<Product[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao listar os produtos gerando o erro: ${err}`);
            throw err;
        }
    }

    
}