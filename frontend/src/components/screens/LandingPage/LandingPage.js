import { useEffect, React } from 'react'
import { Container, Row, Button } from "react-bootstrap"
import './LandingPage.css'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {

  let navigate = useNavigate();

  // checking user info in local storage
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      // Use the navigate function
      navigate("/mynotes");
    }
  }, [navigate]);
  
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to Quick Notes</h1>
              <p className="subtitle">One Safe place for all your notes.</p>
            </div>
            <div className="buttonContainer">
              <a href="/login">
                <Button size="lg" className="landingbutton">
                  Login
                </Button>
              </a>
              <a href="/register">
                <Button size="lg" className="landingbutton" variant='outline-primary'>
                  SignUp
                </Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default LandingPage
