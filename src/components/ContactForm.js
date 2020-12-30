import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ContactForm = (props) => {
    const innitalFieldsValues = {
        fullName: '',
        phone: '',
        email: '',
        address: ''
    }

    var [values, setValues] = useState(innitalFieldsValues)

    useEffect(()=>{
        if(props.currentId === '' || typeof props.currentId === 'undefined' || props.currentId === null)
            setValues({...innitalFieldsValues})
        else{
            setValues({...values,
                fullName:props.contactObject[props.currentId].get('fullName'),
                phone:props.contactObject[props.currentId].get('phone'),
                email:props.contactObject[props.currentId].get('email'),
                address:props.contactObject[props.currentId].get('address')})
        }

    },[props.currentId, props.contactObject])
    const handleInputChange = e => {
        var {name, value} = e.target
        setValues({
            ...values,
            [name]:value
        })
    };

    const handleSubmit = e => {
        e.preventDefault();
        props.addOrEdit(values);
    };
    return (
        <form className="row g-3 needs-validation" noValidate autoComplete='off' onSubmit={handleSubmit}>
            <div className="col-md-12">
                <label htmlFor="validationFullName" className="form-label">Nome</label>
                <div className="input-group">
                    <span className="input-group-text" id="inputGroupPrepend"><i className="fas fa-user" aria-hidden="true"></i></span>
                    <input type="text" className="form-control" name="fullName" id="validationFullName" aria-describedby="inputGroupPrepend" required 
                    value={values.fullName}
                    onChange={handleInputChange}/>
                    <div className="invalid-feedback">
                        Informe o nome completo.
                    </div>
                </div>
            </div>
            <div className="col-md-12">
                <label htmlFor="validationPhone" className="form-label">Telefone</label>
                <div className="input-group">
                    <span className="input-group-text" id="inputGroupPrepend"><i className="fas fa-mobile-alt" aria-hidden="true"></i></span>
                    <input type="text" className="form-control" name="phone" id="validationPhone" aria-describedby="inputGroupPrepend" required 
                    value={values.phone}
                    onChange={handleInputChange} />
                    <div className="invalid-feedback">
                        Informe o telefone.
                    </div>
                </div>
            </div>
            <div className="col-md-12">
                <label htmlFor="validationEmail" className="form-label">E-mail</label>
                <div className="input-group">
                    <span className="input-group-text" id="inputGroupPrepend"><i className="fas fa-envelope" aria-hidden="true"></i></span>
                    <input type="text" className="form-control" name="email" id="validationEmail" aria-describedby="inputGroupPrepend" required  
                    value={values.email}
                    onChange={handleInputChange}/>
                    <div className="invalid-feedback">
                        Informe o e-mail.
                    </div>
                </div>
            </div>
            <div className="col-md-12">
                <label htmlFor="validationAddress" className="form-label">Endereço</label>
                <div className="input-group">
                    <span className="input-group-text" id="inputGroupPrepend"><i className="fas fa-map-marker-alt" aria-hidden="true"></i></span>
                    <input type="text" className="form-control" name="address" id="validationAddress" aria-describedby="inputGroupPrepend" required 
                    value={values.address}
                    onChange={handleInputChange}/>
                    <div className="invalid-feedback">
                        Informe o endereço.
                    </div>
                </div>
            </div>
            <div className="col-12">
                <input className="btn btn-primary" type="submit" value={props.currentId===''?'Salvar':'Atualizar'}/>
            </div>
        </form>);
}

ContactForm.propTypes = {
    currentId: PropTypes.string.isRequired,
    contactObject: PropTypes.object.isRequired
}

export default ContactForm;