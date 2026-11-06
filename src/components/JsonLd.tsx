import React from 'react';

export const JsonLd: React.FC = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': ['TravelAgency', 'LocalBusiness'],
    '@id': 'https://maskintbd.com/#agency',
    name: 'MASK Hajj Group',
    alternateName: 'মাস্ক হজ গ্রুপ',
    description:
      'Official Ministry of Religious Affairs approved Hajj & Umrah Travel Agency in Bangladesh (Licence #15630). Offering Hajj packages, Umrah group packages, visa assistance, and scholar guidance.',
    url: 'https://maskintbd.com',
    telephone: ['+8801713009567', '+8801711258708', '+8802222229612'],
    email: 'maskbd99@gmail.com',
    license: 'Ministry of Religious Affairs Licence No. 15630',
    priceRange: '৳৳৳',
    logo: 'https://maskintbd.com/images/makkah.jpg',
    image: 'https://maskintbd.com/images/makkah.jpg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '67/1 Naya Paltan, China Town (East Tower), [20th floor] Suite-21/2',
      addressLocality: 'Naya Paltan',
      addressRegion: 'Dhaka',
      postalCode: '1000',
      addressCountry: 'BD',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 23.7371,
      longitude: 90.415,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '10:00',
        closes: '19:00',
      },
    ],
    sameAs: [
      'https://www.facebook.com/share/1BxJhNoLNa/?mibextid=wwXIfr',
      'https://www.youtube.com/@MASKHAJJGROUP',
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Bangladesh',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Hajj & Umrah Pilgrimage Packages',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Hajj Pre-Registration & Full Package',
            description: 'Government approved Hajj package with hotel near Haram and dedicated scholar guidance.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Umrah Group & Private Packages',
            description: 'Year-round Umrah packages from Bangladesh including visa, air ticket, and hotel.',
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default JsonLd;
