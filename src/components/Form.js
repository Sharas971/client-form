import React, { useEffect, useState } from 'react';
import Place from './Place';
import ClientList from './ClientList';

const Form = () => {
    //Declaring component state and default values
    const [form, setForm] = useState(
        {
            id: null,
            name: "",
            surname: "",
            email: "",
            address: "",
            country: "",
            city: "",
            house: "",
            postCode: ""
        });

    const [formErrors, setFormErrors] = useState(
        {
            name: null,
            surname: null,
            email: null,
            address: null,
            country: null,
            city: null,
            house: null,
            postCode: null
        });

    const [clients, setClients] = useState(() => {
        const clientArr = JSON.parse(window.localStorage.getItem('clients'));
        console.log(clientArr);
        if (clientArr) {
            return clientArr;
        } else {
            return [];
        }
    });

    //Effect hooks for when particular state changes
    useEffect(() => {
        if (form.id) {
            setClients(clients.concat([form]));
        }
    }, [form.id]);

    useEffect(() => {
        localStorage.setItem('clients', JSON.stringify(clients));
    }, [clients]);

    //Place component callback
    const callbackPlace = (place) => {
        if (place) {
            setForm({
                ...form,
                address: place.address,
                country: place.country,
                city: place.city,
                house: place.house,
                postCode: place.postCode
            });

            // for (const [key, value] of Object.entries(place)) {
            //     const errorMsg = validateField(key, value);
            //     setFormErrors({ ...formErrors, [key]: errorMsg });
            // }
            const errorMsgAddress = validateField("address", place.address);
            const errorMsgCountry = validateField("country", place.country);
            const errorMsgCity = validateField("city", place.city);
            const errorMsgHouse = validateField("house", place.house);
            const errorMsgPostCode = validateField("postCode", place.postCode);
            setFormErrors({
                ...formErrors,
                address: errorMsgAddress,
                country: errorMsgCountry,
                city: errorMsgCity,
                house: errorMsgHouse,
                postCode: errorMsgPostCode,
            });
        }

    }

    //Deleting state method with child callback
    const callbackList = (id) => {
        const reducedArr = clients;
        let index = 0;
        for (let i = 0; i < reducedArr.length; i++) {
            if (reducedArr[i].id === id) {
                index = i;
            }
        }

        reducedArr.splice(index, 1);
        setClients([...reducedArr]);
    }

    const handleChange = (e) => {
        let field = e.target.name;

        setForm({ ...form, [field]: e.target.value });

        if (!Object.keys(formErrors).includes(field)) return;
        const errorMsg = validateField(field, e.target.value);
        setFormErrors({ ...formErrors, [field]: errorMsg });
    }



    const validateField = (name, value) => {
        let errorMsg = null;

        switch (name) {
            case "name":
                if (!value) errorMsg = "Please enter Name.";
                break;
            case "surname":
                if (!value) errorMsg = "Please enter Surname.";
                break;
            case "email":
                if (!value) errorMsg = "Please enter Email.";
                else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value))
                    errorMsg = "Please enter valid Email.";
                break;
            case "address":
                if (!value) errorMsg = "Please enter Address.";
                break;
            case "country":
                if (!value) errorMsg = "Please enter Country.";
                break;
            case "city":
                if (!value) errorMsg = "Please enter City.";
                break;
            case "house":
                if (!value) errorMsg = "Please enter House No.";
                else if (/[^$,\.\d]/.test(value))
                    errorMsg = "Please enter valid House No(numbers only).";
                break;
            case "postCode":
                if (!value) errorMsg = "Please enter Post Code.";
                else if (/[^$,\.\d]/.test(value))
                    errorMsg = "Please enter valid Post Code(numbers only).";
                break;
            default:
                break;
        }
        return errorMsg;
    };

    const validateForm = (form, formErrors, validateFunc) => {
        const errorObj = {};
        Object.keys(formErrors).map(x => {
            const msg = validateFunc(x, form[x]);
            if (msg) errorObj[x] = msg;
        });
        return errorObj;
    };

    const handleSubmit = () => {
        var ID = () => {
            return '_' + Math.random().toString(36).substr(2, 9);
        };

        const errorObj = validateForm(form, formErrors, validateField);
        if (Object.keys(errorObj).length !== 0) {
            setFormErrors(errorObj);
            return false;
        }

        //Setting id to form state before submiting
        setForm({ ...form, id: ID() });

        //Clear form
        setTimeout(() => {
            setForm({
                id: null,
                name: "",
                surname: "",
                email: "",
                address: "",
                country: "",
                city: "",
                house: "",
                postCode: ""
            });
            document.getElementById('placeInput').value = "";
        }, 500);
    };

    return (
        <>
            <div className="form-box">
                <p className="title">Add Cient</p>
                <div className="form-group">
                    <label>
                        Name:<span className="asterisk">*</span>
                    </label>
                    <input
                        className="input"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        onBlur={handleChange}
                    />
                    {formErrors.name && <span className="err">{formErrors.name}</span>}
                </div>
                <div className="form-group">
                    <label>
                        Surname:<span className="asterisk">*</span>
                    </label>
                    <input
                        className="input"
                        type="text"
                        name="surname"
                        value={form.surname}
                        onChange={handleChange}
                        onBlur={handleChange}
                    />
                    {formErrors.name && <span className="err">{formErrors.surname}</span>}
                </div>
                <div className="form-group">
                    <label>
                        Email:<span className="asterisk">*</span>
                    </label>
                    <input
                        className="input"
                        type="text"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        onBlur={handleChange}
                    />
                    {formErrors.email && <span className="err">{formErrors.email}</span>}
                </div>
                <div className="form-group">
                    <label>Address search:</label>
                    <Place parentCallback={callbackPlace} />
                </div>
                <div className="form-group">
                    <label>Address:<span className="asterisk">*</span></label>
                    <input
                        className="input"
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        onBlur={handleChange}
                    />
                    {formErrors.address && <span className="err">{formErrors.address}</span>}
                </div>
                <div className="form-group">
                    <label>Country:<span className="asterisk">*</span></label>
                    <input
                        className="input"
                        type="text"
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        onBlur={handleChange}
                    />
                    {formErrors.country && <span className="err">{formErrors.country}</span>}
                </div>
                <div className="form-group">
                    <label>City:<span className="asterisk">*</span></label>
                    <input
                        className="input"
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        onBlur={handleChange}
                    />
                    {formErrors.city && <span className="err">{formErrors.city}</span>}
                </div>
                <div className="form-group">
                    <label>House no:<span className="asterisk">*</span></label>
                    <input
                        className="input"
                        type="text"
                        name="house"
                        value={form.house}
                        onChange={handleChange}
                        onBlur={handleChange}
                    />
                    {formErrors.house && <span className="err">{formErrors.house}</span>}
                </div>
                <div className="form-group">
                    <label>Post Code:<span className="asterisk">*</span></label>
                    <input
                        className="input"
                        type="text"
                        name="postCode"
                        value={form.postCode}
                        onChange={handleChange}
                        onBlur={handleChange}
                    />
                    {formErrors.postCode && <span className="err">{formErrors.postCode}</span>}
                </div>
                <div className="form-group">
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
            <ClientList parentCallback={callbackList} clientList={clients} />
        </>
    );

}

export default Form;