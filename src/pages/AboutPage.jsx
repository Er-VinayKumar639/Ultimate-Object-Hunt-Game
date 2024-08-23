import React from 'react';
import logo from '../assets/lo.png';

export default function AboutPage() {
  return (

      <div className='h-full bg-black/15 backdrop-blur-[3px] flex flex-col text-black justify-evenly gap-8 items-center overflow-y-scroll p-4 pb-16 about-page'>

        <div className='flex flex-col justify-evenly items-center'>
          <img src={logo} alt='Object Hunt Logo' className='logo w-42' />
          <h1 className='text-4xl font-extrabold font-bungee'>OBJECT HUNT</h1>
        </div>

        <div className="">
          <strong>Object Hunt</strong> is an engaging and dynamic game designed to challenge your speed and creativity. Whether you're playing solo or with friends, Object Hunt brings an exciting twist to traditional scavenger hunts by asking players to find random objects in real life. The quicker you find the object, the higher your score!
        </div>

      <div>
        <h2 className='mb-2 font-bungee font-extrabold text-2xl'>Features</h2>
        <ul>
          <li><strong>Single Player:</strong> Hone your skills by playing alone, trying to beat your personal best and climb the leaderboard.</li>
          <li><strong>Multiplayer:</strong> Compete against friends or other players online to see who can find the objects fastest.</li>
          <li><strong>Randomized Challenges:</strong> With a wide variety of objects to find, each game offers a unique experience.</li>
          <li><strong>Timed Scoring System:</strong> Your score is based on how quickly you can find and present the object, adding a thrilling race-against-the-clock element to the game.</li>
        </ul>
      </div>

      <div>
        <h2 className='mb-2 font-bungee font-extrabold text-2xl'>Our Team</h2>
        <p>Object Hunt is a final year project developed by a group of passionate Computer Science and Engineering students from Babu Banarasi Das University (BBDU), class of 2021-2025. Our team members include:</p>
        <ul className="team-list grid grid-cols-2 gap-2 mt-2">
          <li className='p-1 text-sm font-semibold bg-accent/30 rounded-full'>Adarsh Kushwaha</li>
          <li className='p-1 text-sm font-semibold bg-accent/30 rounded-full'>Mohammad Adnan</li>
          <li className='p-1 text-sm font-semibold bg-accent/30 rounded-full'>Shubham Chauhan</li>
          <li className='p-1 text-sm font-semibold bg-accent/30 rounded-full'>Prashant Pandey</li>
          <li className='p-1 text-sm font-semibold bg-accent/30 rounded-full'>Vinay Kumar</li>
          <li className='p-1 text-sm font-semibold bg-accent/30 rounded-full'>Vishnu Rajbhar</li>
        </ul>
      </div>

      <div>
        <h2 className='mb-2 font-bungee font-extrabold text-2xl'>Our Vision</h2>
        <p>
          Our goal with Object Hunt was to create a game that not only entertains but also encourages interaction with the real world. We believe in the power of technology to bring people together, and Object Hunt is a testament to our commitment to innovation, collaboration, and fun.
        </p>
      </div>

      <dvi>
        <h2 className='mb-2 font-bungee font-extrabold text-2xl'>Future Plans</h2>
        <p>We are constantly looking for ways to improve Object Hunt and expand its features. Future updates may include:</p>
        <ul>
          <li>More object categories and themes.</li>
          <li>Customizable multiplayer rooms.</li>
          <li>Enhanced social sharing features.</li>
        </ul>
      </dvi>

    </div>
  );
}
