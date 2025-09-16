"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

type Testimonial = {
  name: string;
  role: string;
  image: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    name: 'Pastor Sarah Johnson',
    role: 'Senior Pastor, Grace Community Church',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    quote: 'Our church software has revolutionized how we manage events and engage with our congregation. It\'s intuitive, powerful, and truly a blessing for our ministry.',
  },
  {
    name: 'David Ramirez',
    role: 'Church Administrator, Hope Fellowship',
    image: 'https://randomuser.me/api/portraits/men/6.jpg',
    quote: 'With this software, tracking donations and volunteer schedules has never been easier. It has freed up so much time for what matters most—serving our community.',
  },
  {
    name: 'Emily Chen',
    role: 'Youth Ministry Leader, New Life Church',
    image: 'https://randomuser.me/api/portraits/women/7.jpg',
    quote: 'The engagement tools have brought our youth group closer together. Customizable newsletters and event RSVPs make outreach effortless and effective.',
  },
  {
    name: 'Rev. Michael Thompson',
    role: 'Lead Pastor, Faith Baptist Church',
    image: 'https://randomuser.me/api/portraits/men/8.jpg',
    quote: 'From member directories to online giving, this software covers all our needs. It\'s reliable, secure, and has strengthened our church\'s operations immensely.',
  },
  {
    name: 'Lisa Green',
    role: 'Worship Coordinator, Unity Presbyterian',
    image: 'https://randomuser.me/api/portraits/women/4.jpg',
    quote: 'Coordinating services and media has been transformed. The software\'s features are user-friendly and help us focus on creating meaningful worship experiences.',
  },
  {
    name: 'James Patel',
    role: 'Treasurer, Cornerstone Community',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    quote: 'Financial reporting is now a breeze with automated tools. This software ensures transparency and efficiency in managing our church\'s resources.',
  },
  {
    name: 'Rachel Kim',
    role: 'Small Groups Director, Redeemer Church',
    image: 'https://randomuser.me/api/portraits/women/5.jpg',
    quote: 'Building and nurturing small groups is simpler than ever. The communication features foster deeper connections within our community.',
  },
  {
    name: 'Pastor Mark Ellis',
    role: 'Executive Pastor, Bethel Assembly',
    image: 'https://randomuser.me/api/portraits/men/9.jpg',
    quote: 'Integrating our website with this software has streamlined everything. It\'s a comprehensive solution that grows with our church.',
  },
  {
    name: 'Anna Morales',
    role: 'Outreach Coordinator, Harvest Bible',
    image: 'https://randomuser.me/api/portraits/women/10.jpg',
    quote: 'Our outreach efforts have seen tremendous growth thanks to targeted campaigns and analytics. Highly recommend for any mission-driven church.',
  },
  {
    name: 'Rev. Thomas Lee',
    role: 'Senior Minister, Crossroads Church',
    image: 'https://randomuser.me/api/portraits/men/11.jpg',
    quote: 'The mobile app integration keeps everyone connected on the go. It\'s modern, accessible, and perfectly suited for today\'s church.',
  },
  {
    name: 'Karen White',
    role: 'Volunteer Manager, Light of the World',
    image: 'https://randomuser.me/api/portraits/women/12.jpg',
    quote: 'Scheduling volunteers has reduced no-shows dramatically. This tool empowers our team and enhances our service impact.',
  },
  {
    name: 'Brother Paul Nguyen',
    role: 'Deacon, St. Mary\'s Parish',
    image: 'https://randomuser.me/api/portraits/men/13.jpg',
    quote: 'As a smaller congregation, we appreciate the affordable and scalable features. It feels like it was built just for us.',
  },
];

const chunkArray = (array: Testimonial[], chunkSize: number): Testimonial[][] => {
  const result: Testimonial[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

const testimonialChunks = chunkArray(testimonials, 4); // Adjusted for ~3 columns with padding

export default function WallOfLoveSection() {
  return (
    <section id="testimonials" className="py-16 md:py-32 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl font-semibold text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Loved by Churches & Communities
          </motion.h2>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
            Hear from fellow leaders how our tools are transforming church management and community engagement.
          </p>
        </div>
        <div className="grid gap-6 [--color-card:var(--color-muted)] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
          {testimonialChunks.map((chunk, chunkIndex) => (
            <div key={chunkIndex} className="space-y-6 *:border-none *:shadow-none">
              {chunk.map(({ name, role, quote, image }, index) => {
                const globalIndex = chunkIndex * 4 + index;
                return (
                  <motion.div
                    key={globalIndex}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: globalIndex * 0.1 }}
                    whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  >
                    <Card className="h-full bg-white border-gray-200/50 hover:border-gray-300/50 transition-colors duration-200 shadow-lg">
                      <CardContent className="grid grid-cols-[auto_1fr] gap-4 pt-6 pb-6">
                        <Avatar className="size-10 flex-shrink-0">
                          <AvatarImage
                            alt={name}
                            src={image}
                            loading="lazy"
                            width="120"
                            height="120"
                          />
                          <AvatarFallback className="bg-gradient-to-br from-blue-100 to-orange-100 text-blue-600 font-medium">
                            {name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>

                        <div className="space-y-2">
                          <h3 className="font-medium text-gray-800">{name}</h3>
                          <span className="text-sm text-gray-500 block tracking-wide">{role}</span>
                          <blockquote className="mt-3">
                            <p className="text-gray-700 italic leading-relaxed">{quote}</p>
                          </blockquote>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="border-b border-gray-200 mt-8 pt-4" />
      </div>
    </section>
  );
}