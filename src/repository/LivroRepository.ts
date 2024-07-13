import { executarComandoSQL } from "../database/mysql";
import { Livro } from "../model/Livro";

export class LivroRepository{

    constructor(){
        this.createTable();
    }

    private async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.Livro (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            author VARCHAR(255) NOT NULL,
            publishedDate VARCHAR(255) NOT NULL,
            isbn VARCHAR(255) NOT NULL,
            pages INT NOT NULL,
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
        const query = "INSERT INTO biblioteca.Livro (title, author, publishedDate, isbn, pages, language, publisher) VALUES (?, ?, ?, ?, ?, ?, ?)" ;

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
        const query = "UPDATE biblioteca.Livro set title = ?, author = ?, publishedDate = ?, isbn = ?, pages = ?, language = ?, publisher = ?, where id = ?;" ;

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
        const query = "DELETE FROM biblioteca.Livro where id = ?;" ;

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

    async filterLivroById(id: number) :Promise<Livro>{
        const query = "SELECT * FROM biblioteca.Livro where id = ?" ;

        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log('Livro localizado com sucesso, ID: ', resultado);
            return new Promise<Livro>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar o livro de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterLivroByISBN(isbn: number) :Promise<Livro>{
        const query = "SELECT * FROM biblioteca.Livro where isbn = ?" ;

        try {
            const resultado = await executarComandoSQL(query, [isbn]);
            console.log('Livro localizado com sucesso, Isbn: ', resultado);
            return new Promise<Livro>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar o livro de isbn ${isbn} gerando o erro: ${err}`);
            throw err;
        }
    }
    async filterAllLivro() :Promise<Livro[]>{
        const query = "SELECT * FROM biblioteca.Livro" ;

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<Livro[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao listar os livros gerando o erro: ${err}`);
            throw err;
        }
    }

    
}