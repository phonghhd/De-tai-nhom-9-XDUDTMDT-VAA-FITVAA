import { List, Datagrid, TextField, DateField, ReferenceField } from 'react-admin';

export const TicketList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <ReferenceField source="userId" reference="users"><TextField source="name" /></ReferenceField>
            <ReferenceField source="tripId" reference="trips"><TextField source="name" /></ReferenceField>
            <DateField source="date" />
            <TextField source="seatNumber" />
        </Datagrid>
    </List>
);