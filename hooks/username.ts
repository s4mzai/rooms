"use client"
import {nanoid} from 'nanoid'
import { useState, useEffect } from 'react';

const useUsername = ()=>{
    const [username, setUsername] = useState<string>("");

    useEffect(()=>{
        const storedUsername = localStorage.getItem('username');
        
        if (storedUsername) {
            setUsername(storedUsername);
        } else {
            const houses = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"]
            const randomIndex = Math.floor(Math.random() * houses.length);
            const randomHouse = houses[randomIndex]
        
            const usernameId = nanoid(5)
            
            const generatedUsername = randomHouse + "-" + usernameId
            
            localStorage.setItem('username', generatedUsername);
            setUsername(generatedUsername);
        }
    },[])

    return username;
}

export default useUsername

