import Produto from "../models/Produto.js";

const controller = {}  // Objeto vazio

controller.create = async function(req, res) {
    try {
        await Produto.create(req.body)

        // Envia uma resposta de sucesso ao front-end
        // HTTP 201: Created
        res.status(201).end()
    }
    catch(error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).end()
    }
}

//exibe todos os arquivos e em ordem alfabética
controller.retrieveAll = async function(req, res) {
    try {
  
      const query = Produto.find().sort({ descricao: 'asc' })
  
      // Verifica se o parâmetro 'pop_fornecedor' já foi passado na URL
      // e, em caso positivo, acrescenta o populate() à consulta
      if('pop_fornecedor' in req.query) query.populate('fornecedor')
  
      const result = await query.exec()
  
      // HTTP 200: OK (implícito)
      res.send(result)
    }
    catch(error) {
      console.error(error)
      // HTTP 500: Internal Server Error
      res.status(500).end()
    }
  }
  
  controller.retrieveOne = async function(req, res) {
    try {
  
      const query = Produto.findById(req.params.id)
  
      // Verifica se o parâmetro 'pop_fornecedor' já foi passado na URL
      // e, em caso positivo, acrescenta o populate() à consulta
      if('pop_fornecedor' in req.query) query.populate('fornecedor')
  
      const result = await query.exec()
      
      // Documento encontrado ~> HTTP 200: OK (implícito)
      if(result) res.send(result)
      // Documento não encontrado ~> HTTP 404: Not Found
      else res.status(404).end()  
    }
    catch(error) {
      console.error(error)
      // HTTP 500: Internal Server Error
      res.status(500).end()
    }
  }

//atualizar um arquivo
controller.update = async function(req, res){
    try{
        const result = await Produto.findByIdAndUpdate(req.params.id, req.body)
        //documento encontrado e atualizado -> http 204: no content
        if(result) res.status(204).end()
        //documento não encontrado (e não atualizado) -> http 404: not found
        else res.status(404).and()
    }
    catch(error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).end()
    }
}

//para excluir um arquivo
controller.delete = async function(req, res){
    try{
        const result = await Produto.findByIdAndDelete(req.params.id)
        //documento encontrado e excluído -> http 204: No content
        if(result) res.status(204).end()
        //documento não encontrado (e não excluído) -> http 404: not found
        else res.status(404).end()
    }
    catch(error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).end()
    }
}

export default controller