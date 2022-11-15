import React from 'react';
  
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: []
    }
  }
  
  deleteClient = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ 
        id: e.target.value
       })
    };
    console.log(requestOptions);
    fetch('http://localhost:8000/api/clients/' + e.target.id, requestOptions)
    .then(function() {
      window.location.href = "/";
    });
  };

  searchClient = async (e) => {
    //console.log(e.target.search.value);
    e.preventDefault();
    fetch('http://localhost:8000/api/clients/' + e.target.search.value)
    .then((res) => res.json())
    .then((json) => {
        this.setState({
            items: json} , 
            function () {
            //console.log(json.length);
      });
    }).catch(function (res){
        console.log(res.items)
        this.setState ({
          //DataisLoaded: false
        })
        console.log(res.length);
    })
  }

  componentDidMount() {
    fetch("http://localhost:8000/api/clients") 
    .then((res) => res.json())
    .then((json) => {
        this.setState({
            items: json} , 
            function () {
              //console.log(json.length);
      });
    })
  }

  showData(){
    if(this.state.items.message != 'Client not found') {
      return (
        this.state.items.map((item) => ( 
          <tr key = { item.id } >
              <td> { item.id } </td>
              <td> { item.name } </td>                      
              <td> { item.cpf } </td>                                            
              <td> { item.birthDate } </td>                                                                  
              <td> { item.phone } </td>
              <td> <a onClick={this.deleteClient} className="btn btn-danger btn-sm m-2" id={ item.id } href="#" role="button">Excluir</a></td>                        
              </tr>
          ))
      )
    } else {
      return (
        <td colSpan={6}>Nenhum registro encontrado.</td>
      );
    }
  }

  render() {
    return (
      <div >
        <div className="jumbotron">
          <h1 className="display-6 p-3">Cadastro de Clientes</h1>
            <div className="dados m-3">
              <form onSubmit={this.searchClient} className="pb-2">
                    <input type="text" name="search" className='m-1' placeholder='Digite o nome ou CPF'/>
                    <input type="submit" value="Buscar" className='btn-primary btn-sm m-1'/>
              </form>
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nome Completo</th>
                    <th scope="col">CPF</th>              
                    <th scope="col">Data de Nascimento</th>                                  
                    <th scope="col">Telefone</th>                                                      
                    <th scope="col">Ações</th>                          
                  </tr>
                </thead>
                <tbody>{this.showData()}</tbody>
              </table>
            </div>
          <p className="lead ">
            <a className="btn btn-primary btn-sm m-3" href="/cadastrar" role="button">Inserir novo Cliente</a>
          </p>          
        </div>
      </div>
    );

  }

}

export default App;