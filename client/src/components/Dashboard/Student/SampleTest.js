import React, { useRef, useState, useEffect } from "react";
import { Container, Typography, Button, List, ListItem, Dialog, DialogTitle, DialogActions, Box, CircularProgress } from "@mui/material";
import { data } from "./data.js";
import { PieChart } from '@mui/x-charts/PieChart';
import { HowToVoteRounded } from "@mui/icons-material";

const SampleQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(null);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  const optionArray = [Option1, Option2, Option3, Option4];

  // Function to shuffle questions
  const shuffleQuestions = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  useEffect(() => {
    // Shuffle the questions array
    shuffleQuestions(data);
    // Set the first 25 questions to the state
    setQuestions(data.slice(0, 5));
    // Set the initial question
    setQuestion(data[0]);
  }, []);

  const checkAns = (e, answer) => {
    if (!lock) {
      if (question.answer === answer) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        optionArray[question.answer - 1].current.classList.add("correct");
      }
    }
  };

  const next = () => {
    if (lock) {
      if (index === questions.length - 1) {
        setResult(true);
        return;
      }

      setIndex((prev) => prev + 1);
      setQuestion(questions[index + 1]);
      setLock(false);
      optionArray.forEach((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
      });
    }
  };

  const handleReturnToDashboard = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleQuitConfirmation = (confirm) => {
    if (confirm) {
      // User confirmed, navigate to dashboard
      // Replace window.location with your navigation logic
      window.location.href = "/dashboard";
    } else {
      // User cancelled, close dialog
      setOpenDialog(false);
    }
  };

  const styles = {
    meriendaFont: {
      fontFamily: '"Merienda", cursive',
      fontOpticalSizing: "auto",
      fontWeight: "bold", // Set a desired font weight
      fontStyle: "normal",
    },
    shantellSansFont: {
      fontFamily: '"Shantell Sans", cursive',
      fontOpticalSizing: "auto",
      fontWeight: "bold", // Set a desired font weight
      fontStyle: "normal",
      fontVariationSettings: '"BNCE" 0, "INFM" 0, "SPAC" 0',
    },
    alegreyaFont: {
      fontFamily: '"Alegreya", serif',
      fontOpticalSizing: "auto",
      fontWeight: "bold", // Set a desired font weight
      fontStyle: "normal",
    },
    playfairDisplayFont: {
      fontFamily: '"Playfair Display", serif',
      fontOpticalSizing: "auto",
      fontWeight: "bold", // Set a desired font weight
      fontStyle: "normal",
    },
  };

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          background: "#f9f9f9",
          color: "#262626",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Sample Aptitude Questions
        </Typography>
        <hr />

        {result ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="h5" sx={{ ...styles.meriendaFont, fontWeight: "bold" }}>
              You scored {score} out of {questions.length}
            </Typography>
            <Box sx={{ ml: 2 }}>
              <CircularProgress variant="determinate" value={(score / questions.length) * 100} />
            </Box>
          </Box>
        ) : (
          <box>
            <Typography variant="h5">
              {index + 1}.{question?.question}
            </Typography>
            <List>
              {Array.from({ length: 4 }, (_, i) => (
                <ListItem
                  key={i}
                  ref={optionArray[i]}
                  onClick={(e) => checkAns(e, i + 1)}
                  className="option-item"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "15px",
                    border: "2px solid #ccc",
                    borderRadius: "10px",
                    marginBottom: "20px",
                    fontSize: "18px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    "&.correct": {
                      background: "#dffff2",
                      borderColor: "#00d397",
                    },
                    "&.wrong": {
                      background: "#ffebeb",
                      borderColor: "#ff4a4a",
                    },
                  }}
                >
                  {question?.[`option${i + 1}`]}
                </ListItem>
              ))}
            </List>

            <Button variant="contained" onClick={next} sx={{ mt: 2 , ...styles.alegreyaFont , bgcolor:'#892cdc' , '&:hover':{bgcolor:'#52057b'} , fontSize:'16px' , width:"150px"}} >
              Next
            </Button>
            <Typography sx={{ mt: 2, fontSize: "16px" }}>
              {index + 1} of {questions.length} Questions
            </Typography>
          </box>
        )}
      </Container>

      <Button
        onClick={handleReturnToDashboard}
        sx={{
          m: 2,
          backgroundColor: "#892CDC",
          color: "#FFF6E0",
          alignSelf: "flex-start",
          "&:hover": {
            backgroundColor: "#52057B", // Change to your desired hover color
          },
          ...styles.playfairDisplayFont, fontSize:'16px'
        }}
      >
        Return to Dashboard
      </Button>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle sx={{...styles.playfairDisplayFont}}>Are you sure you want to quit the test?</DialogTitle>
        <DialogActions>
          <Button onClick={() => handleQuitConfirmation(false)} sx={{...styles.playfairDisplayFont , color:'#bc6ff1'}}>No</Button>
          <Button onClick={() => handleQuitConfirmation(true)}sx={{...styles.playfairDisplayFont , color:'#bc6ff1'}}> Yes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SampleQuiz;