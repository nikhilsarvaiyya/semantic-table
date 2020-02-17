import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const limitOptions = [
    { key: '1', value: '5', text: '5' },
    { key: '2', value: '10', text: '10' },
    { key: '3', value: '50', text: '50' },
    { key: '4', value: '100', text: '100' },
];

export const TablePageSizeSelect = props => (
    <div style={{
        display: "block",
        float: "left",
        lineHeight: "32px"
    }}>
        Total Records:{' '} <b>{props.totalCount}</b>  &nbsp;&nbsp;&nbsp;&nbsp;
        Records per page:{' '}
        <Dropdown
            inline
            options={limitOptions}
            defaultValue={props.limit}
            onChange={props.onChangeLimit}
        />
        {/* {props.query} */}
    </div>
);
