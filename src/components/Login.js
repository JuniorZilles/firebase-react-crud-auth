import React, {useRef, useState} from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

const Login = () => {
    const emailRef = useRef()
    const senhaRef = useRef()
    const {login} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e){
        e.preventDefault()
        try{
            setError('')
            setLoading(true)
            await login(emailRef.current.value, senhaRef.current.value)
            history.push('/')
        }catch{
            setError('Falha ao realizar login')
        }
        setLoading(false)
    }

    return ( <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Login</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control type='email' ref={emailRef} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type='password' ref={senhaRef} required/>
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">Entrar</Button>
                </Form>
                <div className="w-100 text-center mt-3">
                    <Link to="/forgot-password">Esqueceu a senha?</Link>
                </div>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Não possui conta? <Link to="/signup">Registrar</Link>
        </div>
    </> );
}
 
export default Login;