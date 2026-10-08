import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import HomeIcon from '@mui/icons-material/Home';
import styles from '../styles/history.module.css';


export default function History() {
    const {getHistoryOfUser} = useContext(AuthContext);

    const [meetings, setMeetings] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: '' });

    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch (error) {
                setSnackbar({
                    open: true,
                    message: error.response?.data?.message || error.message || 'Unable to load meeting history.'
                });
            }
        }

        fetchHistory();
    }, [])

    let formatDate = (dateString) => {
        const value = typeof dateString === 'string' && /^\d+$/.test(dateString)
            ? Number(dateString)
            : dateString;
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) {
            return 'Invalid date';
        }
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const year = date.getFullYear();

        return `${day}/${month}/${year}`

    }

    return (
        <main className={styles.historyPage}>
            <div className={styles.historyContent}>
                <header className={styles.historyHeader}>
                    <div>
                        <p className={styles.historyEyebrow}>YOUR MEETROOM</p>
                        <Typography component="h1" className={styles.historyTitle}>
                            Meeting history
                        </Typography>
                        <p className={styles.historySubtitle}>
                            Pick up where your conversations left off.
                        </p>
                    </div>
                    <IconButton
                        className={styles.homeButton}
                        aria-label="Return to home"
                        onClick={() => routeTo("/room")}
                    >
                        <HomeIcon />
                    </IconButton>
                </header>

                {meetings.length > 0 ? (
                    <section className={styles.meetingList} aria-label="Past meetings">
                        {meetings.map(e => (
                            <Card key={e._id} className={styles.meetingCard} variant="outlined">
                                <CardContent className={styles.meetingCardContent}>
                                    <div className={styles.meetingIcon} aria-hidden="true">M</div>
                                    <div className={styles.meetingDetails}>
                                        <Typography component="h2" className={styles.meetingCode}>
                                            {e.meeting_code}
                                        </Typography>
                                        <Typography className={styles.meetingDate}>
                                            {formatDate(e.date)}
                                        </Typography>
                                    </div>
                                    <span className={styles.meetingBadge}>Past meeting</span>
                                </CardContent>
                            </Card>
                        ))}
                    </section>
                ) : (
                    <section className={styles.emptyHistory}>
                        <div className={styles.emptyHistoryIcon} aria-hidden="true">
                            <HomeIcon />
                        </div>
                        <Typography component="h2" className={styles.emptyHistoryTitle}>
                            No meetings yet
                        </Typography>
                        <p>Your joined meetings will show up here.</p>
                    </section>
                )}
            </div>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={(_, reason) => {
                    if (reason !== 'clickaway') {
                        setSnackbar(current => ({ ...current, open: false }));
                    }
                }}
                message={snackbar.message}
            />
        </main>
    )
}
