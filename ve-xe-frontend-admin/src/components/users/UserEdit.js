import React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';

export const UserEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="username" />
      <TextInput source="email" />
    </SimpleForm>
  </Edit>
);