import { Edit, SimpleForm, TextInput, DateInput, ReferenceInput, SelectInput } from 'react-admin';

export const TicketEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <ReferenceInput source="userId" reference="users"><SelectInput optionText="name" /></ReferenceInput>
            <ReferenceInput source="tripId" reference="trips"><SelectInput optionText="name" /></ReferenceInput>
            <DateInput source="date" />
            <TextInput source="seatNumber" />
        </SimpleForm>
    </Edit>
);