import React, { useEffect, useState } from "react";
import ContactForm from "./ContactForm"
import {firestore} from "../firebase";

const Contacts = () => {
    var [contactObject, setContactObject] = useState({})
    var [currentId, setCurrentId] = useState('')

    useEffect(() => {
        let mounted = true;
        firestore.collection("contacts").onSnapshot((snapshot) => {
            
            if (snapshot.size) {
                if(mounted){
                    setContactObject({
                        ...snapshot.docs
                    })
                }
            }else{
                setContactObject({})
            }
        });
        return () => mounted = false;
    }, [])

    const onDelete = key =>{
        if(window.confirm('Tem certeza que deseja excluir o registro?')){
            firestore.collection("contacts").doc(key).delete().catch(function (error) {
                console.error("Error adding document: ", error);
            });
        }
    }

    const addOrEdit = obj => {
        if (currentId === '') {
            firestore.collection("contacts").add(obj)
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                    setCurrentId('')
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
        }else{
            firestore.collection("contacts").doc(contactObject[currentId].id).update(obj)
                .then(function () {
                    setCurrentId('')
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
        }
    }

    return (
        <div className="row">
            <div className="col-md-5">
                <ContactForm {...({ addOrEdit, currentId, contactObject })} />
            </div>
            <div className="col-md-7">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Telefone</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(contactObject).map(id => {
                                return <tr key={id}>
                                    <td>{contactObject[id].get('fullName')}</td>
                                    <td>{contactObject[id].get('phone')}</td>
                                    <td>{contactObject[id].get('email')}</td>
                                    <td>
                                        <a className="btn text-primary btn-sm " onClick={() => { setCurrentId(id) }} role="button">
                                            <i className="fa fa-pencil-alt" aria-hidden="true"></i>
                                        </a>
                                        <a className="btn text-danger btn-sm " role="button" onClick={() => { onDelete(contactObject[id].id) }}>
                                            <i className="fa fa-trash-alt" aria-hidden="true"></i>
                                        </a>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Contacts;