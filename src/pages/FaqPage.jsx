/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import H4Title from '../components/H4Title';

/**
 * Renders a FAQ page component displaying questions and answers.
 *
 * @component
 * @returns {JSX.Element} The rendered FAQ page component.
 */
function FaqPage() {
  const faqData = [
    {
      question: 'What services does HealthPlus Clinic offer?',
      answer: 'HealthPlus Clinic offers a range of medical services, including consultations, examinations, vaccinations, and minor procedures.',
    },
    {
      question: 'Are appointments necessary for all services?',
      answer: 'While some services may require appointments, others may accept walk-in patients. Please check with our clinic staff for specific service requirements.',
    },
    {
      question: 'Can I book appointments online?',
      answer: 'Yes, you can conveniently book appointments online through our website or mobile app. Alternatively, you can also call our clinic to schedule an appointment.',
    },
  ];

  const [open, setOpen] = React.useState({});

  /**
   * Handles toggling the visibility of the answer for a specific question.
   *
   * @param {number} index - The index of the question in the faqData array.
   */
  const handleRowClick = (index) => {
    setOpen((prevOpen) => ({ ...prevOpen, [index]: !prevOpen[index] }));
  };

  return (
    <main>
      <Box sx={{ bgcolor: 'background.paper', pt: 3 }}>
        <Container maxWidth="sm">
          <H4Title text="FAQ" />
          <Typography variant="body1" align="center" color="text.secondary" paragraph>
            Welcome to our FAQ page. Here you can find answers to 
            some common questions about HealthPlus Clinic's medical services.
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Question</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {faqData.map((row, index) => (
                  <React.Fragment key={index}>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={() => handleRowClick(index)}>
                          {open[index] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.question}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
                        <Collapse in={open[index]} timeout="auto" unmountOnExit>
                          <Box margin={1}>
                            <Typography variant="body1" gutterBottom component="div">
                              {row.answer}
                            </Typography>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </main>
  );
}

export default FaqPage;
