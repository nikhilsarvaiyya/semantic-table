import React from 'react';
import logo from './logo.svg';
import './style.css';
import 'semantic-ui-css/semantic.min.css'
import CommanTable from './Table/TableLayout';

import TableHeadersList from './Table/TableHeaderList';
import TableDataList from './Table/TableDataList';

const container = {
  width: "100%",
  background: "red",
  height: "100%",
  display: "block"
}
const tableHeader = TableHeadersList

let tableData = TableDataList

function onQueryChange(query) {
  let payload = query;
  //dispatch.account.getAcountUserWorkspaces(payload)
};


function addColumn(newColumns) {
  if (newColumns) {
    //this.setState({ tableHeader: newColumns })
  }
};


function handleDropDownItem(event, type, data) {
  if (type.text === "View") {

  }
}

function handleTableComponent(event, item, data) {
  //this.markDefault(event, item, data._id);
}

function App() {
  return (
    <div style={container}>
      <CommanTable
        tableName="Table Header"
        tableHeader={tableHeader}
        listData={tableData}
        searchable={false}
        selection={true}
        totalCount={5}
        loading={false}
        onQueryChange={onQueryChange}
        addColumn={addColumn}
        handleDropDownItem={handleDropDownItem}
        handleTableComponent={handleTableComponent}
      />
    </div>
  );
}

export default App;
