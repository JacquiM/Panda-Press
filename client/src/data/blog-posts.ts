export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  author: string;
  difficulty: string;
  slug: string;
  imageUrl: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Data from the 'New' GitHub Projects",
    excerpt: "GitHub Projects is nothing new – it has been around for a while now with a really cool API that allows you to pull data from it. For those who have made use of that functionality, it has been a breeze trying to automate and integrate different tasks across...",
    content: "GitHub Projects is nothing new – it has been around for a while now with a really cool API that allows you to pull data from it. For those who have made use of that functionality, it has been a breeze trying to automate and integrate different tasks across multiple platforms and systems.",
    date: "March 13, 2025",
    category: "Technology Solutions",
    author: "Jacqui Muller",
    difficulty: "Beginner – Senior",
    slug: "automation-getting-data-from-the-new-github-projects",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "2",
    title: "Creating a Full Outer Join Between Collections in Canvas App",
    excerpt: "To join or not to join! Let's delve deep into the realm of data manipulation by introducing the concept of a \"full join\" and how to implement it between two collections in Power Apps. If you come from a database background, the term 'full join' might be familiar. For...",
    content: "To join or not to join! Let's delve deep into the realm of data manipulation by introducing the concept of a \"full join\" and how to implement it between two collections in Power Apps.",
    date: "March 13, 2025",
    category: "Low-Code Solutions",
    author: "Jacqui Muller",
    difficulty: "Intermediate – Senior",
    slug: "power-apps-creating-a-full-outer-join-between-collections-in-canvas-app",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "3",
    title: "Getting Unique Records or Items from an Excel Table",
    excerpt: "In today's fast-paced world, managing data is important, and Excel is a common tool for organising and analysing information. Still, working with large datasets can be tough when duplicates arise. When handling a contact list, it is crucial to have unique entries...",
    content: "In today's fast-paced world, managing data is important, and Excel is a common tool for organising and analysing information. Still, working with large datasets can be tough when duplicates arise.",
    date: "November 18, 2024",
    category: "Low-Code Solutions",
    author: "Jacqui Muller",
    difficulty: "Beginner – Senior",
    slug: "power-automate-getting-unique-records-or-items-from-an-excel-table",
    imageUrl: "https://images.unsplash.com/photo-1518186233392-c232efbf2373?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "4",
    title: "Ensuring Center of Excellence (COE) Control of Apps and Flows",
    excerpt: "One of the biggest challenges in the Power Platform is maintaining control of the environments with the necessary visibility, especially when faced with the risk of orphaned artefacts (apps/flows without owners – possibly because the owner has left the organisation...",
    content: "One of the biggest challenges in the Power Platform is maintaining control of the environments with the necessary visibility, especially when faced with the risk of orphaned artefacts.",
    date: "March 5, 2024",
    category: "Digital Solutions",
    author: "Jacqui Muller",
    difficulty: "Beginner – Senior",
    slug: "power-automate-ensuring-center-of-excellence-coe-control-of-apps-and-automate-flows",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "5",
    title: "Unit Testing in Automated Flows",
    excerpt: "Unit testing is a crucial aspect of software development, helping developers ensure that individual components of their code function as expected. But what about when you're working with low-code or no-code platforms?",
    content: "Unit testing is a crucial aspect of software development, helping developers ensure that individual components of their code function as expected. But what about when you're working with low-code or no-code platforms?",
    date: "November 18, 2023",
    category: "Technology Solutions",
    author: "Jacqui Muller",
    difficulty: "Beginner – Senior",
    slug: "automation-unit-testing-in-power-automate-flows",
    imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "6",
    title: "Asynchronous Processing and Concurrency in Digital Solutions",
    excerpt: "In today's fast-paced digital landscape, the need for efficient and responsive solutions has never been greater. As developers and businesses strive to streamline operations, enhance user experiences, and tackle increasingly complex tasks...",
    content: "In today's fast-paced digital landscape, the need for efficient and responsive solutions has never been greater. As developers and businesses strive to streamline operations, enhance user experiences, and tackle increasingly complex tasks, one key concept has emerged as a game-changer: asynchronous processing.",
    date: "November 18, 2023",
    category: "Custom Development",
    author: "Jacqui Muller",
    difficulty: "Beginner – Senior",
    slug: "power-automate-asynchronous-processing-and-concurrency-in-flows",
    imageUrl: "https://images.unsplash.com/photo-1518186233392-c232efbf2373?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
  }
];
