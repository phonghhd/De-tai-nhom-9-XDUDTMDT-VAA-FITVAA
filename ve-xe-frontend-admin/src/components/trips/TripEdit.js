import { Edit, SimpleForm, TextInput, DateTimeInput, NumberInput } from 'react-admin';

export const TripEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <TextInput source="origin" />
            <TextInput source="destination" />
            <DateTimeInput source="departureDate" />
            <NumberInput source="price" />
        </SimpleForm>
    </Edit>
);