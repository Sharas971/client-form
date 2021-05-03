import React from "react";

const ClientList = ({ parentCallback, clientList }) => {
    const listItems = clientList.map((d) =>
        <li key={d.id}>
            <div className="client-group">
                <div className="list-text">{d.name} {d.surname}</div>
                <div className="list-text">{d.email}</div>
                <div className="list-text">{d.address}</div>
                <div className="list-text">{d.country}</div>
                <div className="list-text">{d.city}</div>
                <div className="list-text">{d.house}</div>
                <div className="list-text">{d.postCode}</div>

                <button onClick={() => parentCallback(d.id)}>Delete Client</button>
            </div>
        </li>);

    //Method to show or not show client list
    const countClients = () => {
        if (clientList.length === 0) {
            return false;
        } else {
            return true;
        }
    }

    return (
        <>
            {countClients() && <div className="form-box">
                <p className="title">Client List</p>
                {listItems}
            </div>}
        </>
    );
};

export default ClientList;