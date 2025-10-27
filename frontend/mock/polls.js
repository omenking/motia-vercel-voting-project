function formatTimestamp(date) {
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  const hours = String(date.getUTCHours()).padStart(2, '0')
  const minutes = String(date.getUTCMinutes()).padStart(2, '0')
  
  return `${year}-${month}-${day} ${hours}:${minutes} +0000`
}

function mockVotesData(total_votes_count, choices) {
  const votes = [];
  const now = new Date();
  const twoWeeksAgo = new Date(now);
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
  
  // Calculate votes per choice based on their votes_count
  const totalChoiceVotes = choices.reduce((sum, choice) => sum + choice.votes_count, 0);
  
  // Generate votes for each choice
  choices.forEach(choice => {
    const choiceVoteCount = choice.votes_count;
    
    for (let i = 0; i < choiceVoteCount; i++) {
      // Generate random timestamp between two weeks ago and now
      // Using a weighted distribution that creates more recent votes
      const timeDiff = now.getTime() - twoWeeksAgo.getTime();
      const randomFactor = Math.pow(Math.random(), 0.7); // Bias towards more recent votes
      const randomTime = twoWeeksAgo.getTime() + (timeDiff * randomFactor);
      const created_at = new Date(randomTime).toISOString();
      
      votes.push({
        choice_uuid: choice.uuid,
        created_at: created_at
      });
    }
  });
  
  // Sort votes by timestamp
  votes.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  
  return votes;
}

export default [
  {
    url: '/api/polls/:id',
    method: 'get',
    response: ({ query, body, params }) => {
      return {
        code: 0,
        data: { 
          uuid: '80e837f0-08c9-4247-b9ce-25169b50f733', 
          name: 'What is your faviroute cloud provider?' ,
          votes_count: 124,
          description: "I want to know what is your faviroute so I can decide what to make my next free bootcamp about.",
          choices: [
            { votes_count: 50, uuid: "f3d87041-c752-405a-98b2-5f175f1e1ff9", name: "AWS" },
            { votes_count: 40, uuid: "95cbfb48-762b-4e11-b2b9-92399ac138a8", name: "Azure" },
            { votes_count: 34, uuid: "bdbf6726-de0a-4107-9b30-8506538f5175", name: "GCP" }
          ]
        }
      }
    }
  },
  {
    url: '/api/admin/polls',
    method: 'get',
    response: ({ query, body, params }) => {
      const twoWeeksFromNow = new Date()
      twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14)
      const timestamp = formatTimestamp(twoWeeksFromNow)
      return {
        code: 0,
        data: [{ 
          id: 1,
          uuid: '80e837f0-08c9-4247-b9ce-25169b50f733', 
          name: 'What is your faviroute cloud provider?' ,
          published: true,
          expires_at: timestamp,
          votes_count: 124,
        }]
      }
    }
  },
  {
    url: '/api/admin/polls/:id/edit',
    method: 'get',
    response: ({ query, body, params }) => {
      const twoWeeksFromNow = new Date()
      twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14)
      const timestamp = formatTimestamp(twoWeeksFromNow)
      return {
        code: 0,
        data: { 
          id: 1,
          name: 'What is your faviroute cloud provider?' ,
          description: '...',
          published: true,
          expires_hours: 24,
          choices: [
            { uuid: "f3d87041-c752-405a-98b2-5f175f1e1ff9", name: "AWS" },
            { uuid: "95cbfb48-762b-4e11-b2b9-92399ac138a8", name: "Azure" },
            { uuid: "bdbf6726-de0a-4107-9b30-8506538f5175", name: "GCP" }
          ]
        }
      }
    }
  },
  {
    url: '/api/admin/polls/:id',
    method: 'get',
    response: ({ query, body, params }) => {
      const twoWeeksFromNow = new Date()
      twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14)
      const timestamp = formatTimestamp(twoWeeksFromNow)
      const choices = [
        { votes_count: 50, uuid: "f3d87041-c752-405a-98b2-5f175f1e1ff9", name: "AWS" },
        { votes_count: 40, uuid: "95cbfb48-762b-4e11-b2b9-92399ac138a8", name: "Azure" },
        { votes_count: 34, uuid: "bdbf6726-de0a-4107-9b30-8506538f5175", name: "GCP" }
      ]
      return {
        code: 0,
        data: { 
          id: 1,
          uuid: '80e837f0-08c9-4247-b9ce-25169b50f733', 
          name: 'What is your faviroute cloud provider?' ,
          published: true,
          expires_at: timestamp,
          description: "...",
          votes_count: 124,
          choices: choices,
          votes: mockVotesData(124, choices)
        }
      }
    }
  },
  {
    url: '/api/admin/polls',
    method: 'post',
    response: ({ query, body, params }) => {
      return {
        code: 0,
        data: { 
          id: 1
        }
      }
    }
  },
  {
    url: '/api/admin/polls/:id',
    method: 'put',
    response: ({ query, body, params }) => {
      //return {
      //  code: 0,
      //  data: { 
      //    id: 1
      //  }
      //}
      return {
        code: 422,
        errors: {
          name: ["can't be blank"],
          description: ["is too long (maximum is 500 characters)"],
          expires_hours: ["must be selected"],
          choices: ["must have at least 2 choices"],
          "choices[0].name": ["can't be blank"],
          "choices[1].name": ["is too short (minimum is 2 characters)"],
          "choices[2].name": ["has already been taken"]
        }
      }
    }
  },
]