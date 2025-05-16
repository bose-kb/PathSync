import { Question } from '../types';

export const getQuestions = async (target: string, language: string): Promise<Question[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock questions based on target and language
  if (target === 'backend' && language === 'java') {
    return [
      {
        id: 'java_syntax',
        text: 'How comfortable are you with Java syntax and core concepts?',
        options: [
          "I'm new to Java or have limited knowledge",
          "I understand basic syntax and can write simple programs",
          "I'm comfortable with most Java features including OOP concepts",
          "I have deep knowledge of Java including advanced features"
        ]
      },
      {
        id: 'spring_boot',
        text: 'What is your experience with Spring Boot?',
        options: [
          "I've never used Spring Boot",
          "I've used Spring Boot in small projects",
          "I regularly use Spring Boot in medium-sized applications",
          "I'm an experienced Spring Boot developer"
        ]
      },
      {
        id: 'database',
        text: 'How would you rate your database experience with Java?',
        options: [
          "Basic JDBC knowledge only",
          "Familiar with JPA/Hibernate",
          "Experienced with complex ORM mappings and optimizations",
          "Expert in database design and performance tuning with Java"
        ]
      },
      {
        id: 'api_design',
        text: 'How experienced are you with REST API design?',
        options: [
          "Limited experience with APIs",
          "I can create basic REST endpoints",
          "I understand RESTful principles and can design resource-oriented APIs",
          "Expert in API design, including versioning, security, and performance"
        ]
      },
      {
        id: 'testing',
        text: 'What is your experience with Java testing frameworks?',
        options: [
          "Limited testing experience",
          "Familiar with JUnit basics",
          "Comfortable with JUnit, Mockito, and integration testing",
          "Expert in TDD, BDD, and comprehensive test automation"
        ]
      }
    ];
  } else if (target === 'frontend' && language === 'javascript') {
    return [
      {
        id: 'js_basics',
        text: 'How comfortable are you with JavaScript fundamentals?',
        options: [
          "I'm new to JavaScript",
          "I understand basic syntax and concepts",
          "I'm comfortable with modern JS features (ES6+)",
          "I have deep knowledge of JavaScript including advanced patterns"
        ]
      },
      {
        id: 'react',
        text: 'What is your experience with React?',
        options: [
          "I've never used React",
          "I can build simple components and understand basic concepts",
          "I can build complex applications with state management",
          "Expert in React, including performance optimization and advanced patterns"
        ]
      },
      {
        id: 'css',
        text: 'How would you rate your CSS skills?',
        options: [
          "Basic understanding of CSS",
          "Comfortable with layouts and responsive design",
          "Strong skills with CSS preprocessors and animations",
          "Expert in CSS architecture, animations, and optimization"
        ]
      },
      {
        id: 'state_management',
        text: 'What is your experience with state management in frontend applications?',
        options: [
          "Limited experience with state management",
          "Familiar with React's useState and Context API",
          "Experienced with Redux or other state management libraries",
          "Expert in complex state management patterns and architectures"
        ]
      },
      {
        id: 'testing_frontend',
        text: 'How experienced are you with frontend testing?',
        options: [
          "Limited testing experience",
          "Familiar with Jest basics",
          "Comfortable with Jest, React Testing Library, and component testing",
          "Expert in frontend TDD, E2E testing, and comprehensive test automation"
        ]
      }
    ];
  } else if (target === 'test') {
    // Generic questions for testing role regardless of language
    return [
      {
        id: 'testing_methodology',
        text: 'How familiar are you with different testing methodologies?',
        options: [
          "Limited understanding of testing methodologies",
          "Familiar with basic unit and integration testing",
          "Experienced with TDD, BDD, and automated testing",
          "Expert in comprehensive testing strategies and methodologies"
        ]
      },
      {
        id: 'testing_tools',
        text: `What is your experience with testing tools for ${language}?`,
        options: [
          "Limited experience with testing tools",
          "Familiar with basic testing frameworks",
          "Experienced with multiple testing frameworks and tools",
          "Expert in setting up comprehensive test automation pipelines"
        ]
      },
      {
        id: 'test_planning',
        text: 'How would you rate your test planning skills?',
        options: [
          "Limited experience with test planning",
          "Can create basic test plans for small features",
          "Experienced in creating comprehensive test plans",
          "Expert in test strategy and planning for complex systems"
        ]
      },
      {
        id: 'performance_testing',
        text: 'What is your experience with performance testing?',
        options: [
          "Limited experience with performance testing",
          "Familiar with basic load testing concepts",
          "Experienced with performance testing tools and analysis",
          "Expert in comprehensive performance testing and optimization"
        ]
      },
      {
        id: 'security_testing',
        text: 'How experienced are you with security testing?',
        options: [
          "Limited security testing experience",
          "Familiar with basic security concepts and tests",
          "Experienced with security testing tools and methodologies",
          "Expert in comprehensive security testing and vulnerability assessment"
        ]
      }
    ];
  } else {
    // Default questions if combination is not specifically handled
    return [
      {
        id: 'general_experience',
        text: `How many years of experience do you have with ${language}?`,
        options: [
          "Less than 1 year",
          "1-3 years",
          "3-5 years",
          "More than 5 years"
        ]
      },
      {
        id: 'project_size',
        text: `What size of projects have you worked on with ${language}?`,
        options: [
          "Small personal projects",
          "Small to medium team projects",
          "Large enterprise applications",
          "Very large distributed systems"
        ]
      },
      {
        id: 'learning_style',
        text: 'How do you prefer to learn new technologies?',
        options: [
          "Through official documentation",
          "Through video tutorials",
          "By building projects",
          "Through mentorship and pair programming"
        ]
      },
      {
        id: 'work_preference',
        text: 'What type of work environment do you prefer?',
        options: [
          "Fully remote",
          "Hybrid",
          "On-site",
          "Flexible depending on project needs"
        ]
      },
      {
        id: 'career_goals',
        text: 'What are your career goals for the next 2 years?',
        options: [
          "Deepen technical expertise",
          "Move into leadership/management",
          "Learn new complementary skills",
          "Start my own project/company"
        ]
      }
    ];
  }
};