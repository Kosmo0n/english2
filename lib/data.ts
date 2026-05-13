export interface Topic {
  id: string;
  title: string;
  emoji: string;
  progress: number;
  lessons: number;
  totalLessons: number;
  color: string;
  locked: boolean;
}

export const topics: Topic[] = [
  {
    id: 'travel',
    title: 'Travel & Tourism',
    emoji: '✈️',
    progress: 65,
    lessons: 12,
    totalLessons: 18,
    color: 'from-blue-600 to-cyan-500',
    locked: false,
  },
  {
    id: 'work',
    title: 'Work & Career',
    emoji: '💼',
    progress: 30,
    lessons: 5,
    totalLessons: 16,
    color: 'from-primary to-purple-400',
    locked: false,
  },
  {
    id: 'shopping',
    title: 'Shopping',
    emoji: '🛍️',
    progress: 80,
    lessons: 14,
    totalLessons: 18,
    color: 'from-accent to-pink-400',
    locked: false,
  },
  {
    id: 'food',
    title: 'Food & Dining',
    emoji: '🍕',
    progress: 15,
    lessons: 2,
    totalLessons: 14,
    color: 'from-orange-500 to-amber-400',
    locked: false,
  },
  {
    id: 'tech',
    title: 'Technology',
    emoji: '💻',
    progress: 0,
    lessons: 0,
    totalLessons: 20,
    color: 'from-emerald-500 to-teal-400',
    locked: false,
  },
  {
    id: 'culture',
    title: 'Culture & Art',
    emoji: '🎭',
    progress: 0,
    lessons: 0,
    totalLessons: 15,
    color: 'from-yellow-500 to-amber-300',
    locked: true,
  },
];

