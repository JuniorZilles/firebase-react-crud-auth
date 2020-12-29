import { React, useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

const Dashboard = () => {
    const [error, setError] = useState('')
    const [currentUser, logout] = useAuth()
    const history = useHistory()

    async function handleLogout() {
        try {
            setError('')
            await logout()
            history.pushState('/login')
        } catch (error) {
            setError("Não foi possível realizar logout")
        }
    }

    return (<>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Perfil</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                <strong>Email: </strong> {currentUser.email}
                <Link to="/update-profile">Atualizar Perfil</Link>
            </Card.Body>
        </Card>

        <div className="w-100 text-center mt-2">
            <Button onClick={handleLogout} variant="link">Log Out</Button>
        </div>
    </>);
}

export default Dashboard;