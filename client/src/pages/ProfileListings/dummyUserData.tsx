// Dummy data

export interface User {
  _id: number;
  image: string;
  firstName: string;
  lastName: string;
  title: string;
  rating: number;
  description: string;
  city: string;
  provinceState: string;
  rate: number;
  availableDates: Date[];
}

import image1 from '../../Images/68f55f7799df6c8078a874cfe0a61a5e6e9e1687.png';
const user1: User = {
  _id: 1,
  image: image1,
  firstName: 'Lorem',
  lastName: 'Ipsum',
  title: 'Pet sitter',
  rating: 5,
  description: 'I provide dog walking and pet sitting services',
  city: 'Toronto',
  provinceState: 'Ontario',
  rate: 15,
  availableDates: [new Date('2021-06-01'), new Date('2021-06-02'), new Date('2021-06-03'), new Date('2021-06-04')],
};
import image2 from '../../Images/775db5e79c5294846949f1f55059b53317f51e30.png';
const user2: User = {
  _id: 2,
  image: image2,
  firstName: 'Sed',
  lastName: 'Elementum',
  title: 'Professional dog trainer',
  rating: 3,
  description: 'Dog sitting, cat sitting, pocket pet and bird care',
  city: 'Lethbridge',
  provinceState: 'Alberta',
  rate: 16,
  availableDates: [new Date('2021-06-04'), new Date('2021-06-05'), new Date('2021-06-06'), new Date('2021-06-07')],
};
import image3 from '../../Images/b1f0e680702e811aa8ba333cb19c0e0ea95e8e31.png';
const user3: User = {
  _id: 3,
  image: image3,
  firstName: 'Nunc',
  lastName: 'Aliquet',
  title: 'Dog care helper',
  rating: 5,
  description: 'I would love to work with your dog',
  city: "St. John's",
  provinceState: 'Newfoundland',
  rate: 20,
  availableDates: [new Date('2021-06-01'), new Date('2021-06-02'), new Date('2021-06-03'), new Date('2021-06-04')],
};
import image4 from '../../Images/d9fc84a0d1d545d77e78aaad39c20c11d3355074.png';
const user4: User = {
  _id: 4,
  image: image4,
  firstName: 'Labi',
  lastName: 'Notarus',
  title: 'Animal lover',
  rating: 4,
  description: 'I have had dogs as pets for most of my life',
  city: 'Pitt Meadows',
  provinceState: 'BC',
  rate: 22,
  availableDates: [new Date('2021-06-08'), new Date('2021-06-09'), new Date('2021-06-10'), new Date('2021-06-11')],
};
const user5: User = {
  _id: 5,
  image: image1,
  firstName: 'Interdum',
  lastName: 'Pharetra',
  title: 'Cat owner',
  rating: 3,
  description: "I have four cats, and I think that's a normal thing",
  city: 'Seattle',
  provinceState: 'Washington',
  rate: 25,
  availableDates: [new Date('2021-06-08'), new Date('2021-06-09'), new Date('2021-06-10'), new Date('2021-06-11')],
};
const user6: User = {
  _id: 6,
  image: image2,
  firstName: 'Lacinia',
  lastName: 'Quis',
  title: 'Professional dog walker',
  rating: 5,
  description: 'I have been doing this job for many years',
  city: 'Ottawa',
  provinceState: 'Ontario',
  rate: 24,
  availableDates: [new Date('2021-06-01'), new Date('2021-06-02'), new Date('2021-06-03'), new Date('2021-06-04')],
};
const user7: User = {
  _id: 7,
  image: image3,
  firstName: 'Diam',
  lastName: 'Euismod',
  title: 'Pitt bull lover',
  rating: 4,
  description: "I'd love to walk your pitt bull",
  city: 'Quebec City',
  provinceState: 'Quebec',
  rate: 18,
  availableDates: [
    new Date('2021-06-12'),
    new Date('2021-06-13'),
    new Date('2021-06-14'),
    new Date('2021-06-15'),
    new Date('2021-06-16'),
    new Date('2021-06-17'),
    new Date('2021-06-18'),
    new Date('2021-06-19'),
  ],
};
const user8: User = {
  _id: 8,
  image: image4,
  firstName: 'Sem',
  lastName: 'Imperdiet',
  title: 'Giunea pig friend',
  rating: 2,
  description: "If you've got a guinea pig, I want to meet it!",
  city: 'Ottawa',
  provinceState: 'Ontario',
  rate: 20,
  availableDates: [new Date('2021-06-15'), new Date('2021-06-16'), new Date('2021-06-17'), new Date('2021-06-18')],
};
const user9: User = {
  _id: 9,
  image: image2,
  firstName: 'Elit',
  lastName: 'Malesuada',
  title: 'Cat sitter',
  rating: 3.5,
  description: 'Let me watch your cats!',
  city: 'Toronto',
  provinceState: 'Alberta',
  rate: 14,
  availableDates: [new Date('2021-06-18'), new Date('2021-06-19'), new Date('2021-06-20'), new Date('2021-06-21')],
};
const user10: User = {
  _id: 10,
  image: image1,
  firstName: 'Isced',
  lastName: 'Ullamcorper',
  title: 'Senior dog friend',
  rating: 5,
  description: 'I love senior dogs',
  city: 'Vancouver',
  provinceState: 'BC',
  rate: 26,
  availableDates: [
    new Date('2021-06-01'),
    new Date('2021-06-02'),
    new Date('2021-06-21'),
    new Date('2021-06-22'),
    new Date('2021-06-23'),
    new Date('2021-06-24'),
    new Date('2021-06-25'),
    new Date('2021-06-26'),
  ],
};

export const users: User[] = [user1, user2, user3, user4, user5, user6, user7, user8, user9, user10];
