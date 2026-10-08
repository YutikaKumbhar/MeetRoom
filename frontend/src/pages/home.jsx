import { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import "../App.css";
import "./home.css";
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';


function HomeComponent() {

  let navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");


  const {addToUserHistory} = useContext(AuthContext);
  let handleJoinVideoCall = async ()=> {
    await addToUserHistory(meetingCode)
    navigate(`/${meetingCode}`)
  }

  return (
    <main className="homePage">
      <header className="navBar homeNavBar">
        <div className="homeBrand">
          <span className="homeBrandMark">M</span>
          <h2>Meet<span>Room</span></h2>
        </div>

        <div className="homeNavActions">
          <Button
            className="historyButton"
            startIcon={<RestoreIcon />}
            onClick={() => navigate("/history")}
          >
            History
          </Button>
          <Button onClick={() => {
            localStorage.removeItem("token")
            navigate("/auth")
          }}>
            Logout
          </Button>
        </div>
      </header>

      <section className="meetContainer homeMeetContainer">
        <div className="leftPanel homeIntro">
          <div className="homeIntroContent">
            <p className="homeEyebrow">YOUR SPACE TO CONNECT</p>
            <h1>Make every conversation feel closer.</h1>
            <p className="homeDescription">
              Start a new conversation or join your team with a meeting code.
              Great conversations are just one click away.
            </p>

            <div className="meetingJoinForm">
              <TextField
                onChange={e => setMeetingCode(e.target.value)}
                id="outlined-basic"
                label="Meeting code"
                variant="outlined"
                className="meetingCodeInput"
              />
              <Button onClick={handleJoinVideoCall} variant="contained">
                Join meeting
              </Button>
            </div>
            <p className="homeHint">No downloads needed. Just enter your code to join.</p>
          </div>
        </div>

        <div className="rightPanel homeVisual">
          <div className="homeVisualGlow" />
          <img src="/logo3.png" alt="Illustration of a video meeting" />
          <div className="homeVisualCaption">
            <span className="statusDot" />
            <span>Good conversations start here</span>
          </div>
        </div>
      </section>
    </main>
  )
}

export default withAuth(HomeComponent)
