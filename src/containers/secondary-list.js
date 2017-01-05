import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchData } from '../actions/index';
import _ from 'underscore';
import DataGrid from 'react-datagrid';

var columns = [

    { name: 'index', title: '#', width: 50 },
    { name: 'securityName', width: 250 },
    { name: 'description',  width: 250  },
    { name: 'currency' ,  width: 100},
    { name: 'benchmarkSecurityDescription' ,  width: 250},
    { name: 'bidSpreadVsBenchmark' ,  width: 100},
    { name: 'bidSpreadVsGocCurve' ,  width: 100},
    { name: 'bidSpreadVs3mCdor' ,  width: 100},
    { name: 'bidSpreadVs3mUsdl' ,  width: 100},
    { name: 'readableTimestamp' ,  width: 100}

];

class SecondaryList extends Component {

  constructor(props){
    super(props);
    this.state = { secondaryLevels: null };
  }

  componentWillMount(){
    this.props.fetchData();
    this.setState({secondaryLevels: this.props.secondaryLevels});
  }

  renderList() {


  if(this.props.secondaryLevels.length > 0){
    console.log('sec' ,this.props.secondaryLevels[0].secondaryLevels);

    for(var i = 0; i < this.props.secondaryLevels[0].secondaryLevels.length; i++){
      _.extend(this.props.secondaryLevels[0].secondaryLevels[i], {id: i});
    }

    return  (
        <DataGrid
        			idProperty='id'
        			dataSource={this.props.secondaryLevels[0].secondaryLevels}
        			columns={columns}
        			style={{height: 900, width: 1500}}
		    />);
    }
  }

  render() {
    return (
        <div>
          {this.renderList()}
        </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    secondaryLevels: state.secondary
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ fetchData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SecondaryList);
