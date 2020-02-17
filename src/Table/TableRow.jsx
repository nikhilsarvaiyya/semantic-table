import React from 'react';
import { Dropdown, Table, Loader, Image, Checkbox } from 'semantic-ui-react';

import PropTypes from 'prop-types';



var moment = require('moment');
const actionStyle = {
    width: "20px"
}


function checkValidDate(date) {
    if (!(new Date(date) === "Invalid Date") && !isNaN(new Date(date))) {
        if (date == new Date(date).toISOString()) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}

// function addDefaultSrc(ev) {
//     ev.target.src = defaultImage
// }

export const TableRow = props => (
    <Table.Row >
        {
            props.tableHeader && props.tableHeader.filter((ti, value) => { return ti.listed }).map((tableItem, index) => {

                let clickToView = {
                    text: "View",
                    isComponent: tableItem.component ? true : false
                }
                return <React.Fragment>
                    <Table.Cell
                        key={index}
                        style={tableItem.key == "action" ? actionStyle : null, { whiteSpace: "inherit" }}
                        collapsing={tableItem.key == "action" || index === 0 ? true : false}
                        textAlign={tableItem.key == "action" ? 'right' : null}
                        onClick={(e, tableItem) => props.handleDropDownItem(e, clickToView, props.data)}

                    >
                        {
                            tableItem.component ?
                                tableItem.component.componentType === "checkbox" && tableItem.component.actionType === "onChange" ?
                                    Object.entries(props.data).map((key2, value2) => {
                                        if (tableItem.component.key === key2[0]) {
                                            return <Checkbox
                                                onChange={(e, item) => props.handleTableComponent(e, item, props.data)}
                                                toggle={tableItem.component.viewType === "toggle" ? true : false}
                                                checked={key2[1]}
                                                disabled={tableItem.component.disabled}
                                                label={tableItem.component.label}
                                                slider={tableItem.component.viewType === "slider" ? true : false} />
                                        }
                                    })
                                    :
                                    null :
                                null
                        }

                        {
                            tableItem.multiKey && tableItem.multiKey.length !== 0 ?
                                tableItem.multiKey.map((item, i) => {
                                    let tempText = ""
                                    Object.entries(props.data).map((key2, value2) => {
                                        if (item.name == key2[0] && item.key !== "action") {
                                            tempText = key2[1]
                                        }
                                    })

                                    if (item.name === "profilePic" || item.name === "logo") {
                                        return <span key={i}><Image avatar src={tempText === undefined || tempText === "undefined" ? null : tempText} />&nbsp;</span>
                                    } else {
                                        return <span key={i}>{tempText} &nbsp;</span>
                                    }
                                })
                                :
                                Object.entries(props.data).map((key2, value2) => {
                                    if (tableItem.key == key2[0] && tableItem.key !== "action") {
                                        if (checkValidDate(key2[1])) {
                                            return moment(key2[1]).format('lll')
                                        } else if (tableItem.key === "profilePic" || tableItem.key === "logo") {
                                            return <Image avatar src={key2[1] === undefined || key2[1] === "undefined" ? null : key2[1]} />
                                        } else if (typeof (key2[1]) === "boolean") {
                                            if (key2[1]) {
                                                return tableItem.keyValue[0]
                                            } else {
                                                return tableItem.keyValue[1]
                                            }
                                        } else if (tableItem.convertCamelCase) {
                                            return key2[1]
                                        } else {
                                            return key2[1].toString()
                                        }
                                    }
                                })
                        }

                        {
                            tableItem.key == "action" ?
                                <Dropdown icon='ellipsis vertical' pointing="right">
                                    <Dropdown.Menu>
                                        {
                                            tableItem.actions.map((item, i) => {
                                                if (!item.key) {
                                                    return <React.Fragment key={i}>
                                                        <Dropdown.Item
                                                            icon={item.icon ? item.icon : null}
                                                            text={item.name}
                                                            disabled={item.disabled}
                                                            onClick={(e, item) => props.handleDropDownItem(e, item, props.data)}
                                                        />
                                                        <Dropdown.Divider />
                                                    </React.Fragment>
                                                } else {
                                                    return false
                                                }
                                            })
                                        }

                                        {
                                            tableItem.actions.map((item, i) => {
                                                if (item.key) {
                                                    return Object.entries(props.data).map((key3, value3) => {
                                                        if (item.key == key3[0]) {
                                                            return <React.Fragment>
                                                                <Dropdown.Item
                                                                    icon={item.icon ? item.icon : null}
                                                                    key={i}
                                                                    text={item.name}
                                                                    disabled={key3[1]}
                                                                    onClick={key3[1] ? null : (e, item) => props.handleDropDownItem(e, item, props.data)}
                                                                />
                                                                <Dropdown.Divider />
                                                            </React.Fragment>
                                                        }
                                                    })
                                                } else {
                                                    return false
                                                }
                                            })
                                        }
                                    </Dropdown.Menu>
                                </Dropdown> : null
                        }
                    </Table.Cell>
                </React.Fragment>
            })
        }
    </Table.Row>
);

TableRow.propTypes = {
    data: PropTypes.object.isRequired,
    selection: PropTypes.object.isRequired,
};
