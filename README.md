# Test Indusgame
## Installation guide

- open terminal
- Git clone: `git clone https://github.com/gauravsinhaweb/indusgame.git`
- `cd indusgame`
- install packages `npm install`
- start server `npm start`

### **[Click here to live preview](https://indusgame.vercel.app/login)**

## Features
- **Screens friendly** Mobile/ Tablet/ Desktop responsive
- **User Authentication**: Users can log in with valid credentials.
- **Access Control**: Private access requires login or access_token.
- **Tabular Unit View**: Units are displayed in a tabular format for better readability.
- **Logout and Re-login**: Users have the option to log out and re-login.

**Units**
- **Sorting**: Users can sort units based on the title.
- **Update and Save**: Users can update and save units.
- **Deletion**: Users can delete specific units.

**Packs and Sales**
- **Read**: packs and sales
- **Functionality**: most and least sold pack from the USD perspective, quantity in a given time period

- [x] Part I: Auth Functionality
    -  A page with a login form that accepts `username` and `password` pair will be required.
    - The username has 5 to 20 lowercase ASCII letters with at maximum one period (.) anywhere but as the first or last character. At maximum, the username can have 20 characters.
    - The password is between 10 and 64 characters long.
    - If the request body is empty or the username or password invalid, a `400` Bad Request is returned.
    - If the username does not exist, a `404` Not Found is returned.
    - If there is a password mismatch, a `409` Conflict is returned.
   
- [x] POST /auths
    -  If the request body is empty or the refreshToken invalid, a 400 Bad Request is returned with the relevant "reason" and "hint" strings in the response body.
    - If the user with the associated `refreshToken` does not exist, a 404 Not Found is returned.
    - Refresh Token every 4.5s , 30s before expiration.
   
- [x] Part II: Read and Update Operations on Units
    - The user is able to read the units in `tabular` form for better readability.
    - The user is able to sort the table on the basis of the unit title.
    - The user is able to Read. Update and Delete the units.
- [x] Part III: Visualising Performance of Pack Sales
    - most and least sold pack from the USD perspective in a given time period
    - most and least sold pack from the quantity perspective in a given time period
    - sale distribution of the given pack in a given time period
    - anything else which you think makes the sale information insightful

- [x] Part IV:  Reacting to Unit Updates from Other Clients
    - The backend exposes a WebSocket connection at /hubs/unit using `SignalR library`. Anytime a unit data is updated, all clients connected to the /hubs/unit endpoint using the WebSocket protocol will get a "UnitUpdated" event with the unit data in it which just got updated.
    
## Tech stack
- React JS / JavaScript
- Redux Toolkit/ React Redux - State management
- React toastify - Notifications handling
- Microsoft signalIR - websocket
- Jest/ React testing library - Unit testing

