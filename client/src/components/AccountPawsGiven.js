import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PawGiven from './PawGiven';

const AccountPawsGiven = props => {
    return (
      <div className="accountpawsGiven">
        {
        props.pawsGiven.map(paw => (
          <div key={paw.id}>
            <PawGiven
              id = {paw.id}
              statusPaw = {paw.status}
              userId = {paw.userId}
              dogId = {paw.dogId}
            />
          </div>
        ))
       }
      </div>
    );
};
export default AccountPawsGiven;
