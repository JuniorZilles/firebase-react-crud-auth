import React, {useRef, useState} from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

const EditProfile = () => {
    const emailRef = useRef()
    const senhaRef = useRef()
    const senhaConfirmaRef = useRef()
    const { currentUser, updateEmail, updatePassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    function handleSubmit(e){
        e.preventDefault()
        if(senhaRef.current.value !== senhaConfirmaRef.current.value){
            return setError('Senhas não são iguais.')
        }
        const promises = []

        if (emailRef.current.value !== currentUser.email){
            promises.push(updateEmail(emailRef.current.value))
        }
        if (senhaRef.current.value){
            promises.push(updatePassword(senhaRef.current.value))
        }

        Promise.all(promises).then(()=>{
            history.push('/')
        }).catch(()=>{
            setError('Falha ao atualizar dados')
        }).finally(()=>{
            setLoading(false)
        })
    }


    return (  <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Editar Perfil</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control type='email' ref={emailRef} defaultValue={currentUser.email} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type='password' ref={senhaRef} placeholder="Deixe em branco se não quiser alterar a senha" required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Confirmação da Senha</Form.Label>
                        <Form.Control type='password' ref={senhaConfirmaRef} placeholder="Deixe em branco se não quiser alterar a senha" required/>
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">Sign Up</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Já possui conta então realize <Link to="/login">Login</Link>
        </div>
    </>  );
}
 
export default EditProfile;