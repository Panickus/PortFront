import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Testimonial = {
  _id: string;
  name: string;
  position: string;
  company: string;
  testimonial: string;
  companyLogo: string;
  image: string;
};

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/testimonials');
        setTestimonials(response.data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <div className="bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Testimonials</h1>
      <ul>
        {testimonials.map((testimonial) => (
          <li key={testimonial._id}>
            <h2>{testimonial.name}</h2>
            <p>{testimonial.position} at {testimonial.company}</p>
            <p>{testimonial.testimonial}</p>
            <img src={testimonial.companyLogo} alt={testimonial.company} />
            <img src={testimonial.image} alt={testimonial.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Testimonials;
