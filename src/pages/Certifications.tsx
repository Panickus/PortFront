import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Certification = {
  _id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  image: string;
};

const Certifications: React.FC = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/certifications');
        setCertifications(response.data);
      } catch (error) {
        console.error('Error fetching certifications:', error);
      }
    };

    fetchCertifications();
  }, []);

  return (
    <div className="bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text min-h-screen p-4">
    <h1 className="text-3xl font-bold mb-4">Certificaciones</h1>
      <ul>
        {certifications.map((certification) => (
          <li key={certification._id}>
            <h2>{certification.title}</h2>
            <p>{certification.organization}</p>
            <p>{certification.date}</p>
            <p>{certification.description}</p>
            <img src={certification.image} alt={certification.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Certifications;
