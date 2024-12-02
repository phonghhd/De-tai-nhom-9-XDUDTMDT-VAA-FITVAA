import { List, Datagrid, TextField, DateField } from 'react-admin';

export const TripList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="origin" />
            <TextField source="destination" />
            <DateField source="departureDate" />
            <TextField source="price" />
        </Datagrid>
    </List>
);