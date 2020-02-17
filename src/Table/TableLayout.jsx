import React from 'react';
import { Container, Header, Label, Card, Button } from 'semantic-ui-react';
import _ from 'lodash';
import { debounce } from "lodash";
import moment from 'moment';
import { CommanTableLayout } from './Table';
import { TableFilter } from './TableFilter';

export default class CommanTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            column: null,
            direction: null,
            _sort: this.props.sort ? this.props.sort : "createdAt",
            _page: 1,
            _order: 1,
            _limit: this.props.limit ? this.props.limit : 10,
            q: {},
            loading: false,
            query: {},
            filterData: this.props.listData,
            totalCount: this.props.totalCount
        }

        this.onSubmitFilter = debounce(this.onSubmitFilter, 300);
    }

    componentWillMount() {
        let query = {
            $sort: { [this.state._sort]: this.state._order },
            $skip: this.state._limit * (this.state._page - 1),
            $limit: this.state._limit
        }
        this.props.addColumn(this.props.tableHeader)
        if (this.props.onQueryChange) {
            this.setState({ filterData: null, totalCount: null })
            this.props.onQueryChange(query);
        } else {
            this.localFilter(query)
        }
    }

    componentWillReceiveProps(nextProps) {
        let query = {
            $sort: { [this.state._sort]: this.state._order },
            $skip: 0,
            $limit: this.state._limit
        }
        const { activeIndex } = this.props

        if (nextProps.activeIndex !== activeIndex) {
            setTimeout(() => {
                this.localFilter(query)
            }, 300);
        }

    }


    directionConverter = (order) => {
        if (order === 1) {
            return 'ascending';
        } else if (order === -1) {
            return 'descending';
        } else {
            return null;
        }
    }

    handleSort = clickedColumn => {
        const { _sort, _order, _page } = this.state;
        let newOrder = _order === 1 ? -1 : 1;
        if (_sort !== clickedColumn) {
            this.setState({
                _sort: clickedColumn
            })
            newOrder = 1;
        }
        this.setState({ _order: newOrder })
        this.createQuery({
            $sort: { [clickedColumn]: newOrder },
            $skip: this.state._limit * (_page - 1),
            $limit: this.state._limit
        })
        // dispatch.platform.getAllAccountUsers();
    };

    onChangeLimit = (event, data) => {
        if (data.value !== this.state._limit) {
            this.setState({
                _limit: data.value
            })
            //dispatch.platform.getAllAccountUsers({ $limit: data.value, $skip: 0, $sort: { [this.state._sort]: this.state._order }, });
            this.createQuery({
                $limit: data.value,
                $skip: 0,
                $sort: { [this.state._sort]: this.state._order }
            })
        }
    };

    onSubmitFilter = (filter, type) => {

        if (filter) {
            this.setState({
                filter: true,
                filterColumn: filter.content,
                filterValue: filter.value,
                _page: 1,
                _order: 1

            })
            if (filter.startDate && filter.endDate) {
                this.setState({
                    dateRange: true,
                    filterObj: filter
                })
            }
            if (filter.singleDropdownKey) {
                this.setState({
                    singleDropdownKey: filter.singleDropdownKey,
                    singleDropdownValue: filter.singleDropdownValue
                })
            }
        } else {
            this.setState({
                filter: false,
                filterColumn: null,
                filterValue: null,
                dateRange: false,
                filterObj: null,
                singleDropdownKey: null,
                singleDropdownValue: false,
            })
        }

        if (filter && filter.value && filter.value.toString() !== this.state.q) {
            if (type === "Single Search") {
                this.createQuery({
                    $skip: this.state._limit * (this.state._page - 1),
                    $limit: this.state._limit
                })
            } else if (type === "Multiple Search") {

                let searchBy = [];
                this.props.tableHeader && this.props.tableHeader && this.props.tableHeader.filter((filter, i) => {
                    return filter.multiSearch
                }).map((item, i) => {
                    return searchBy.push({ [item.key]: { $regex: filter.value, $options: 'i' } })
                })


                this.createQuery({
                    $or: searchBy,
                    $skip: this.state._limit * (this.state._page - 1),
                    $limit: this.state._limit
                })
            }


            //dispatch.platform.getAllAccountUsers();
        } else {
            // dispatch.platform.getAllAccountUsers();
            this.createQuery({
                $sort: { [this.state._sort]: this.state._order },
                $skip: this.state._limit * (this.state._page - 1),
                $limit: this.state._limit
            });
        }
    };

    onChangePage = (event, data) => {

        const { activePage } = data;
        if (activePage !== this.state._page) {
            this.setState({ _page: activePage })
            //dispatch.platform.getAllAccountUsers();
            this.createQuery({
                $skip: this.state._limit * (activePage - 1),
                $limit: this.state._limit
            })
        }
    };

    createQuery(query) {
        //dispatch.app.tableSortFilterQuery(query)
        let startDate = ""
        let endDate = ""

        if (this.state.dateRange) {
            startDate = new Date(moment(this.state.filterObj.startDate, 'DD-MM-YYYY'));
            endDate = new Date(moment(this.state.filterObj.endDate, 'DD-MM-YYYY').locale("en").add(1, 'd').format("MMM DD, YYYY HH:MM"))
            query.createdAt = {
                $gte: startDate,
                $lt: endDate
            };
            // query.$or = [{ [this.state.filterColumn]: { $regex: this.state.filterValue, $options: 'i' } }];
        }

        if (this.state.filter && this.state.filterColumn) {
            if (Array.isArray(this.state.filterColumn)) {
                query.$or = [];
                this.state.filterColumn.forEach(column => {
                    query.$or.push({ [column]: { $regex: this.state.filterValue, $options: 'i' } });
                });
            } else {
                query.$or = [{ [this.state.filterColumn]: { $regex: this.state.filterValue, $options: 'i' } }];
            }
        }

        if (this.state.filter && this.state.filterColumn) {
            if (Array.isArray(this.state.filterColumn)) {
                query.$or = [];
                this.state.filterColumn.forEach(column => {
                    query.$or.push({ [column]: { $regex: this.state.filterValue, $options: 'i' } });
                });
            } else {
                query.$or = [{ [this.state.filterColumn]: { $regex: this.state.filterValue, $options: 'i' } }];
            }
        }



        if (this.state.filter && this.state.singleDropdownKey) {
            query.$or = [
                { [this.state.singleDropdownKey]: this.state.singleDropdownValue }
            ]
        }

        setTimeout(() => {
            if (this.props.onQueryChange) {
                this.props.onQueryChange(query);
            } else {
                this.localFilter(query)
            }
            this.setState({ query: query })
        }, 300);

    }

    addColumns = (e, index, row) => {
        this.props.tableHeader.forEach(header => {
            if (header.key === row.key) {
                header.listed = !header.listed
            }
        });
        this.props.addColumn([...this.props.tableHeader])
        //this.setState({ tableHeader: [...this.props.tableHeader] })

    };


    localFilter = (query) => {

        let sortedData;
        if (query.$sort) {
            let key = Object.keys(query.$sort)[0]
            let value = Object.values(query.$sort)[0]
            let sort = this.props.listData && this.props.listData.sort((a, b) => {
                if (typeof (a[key]) || typeof (a[key]) === Boolean) {
                    var nameA = a[key], nameB = b[key]
                } else {
                    var nameA = a[key].toLowerCase(), nameB = b[key].toLowerCase()
                }
                if (nameA < nameB) //sort string ascending
                    return -1
                if (nameA > nameB)
                    return 1
                return 0 //default return value (no sorting)
            })
            if (value === 1) {
                sortedData = sort
            } else {
                sortedData = sort.reverse()
            }
        } else {
            sortedData = this.props.listData
        }


        let filterData;
        if (query.$or && query.$or.length !== 0) {
            let key = Object.keys(query.$or[0])[0];
            let value = Object.values(query.$or[0])[0];

            filterData = sortedData.filter((x, i) => {
                if (value && value.$regex && value.$regex.length !== 0) {
                    return x[key].includes(value.$regex)
                } else if (value && value.$regex && value.$regex.length === 0) {
                    return true
                } else {
                    return x[key] === value
                }
            })
        } else {
            filterData = sortedData && sortedData.filter((x, i) => {
                return true
            })
        }

        let dateFilter;
        if (query.createdAt) {
            dateFilter = filterData.filter((x, i) => {
                let date = new Date(moment(x.createdAt, 'YYYY-MM-DD')).getTime();
                let startD = new Date(moment(this.state.filterObj.startDate, 'DD-MM-YYYY')).getTime();
                let EndD = new Date(moment(this.state.filterObj.endDate, 'DD-MM-YYYY').locale("en").add(1, 'd').format("MMM DD, YYYY HH:MM")).getTime();
                return date >= startD && date <= EndD;
            });
        } else {
            dateFilter = filterData && filterData.filter((x, i) => {
                return true
            });
        }

        let skippedData = dateFilter && dateFilter.filter((x, i) => {
            return i > (query.$skip - 1)
        })

        let limitedData = skippedData && skippedData.filter((x, i) => {
            return i <= query.$limit - 1
        });

        this.setState({
            filterData: limitedData,
            totalCount: filterData ? filterData.length : sortedData && sortedData.length
        })
    }


    render() {

        return (

            <Card fluid  >
                {this.props.tableName ?
                    <Card.Content  >
                        <Header as='h4' >
                            {this.props.tableName}
                            <Label size="small" >
                                {this.props.totalCount}
                            </Label>
                        </Header>
                    </Card.Content> : null
                }
                {this.props.searchable ?
                    <Card.Content >
                        <TableFilter
                            filter={this.state.q}
                            totalCount={this.state.totalCount}
                            onSubmitFilter={this.onSubmitFilter}
                            loading={this.state.loading}
                            type="Multiple Search"
                        />
                    </Card.Content> : null
                }
                <Card.Content >
                    <CommanTableLayout
                        tableData={this.state.filterData ? this.state.filterData : this.props.listData}
                        loading={this.props.loading}
                        totalCount={this.state.totalCount ? this.state.totalCount : this.props.totalCount}
                        totalPages={Math.ceil((this.state.totalCount ? this.state.totalCount : this.props.totalCount) / this.state._limit)}
                        currentPage={this.state._page}
                        onChangePage={this.onChangePage}
                        column={this.state._sort}
                        direction={this.state._order === 1 ? "down" : "up"}
                        handleSort={this.handleSort}
                        onChangeLimit={this.onChangeLimit}
                        limit={this.state._limit.toString()}
                        resetPassword={this.resetPassword}
                        tableHeader={this.props.tableHeader}
                        handleDropDownItem={this.props.handleDropDownItem}
                        addColumn={this.addColumns}
                        q={this.state.q}
                        onSubmitFilter={this.onSubmitFilter}
                        handleTableComponent={this.props.handleTableComponent}
                        selection={this.props.selection}
                        query={this.state.query}

                    />

                </Card.Content>
            </Card>
        );
    }
}
