import React, {useContext} from "react";
import {AuthContext} from '../Context/auth'
import {useNavigate,Outlet} from 'react-router-dom';

function PrivateRoutes (){

    const {user} = useContext(AuthContext);
    const navigate = useNavigate();





    return(

        
        {user} ? <Outlet/> : navigate('/login')
       

      
        // <Route
        
    //     {...rest}
    //     exact
    //     render = {(props => user ? <Component {...props} /> : navigate('/login')
        
        
    // )}
        
    //     />
          


    );
};

export default PrivateRoutes;