import React from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination, Icon, Image, Header, Container, Item, Popup, Label } from 'semantic-ui-react';

import { TablePageSizeSelect } from './TablePageSizeSelect.jsx';
import { TableRow } from './TableRow.jsx';
import { TableHeader } from './TableHeader.jsx';


export const CommanTableLayout = props => {

	if (!props.tableData) {
		return <div>Loading...</div>;
	}


	// let sort = props.query && props.query.$sort ? props.query.$sort.createdAt : null;
	// let skip = props.query && props.query.$skip ? props.query.$skip : null;
	// let limit = props.query && props.query.$limit ? props.query.$limit : null;
	let searchKey = props.query && props.query.$or && props.query.$or.length !== 0 ? Object.keys(props.query.$or[0]) : null;
	let searchValue = props.query && props.query.$or && props.query.$or.length !== 0 ? Object.values(props.query.$or[0]) : null;
	let date = props.query && props.query.createdAt ? props.query.createdAt : null;

	let startDate = date && date.$gte && new Date(date.$gte);
	let EndDate = date && date.$lt && new Date(date.$lt);

	let searchName = searchValue && searchValue[0] && searchValue[0].$regex ? searchValue && searchValue[0] && searchValue[0].$regex : null

	let noRecordAvailable = <Table.Row  >
		<Table.Cell  >
			<Container fluid >
				Image
				<Header as='h3' icon textAlign='center'>
					<Header.Content >
						{searchKey || searchKey ? "Nothing to show for below result!" : "Nothing to show!"}
						<br />  <br />
					</Header.Content>
					<Header.Content  >
						{/* <Label > Sorted <Label.Detail>{sort}</Label.Detail></Label>
						<Label > Skip <Label.Detail>{skip}</Label.Detail></Label>
						<Label > Limit <Label.Detail>{limit}</Label.Detail></Label> */}
						{searchKey && searchName && searchName.length !== 0 ? <Label > {searchKey} :<Label.Detail>  {searchName}</Label.Detail></Label> : null}
						{startDate ? <Label > Date <Label.Detail>{startDate} - {EndDate} </Label.Detail></Label> : null}
						{/* {props.query} */}
					</Header.Content>
				</Header>
			</Container>
		</Table.Cell>
	</Table.Row>


	const tableRows = props.tableData && props.tableData.map((obj, index) => (
		<TableRow
			key={index}
			data={obj}
			tableHeader={props.tableHeader}
			loading={props.loading}
			resetPassword={props.resetPassword}
			handleDropDownItem={props.handleDropDownItem}
			handleTableComponent={props.handleTableComponent}
			selection={props.selection} />
	));

	function tooltip(name, content) {
		return <Popup
			trigger={<Icon name={name} />}
			content={content}
			pn="hover"
			position="top center"
			inverted
		/>
	}
	return (
		<React.Fragment>
			<Table
				selectable={props.selection ? props.selection : false}
				celled
			>
				<TableHeader
					column={props.column}
					direction={props.direction}
					handleSort={props.handleSort}
					tableHeader={props.tableHeader}
					addColumn={props.addColumn}
					q={props.q}
					onSubmitFilter={props.onSubmitFilter}
					loading={props.loading}
					type="Multiple Search"
				/>

				<Table.Body >
					{tableRows}
					{props.tableData && props.tableData.length === 0 ? noRecordAvailable : null}
				</Table.Body>
				{props.tableData && props.tableData.length === 0 ? null :
					<Table.Footer >
						<Table.Row>
							<Table.HeaderCell colSpan={props.tableHeader.length}>
								<TablePageSizeSelect
									limit={props.limit}
									query={props.query}
									onChangeLimit={props.onChangeLimit}
									totalCount={props.totalCount}
								/>

								<Pagination
									totalPages={props.totalPages}
									activePage={props.currentPage}
									onPageChange={props.onChangePage}
									style={{ float: "right" }}
									ellipsisItem={{ content: <Icon name="ellipsis horizontal" />, icon: true }}
									firstItem={{ content: tooltip("angle double left", "First Page"), icon: true }}
									lastItem={{ content: tooltip("angle double right", "Last Page"), icon: true }}
									prevItem={{ content: tooltip("angle left", "Previous Page"), icon: true }}
									nextItem={{ content: tooltip("angle right", "Next Page"), icon: true }}
								/>


							</Table.HeaderCell>
						</Table.Row>
					</Table.Footer>
				}
			</Table>
		</React.Fragment>
	);
};

CommanTableLayout.propTypes = {
	totalCount: PropTypes.number.isRequired,
	totalPages: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	onChangePage: PropTypes.func.isRequired,
	onChangeLimit: PropTypes.func.isRequired,
	limit: PropTypes.string.isRequired,
	tableHeader: PropTypes.array.isRequired,
	handleDropDownItem: PropTypes.func.isRequired,
	addColumn: PropTypes.func.isRequired,
	q: PropTypes.object.isRequired,
	tableData: PropTypes.array.isRequired,
	query: PropTypes.string.isRequired,
	handleTableComponent: PropTypes.func.isRequired,
	selection: PropTypes.bool.isRequired,

};
