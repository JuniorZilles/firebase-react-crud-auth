import React, {useRef, useState} from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

const Signup = () => {
    const emailRef = useRef()
    const senhaRef = useRef()
    const senhaConfirmaRef = useRef()
    const {signup} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e){
        e.preventDefault()
        if(senhaRef.current.value !== senhaConfirmaRef.current.value){
            return setError('Senhas não são iguais.')
        }
        try{
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, senhaRef.current.value)
            history.push('/')
        }catch{
            setError('Falha ao criar conta')
        }
        setLoading(false)
    }

    return ( <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Signup</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control type='email' ref={emailRef} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type='password' ref={senhaRef}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Confirmação da Senha</Form.Label>
                        <Form.Control type='password' ref={senhaConfirmaRef}/>
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">Salvar</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            <Link to="/">Cancelar</Link>
        </div>
    </> );
}
 
export default Signup;