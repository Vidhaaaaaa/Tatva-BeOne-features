import React, { useState, useMemo } from 'react';
import { Grid, TextField, Typography, Card, CardContent, CardActions, Button, Modal, Box } from '@mui/material';
import './hub.css';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  avatar?: string;
}

interface Message {
  id: number;
  sender: 'patient' | 'doctor';
  text: string;
  timestamp: Date;
}

const dummyDoctors: Doctor[] = [
  { id: 1, name: 'Dr. Kavya Menon', specialty: 'Clinical Psychologist' },
  { id: 2, name: 'Dr. Nikhil Saini', specialty: 'Psychotherapist' },
  { id: 3, name: 'Dr. Priya Thakur', specialty: 'Counseling Psychologist' },
  { id: 4, name: 'Dr. Rohan Kapoor', specialty: 'Career Counselor' },
  { id: 5, name: 'Dr. Bhavna Reddy', specialty: 'Psychotherapist' },
  { id: 6, name: 'Dr. Esha Choudhury', specialty: 'Child Psychologist' },
  { id: 7, name: 'Dr. Gauri Desai', specialty: 'Psychotherapist' },
  { id: 8, name: 'Dr. Jatin Mehra', specialty: 'Neuropsychologist' },
  { id: 9, name: 'Dr. Arjun Patel', specialty: 'Rehabilitation Psychologist' },
  { id: 10, name: 'Dr. Aarav Sharma', specialty: 'Psychotherapist' },
];

const Hub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);
  const [conversations, setConversations] = useState<{ [key: number]: Message[] }>({});

  const filteredDoctors = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    return dummyDoctors.filter(doctor =>
      doctor.name.toLowerCase().includes(lowerSearch) ||
      doctor.specialty.toLowerCase().includes(lowerSearch)
    );
  }, [searchTerm]);

  const handleSelectDoctor = (doctorId: number) => {
    setSelectedDoctorId(doctorId);
    if (!conversations[doctorId]) {
      setConversations(prev => ({ ...prev, [doctorId]: [] }));
    }
  };

  const handleSendMessage = (doctorId: number, text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      sender: 'patient',
      text,
      timestamp: new Date(),
    };
    setConversations(prev => ({
      ...prev,
      [doctorId]: [...prev[doctorId], newMessage],
    }));

    // Simulate doctor response after 2 seconds
    setTimeout(() => {
      const response: Message = {
        id: Date.now(),
        sender: 'doctor',
        text: `Hello, I've reviewed your message: "${text}". Here's my advice: please rest and contact me if symptoms persist.`,
        timestamp: new Date(),
      };
      setConversations(prev => ({
        ...prev,
        [doctorId]: [...prev[doctorId], response],
      }));
    }, 2000);
  };

  const selectedDoctor = dummyDoctors.find(d => d.id === selectedDoctorId);

  return (
    <div className="hub-container">
      <Typography variant="h3" gutterBottom>
      Connect. Consult. Care.
      </Typography>
      <div className="hub-window">
        <div className='peer-connect'>
        </div>
        <div className="doctor-connect">
          <Typography variant="h5" gutterBottom>
            Connect with Healthcare Professionals
          </Typography>
          <TextField
            label="Search Doctors by Name or Specialty"
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <Grid container spacing={2}>
            {filteredDoctors.map(doctor => (
              <Grid item xs={12} sm={6} md={4} key={doctor.id}>
                <Card className="doctor-card">
                  <CardContent>
                    <Typography variant="h6">{doctor.name}</Typography>
                    <Typography color="textSecondary">{doctor.specialty}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={() => handleSelectDoctor(doctor.id)}
                    >
                      Consult Now
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Modal
            open={selectedDoctorId !== null}
            onClose={() => setSelectedDoctorId(null)}
            aria-labelledby="consultation-modal-title"
          >
            <Box className="modal-box">
              {selectedDoctor && (
                <ConsultationView
                  doctor={selectedDoctor}
                  messages={conversations[selectedDoctorId!] || []}
                  onSendMessage={text => handleSendMessage(selectedDoctorId!, text)}
                />
              )}
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
};

interface ConsultationViewProps {
  doctor: Doctor;
  messages: Message[];
  onSendMessage: (text: string) => void;
}

const ConsultationView: React.FC<ConsultationViewProps> = ({ doctor, messages, onSendMessage }) => {
  const [messageText, setMessageText] = useState<string>('');

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (messageText.trim()) {
      onSendMessage(messageText);
      setMessageText('');
    }
  };

  return (
    <div className="consultation-view">
      <Typography id="consultation-modal-title" variant="h5" gutterBottom>
        Consultation with {doctor.name} ({doctor.specialty})
      </Typography>
      <div className="message-area">
        {messages.length === 0 ? (
          <Typography color="textSecondary">Start your consultation by sending a message.</Typography>
        ) : (
          messages.map(msg => (
            <Typography
              key={msg.id}
              className={`message ${msg.sender === 'patient' ? 'patient-message' : 'doctor-message'}`}
              gutterBottom
            >
              {msg.sender === 'patient' ? 'You: ' : `${doctor.name}: `}{msg.text}
            </Typography>
          ))
        )}
      </div>
      <TextField
        label="Describe your issue"
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        value={messageText}
        onChange={e => setMessageText(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!messageText.trim()}
      >
        Send
      </Button>
    </div>
  );
};

export default Hub;