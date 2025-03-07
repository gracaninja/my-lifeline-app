// Predefined events for testing the interface
const predefinedEvents = {
    "testuser": {
        "birthdate": "1990-01-01",
        "lifeExpectancy": 80,
        "milestones": [
            {
                "type": "point",
                "date": "1990-01-01",
                "title": "Born",
                "category": "family",
                "description": "Born in New York City"
            },
            {
                "type": "period",
                "startDate": "1995-09-01",
                "endDate": "2008-06-15",
                "ongoing": false,
                "title": "School Education",
                "category": "education",
                "description": "Primary and secondary education"
            },
            {
                "type": "point",
                "date": "2008-06-15",
                "title": "High School Graduation",
                "category": "education",
                "description": "Graduated with honors"
            },
            {
                "type": "period",
                "startDate": "2008-09-01",
                "endDate": "2012-05-20",
                "ongoing": false,
                "title": "University",
                "category": "education",
                "description": "Bachelor's degree in Computer Science"
            },
            {
                "type": "point",
                "date": "2012-05-20",
                "title": "College Graduation",
                "category": "education",
                "description": "Graduated with honors in Computer Science"
            },
            {
                "type": "period",
                "startDate": "2012-06-01",
                "endDate": "2015-12-31",
                "ongoing": false,
                "title": "Junior Developer",
                "category": "career",
                "description": "First job as a software developer"
            },
            {
                "type": "point",
                "date": "2015-06-20",
                "title": "Got Married",
                "category": "family",
                "description": "Married my best friend"
            },
            {
                "type": "period",
                "startDate": "2016-01-15",
                "endDate": "2019-03-31",
                "ongoing": false,
                "title": "Senior Developer",
                "category": "career",
                "description": "Promoted to senior developer position"
            },
            {
                "type": "point",
                "date": "2017-09-12",
                "title": "First Child Born",
                "category": "family",
                "description": "Birth of my daughter"
            },
            {
                "type": "period",
                "startDate": "2019-04-15",
                "endDate": null,
                "ongoing": true,
                "title": "Tech Lead",
                "category": "career",
                "description": "Leading development team on enterprise applications"
            },
            {
                "type": "point",
                "date": "2020-03-10",
                "title": "Second Child Born",
                "category": "family",
                "description": "Birth of my son"
            },
            {
                "type": "period",
                "startDate": "2021-09-01",
                "endDate": "2023-06-30",
                "ongoing": false,
                "title": "Part-time MBA",
                "category": "education",
                "description": "Studied business administration while working"
            },
            {
                "type": "point",
                "date": "2022-07-15",
                "title": "Bought First House",
                "category": "other",
                "description": "Purchased a home in the suburbs"
            }
        ]
    }
};

// Function to load predefined events for a user
function loadPredefinedEvents(username) {
    if (predefinedEvents[username]) {
        return predefinedEvents[username];
    }
    return null;
}