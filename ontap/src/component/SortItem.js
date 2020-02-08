import React, { Component } from 'react'
import '../App.css'
class SortItem extends Component {
    getDelete=()=>{
        this.props.onDelete(this.props.id);
    }
    getEdit=()=>{
        this.props.onOpenForm();
        this.props.onEdit(this.props.id);
    }
    render() {
        return (
            <tr>
                <td>{this.props.stt +1}</td>
                <td >{this.props.name}</td>
                <td>
                    <span id="label" className={this.props.status ? 'label label-success' : 'label label-danger'}>{this.props.status ? 'Kích Hoạt' : 'Ẩn'}</span>
                </td>
                <td>
                    <button className="btn btn-warning" onClick={this.getEdit}><i className="fas fa-edit"></i>Sửa</button>
                    <button className="btn btn-danger" onClick={this.getDelete}><i className="fas fa-power-off"></i>Xóa</button>
                </td>
            </tr>
        )
    }
}

export default SortItem
