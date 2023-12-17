import React from "react";
import { Container, Paper, Typography, CircularProgress  } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";

function preventDefault(event) {
  event.preventDefault();
}
  
export default function CommentDisplay() {
  const vid_id = useParams();
  //console.log(vid_id.id);
  const api_url = 'https://haters-gotta-hate-backend-7q4zta3t5q-uc.a.run.app/process_comments/' + vid_id.id ;
  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Make a GET request to your Flask back-end
    axios.get(api_url)
      .then(response => {
        setComments(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error)
        setIsLoading(false);
      });
  }, []);
 
  if (isLoading) {
    return (
      <Container sx={{ marginTop: 15, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Loading...
        </Typography>
        <CircularProgress />
      </Container>
    );
  }
  return(
    <Container sx = {{marginTop:15}}>
      <Typography textAlign="center" fontWeight="bold" fontSize="3rem">
        View Hate Comments <span style={{ color: '#B43757' }}>Here</span>,
      </Typography>
      {comments && (
        <Typography textAlign="center" fontSize="1.4rem" style={{ color: '#363636', marginBottom: 15 }}>
          {comments.length} Potential Hate Comments Found
        </Typography>
      )}
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', marginTop:5}}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Comment</TableCell>
            <TableCell style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Author</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {comments && comments.map((comment, index) => (
              <TableRow key={index}>
                <TableCell>{comment.text}</TableCell>
                <TableCell>{comment.author}</TableCell>
              </TableRow>
        ))}
        </TableBody>
      </Table>
    </Paper>
    </Container>
  );
}