export interface Word {
  id: string;
  word: string;
  phonetic: string;
  definition: string;
  example: string;
  translation: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface LessonContent {
  vocabulary: Word[];
  listening: {
    title: string;
    transcript: string;
    questions: Question[];
  };
  practice: Question[];
  finalTest: Question[];
}

export const lessonData: Record<string, LessonContent> = {
  travel: {
    vocabulary: [
      {
        id: 'itinerary',
        word: 'Itinerary',
        phonetic: '/ aɪˈtɪn.ər.er.i /',
        definition: 'A plan of a journey, including the route and the places that will be visited.',
        example: 'Please send me the travel itinerary before the trip.',
        translation: 'Маршрут, план путешествия',
      },
      {
        id: 'accommodation',
        word: 'Accommodation',
        phonetic: '/ əˌkɒm.əˈdeɪ.ʃən /',
        definition: 'A place to live, work or stay in.',
        example: 'We are looking for cheap accommodation in London.',
        translation: 'Жилье, размещение',
      },
    ],
    listening: {
      title: 'At the Airport',
      transcript: 'Excuse me, could you tell me where the check-in counter for Flight BA204 is? I need to drop my luggage before going through security.',
      questions: [
        {
          id: 't-l1',
          question: 'What is the speaker looking for?',
          options: ['The boarding gate', 'The check-in counter', 'The baggage claim', 'The customs area'],
          answer: 1,
          explanation: 'The speaker asks for the "check-in counter".',
        },
      ],
    },
    practice: [
      {
        id: 't-p1',
        question: 'Which word means "a place to stay"?',
        options: ['Itinerary', 'Accommodation', 'Transit', 'Departure'],
        answer: 1,
        explanation: '"Accommodation" refers to lodging or a place to stay.',
      },
    ],
    finalTest: [
      {
        id: 't-f1',
        question: 'Before going through security, I need to drop my ____.',
        options: ['Passport', 'Ticket', 'Luggage', 'Shoes'],
        answer: 2,
        explanation: 'The transcript mentions dropping luggage before security.',
      },
    ],
  },
  work: {
    vocabulary: [
      {
        id: 'negotiate',
        word: 'Negotiate',
        phonetic: '/ nɪˈɡəʊ.ʃi.eɪt /',
        definition: 'To discuss something formally in order to make an agreement.',
        example: 'I managed to negotiate a higher salary.',
        translation: 'Вести переговоры',
      },
      {
        id: 'deadline',
        word: 'Deadline',
        phonetic: '/ ˈded.laɪn /',
        definition: 'A time or day by which something must be done.',
        example: 'The deadline for the project is next Monday.',
        translation: 'Крайний срок',
      },
    ],
    listening: {
      title: 'The Morning Meeting',
      transcript: 'Good morning everyone. Today we need to discuss the project deadline. We have only three days left to negotiate the final contract.',
      questions: [
        {
          id: 'w-l1',
          question: 'What is the main topic of the meeting?',
          options: ['Office renovation', 'Project deadline', 'Coffee break', 'New employee'],
          answer: 1,
          explanation: 'The speaker says "Today we need to discuss the project deadline".',
        },
      ],
    },
    practice: [
      {
        id: 'w-p1',
        question: 'What does "deadline" mean?',
        options: ['A start date', 'A lunch break', 'A finish date', 'A meeting time'],
        answer: 2,
        explanation: 'A deadline is the time by which something must be finished.',
      },
    ],
    finalTest: [
      {
        id: 'w-f1',
        question: 'How many days are left to negotiate the contract?',
        options: ['Two days', 'Three days', 'One week', 'Five days'],
        answer: 1,
        explanation: 'The speaker mentions "three days left".',
      },
    ],
  },
  shopping: {
    vocabulary: [
      {
        id: 'discount',
        word: 'Discount',
        phonetic: '/ ˈdɪs.kaʊnt /',
        definition: 'A reduction in the usual price.',
        example: 'They are offering a 20% discount on all items.',
        translation: 'Скидка',
      },
      {
        id: 'receipt',
        word: 'Receipt',
        phonetic: '/ rɪˈsiːt /',
        definition: 'A piece of paper that proves you have paid for something.',
        example: 'Keep your receipt in case you want to return the dress.',
        translation: 'Чек, квитанция',
      },
    ],
    listening: {
      title: 'At the Store',
      transcript: 'Hi, I would like to return this shirt. Here is my receipt. Is there a discount for the new collection?',
      questions: [
        {
          id: 's-l1',
          question: 'What does the customer want to do?',
          options: ['Buy a shirt', 'Return a shirt', 'Wash a shirt', 'Design a shirt'],
          answer: 1,
          explanation: 'The customer says "I would like to return this shirt".',
        },
      ],
    },
    practice: [
      {
        id: 's-p1',
        question: 'What do you need to return an item?',
        options: ['Discount', 'Receipt', 'Bag', 'Wallet'],
        answer: 1,
        explanation: 'A receipt proves purchase and is usually required for returns.',
      },
    ],
    finalTest: [
      {
        id: 's-f1',
        question: 'A reduction in price is called a ____.',
        options: ['Receipt', 'Refund', 'Discount', 'Tax'],
        answer: 2,
        explanation: 'A discount is a price reduction.',
      },
    ],
  },
  food: {
    vocabulary: [
      {
        id: 'cuisine',
        word: 'Cuisine',
        phonetic: '/ kwɪˈziːn /',
        definition: 'A style of cooking, especially as characteristic of a particular country, region, or establishment.',
        example: 'I love Italian cuisine, especially the pasta dishes.',
        translation: 'Кухня (национальная)',
      },
      {
        id: 'beverage',
        word: 'Beverage',
        phonetic: '/ ˈbev.ər.ɪdʒ /',
        definition: 'A drink, especially one other than water.',
        example: 'Hot beverages like tea and coffee are served all day.',
        translation: 'Напиток',
      },
    ],
    listening: {
      title: 'Ordering at a Restaurant',
      transcript: 'Welcome to The Golden Bistro. Would you like to start with some beverages? Our signature cuisine features fresh seafood from the coast.',
      questions: [
        {
          id: 'f-l1',
          question: 'What is "The Golden Bistro"?',
          options: ['A hotel', 'A library', 'A restaurant', 'A airport'],
          answer: 2,
          explanation: 'Bistro is a type of restaurant.',
        },
      ],
    },
    practice: [
      {
        id: 'f-p1',
        question: 'Which word means a style of cooking?',
        options: ['Beverage', 'Cuisine', 'Dessert', 'Starter'],
        answer: 1,
        explanation: 'Cuisine refers to a specific style of cooking.',
      },
    ],
    finalTest: [
      {
        id: 'f-f1',
        question: 'What does the speaker suggest starting with?',
        options: ['Main course', 'Beverages', 'Dessert', 'Bill'],
        answer: 1,
        explanation: 'The speaker asks "Would you like to start with some beverages?".',
      },
    ],
  },
  tech: {
    vocabulary: [
      {
        id: 'algorithm',
        word: 'Algorithm',
        phonetic: '/ ˈæl.ɡə.rɪ.ðəm /',
        definition: 'A process or set of rules to be followed in calculations or other problem-solving operations, especially by a computer.',
        example: 'The social media feed is controlled by a complex algorithm.',
        translation: 'Алгоритм',
      },
      {
        id: 'interface',
        word: 'Interface',
        phonetic: '/ ˈɪn.tə.feɪs /',
        definition: 'The point at which a user interacts with a computer or device.',
        example: 'The new app has a very user-friendly interface.',
        translation: 'Интерфейс',
      },
    ],
    listening: {
      title: 'Software Development',
      transcript: 'Our team is working on a new user interface. We need to optimize the algorithm to ensure the app runs smoothly on all devices.',
      questions: [
        {
          id: 't-l1',
          question: 'What is the team working on?',
          options: ['Hardware', 'Marketing', 'User interface', 'Hiring'],
          answer: 2,
          explanation: 'The speaker mentions working on a "new user interface".',
        },
      ],
    },
    practice: [
      {
        id: 't-p1',
        question: 'Which word refers to a set of rules for a computer?',
        options: ['Interface', 'Hardware', 'Algorithm', 'Browser'],
        answer: 2,
        explanation: 'An algorithm is a set of rules for calculations.',
      },
    ],
    finalTest: [
      {
        id: 't-f1',
        question: 'The team needs to optimize the algorithm for what reason?',
        options: ['To save money', 'To ensure smoothness', 'To look better', 'To change colors'],
        answer: 1,
        explanation: 'The speaker says "optimize the algorithm to ensure the app runs smoothly".',
      },
    ],
  },
};

export const defaultLessonContent: LessonContent = {
  vocabulary: [
    {
      id: 'default-word',
      word: 'Fluent',
      phonetic: '/ ˈfluː.ənt /',
      definition: 'Able to express oneself easily and articulately.',
      example: 'She is fluent in three languages.',
      translation: 'Свободно владеющий',
    },
  ],
  listening: {
    title: 'General English',
    transcript: 'Welcome to Winglish. This is a general lesson to help you get started with your learning journey.',
    questions: [
      {
        id: 'g-l1',
        question: 'What is the name of the platform?',
        options: ['EnglishGo', 'Winglish', 'LinguaAI', 'SpeakFree'],
        answer: 1,
        explanation: 'The transcript welcomes you to "Winglish".',
      },
    ],
  },
  practice: [
    {
      id: 'g-p1',
      question: 'Being able to speak easily means you are ____.',
      options: ['Loud', 'Fluent', 'Quiet', 'Fast'],
      answer: 1,
      explanation: '"Fluent" means able to speak a language easily.',
    },
  ],
  finalTest: [
    {
      id: 'g-f1',
      question: 'Is this a general lesson?',
      options: ['Yes', 'No'],
      answer: 0,
      explanation: 'The transcript says "This is a general lesson".',
    },
  ],
};
