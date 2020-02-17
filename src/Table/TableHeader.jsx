import React, { useState } from 'react';
import { Table, Icon, Popup, List, Checkbox, Divider, Button } from 'semantic-ui-react';

import { TableFilter } from './TableFilter';

import { TableAddColumn } from './TableAddColumn'


export function TableHeader(props) {

    const [selectedKey, showInput] = useState(0);

    function handleClicked(e, item) {
        e.stopPropagation()
        if (item && item.key) {
            showInput(item.key);
        } else {
            showInput("no key selected");
            props.onSubmitFilter(null, null)
        }
    }
    return (
        <Table.Header>
            <Table.Row>

                {props.tableHeader && props.tableHeader.filter((ft, i) => { return ft.listed }).map((item, i) => {

                    return <React.Fragment>

                        <Table.HeaderCell
                            key={i}
                            sorted={item.sortable && props.key === item.key ? props.direction : null}
                            onClick={item.sortable ? () => props.handleSort(item.key) : null}
                            width={item.style && item.style.width ? item.style.width : null}
                            textAlign={item.key === "action" ? 'right' : 'left'}
                            style={item.key === props.column ? { color: "blue" } : null}
                        >
                            <div style={{ lineHeight: "22px" }}>
                                {selectedKey === item.key ?
                                    <React.Fragment>
                                        <TableFilter
                                            filter={props.q}
                                            totalCount={props.totalCount}
                                            onSubmitFilter={props.onSubmitFilter}
                                            loading={props.loading}
                                            type="Single Search"
                                            content={item.key}

                                            item={item}
                                            handleClicked={handleClicked}
                                            selectedKey={selectedKey}
                                        />
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <TableAddColumn
                                            item={item}
                                            tableHeader={props.tableHeader}
                                            addColumn={props.addColumn}
                                            direction={props.direction}
                                            column={props.column}
                                        />
                                        <div style={{ width: "40px", float: "right", }}>

                                            {
                                                item.singleSearch ?
                                                    item.key === "createdAt" || item.key === "updatedAt" ?
                                                        <Button icon='calendar alternate'
                                                            size="mini"

                                                            onClick={(e) => handleClicked(e, item)}

                                                        /> :
                                                        item.dropdown ?
                                                            <Button icon="caret down"
                                                                size="mini"
                                                                onClick={(e) => handleClicked(e, item)}
                                                            />
                                                            :
                                                            <Button icon='search'
                                                                size="mini"
                                                                onClick={(e) => handleClicked(e, item)}

                                                            />
                                                    : null
                                            }
                                        </div>
                                    </React.Fragment>
                                }
                            </div>
                        </Table.HeaderCell>

                    </React.Fragment>
                })}

            </Table.Row>
        </Table.Header>
    );
}
