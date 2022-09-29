import React from 'react';

import { Header, Segment} from 'semantic-ui-react';


export default function PageHeader(){
    return (
        <Segment>
            <Header as='h2' >
              Your Sleeping Tracker
            </Header>
        </Segment>
    )
}