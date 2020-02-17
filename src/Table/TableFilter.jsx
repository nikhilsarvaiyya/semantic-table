import React from 'react';
import PropTypes from 'prop-types';
import { Form, Popup, Icon, List, Divider, Checkbox, Button } from 'semantic-ui-react';
import {
    DateInput,
    TimeInput,
    DateTimeInput,
    DatesRangeInput
} from 'semantic-ui-calendar-react';

const regex = new RegExp('^[a-zA-Z0-9 ]+$');

export class TableFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: '',
            //filterValid: true,
            tooltip: false,
            datesRange: '',
            startDate: '',
            endDate: '',
            open: true,
            singleDropdownKey: props.key,
            singleDropdownValue: ""
        };
    }

    handleOnChange = (event, data, type) => {

        this.setState({ tooltip: true });
        if (data.value !== '' && !regex.test(data.value)) {
            this.setState({
                [data.name]: data.value,
                // filterValid: false
            });
        } else {
            this.setState({
                [data.name]: data.value,
                // filterValid: false
            });
            this.props.onSubmitFilter(data, this.props.type);
        }

    };

    handleChange = (event, data) => {
        event.stopPropagation();
        if (this.state.hasOwnProperty(data.name)) {
            this.setState({ [data.name]: data.value });
            if (data.value.length > 20) {
                this.props.onSubmitFilter(data, this.props.type);
            }
        }
    }

    handleDeleteClick = (event, data) => {
        event.stopPropagation()
        if (this.state.hasOwnProperty(data.name)) {
            this.setState({ [data.name]: data.value });
            this.props.onSubmitFilter(data, this.props.type);
        }

    }


    handleChangeDate = (event, { name, value }) => {
        event.stopPropagation()
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }

        if (name === "startDate" && value.length === 0) {
            this.setState({ endDate: "" });
        }
    }

    applyDateFilter = (event) => {
        event.stopPropagation()
        if (this.state.startDate && this.state.endDate) {
            this.props.onSubmitFilter(this.state, this.props.type);
            this.setState({ open: false })
        }
    }

    applyDropdownFilter = (event, value, index) => {
        event.stopPropagation()
        let dropdown = {
            singleDropdownKey: this.props.item.key
        }
        if (this.props.item.dropdownType === "boolean") {
            if (index === 0) {
                dropdown.singleDropdownValue = true
            } else {
                dropdown.singleDropdownValue = false
            }
        } else if (this.props.item.dropdownType === "array") {
            dropdown.singleDropdownValue = value
        }
        this.props.onSubmitFilter(dropdown, this.props.type);
        this.setState({ open: false })
    }

    openPopup = () => {
        this.setState({ open: !this.state.open })
    }
    render() {
        const { filter } = this.state;

        let searchPlaceholder = this.props.content ?
            this.props.type === "Single Search" && typeof (this.props.content) === "string" ?
                `Search by ${this.props.content.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); })}` :
                typeof (this.props.content) === "object" ?
                    // `Search by ${this.props.content.map((it, i) => { return it })}` :
                    "Enter the filter" :
                    "Enter the filter" :
            "Enter the filter";

        return this.props.item && (this.props.item.key === "createdAt" || this.props.item.key === "updatedAt") ?
            <React.Fragment>


                {this.props.item.sortable && this.props.item.key === this.props.column ?
                    <Icon
                        name={`arrow ${this.props.direction}`} />
                    : <Icon
                        style={{ opacity: ".2" }}
                        name="sort" />
                }
                {this.props.item.name}
                <Popup
                    //on='click'
                    trigger={<Button icon="calendar alternate" size="mini" onClick={this.openPopup} style={{ float: "right" }} />}
                    position="bottom right"
                    open={this.state.open}

                >
                    <Popup.Content>
                        <List divided verticalAlign='middle' >
                            <List.Item style={{ padding: "5px 10px" }}>
                                <List.Content >
                                    <b> Date Filter</b>
                                </List.Content>
                            </List.Item>
                            <List.Item >
                                <h3 style={{ margin: "0px 0 5px 0" }}>From</h3>
                                <DateInput
                                    name="startDate"
                                    placeholder="Start Date"
                                    value={this.state.startDate}
                                    iconPosition="right"
                                    onChange={this.handleChangeDate}
                                    clearable={true}
                                    closable
                                    inline={this.state.startDate.length === 0 ? true : false}
                                />
                            </List.Item>
                            {this.state.startDate.length === 0 ? null :
                                <List.Item >
                                    <h3 style={{ margin: "0px 0 5px 0" }}>To</h3>
                                    <DateInput
                                        name="endDate"
                                        placeholder="End Date"
                                        value={this.state.endDate}
                                        iconPosition="right"
                                        onChange={this.handleChangeDate}
                                        clearable={true}
                                        closable
                                        initialDate={this.state.startDate}
                                        inline={this.state.startDate.length === 0 ? false :
                                            this.state.endDate.length === 0 ? true : false}
                                    />
                                </List.Item>}
                            <List.Item style={{ padding: "5px 10px" }}>
                                <List.Content >
                                    <Button
                                        size="mini"
                                        disabled={this.state.startDate.length === 0 && this.state.endDate.length === 0}
                                        fluid
                                        style={this.state.startDate.length === 0 && this.state.endDate.length === 0 ? { background: "gray" } : { background: "blue" }}
                                        onClick={(e) => this.applyDateFilter(e)}>Apply</Button>
                                </List.Content>
                            </List.Item>
                        </List>
                    </Popup.Content>
                </Popup>
            </React.Fragment>
            :
            this.props.item.dropdown ?
                <React.Fragment>
                    {this.props.item.sortable && this.props.item.key === this.props.column ?
                        <Icon
                            name={`arrow ${this.props.direction}`} />
                        : <Icon
                            style={{ opacity: ".2" }}
                            name="sort" />
                    }
                    {this.props.item.name}
                    <Popup
                        //on='click'
                        trigger={<Button icon="caret down" onClick={this.openPopup} size="mini" style={{ float: "right" }} />}
                        position="bottom right"
                        open={this.state.open}
                    >
                        <Popup.Content>
                            <List divided verticalAlign='middle' link>
                                <List.Item  >
                                    <List.Content >
                                        <b> {this.props.item.key} </b>
                                    </List.Content>
                                </List.Item>
                                {this.props.item.keyValue.map((k, i) => {
                                    return <List.Item as='a' onClick={(e) => this.applyDropdownFilter(e, k, i)}>
                                        {k}
                                    </List.Item>
                                })}
                            </List>
                        </Popup.Content>
                    </Popup>
                </React.Fragment>
                :
                <Form.Input
                    placeholder={searchPlaceholder}
                    name="filter"
                    value={filter}
                    //   error={!this.state.filterValid}
                    onChange={this.handleOnChange}
                    loading={this.props.loading}
                    content={this.props.content}

                    autoFocus
                    icon={
                        this.props.type === "Single Search" ?
                            <Icon name='delete' link onClick={(e) => this.props.handleClicked(e, null)} /> :
                            "search"}
                />
    }
}

TableFilter.propTypes = {
    onSubmitFilter: PropTypes.func.isRequired,
    filter: PropTypes.object.isRequired,
    totalCount: PropTypes.number.isRequired,
    currentQuery: PropTypes.string.isRequired
};

