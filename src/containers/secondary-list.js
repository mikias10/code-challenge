import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchData } from '../actions/index';
import _ from 'underscore';
import { Grid, Column, Cell } from 'eddyson-react-grid';
import $ from 'jquery';

class SecondaryList extends Component {

  constructor(props){
    super(props);
    this.state = { secondaryLevels: null };
  }

  componentWillMount(){
    this.props.fetchData();
    this.setState({secondaryLevels: this.props.secondaryLevels});
  }


  componentDidUpdate(){

    const that = this;
    const element = ReactDOM.findDOMNode(that.refs.grid);
    const chevIcon = document.createElement('i');
    const singalIcon = document.createElement('i');

    $(element).find('table').addClass('table-striped');
    $(element).find('thead tr').css('color','#4f9fcf');
    $(element).find('thead tr button').css({'display':'none'});
    $(element).find('tr td:first-child').css('color', '#4f9fcf');
    const el = $(element).find('thead tr:first-child th:first-child');
    $(element).find('thead tr:first-child th:last-child').css('display', 'none');
    $(chevIcon).addClass('fa fa-chevron-down').addClass('chev-icon');
    $(el).append(chevIcon);
    $(singalIcon).addClass('fa fa-signal signal-icon');
    $(element).find('tr td:last-child').append(singalIcon);

  }

  renderList() {
    if(this.props.secondaryLevels.length > 0){

      for(var i = 0; i < this.props.secondaryLevels[0].secondaryLevels.length; i++){
        _.extend(this.props.secondaryLevels[0].secondaryLevels[i], {id: i}, {signal: ''});
      }

      return  (
        <div id="grid-comp">
            <Grid objects={this.props.secondaryLevels[0].secondaryLevels} ref="grid">
              <Column name="bidSpreadVsBenchmark" label="Benchmark"/>
              <Column name="description" label="Issue Description" className="test"/>
              <Column name="currency" label="Currency"/>
              <Column name="yearsRemaining" label="Years Remaining"/>
              <Column name="benchmarkSecurityDescription" label="Benchmark"/>
              <Column name="securityName" label="Issuer"/>
              <Column name="bidSpreadVsGocCurve" label="GoC Curve"/>
              <Column name="bidSpreadVs3mCdor" label="3M CDOR"/>
              <Column name="bidSpreadVs3mUsdl" label="3M USDL"/>
              <Column name="readableTimestamp" label="Updated"/>
              <Column name="signal" label="Signal"/>
              <Column name="id" hide={true} />
            </Grid>
        </div>
        );
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
