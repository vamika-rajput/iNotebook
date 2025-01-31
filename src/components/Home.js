import React, { useEffect } from 'react';
import Notes from './Notes';
import { showAlert } from './Alert';


const Home = ({ showAlert }) => {
    const handleUpdate = () => {
        // Calling showAlert correctly
        showAlert("Note updated successfully!", "success");
      };
      

    return (
        <div>
            
            <Notes showAlert={showAlert} />
            
        </div>
    );
};
    // useEffect(() => {
    //     // Trigger the alert when the component loads
    //     showAlert('Welcome to the Home Page!', 'success');
    // }, [showAlert]);

    // return (
    //     <>
           
    //         <Notes />
    //     </>
    // );


export default Home;
