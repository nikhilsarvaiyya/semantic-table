import React from 'react';
import { Icon, Popup, List, Checkbox, Divider, Button } from 'semantic-ui-react';
export class TableAddColumn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {


        return (
            <div style={{
                width: this.props.item.key === "action" ? "100%" : "calc(100% - 40px)",
                float: "left",
                overflow: "hidden",
                textOverflow: "ellipsis"
            }}>

                <React.Fragment>
                    {this.props.item.sortable ?
                        this.props.item.key === this.props.column ?
                            <Icon
                                name={`arrow ${this.props.direction}`} />
                            : <Icon
                                style={{ opacity: ".2" }}
                                name="sort" /> :
                        null
                    }

                    {this.props.item.name}

                    {this.props.item.key === "action" ?
                        <Popup
                            on='click'
                            trigger={<Button icon="add" size="mini" style={{ float: "right" }} />}
                            position="bottom right"
                            style={{
                                display: "block",
                                overflow: "auto",
                                maxHeight: "200px",
                                background: "white"
                            }}
                        >
                            <Popup.Content>
                                <List divided verticalAlign='middle' >
                                    <List.Item >
                                        <List.Content as="h3" >
                                            Add Column
                                    </List.Content>
                                    </List.Item>
                                </List>
                                <Divider />
                                <List divided verticalAlign='middle'  >
                                    {this.props.tableHeader &&
                                        this.props.tableHeader.filter((filtr, i) => {
                                            return filtr.key !== "action" && i >= 1
                                        }).map((listItems, i) => {
                                            return <List.Item key={i} >
                                                <List.Content >
                                                    <Checkbox
                                                        key={i}
                                                        name={listItems.name}
                                                        label={listItems.name}
                                                        checked={listItems.listed}
                                                        onChange={(e, data) => this.props.addColumn(e, i, listItems)} />
                                                </List.Content>
                                            </List.Item>
                                        })}
                                </List>
                            </Popup.Content>
                        </Popup>
                        : null}
                </React.Fragment>

            </div>
        )

    }
}


