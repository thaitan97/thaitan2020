import React, { Component } from 'react'
import './App.css';
import Taskform from './component/Taskform';
import SortList from './component/SortList';
import Search from './component/Search';
import _ from 'lodash';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product: [],
      displayForm: false,
      edit: null,
      filtername:'',
      filterstatus:-1,
      sortby:'name',
      sortvalue:1,
    };
  };
  onJokerData = () => {
    var product = [
      {
        id: this.generateID(),
        name: 'Iphone',
        status: true
      },
      {
        id: this.generateID(),
        name: 'Samsung',
        status: false
      },
      {
        id: this.generateID(),
        name: 'Nokia',
        status: true
      },
    ]
    localStorage.setItem('product', JSON.stringify(product));
  }
  s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  generateID() {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
  }
  componentWillMount() {
    if (localStorage && localStorage.getItem('product')) {
      var product = JSON.parse(localStorage.getItem('product'))
    }
    this.setState({
      product: product
    });
  }
  onOpenCloseForm = () => {
    this.setState({
      displayForm: !this.state.displayForm
    });
  }
  onButtonClose = () => {
    this.setState({
      displayForm: false
    })
  }
  onSubmit = (data) => {
    var product = this.state.product;
    if (data.id === '') {
      data.id = this.generateID();
      product.push(data);
    }
    else {
      var index = this.findIndex(data.id);
      product[index] = data;
      this.setState({
        product: product,
        edit: null,
      });
      localStorage.setItem('product', JSON.stringify(product));
    }
  }
  findIndex = (id) => {
    var product = this.state.product;
    var result = -1;
    product.forEach((product, index) => {
      if (product.id === id) {
        result = index
      }
    });
    return result
  }
  onEdit = (id) => {
    var product = this.state.product;
    var index = _.findIndex(product, (item) => {
      return (
        item.id == id
      )
    });
    var edit = product[index];
    this.setState({
      edit: edit
    });
  }
  onDelete = (id) => {
    var product = this.state.product;
    var index = _.findIndex(product, (item) => {
      return (
        item.id == id
      )
    });
    if (index !== -1) {
      product.splice(index, 1);
      this.setState({
        product: product
      });
    }
    localStorage.setItem('product', JSON.stringify(product));
  }
  onOpenForm = () => {
    this.setState({
      displayForm: true
    });
  }
  onFilter=(filtername, filterstatus)=>{
    filterstatus=+filterstatus
    this.setState({
        filtername:filtername,
        filterstatus:filterstatus
    });
  }
  onSearch=(search)=>{
    this.setState({
      search:search
    });
  }
  onSort=(sortby, sortvalue)=>{
    this.setState({
      sortby:sortby,
      sortvalue:sortvalue
    });
  }
  render() {
    var { product, displayForm, edit,filtername,filterstatus,search,sortby,sortvalue } = this.state;
      if(filtername=''){
        product=product=_.filter(product,(item)=>{
          return(
            item.name.toLowerCase().indexOf(filtername) !==-1
          )
        });
      }
      product=product=_.filter(product,(item)=>{
      if(filterstatus==-1){
        return(
          product
        )
      }
      else {       
          return(
            item.status=1 ?'true' :'false'
          )      
      }
    });
    if(search){
      product=product=_.filter(product,(item)=>{
        return(
          item.name.toLowerCase().indexOf(search) !==-1
        )
      });
    }
    if(sortby=='name'){
      product.sort((a,b)=>{
        if(a.name >b.name){
          return sortvalue;
        }
        else if(a.name <b.name){
          return -sortvalue;
        }
        else{
          return 0
        }
      });
    }
    else{
      product.sort((a,b)=>{
        if(a.status >b.status){
          return sortvalue;
        }
        else if(a.status <b.status){
          return -sortvalue;
        }
        else {
          return 0
        }
      });
    }
    let element = displayForm ?
      <Taskform
        onSubmit={this.onSubmit}
        onButtonClose={this.onButtonClose}
        edit={edit}
      /> : '';
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <h1>QUẢN LÍ CÔNG VIỆC</h1>
          </div>
          <div className={displayForm ? 'col-lg-4' : ''}>
            {element}
          </div>
          <div className={displayForm ? 'col-lg-8' : 'col-lg-12'}>
            <Search
              onJokerData={this.onJokerData}
              onOpenCloseForm={this.onOpenCloseForm}
              onSearch={this.onSearch}
            />
            <SortList
              product={product}
              onDelete={this.onDelete}
              onOpenForm={this.onOpenForm}
              onEdit={this.onEdit}
              onFilter={this.onFilter}
              onSort={this.onSort}
            />
          </div>
        </div>
      </div>
    )
  }
}
export default App



