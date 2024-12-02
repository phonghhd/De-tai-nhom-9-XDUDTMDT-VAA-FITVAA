import { Admin, Resource } from "react-admin";
import { UserList } from "./components/users/UserList";
import { UserCreate } from "./components/users/UserCreate";
import { UserEdit } from "./components/users/UserEdit";
import { TicketList } from "./components/tickets/TicketList";
import { TicketCreate } from "./components/tickets/TicketCreate";
import { TicketEdit } from "./components/tickets/TicketEdit";
import { TripList } from "./components/trips/TripList";
import { TripCreate } from "./components/trips/TripCreate";
import { TripEdit } from "./components/trips/TripEdit";
import { authProvider } from "./auth/authProvider";
import PeopleIcon from "@mui/icons-material/People";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import { dataProvider } from './dataProvider';

const App = () => {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      <Resource
        name="users"
        list={UserList}
        create={UserCreate}
        edit={UserEdit}
        icon={PeopleIcon}
        recordRepresentation={(user) => user.username}
      />
      <Resource
        name="tickets"
        list={TicketList}
        create={TicketCreate}
        edit={TicketEdit}
        icon={ConfirmationNumberIcon}
      />
      <Resource
        name="trips"
        list={TripList}
        create={TripCreate}
        edit={TripEdit}
        icon={DirectionsBusIcon}
      />
    </Admin>
  );
};

export default App;
