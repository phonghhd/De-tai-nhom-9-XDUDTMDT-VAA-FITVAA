import { Create, SimpleForm, TextInput, DateInput, ReferenceInput, SelectInput } from 'react-admin';

export const TicketCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users"><SelectInput optionText="name" /></ReferenceInput>
            <ReferenceInput source="tripId" reference="trips"><SelectInput optionText="name" /></ReferenceInput>
            <DateInput source="date" />
            <TextInput source="seatNumber" />
        </SimpleForm>
    </Create>
);