import { Create, SimpleForm, TextInput, DateTimeInput, NumberInput } from 'react-admin';

export const TripCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="origin" />
            <TextInput source="destination" />
            <DateTimeInput source="departureDate" />
            <NumberInput source="price" />
        </SimpleForm>
    </Create>
);