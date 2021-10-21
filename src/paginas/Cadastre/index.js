import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import Button from '@material-ui/core/Button';


function Cadastre() {
    const [open, setOpen] = useState(false);
  
    return (
      <>
        <Button
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
        >
          click
        </Button>
        <Collapse in={open}>
          <div id="example-collapse-text">
            <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus</p>
            <p>terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer</p>
            <p>labore wes anderson cred nesciunt sapiente ea proident.</p>
          </div>
        </Collapse>

        <img src="http://maps.googleapis.com/maps/api/staticmap?center=-22.912869,-43.2289638&zoom=15&markers=color:red|-22.909410,-43.2329548&size=250x250"></img>

      </>
    );
  }

  export default Cadastre;