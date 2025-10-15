import { useEffect, useState } from 'react'
import germany from '/germany.svg'
import italy from '/italy.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css';

import { createClient } from "@supabase/supabase-js";
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);


function App() {
  const [count, setCount] = useState(0)

  const [instruments, setInstruments] = useState([]);
  useEffect(() => {
    getInstruments();
  }, []);
  async function getInstruments() {
    const { data } = await supabase.from("dict").select();
    setInstruments(data);
  }


  return (
    <>
      <div className='container'>
        <h1>Dizionario Italiano/Tedesco e vicecersa</h1>
        <div className='row'>
          <div className="col-12 col-lg-10 mt-2">
            <input className='form-control ' type="text" placeholder='Cerca parola...' />
          </div>
          <div className="col-12 col-lg-2 mt-2">
            <button type="button" className="btn btn-success">Cerca</button>

          </div>
        </div>

        <div className='mt-1'>
          <p>Hai cercato: </p>
        </div>
        <div>
          <div className='d-flex align-items-center'>
          {instruments.map((instrument) => (
            <>
            <img src={italy} className="logo" alt="Vite logo" />
            <span className='ms-2'>{instrument.Italian}</span>
          </>
        ))}
            
          </div>

        </div>
      </div>
      <ul>
        
      </ul>


    </>
  )

  // return (
  //   <ul>
  //     {instruments.map((instrument) => (
  //       <li key={instrument}>{instrument.German} - {instrument.Italian}</li>
  //     ))}
  //   </ul>
  // );
}

export default App
