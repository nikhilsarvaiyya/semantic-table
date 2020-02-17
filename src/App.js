import React from 'react';
import logo from './logo.svg';
import './style.css';
import 'semantic-ui-css/semantic.min.css'
import CommanTable from './Table/TableLayout'
const container = {
  width: "100%",
  background: "red",
  height: "100%",
  display: "block"
}
const tableHeader = [
  {
    "name": "Name",
    "key": "name",
    "multiKey": [
      {
        "name": "profilePic"
      },
      {
        "name": "firstName"
      },
      {
        "name": "lastName"
      }
    ],
    "sortable": true,
    "singleSearch": true,
    "multiSearch": true,
    "listed": true,
    "style": {
      "width": 3
    }
  },
  {
    "name": "Check Boolean",
    "key": "boolean",
    "keyValue": [
      "True Value",
      "False False"
    ],
    "dropdown": true,
    "dropdownType": "array",
    "sortable": true,
    "singleSearch": true,
    "multiSearch": false,
    "listed": true,
    "style": {
      "width": 3
    }
  },
  {
    "name": "Check Role",
    "key": "array",
    "keyValue": [
      "value 1",
      "value 2",
      "value 3",
      "value 4",
      "value 5",

    ],
    "dropdown": true,
    "dropdownType": "array",
    "sortable": true,
    "singleSearch": true,
    "multiSearch": false,
    "listed": true,
    "style": {

    }
  },
  {
    "name": "Add Component",
    "key": null,
    "component": {
      "componentType": "checkbox",
      "actionType": "onChange",
      "key": "default",
      "disabled": false,
      "viewType": "toggle"
    },
    "sortable": false,
    "singleSearch": false,
    "multiSearch": false,
    "listed": true,
    "style": {
      "width": 3
    }
  },
  {
    "name": "Created / Updated Date",
    "key": "createdAt",
    "sortable": true,
    "singleSearch": true,
    "multiSearch": true,
    "listed": true,
    "style": {
      "width": 4
    }
  },
  {
    "name": "",
    "key": "action",
    "sortable": false,
    "singleSearch": false,
    "multiSearch": false,
    "listed": true,
    "actions": [
      {
        "name": "View",
        "icon": "eye"
      },
      {
        "name": "Delete",
        "icon": "trash"
      }
    ]
  }
]

let tableData = [
  {
    name: "Nikhil",
    default: true,
    profilePic: logo,
    firstName: "Nikhil",
    lastName: "Sarvaiyya",
    createdAt: new Date(),
    boolean: true,
    array: "Manager"

  },

]

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
  this.markDefault(event, item, data._id);
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
