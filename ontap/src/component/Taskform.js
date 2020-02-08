import React, { Component } from 'react'

class Taskform extends Component {
    constructor(props) {
      super(props)
      this.state = {
        id:'',
        name:'',
        status:true   
      };
    };
    onName=(event)=>{
        this.setState({
            name:event.target.value
        });
    }
    onStatus=(event)=>{
        this.setState({
            status:event.target.value
        });
        if(this.state.status === true){
            this.setState({
                status:false
            });
        }
        else{
            this.setState({
                status:true
            });
        }
    }
    getSubmit=(event)=>{
        event.preventDefault();
        this.props.onSubmit(this.state);
        this.props.onButtonClose();
    }
    onResetForm=()=>{
        this.setState({
            name:'',
            status:true,
        });
    }
    getCloseForm=()=>{
        this.setState({
            name:'',
            status:true,
        });
        this.props.onButtonClose();
    };
    componentWillMount(){
        if(this.props.edit){
            this.setState({
                id:this.props.edit.id,
                name:this.props.edit.name,
                status:this.props.edit.status,
            });
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.edit){
            this.setState({
                id:nextProps.edit.id,
                name:nextProps.edit.name,
                status:nextProps.edit.status
            });
        }
    }
    render() {
        return (
            <form onSubmit={this.getSubmit}>
                <div className="panel panel-danger">
                    <div className="panel-heading">
                        <button type="button" className="close" onClick={this.props.onButtonClose}>&times;</button>
                        <h3 className="panel-title">Thêm Công Việc</h3>
                    </div>
                    <div className="panel-body">
                        <label>Tên:</label>
                        <br />
                        <div className="form-group">
                            <input type="text" name="name" className="form-control" value={this.state.name} onChange={this.onName}/>
                            <br />
                            <label>Trạng thái:</label>
                            <select name="status" className="form-control" value={this.state.status} onChange={this.onStatus}>
                                <option value={true}>KíchHoạt</option>
                                <option value={false}>Ẩn</option>
                            </select>
                            <button className="btn btn-warning"><i className="fas fa-save"></i>Lưu lại</button>
                            <button className="btn btn-info" type="reset" onClick={this.onResetForm}><i className="fas fa-spinner"></i>Reset</button>
                            <button className="btn btn-danger" onClick={this.getCloseForm}><i className="fas fa-window-close"></i>Hủy bỏ</button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default Taskform
