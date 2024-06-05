import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Skill = {
  _id: string;
  name: string;
  level: string;
  logo: string;
};

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/skills');
        setSkills(response.data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchSkills();
  }, []);

  return (
    <div className="bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text min-h-screen p-4">
    <h1 className="text-3xl font-bold mb-4">Skills</h1>
      <ul>
        {skills.map((skill) => (
          <li key={skill._id}>
            <h2>{skill.name}</h2>
            <p>{skill.level}</p>
            <img src={skill.logo} alt={skill.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Skills;
