import React, {Component, PropTypes} from 'react';
import {Card, CardTitle, CardActions, CardMenu, IconButton, CardText} from 'react-mdl';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';
import * as canvasMaps from '../maps';
import {hashHistory} from 'react-router';
import ReactAutoLinker from 'react-autolinker';


const themes = ["Indigo", "Teal", "Green", "Red", "Orange"];
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

class EditMap extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
    console.log(this.props);
    const {data, offset, offsetWidth, id, onEdit, onAdd, onClose} = this.props;
    const editUrl = onEdit(id);
    const addUrl = onAdd(id);
    const removeUrl = onClose(id);
    const theme = getRandom(themes);
    console.log(data.children);
    return (<Card shadow={0} style={{marginLeft: offset, display: "inline-block", width: offsetWidth, border: "0.5px solid "+ theme}}>
               <CardTitle style={{color: "white", textTransform: "uppercase", background: theme}}> {data.name} </CardTitle>
               {
                   data.children.map((child) => <EditMap data={child} 
                                                         key={child.id}
                                                         offset={offset + 5}
                                                         offsetWidth={offsetWidth - 9}
                                                         id={child.id}
                                                         onAdd={onAdd}
                                                         onEdit={onEdit}
                                                         onClose={onClose}/>)
               }
               <CardText style={{color: "black"}}><ReactAutoLinker text={data.description} /></CardText>
               <CardMenu style={{color: 'white'}}>
                    <IconButton name="edit" onClick={() =>  hashHistory.push(editUrl)}/>
                    <IconButton name="add"  onClick={() =>  hashHistory.push(addUrl)}/>
                    <IconButton name="close" onClick={() => hashHistory.push(removeUrl)} />
              </CardMenu>
           </Card>)
    }
}

EditMap.defaultProps = {
    offset: 0,
    offsetWidth: 500
}


class Edit extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const {params} = this.props;
        const maps = this.props.maps.filter((x) => x.id == params.id);
        const to_transform = maps[0].map;
        const data = canvasMaps.transform(JSON.parse(to_transform));
        console.log(data);
        console.log("rendering");
        return (<div style={{margin: "auto", textAlign: "center", width: "50%", marginTop: 10}}>
                   <EditMap data={data} 
                            offset={0}
                            id={data.id}
                            onEdit={this.onEdit.bind(this)}
                            onAdd={this.onAdd.bind(this)}
                            onClose={this.onRemove.bind(this)}/>
                </div>)
    }

    getUrlFor(id, verb){
        return `/${this.props.params.id}/${verb}/${id}`
    }

    onEdit(id){
        return this.getUrlFor(id, 'edit');
    }

    onRemove(id){
        return this.getUrlFor(id, 'remove');
    }

    onAdd(id){
        return this.getUrlFor(id, 'add');
    }
}

let mapStateToProps = (state) => ({
   maps: state.maps
});

let mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch) ;

Edit = connect(mapStateToProps, mapDispatchToProps)(Edit);

export default Edit;