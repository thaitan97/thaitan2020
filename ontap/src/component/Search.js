import React, { Component } from 'react'
import '../App.css';
class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
             search:'',
        }
    }
    onSearch=(event)=>{
        this.setState({
            search:event.target.value
        });
    }
    getOpenCloseForm=()=>{
        this.props.onOpenCloseForm();
    }
    getSearch=()=>{
        this.props.onSearch(this.state);
    }
    render() {
        return (
            <div className="space">
                <button id="work" className="btn btn-primary" onClick={this.getOpenCloseForm}><i className="fas fa-plus-square"></i>Thêm Công Việc</button>
                <button id="work" className="btn btn-info" onClick={this.props.onJokerData}><i className="fas fa-database"></i>Joker Data</button>
                <div className="fix">
                    <input type="text" name="keyword" id="search" className="form-control" required="required" placeholder="Mời bạn nhập từ khóa" value={this.state.Search} onChange={this.onSearch}/>
                    <button id="load" className="btn btn-primary" onClick={this.getSearch}><i className="fas fa-search"></i>Tìm</button>
                </div>
            </div>
        )
    }
}

export default Search
