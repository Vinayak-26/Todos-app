import React, {Component} from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import ListGroup from 'react-bootstrap/ListGroup';
// import { ListGroupItem } from 'react-bootstrap';
// import { response } from 'express';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            userInput : "",
            list : [],
            itemSelected : 0,
            itemSelectedValue : "",
        }
    }
    getTodos(){
        const updatedList = [];
        fetch('http://localhost:3001/')
        .then(response => response.json())
        .then((json) => json.map((item) => { 
                updatedList.push(item);
                this.setState({
                    list : updatedList,
                });
        })
        );  
    }

    componentDidMount(){
        this.getTodos();
    }

    updateInput(value){
        this.setState({
            userInput : value,
        });
    }
    addItem(){
        if(this.state.userInput !== ' ' && this.state.userInput !== ''){
            const userInput = {
                id : Math.random().toPrecision(8),
                value : this.state.userInput
            };
            const list = [...this.state.list];
            const id = userInput.id;
            const toDos = userInput.value;
            list.push(userInput);

            fetch('http://localhost:3001/todos', {
                method : 'POST',
                headers : {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify({id, toDos}),
            })
            .then(response => {
                return response.text();
            })
            .then(data => {
                this.getTodos();
                alert(data);        
            });
            this.setState({
                list,
                userInput: "",
            });    
        }
    }
    updateTodos(){
        const toDos = prompt("Please make the required changes:- ", this.state.itemSelectedValue);
        const id = this.state.itemSelected;
        if(toDos === null){
            return;
        }
        if(toDos !== ' ' && toDos !== ''){
        fetch('http://localhost:3001/todos', {
            method : 'PUT',
            headers : {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({id, toDos}),
        })
        .then(response=> {
            return response.text();
        })
        .then(data => {
            this.getTodos();
            alert(data);
        });
        const list = [...this.state.list];
        this.setState({
            list,
        });
        }    
    }
    deleteItem(key){
        const list = [...this.state.list];
        const updatedList = list.filter(item => item.id !== key);
        const id = key;
        fetch('http://localhost:3001/todos/${id}', {
            method : 'DELETE',
            headers : {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({id}),
        })
        .then(response =>{
            return response.text();
        })
        .then(data => {
            this.getTodos();
            alert(data);    
        });
        this.setState({
            list : updatedList,
        });   
    }
    selectedItem(key){
        this.setState({
            itemSelected : key.id,
            itemSelectedValue : key.to_dos,
        });
    }
   
    render(){
        return(<Container>
            <Row style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: '3rem',
                  fontWeight: 'bolder',
                }}
                > TODO LIST
            </Row>
            <hr/>
            <Row>
            <Col md={{ span: 8, offset: 2}}> 

            <InputGroup className="mb-3">
            <FormControl
                placeholder="add item . . . "
                size="lg"
                value = {this.state.userInput}
                onChange = {item => this.updateInput(item.target.value)}
                aria-label="add something"
                aria-describedby="basic-addon2"
            />
            
            <Button variant= "dark" size= "lg" onClick = {()=>this.addItem()}>
                    ADD
            </Button>
            </InputGroup>
        </Col>
    </Row>
    <Row>
     <Col md={{ span: 8, offset: 2 }}>
        <ListGroup> 
         {/* map over and print items  */}
         {this.state.list.map(item => {return(
  
            <ListGroup.Item variant="dark" key = {item.id} action 
            onClick={ () => this.selectedItem(item)}>
                {item.to_dos} 
            </ListGroup.Item>
         )})}
         </ListGroup>
        
        <br/>
        <br/>
        <Col md={{ span: 8, offset: 1}}>
         
            <div style = {{float : 'left'}}>
            <Button variant= "dark" size= "lg"  onClick={ () => this.deleteItem(this.state.itemSelected)}>
                    Delete
            </Button>
            </div>
            
            <div style = {{float : 'right'}}>
            <Button variant= "dark" size= "lg" onClick={ () => this.updateTodos()}>
                Edit
            </Button>
            </div>
        </Col>
        </Col>
        
     
    </Row> 
    
  </Container>
 );
    }
}
export default App;