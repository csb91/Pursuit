import React from 'react'
import Link from 'next/link';
import Button from '@mui/material/Button';

const JobBoardButton = () => {
  return (
    <>
    <Link href='/jobSearch'>
      <Button variant='contained' style={{ textDecoration: 'none', color: 'inherit' }}>
        JOB BOARD
      </Button>
    </Link>
    </>
  )
}

export default JobBoardButton;