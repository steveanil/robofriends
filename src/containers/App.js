import React, { useState, useEffect } from 'react';

import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundary';
import './App.css'

function App() {

    //useState hook is going to return for us 2 things: robots
    //setRobots is the function that changes the state robots
    //initial state of the robots is an empty array
    const [robots, setRobots] = useState([]);
    const [searchfield, setSearchfield] = useState('');

    //useEffect gets run everytime the function app gets run automatically
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
                .then(users => setRobots(users));
    }, [])
    

    const onSearchChange = (event) => {
        // event.target.value is going to set he searchfield meaning change
        setSearchfield(event.target.value)
    }
        
        const filteredRobots = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        // if it takes alot of time to load users
        if (robots.length === 0) {
            return <h1>Loading...</h1>
        } else {
            return (
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={onSearchChange}/>
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots} />
                        </ErrorBoundry>
                    </Scroll>
                </div>
            );
        }
    }

export default App;