import { Book, MessageCircle, Video, Award } from 'lucide-react';

const createLesson = (id: string, title: string, duration: string, type: string, content: any) => ({
  id,
  title,
  duration,
  type,
  content,
  completed: false,
  locked: false
});

export const courseContent = {
  'a1-basics': {
    title: 'German Basics (A1)',
    description: 'Master the fundamentals of German language with our comprehensive course',
    duration: '4 weeks',
    students: 1234,
    modules: [
      {
        id: 'module-1',
        title: 'Week 1: Foundations & Greetings',
        description: 'Essential greetings, alphabet, and basic cultural insights',
        progress: 0,
        lessons: [
          createLesson('lesson-1-1', 'Basic Greetings & Introductions', '45 min', 'video', {
            introduction: 'Learn essential German greetings and introductions for everyday situations',
            sections: [
              {
                title: 'Time-based Greetings',
                items: [
                  { german: 'Guten Morgen', english: 'Good morning', example: 'Guten Morgen! Wie geht es Ihnen?', timeUsage: '5:00-11:00' },
                  { german: 'Guten Tag', english: 'Good day', example: 'Guten Tag, Herr Schmidt!', timeUsage: '11:00-18:00' },
                  { german: 'Guten Abend', english: 'Good evening', example: 'Guten Abend, Frau Müller!', timeUsage: 'After 18:00' }
                ]
              },
              {
                title: 'Casual Greetings',
                items: [
                  { german: 'Hallo', english: 'Hello', example: 'Hallo, wie geht\'s?', usage: 'Informal, any time' },
                  { german: 'Hi', english: 'Hi', example: 'Hi, was machst du?', usage: 'Very informal, with friends' },
                  { german: 'Servus', english: 'Hi/Bye', example: 'Servus, schön dich zu sehen!', usage: 'Southern Germany/Austria' }
                ]
              }
            ],
            culturalNotes: [
              {
                title: 'Formal vs. Informal',
                content: 'Germans typically use formal greetings (with "Sie") in professional settings and with strangers. Informal greetings (with "du") are used among friends, family, and younger people.'
              },
              {
                title: 'Regional Differences',
                content: 'Different regions in German-speaking countries may use different greetings. For example, "Grüß Gott" is common in Southern Germany and Austria.'
              }
            ],
            quiz: [
              {
                question: 'When would you use "Guten Morgen"?',
                options: ['In the evening', 'From 5:00 to 11:00', 'Only at exactly 12:00', 'After 18:00'],
                correct: 'From 5:00 to 11:00',
                explanation: 'Guten Morgen is used in the morning hours, typically from 5:00 to 11:00.'
              },
              {
                question: 'Which greeting is most appropriate in a job interview?',
                options: ['Hi', 'Servus', 'Guten Tag', 'Hallo'],
                correct: 'Guten Tag',
                explanation: 'In formal situations like job interviews, use the formal greeting "Guten Tag".'
              }
            ]
          }),
          createLesson('lesson-1-2', 'The German Alphabet', '30 min', 'video', {
            introduction: 'Master the German alphabet and pronunciation',
            sections: [
              {
                title: 'Special Characters',
                items: [
                  { german: 'ä', english: 'ae', example: 'Mädchen (girl)', usage: 'Pronounced like "e" in "bed"' },
                  { german: 'ö', english: 'oe', example: 'schön (beautiful)', usage: 'Round your lips to say "e"' },
                  { german: 'ü', english: 'ue', example: 'früh (early)', usage: 'Like "ee" with rounded lips' },
                  { german: 'ß', english: 'ss', example: 'Straße (street)', usage: 'Sharp "s" sound' }
                ]
              }
            ],
            quiz: [
              {
                question: 'How do you pronounce "ö"?',
                options: [
                  'Like "o" in "hot"',
                  'Like "e" with rounded lips',
                  'Like "a" in "cat"',
                  'Like "i" in "hit"'
                ],
                correct: 'Like "e" with rounded lips',
                explanation: 'The "ö" sound is made by positioning your mouth to say "e" while rounding your lips.'
              }
            ]
          })
        ]
      },
      {
        id: 'module-2',
        title: 'Week 2: Basic Conversations',
        description: 'Learn essential phrases for basic conversations',
        progress: 0,
        lessons: [
          createLesson('lesson-2-1', 'Personal Pronouns & Introductions', '45 min', 'video', {
            introduction: 'Learn how to introduce yourself and use personal pronouns',
            sections: [
              {
                title: 'Personal Pronouns',
                items: [
                  { german: 'ich', english: 'I', example: 'Ich heiße Anna.', usage: 'First person singular' },
                  { german: 'du', english: 'you', example: 'Wie heißt du?', usage: 'Second person singular (informal)' },
                  { german: 'Sie', english: 'you', example: 'Wie heißen Sie?', usage: 'Second person singular/plural (formal)' }
                ]
              },
              {
                title: 'Introduction Phrases',
                items: [
                  { german: 'Ich heiße...', english: 'My name is...', example: 'Ich heiße Thomas.' },
                  { german: 'Ich komme aus...', english: 'I come from...', example: 'Ich komme aus Deutschland.' },
                  { german: 'Ich wohne in...', english: 'I live in...', example: 'Ich wohne in Berlin.' }
                ]
              }
            ],
            quiz: [
              {
                question: 'When should you use "Sie" instead of "du"?',
                options: [
                  'With friends',
                  'With family members',
                  'With professors and strangers',
                  'With children'
                ],
                correct: 'With professors and strangers',
                explanation: 'Use "Sie" in formal situations, with strangers, and people of authority.'
              }
            ]
          })
        ]
      },
      {
        id: 'module-3',
        title: 'Week 3: Numbers & Time',
        description: 'Master numbers and telling time in German',
        progress: 0,
        lessons: [
          createLesson('lesson-3-1', 'Numbers 1-100', '40 min', 'video', {
            introduction: 'Learn to count and use numbers in German',
            sections: [
              {
                title: 'Numbers 1-20',
                items: [
                  { german: 'eins', english: '1', example: 'Ich habe ein Buch.' },
                  { german: 'zwei', english: '2', example: 'Zwei Kaffee, bitte.' },
                  { german: 'drei', english: '3', example: 'Drei Tage.' }
                ]
              },
              {
                title: 'Telling Time',
                items: [
                  { german: 'Wie spät ist es?', english: 'What time is it?', example: 'Es ist drei Uhr.' },
                  { german: 'halb', english: 'half past', example: 'Es ist halb vier. (3:30)' },
                  { german: 'Viertel nach', english: 'quarter past', example: 'Es ist Viertel nach drei. (3:15)' }
                ]
              }
            ],
            quiz: [
              {
                question: 'How do you say "half past three" in German?',
                options: [
                  'halb drei',
                  'halb vier',
                  'drei halb',
                  'vier halb'
                ],
                correct: 'halb vier',
                explanation: 'In German, "halb" refers to the upcoming hour, so "halb vier" means "half past three".'
              }
            ]
          })
        ]
      },
      {
        id: 'module-4',
        title: 'Week 4: Daily Activities',
        description: 'Learn to describe your daily routine',
        progress: 0,
        lessons: [
          createLesson('lesson-4-1', 'Daily Routine Verbs', '45 min', 'video', {
            introduction: 'Master common verbs to describe your daily activities',
            sections: [
              {
                title: 'Morning Routine',
                items: [
                  { german: 'aufstehen', english: 'to wake up', example: 'Ich stehe um 7 Uhr auf.' },
                  { german: 'frühstücken', english: 'to have breakfast', example: 'Ich frühstücke um 8 Uhr.' },
                  { german: 'sich anziehen', english: 'to get dressed', example: 'Ich ziehe mich an.' }
                ]
              },
              {
                title: 'Regular Verbs Conjugation',
                items: [
                  { german: 'spielen', english: 'to play', example: 'ich spiele, du spielst, er/sie/es spielt' },
                  { german: 'lernen', english: 'to learn', example: 'ich lerne, du lernst, er/sie/es lernt' },
                  { german: 'arbeiten', english: 'to work', example: 'ich arbeite, du arbeitest, er/sie/es arbeitet' }
                ]
              }
            ],
            quiz: [
              {
                question: 'What is the correct conjugation of "spielen" for "you" (informal)?',
                options: [
                  'spiele',
                  'spielst',
                  'spielt',
                  'spielen'
                ],
                correct: 'spielst',
                explanation: 'For "du" (informal you), add "-st" to the verb stem.'
              }
            ]
          })
        ]
      }
    ]
  },
  'a2-everyday': {
    title: 'Everyday German (A2)',
    description: 'Build upon your basic knowledge and learn to communicate in everyday situations',
    duration: '4 weeks',
    students: 987,
    modules: [
      {
        id: 'module-1',
        title: 'Week 1: Daily Life & Routines',
        description: 'Express daily activities and routines in more detail',
        progress: 0,
        lessons: [
          createLesson('lesson-1-1', 'Complex Daily Routines', '45 min', 'video', {
            introduction: 'Learn to describe your daily activities in more detail using separable verbs and time expressions',
            sections: [
              {
                title: 'Separable Verbs',
                items: [
                  { german: 'aufwachen', english: 'to wake up', example: 'Ich wache um 7 Uhr auf.', usage: 'auf + wachen' },
                  { german: 'einkaufen', english: 'to go shopping', example: 'Ich kaufe am Samstag ein.', usage: 'ein + kaufen' },
                  { german: 'fernsehen', english: 'to watch TV', example: 'Ich sehe abends fern.', usage: 'fern + sehen' }
                ]
              },
              {
                title: 'Time Expressions',
                items: [
                  { german: 'jeden Tag', english: 'every day', example: 'Ich gehe jeden Tag zur Arbeit.' },
                  { german: 'manchmal', english: 'sometimes', example: 'Manchmal koche ich am Wochenende.' },
                  { german: 'normalerweise', english: 'usually', example: 'Normalerweise stehe ich früh auf.' }
                ]
              }
            ],
            quiz: [
              {
                question: 'How do you say "I go shopping on Saturdays"?',
                options: [
                  'Ich kaufe am Samstag ein',
                  'Ich einkaufe am Samstag',
                  'Ich kaufe ein am Samstag',
                  'Am Samstag einkaufe ich'
                ],
                correct: 'Ich kaufe am Samstag ein',
                explanation: 'With separable verbs, the prefix (ein-) goes to the end of the sentence in present tense.'
              }
            ]
          }),
          createLesson('lesson-1-2', 'Household Activities', '40 min', 'video', {
            introduction: 'Learn vocabulary and phrases for household chores and activities',
            sections: [
              {
                title: 'Household Chores',
                items: [
                  { german: 'die Wäsche waschen', english: 'to do laundry', example: 'Ich wasche die Wäsche am Montag.' },
                  { german: 'den Tisch decken', english: 'to set the table', example: 'Kannst du bitte den Tisch decken?' },
                  { german: 'staubsaugen', english: 'to vacuum', example: 'Ich staubsauge das Wohnzimmer.' }
                ]
              }
            ],
            quiz: [
              {
                question: 'Which verb means "to vacuum"?',
                options: ['waschen', 'staubsaugen', 'decken', 'kochen'],
                correct: 'staubsaugen',
                explanation: 'Staubsaugen is a compound word: Staub (dust) + saugen (to suck).'
              }
            ]
          })
        ]
      },
      {
        id: 'module-2',
        title: 'Week 2: Shopping & Services',
        description: 'Learn to navigate shops and services in German',
        progress: 0,
        lessons: [
          createLesson('lesson-2-1', 'Shopping Conversations', '45 min', 'video', {
            introduction: 'Master shopping dialogues and learn to express preferences',
            sections: [
              {
                title: 'Shopping Phrases',
                items: [
                  { german: 'Ich suche...', english: 'I\'m looking for...', example: 'Ich suche ein rotes Hemd.' },
                  { german: 'Haben Sie...?', english: 'Do you have...?', example: 'Haben Sie das in meiner Größe?' },
                  { german: 'Das gefällt mir', english: 'I like this', example: 'Das gefällt mir sehr gut.' }
                ]
              },
              {
                title: 'Prices & Numbers',
                items: [
                  { german: 'Das kostet...', english: 'This costs...', example: 'Das kostet neunzehn Euro neunzig.' },
                  { german: 'zu teuer', english: 'too expensive', example: 'Das ist mir zu teuer.' },
                  { german: 'im Angebot', english: 'on sale', example: 'Ist das im Angebot?' }
                ]
              }
            ],
            quiz: [
              {
                question: 'How do you ask "Do you have this in my size?"',
                options: [
                  'Wo ist meine Größe?',
                  'Haben Sie das in meiner Größe?',
                  'Ist das meine Größe?',
                  'Können Sie die Größe finden?'
                ],
                correct: 'Haben Sie das in meiner Größe?',
                explanation: 'This is the polite way to ask about size availability in German shops.'
              }
            ]
          })
        ]
      },
      {
        id: 'module-3',
        title: 'Week 3: Travel & Directions',
        description: 'Learn to navigate and travel in German-speaking countries',
        progress: 0,
        lessons: [
          createLesson('lesson-3-1', 'Transportation & Tickets', '50 min', 'video', {
            introduction: 'Learn to buy tickets and use public transportation',
            sections: [
              {
                title: 'Transportation Vocabulary',
                items: [
                  { german: 'die Fahrkarte', english: 'ticket', example: 'Eine Fahrkarte nach Berlin, bitte.' },
                  { german: 'der Bahnsteig', english: 'platform', example: 'Der Zug fährt von Bahnsteig 3 ab.' },
                  { german: 'umsteigen', english: 'to change (trains/buses)', example: 'Sie müssen in München umsteigen.' }
                ]
              },
              {
                title: 'Asking for Directions',
                items: [
                  { german: 'Wie komme ich zum...?', english: 'How do I get to...?', example: 'Wie komme ich zum Hauptbahnhof?' },
                  { german: 'geradeaus', english: 'straight ahead', example: 'Gehen Sie geradeaus bis zur Ampel.' },
                  { german: 'die nächste Straße', english: 'the next street', example: 'Biegen Sie in die nächste Straße rechts ab.' }
                ]
              }
            ],
            quiz: [
              {
                question: 'How do you ask for a ticket to Berlin?',
                options: [
                  'Ich will nach Berlin',
                  'Eine Fahrkarte nach Berlin, bitte',
                  'Berlin, bitte',
                  'Geben Sie mir Berlin'
                ],
                correct: 'Eine Fahrkarte nach Berlin, bitte',
                explanation: 'This is the polite and correct way to ask for a ticket in German.'
              }
            ]
          })
        ]
      },
      {
        id: 'module-4',
        title: 'Week 4: Social Interactions',
        description: 'Master social situations and casual conversations',
        progress: 0,
        lessons: [
          createLesson('lesson-4-1', 'Making Plans & Invitations', '45 min', 'video', {
            introduction: 'Learn to make plans and respond to invitations',
            sections: [
              {
                title: 'Making Plans',
                items: [
                  { german: 'Hast du Lust...?', english: 'Would you like to...?', example: 'Hast du Lust, ins Kino zu gehen?' },
                  { german: 'Wann passt es dir?', english: 'When suits you?', example: 'Wann passt es dir am besten?' },
                  { german: 'Treffen wir uns...', english: 'Let\'s meet...', example: 'Treffen wir uns um 19 Uhr?' }
                ]
              },
              {
                title: 'Responses',
                items: [
                  { german: 'Das klingt gut', english: 'That sounds good', example: 'Ja, das klingt gut!' },
                  { german: 'Tut mir leid, aber...', english: 'I\'m sorry, but...', example: 'Tut mir leid, aber ich habe keine Zeit.' },
                  { german: 'Vielleicht ein andermal', english: 'Maybe another time', example: 'Vielleicht ein andermal, diese Woche bin ich sehr beschäftigt.' }
                ]
              }
            ],
            quiz: [
              {
                question: 'How do you ask someone if they would like to go to the cinema?',
                options: [
                  'Willst du Kino?',
                  'Hast du Lust, ins Kino zu gehen?',
                  'Gehen wir Kino?',
                  'Kino, bitte?'
                ],
                correct: 'Hast du Lust, ins Kino zu gehen?',
                explanation: 'This is a polite and natural way to invite someone to the cinema in German.'
              }
            ]
          })
        ]
      }
    ]
  },
  'b1-intermediate': {
  title: 'Intermediate German (B1)',
  description: 'Advance your German skills with complex grammar, professional vocabulary, and cultural insights',
  duration: '4 weeks',
  students: 756,
  modules: [
    {
      id: 'module-1',
      title: 'Week 1: Professional Communication',
      description: 'Master formal communication in professional settings',
      progress: 0,
      lessons: [
        createLesson('lesson-1-1', 'Business German Essentials', '50 min', 'video', {
          introduction: 'Learn essential vocabulary and phrases for professional environments',
          sections: [
            {
              title: 'Professional Greetings & Introductions',
              items: [
                { german: 'Sehr geehrte Damen und Herren', english: 'Dear Sir/Madam', example: 'Sehr geehrte Damen und Herren, ich schreibe Ihnen bezüglich...', usage: 'Formal letter opening' },
                { german: 'Mit freundlichen Grüßen', english: 'Kind regards', example: 'Mit freundlichen Grüßen\nThomas Schmidt', usage: 'Formal letter closing' },
                { german: 'Ich freue mich darauf, von Ihnen zu hören', english: 'I look forward to hearing from you', example: 'Ich freue mich darauf, von Ihnen zu hören und verbleibe mit freundlichen Grüßen.' }
              ]
            },
            {
              title: 'Business Vocabulary',
              items: [
                { german: 'die Besprechung', english: 'meeting', example: 'Die Besprechung findet um 14 Uhr statt.', usage: 'Professional context' },
                { german: 'der Geschäftsführer', english: 'managing director', example: 'Herr Müller ist unser neuer Geschäftsführer.', usage: 'Company hierarchy' },
                { german: 'die Präsentation', english: 'presentation', example: 'Ich halte morgen eine Präsentation über unser neues Projekt.' }
              ]
            }
          ],
          quiz: [
            {
              question: 'Which is the correct formal letter opening in German?',
              options: [
                'Hallo zusammen',
                'Sehr geehrte Damen und Herren',
                'Liebe Grüße',
                'Guten Tag'
              ],
              correct: 'Sehr geehrte Damen und Herren',
              explanation: 'This is the standard formal opening for business letters in German.'
            }
          ]
        }),
        createLesson('lesson-1-2', 'Email Communication', '45 min', 'video', {
          introduction: 'Master professional email writing in German',
          sections: [
            {
              title: 'Email Structure',
              items: [
                { german: 'Betreff', english: 'Subject line', example: 'Betreff: Anfrage bezüglich des Projekts', usage: 'Email header' },
                { german: 'Bezugnehmend auf', english: 'Referring to', example: 'Bezugnehmend auf unser Telefonat vom 15. März...', usage: 'Reference previous communication' },
                { german: 'im Anhang finden Sie', english: 'in the attachment you will find', example: 'Im Anhang finden Sie die angeforderten Unterlagen.' }
              ]
            }
          ],
          quiz: [
            {
              question: 'How do you say "Please find attached" in formal German?',
              options: [
                'Hier ist',
                'Im Anhang finden Sie',
                'Schauen Sie',
                'Bitte sehen'
              ],
              correct: 'Im Anhang finden Sie',
              explanation: 'This is the formal way to refer to attachments in German business emails.'
            }
          ]
        })
      ]
    },
    {
      id: 'module-2',
      title: 'Week 2: Advanced Grammar',
      description: 'Master complex grammatical structures',
      progress: 0,
      lessons: [
        createLesson('lesson-2-1', 'Passive Voice', '55 min', 'video', {
          introduction: 'Learn to use passive voice in German',
          sections: [
            {
              title: 'Present Passive',
              items: [
                { german: 'Das Haus wird gebaut', english: 'The house is being built', example: 'Das neue Bürogebäude wird nächstes Jahr gebaut.', usage: 'Present passive construction' },
                { german: 'Der Brief wird geschrieben', english: 'The letter is being written', example: 'Der Vertrag wird gerade von unserem Anwalt geschrieben.' }
              ]
            },
            {
              title: 'Past Passive',
              items: [
                { german: 'Das Haus wurde gebaut', english: 'The house was built', example: 'Das Gebäude wurde letztes Jahr fertiggestellt.' },
                { german: 'Die Entscheidung wurde getroffen', english: 'The decision was made', example: 'Die Entscheidung wurde in der letzten Sitzung getroffen.' }
              ]
            }
          ],
          quiz: [
            {
              question: 'Convert to passive: "Sie bauen das Haus" (They are building the house)',
              options: [
                'Das Haus baut',
                'Das Haus wird gebaut',
                'Das Haus ist gebaut',
                'Das Haus bauen'
              ],
              correct: 'Das Haus wird gebaut',
              explanation: 'Present passive is formed with "werden" + past participle.'
            }
          ]
        })
      ]
    },
    {
      id: 'module-3',
      title: 'Week 3: Complex Conversations',
      description: 'Handle complex social and professional situations',
      progress: 0,
      lessons: [
        createLesson('lesson-3-1', 'Expressing Opinions & Arguments', '45 min', 'video', {
          introduction: 'Learn to express and defend opinions in German',
          sections: [
            {
              title: 'Opinion Phrases',
              items: [
                { german: 'Meiner Meinung nach', english: 'In my opinion', example: 'Meiner Meinung nach sollten wir die Strategie überdenken.' },
                { german: 'Ich bin der Ansicht, dass', english: 'I am of the view that', example: 'Ich bin der Ansicht, dass wir mehr Zeit brauchen.' },
                { german: 'Einerseits... andererseits', english: 'On one hand... on the other hand', example: 'Einerseits ist es teuer, andererseits ist es eine gute Investition.' }
              ]
            }
          ],
          quiz: [
            {
              question: 'Which phrase introduces a contrasting opinion?',
              options: [
                'Meiner Meinung nach',
                'Ich denke',
                'Andererseits',
                'Auf jeden Fall'
              ],
              correct: 'Andererseits',
              explanation: '"Andererseits" is used to introduce a contrasting viewpoint.'
            }
          ]
        })
      ]
    },
    {
      id: 'module-4',
      title: 'Week 4: Cultural Competence',
      description: 'Understand and navigate German cultural contexts',
      progress: 0,
      lessons: [
        createLesson('lesson-4-1', 'Business Culture & Etiquette', '50 min', 'video', {
          introduction: 'Master German business culture and professional etiquette',
          sections: [
            {
              title: 'Business Customs',
              items: [
                { german: 'das Siezen', english: 'formal address', example: 'In deutschen Unternehmen ist das Siezen üblich.', usage: 'Professional context' },
                { german: 'der Handschlag', english: 'handshake', example: 'Ein fester Handschlag ist in Deutschland üblich.', usage: 'Greeting etiquette' },
                { german: 'die Pünktlichkeit', english: 'punctuality', example: 'Pünktlichkeit ist in der deutschen Geschäftswelt sehr wichtig.' }
              ]
            }
          ],
          quiz: [
            {
              question: 'What is considered polite in German business meetings?',
              options: [
                'Being 5 minutes late',
                'Using informal language',
                'Strict punctuality',
                'Casual dress'
              ],
              correct: 'Strict punctuality',
              explanation: 'Punctuality is highly valued in German business culture.'
            }
          ]
        })
      ]
    }
  ]
},
  'b2-advanced': {
  title: 'Advanced German (B2)',
  description: 'Master complex German grammar, professional communication, and advanced cultural topics',
  duration: '4 weeks',
  students: 543,
  modules: [
    {
      id: 'module-1',
      title: 'Week 1: Advanced Grammar & Style',
      description: 'Master complex grammatical structures and sophisticated writing styles',
      progress: 0,
      lessons: [
        createLesson('lesson-1-1', 'Subjunctive Mood (Konjunktiv II)', '60 min', 'video', {
          introduction: 'Master the subjunctive mood for hypothetical situations and polite requests',
          sections: [
            {
              title: 'Hypothetical Situations',
              items: [
                { german: 'Wenn ich Zeit hätte...', english: 'If I had time...', example: 'Wenn ich Zeit hätte, würde ich mehr reisen.', usage: 'Expressing wishes/hypotheticals' },
                { german: 'An deiner Stelle würde ich...', english: 'In your place, I would...', example: 'An deiner Stelle würde ich früher anfangen.', usage: 'Giving advice' },
                { german: 'Es wäre schön, wenn...', english: 'It would be nice if...', example: 'Es wäre schön, wenn du mitkommen könntest.', usage: 'Expressing wishes' }
              ]
            },
            {
              title: 'Polite Requests',
              items: [
                { german: 'Könnten Sie bitte...', english: 'Could you please...', example: 'Könnten Sie bitte das Fenster öffnen?', usage: 'Formal requests' },
                { german: 'Wären Sie so freundlich...', english: 'Would you be so kind...', example: 'Wären Sie so freundlich, mir zu helfen?', usage: 'Very formal requests' },
                { german: 'Dürfte ich Sie bitten...', english: 'May I ask you...', example: 'Dürfte ich Sie bitten, leiser zu sprechen?', usage: 'Formal requests' }
              ]
            }
          ],
          quiz: [
            {
              question: 'Transform: "Ich habe keine Zeit" to subjunctive (If I had time...)',
              options: [
                'Wenn ich Zeit habe',
                'Wenn ich Zeit hätte',
                'Wenn ich Zeit hatte',
                'Wenn ich Zeit haben'
              ],
              correct: 'Wenn ich Zeit hätte',
              explanation: 'The subjunctive II form of "haben" is "hätte" for hypothetical situations.'
            }
          ]
        }),
        createLesson('lesson-1-2', 'Advanced Sentence Structure', '55 min', 'video', {
          introduction: 'Learn to construct complex sentences with multiple clauses and sophisticated conjunctions',
          sections: [
            {
              title: 'Complex Conjunctions',
              items: [
                { german: 'insofern als', english: 'insofar as', example: 'Das Projekt ist wichtig, insofern als es neue Arbeitsplätze schafft.', usage: 'Expressing relationships' },
                { german: 'geschweige denn', english: 'let alone/not to mention', example: 'Er kann kaum laufen, geschweige denn rennen.', usage: 'Emphasizing impossibility' },
                { german: 'es sei denn', english: 'unless', example: 'Ich komme nicht, es sei denn, du holst mich ab.', usage: 'Expressing conditions' }
              ]
            }
          ],
          quiz: [
            {
              question: 'Which conjunction means "unless"?',
              options: [
                'insofern als',
                'geschweige denn',
                'es sei denn',
                'soweit'
              ],
              correct: 'es sei denn',
              explanation: '"Es sei denn" is used to express "unless" in German, introducing an exception to a statement.'
            }
          ]
        })
      ]
    },
    {
      id: 'module-2',
      title: 'Week 2: Professional Communication',
      description: 'Master business German and professional presentations',
      progress: 0,
      lessons: [
        createLesson('lesson-2-1', 'Business Presentations', '50 min', 'video', {
          introduction: 'Learn to give professional presentations in German',
          sections: [
            {
              title: 'Presentation Structure',
              items: [
                { german: 'Ich möchte Ihnen heute...vorstellen', english: 'Today I would like to present...', example: 'Ich möchte Ihnen heute unsere neue Strategie vorstellen.', usage: 'Introduction' },
                { german: 'Lassen Sie mich zunächst...', english: 'Let me first...', example: 'Lassen Sie mich zunächst einen Überblick geben.', usage: 'Starting presentation' },
                { german: 'Zusammenfassend lässt sich sagen', english: 'In summary', example: 'Zusammenfassend lässt sich sagen, dass die Ergebnisse positiv sind.', usage: 'Conclusion' }
              ]
            },
            {
              title: 'Handling Questions',
              items: [
                { german: 'Was Ihre Frage betrifft...', english: 'Regarding your question...', example: 'Was Ihre Frage betrifft, lassen Sie mich das näher erläutern.', usage: 'Answering questions' },
                { german: 'Darauf komme ich später zurück', english: 'I ll come back to that later', example: 'Darauf komme ich im nächsten Abschnitt zurück.', usage: 'Deferring questions' }
              ]
            }
          ],
          quiz: [
            {
              question: 'Which phrase is used to introduce a presentation?',
              options: [
                'Zusammenfassend lässt sich sagen',
                'Darauf komme ich später zurück',
                'Ich möchte Ihnen heute...vorstellen',
                'Was Ihre Frage betrifft'
              ],
              correct: 'Ich möchte Ihnen heute...vorstellen',
              explanation: 'This is the standard phrase used to begin a presentation in German.'
            }
          ]
        })
      ]
    },
    {
      id: 'module-3',
      title: 'Week 3: Academic German',
      description: 'Master academic writing and discussion',
      progress: 0,
      lessons: [
        createLesson('lesson-3-1', 'Academic Writing', '55 min', 'video', {
          introduction: 'Learn the conventions of German academic writing',
          sections: [
            {
              title: 'Academic Phrases',
              items: [
                { german: 'In Anlehnung an', english: 'Following/Based on', example: 'In Anlehnung an Schmidts Theorie...', usage: 'Referencing' },
                { german: 'Es lässt sich feststellen, dass', english: 'It can be determined that', example: 'Es lässt sich feststellen, dass die Hypothese zutrifft.', usage: 'Stating findings' },
                { german: 'Dies deutet darauf hin, dass', english: 'This suggests that', example: 'Dies deutet darauf hin, dass weitere Forschung nötig ist.', usage: 'Drawing conclusions' }
              ]
            }
          ],
          quiz: [
            {
              question: 'Which phrase is used for referencing other work?',
              options: [
                'Es lässt sich feststellen',
                'In Anlehnung an',
                'Dies deutet darauf hin',
                'Zusammenfassend'
              ],
              correct: 'In Anlehnung an',
              explanation: '"In Anlehnung an" is used when referencing or building upon existing work or theories.'
            }
          ]
        })
      ]
    },
    {
      id: 'module-4',
      title: 'Week 4: Cultural Analysis',
      description: 'Analyze and discuss complex cultural topics',
      progress: 0,
      lessons: [
        createLesson('lesson-4-1', 'Contemporary German Society', '50 min', 'video', {
          introduction: 'Analyze and discuss current social issues in German-speaking countries',
          sections: [
            {
              title: 'Social Discourse',
              items: [
                { german: 'Es herrscht Einigkeit darüber, dass', english: 'There is consensus that', example: 'Es herrscht Einigkeit darüber, dass Reformen notwendig sind.', usage: 'Discussing consensus' },
                { german: 'Ein strittiger Punkt ist', english: 'A contentious point is', example: 'Ein strittiger Punkt ist die Umsetzung der neuen Politik.', usage: 'Discussing controversies' },
                { german: 'Dies spiegelt sich wider in', english: 'This is reflected in', example: 'Dies spiegelt sich wider in den aktuellen Statistiken.', usage: 'Making connections' }
              ]
            }
          ],
          quiz: [
            {
              question: 'How do you express that something is controversial?',
              options: [
                'Es herrscht Einigkeit',
                'Ein strittiger Punkt ist',
                'Dies spiegelt sich wider',
                'Es ist klar'
              ],
              correct: 'Ein strittiger Punkt ist',
              explanation: '"Ein strittiger Punkt ist" is used to introduce controversial or debated topics.'
            }
          ]
        })
      ]
    }
  ]
},
};