import React from "react";
import Link from 'next/link';
import NavBar from '../src/navBar';

const App = () => {
  return (
    <div>
      <NavBar />
      <button>
        <Link href="/calendar">Calendar</Link>
      </button>
    </div>
  )
}

export default App;
