import React, {useEffect, useState} from "react";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

function App() {

  const [backend, setBackend] = useState([{}]);
  const [nextp, setNextp] = useState("");
  const [paths, setPaths] = useState([])


  useEffect(() => {
    fetchdata(nextp)
  }, [nextp])

  function fetchdata(nextp) {
    if (!nextp) {
        var last_path = "root"
    } else {
        last_path = nextp.children
    }
    setPaths([...paths, last_path])
    console.log(paths)
    fetch(`path/${last_path}`).then(
      response => response.json()
    ).then(
        data => {
        setBackend(data)
        console.log(data)
      }
    ) 
  }

  function removePath(i) {
    setPaths(paths.slice(0, i))
  }

  return (
      <div>
        <Breadcrumbs aria-label="breadcrumb">
        {
          paths.map((children, i) => (
              <Link underline="hover" color="primary" href="#" key={i} onClick={()=>{setNextp({children}); removePath(i); console.log({children})}}>{children}</Link>
          ))
        }
        </Breadcrumbs> 
        
        {(typeof backend.children === 'undefined') ? (
            <p>THIS IS FILE: {paths[paths.length-1]}</p>
        ): (
            backend.children.map((children, i) => (
                <Button variant="outlined" key={i} onClick={()=>{setNextp({children}) }}>{children}</Button>
            ))
            
        )}
      </div>
  )
}

export default App;
