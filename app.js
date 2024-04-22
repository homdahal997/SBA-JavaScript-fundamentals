// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        {
            id: 1,
            name: "Declare a Variable",
            due_at: "2023-01-25",
            points_possible: 50
        },
        {
            id: 2,
            name: "Write a Function",
            due_at: "2023-02-27",
            points_possible: 150
        },
        {
            id: 3,
            name: "Code the World",
            due_at: "3156-11-15",
            points_possible: 500
        }
    ]
};

// The provided learner submission data.
const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-25",
            score: 47
        }
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-02-12",
            score: 150
        }
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
            submitted_at: "2023-01-25",
            score: 400
        }
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-24",
            score: 39
        }
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-03-07",
            score: 140
        }
    }
];

// Function to initialize a new learner object
function initializeLearner(learnerId) {
    return {
        id: learnerId, // ID of the learner
        totalScore: 0, // total score of the learner
        totalPossible: 0, // total possible points the learner can earn
        assignments: {}, // object to store the assignments of learner
    };
}

// function to validate due date
function isFutureDate(date) {
    return new Date(date) > new Date();
}


function getLearnerData(course, ag, submissions) {
    // Check if course id matches with assignment group'S course id
    if (course.id !== ag.course_id) {
        console.error("Mismatching course_id in AssignmentGroup");
        return [];
    }
    // Initialize learners object
    let learners = {};
    // Iterate over each submission
    for (let submission of submissions) {
        // Extrate learnerId, assignmentId and score from learners Submission
        let learnerId = submission.learner_id;
        let assignmentId = submission.assignment_id;
        let score = submission.submission.score;

        // Find the corresponding assignment in the assignment group
        let assignment = ag.assignments.find((a) => a.id === assignmentId); // check if id prop of obj 'a' is equal to assignmentId

        // check if assignment due date is a future date, if so ignore it.
        if (isFutureDate(assignment.due_at)) {
            continue;
        }

        // check and deduct 10% if submission is late
        // if (new Date(submissions.submission.submitted_at) > new Date(assignment.due_at)) {
        //     score -= score * 0.1;
        // }

        // If learner with the given learner Id not present,
        // initialize a new learner object and add to learners object.
        if (!learners[learnerId]) {
            learners[learnerId] = initializeLearner(learnerId);
        }

        // Convert the points_possible to number data .
        let pointsPossible = Number(assignment.points_possible);

        // Check if possible point is zero or NaN.
        if (isNaN(pointsPossible) || pointsPossible === 0) {
            // If it is, log show error and continue.
            console.error("Invalid points_possible value");
            continue;
        }

        // get total score for learner with given learnerId.
        learners[learnerId].totalScore += score;

        // Add point possible for current assignment to totalPossible.
        learners[learnerId].totalPossible += pointsPossible;

        // Individual score for learner in each assignment
        learners[learnerId].assignments[assignmentId] = score / pointsPossible;
        
        // Map over the values of learners object
        return Object.values(learners).map((learner) => {
            // validate possible point if zero
            if (learner.totalPossible === 0) {
                console.error("Total possible points for a learner is zero");
                // in the case of zero, set larner avg to 0
                learner.avg = 0;
            } else {
                // if not calculat lerners average
                learner.avg = learner.totalScore / learner.totalPossible;
            }
            // return 
            return learner;
        });



    }
    // here, we would process this data to achieve the desired result.
    // const result = [
    //     {
    //         id: 125,
    //         avg: 0.985, // (47 + 150) / (50 + 150)
    //         1: 0.94, // 47 / 50
    //         2: 1.0 // 150 / 150
    //     },
    //     {
    //         id: 132,
    //         avg: 0.82, // (39 + 125) / (50 + 150)
    //         1: 0.78, // 39 / 50
    //         2: 0.833 // late: (140 - 15) / 150
    //     }
    // ];

    // return result;
}// end getLearnerData Function

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);
