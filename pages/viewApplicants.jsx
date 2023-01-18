import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../src/navBar';
import ApplicantListCard from '../src/applicantListCard';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/router';

const ViewApplicants = () => {
  const [jobListings, setJobListings] = useState(['test', 'test', 'test', 'test', 'test', 'test', 'test']);
  const router = useRouter();
  const { name } = router.query;
  console.log(name)

  // useEffect(() => {
  //   axios.get('http://localhost:3002/jobs/applicants')
  //   .then((res) => {setJobListings(res.data)})
  //   .catch(err => {console.log(err)})
  // }, [])

  return (
    <>
    <NavBar />
    <Box sx={{width: '100%', minWidth: 480, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid'}}>
      <nav aria-label="applicant-list-container">
        <h2>Software Engineer</h2>
          {jobListings.map((listing, index) =>
            <ApplicantListCard listing={listing} key={index} />
          )}
      </nav>
    </Box>
    </>
  )
}

export default ViewApplicants;