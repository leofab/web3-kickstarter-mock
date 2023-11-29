import React from 'react';
import {Table} from 'semantic-ui-react';

const TableComponent = ({header, children}) => {
    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    {header.map((item, index) => (
                        <Table.HeaderCell key={index}>{item}</Table.HeaderCell>
                    ))}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {children}
            </Table.Body>
        </Table>
    );
}