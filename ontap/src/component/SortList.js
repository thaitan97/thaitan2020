import React, { Component } from 'react'
import SortItem from './SortItem'
import '../App.css'
import _ from 'lodash';

class SortList extends Component {
    constructor(props) {
        super(props)
        this.state = {
             filtername:'',
             filterstatus:-1, //all:-1,Kích Hoạt:1,Ẩn:0
            sortby:'name',
            sortvalue:1,
        }
    }
    onName=(event)=>{
        this.setState({
            filtername:event.target.value
        });
        this.props.onFilter(this.state.filtername);
    }
    onStatus=(event)=>{
        this.setState({
            filterstatus:event.target.value
        });
        this.props.onFilter(this.state.filterstatus);
    }
    getSort=(sortby, sortvalue)=>{
        this.props.onSort(sortby, sortvalue);
    }
    render() {
        var {product}=this.props;
        let eleproduct=product.map((item,index)=>{
            return(
                <SortItem
                    key={index}
                    stt={index}
                    id={item.id}
                    name={item.name}
                    status={item.status}
                    onDelete={this.props.onDelete}
                    onOpenForm={this.props.onOpenForm}
                    onEdit={this.props.onEdit}
                />
            )
        });
        return (
            <div>
                <div className="dropdown">
                    <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" id="loadone"><i className="fas fa-book"></i>
                        Sắp Xếp
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdown">
                        <a className="dropdown-item" href="#" onClick={()=>this.getSort('name',1)}>Từ A-Z<i className="fas fa-check"></i></a>
                        <a className="dropdown-item" href="#" onClick={()=>this.getSort('name',-1)}>Từ Z-A</a>
                        <hr/>
                        <a className="dropdown-item" href="#" onClick={()=>this.getSort('status',1)}>Kích Hoạt</a>
                        <a className="dropdown-item" href="#"onClick={()=>this.getSort('status',-1)}>Ẩn</a>
                    </div>
                </div>
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>TÊN</th>
                            <th>TRẠNG THÁI</th>
                            <th>HÀNH ĐỘNG</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>
                                <input type="search" name="filtername" id="input" className="form-control" value={this.state.filtername} onChange={this.onName}/>
                            </td>
                            <td>
                                <select className="form-control" name="filterstatus" value={this.state.filterstatus} onChange={this.onStatus}>
                                    <option value={-1}>Tất cả</option>
                                    <option value={1}>Kích Hoạt</option>
                                    <option value={0}>Ẩn</option>
                                </select>
                            </td>
                            <td></td>
                        </tr>
                        {eleproduct}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default SortList
