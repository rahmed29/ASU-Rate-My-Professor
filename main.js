let hasChangedPage
//currently working auth token
let auth = "dGVzdDp0ZXN0" 
let fetchedScores = []

getAuth()

async function getAuth() {
    const init = await fetch("https://www.ratemyprofessors.com/", {
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
        }
    })
    if(init.ok) {
        let desired = '"REACT_APP_GRAPHQL_AUTH":"';
        let responseBody = await init.text();
        let str = "";
        let start = responseBody.indexOf(desired) + desired.length;
        let end = start;
        for(let i = start, n = responseBody.length; i < n; i++)
        {
            if(responseBody.substring(i,i+1) == '"') {
                str = responseBody.substring(start, end)
                i = n
            } else {
                end += 1;
            }
        }
        console.log(str)
        return str
    }
    return "error"
}

async function realScore(id)
{
    const payload = {
        "query": "query TeacherRatingsPageQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on Teacher {\n      id\n      legacyId\n      firstName\n      lastName\n      department\n      school {\n        legacyId\n        name\n        city\n        state\n        country\n        id\n      }\n      lockStatus\n      ...StickyHeader_teacher\n      ...RatingDistributionWrapper_teacher\n      ...TeacherInfo_teacher\n      ...SimilarProfessors_teacher\n      ...TeacherRatingTabs_teacher\n    }\n    id\n  }\n}\n\nfragment StickyHeader_teacher on Teacher {\n  ...HeaderDescription_teacher\n  ...HeaderRateButton_teacher\n}\n\nfragment RatingDistributionWrapper_teacher on Teacher {\n  ...NoRatingsArea_teacher\n  ratingsDistribution {\n    total\n    ...RatingDistributionChart_ratingsDistribution\n  }\n}\n\nfragment TeacherInfo_teacher on Teacher {\n  id\n  lastName\n  numRatings\n  ...RatingValue_teacher\n  ...NameTitle_teacher\n  ...TeacherTags_teacher\n  ...NameLink_teacher\n  ...TeacherFeedback_teacher\n  ...RateTeacherLink_teacher\n  ...CompareProfessorLink_teacher\n}\n\nfragment SimilarProfessors_teacher on Teacher {\n  department\n  relatedTeachers {\n    legacyId\n    ...SimilarProfessorListItem_teacher\n    id\n  }\n}\n\nfragment TeacherRatingTabs_teacher on Teacher {\n  numRatings\n  courseCodes {\n    courseName\n    courseCount\n  }\n  ...RatingsList_teacher\n  ...RatingsFilter_teacher\n}\n\nfragment RatingsList_teacher on Teacher {\n  id\n  legacyId\n  lastName\n  numRatings\n  school {\n    id\n    legacyId\n    name\n    city\n    state\n    avgRating\n    numRatings\n  }\n  ...Rating_teacher\n  ...NoRatingsArea_teacher\n  ratings(first: 20) {\n    edges {\n      cursor\n      node {\n        ...Rating_rating\n        id\n        __typename\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n\nfragment RatingsFilter_teacher on Teacher {\n  courseCodes {\n    courseCount\n    courseName\n  }\n}\n\nfragment Rating_teacher on Teacher {\n  ...RatingFooter_teacher\n  ...RatingSuperHeader_teacher\n  ...ProfessorNoteSection_teacher\n}\n\nfragment NoRatingsArea_teacher on Teacher {\n  lastName\n  ...RateTeacherLink_teacher\n}\n\nfragment Rating_rating on Rating {\n  comment\n  flagStatus\n  createdByUser\n  teacherNote {\n    id\n  }\n  ...RatingHeader_rating\n  ...RatingSuperHeader_rating\n  ...RatingValues_rating\n  ...CourseMeta_rating\n  ...RatingTags_rating\n  ...RatingFooter_rating\n  ...ProfessorNoteSection_rating\n}\n\nfragment RatingHeader_rating on Rating {\n  legacyId\n  date\n  class\n  helpfulRating\n  clarityRating\n  isForOnlineClass\n}\n\nfragment RatingSuperHeader_rating on Rating {\n  legacyId\n}\n\nfragment RatingValues_rating on Rating {\n  helpfulRating\n  clarityRating\n  difficultyRating\n}\n\nfragment CourseMeta_rating on Rating {\n  attendanceMandatory\n  wouldTakeAgain\n  grade\n  textbookUse\n  isForOnlineClass\n  isForCredit\n}\n\nfragment RatingTags_rating on Rating {\n  ratingTags\n}\n\nfragment RatingFooter_rating on Rating {\n  id\n  comment\n  adminReviewedAt\n  flagStatus\n  legacyId\n  thumbsUpTotal\n  thumbsDownTotal\n  thumbs {\n    thumbsUp\n    thumbsDown\n    computerId\n    id\n  }\n  teacherNote {\n    id\n  }\n  ...Thumbs_rating\n}\n\nfragment ProfessorNoteSection_rating on Rating {\n  teacherNote {\n    ...ProfessorNote_note\n    id\n  }\n  ...ProfessorNoteEditor_rating\n}\n\nfragment ProfessorNote_note on TeacherNotes {\n  comment\n  ...ProfessorNoteHeader_note\n  ...ProfessorNoteFooter_note\n}\n\nfragment ProfessorNoteEditor_rating on Rating {\n  id\n  legacyId\n  class\n  teacherNote {\n    id\n    teacherId\n    comment\n  }\n}\n\nfragment ProfessorNoteHeader_note on TeacherNotes {\n  createdAt\n  updatedAt\n}\n\nfragment ProfessorNoteFooter_note on TeacherNotes {\n  legacyId\n  flagStatus\n}\n\nfragment Thumbs_rating on Rating {\n  id\n  comment\n  adminReviewedAt\n  flagStatus\n  legacyId\n  thumbsUpTotal\n  thumbsDownTotal\n  thumbs {\n    computerId\n    thumbsUp\n    thumbsDown\n    id\n  }\n  teacherNote {\n    id\n  }\n}\n\nfragment RateTeacherLink_teacher on Teacher {\n  legacyId\n  numRatings\n  lockStatus\n}\n\nfragment RatingFooter_teacher on Teacher {\n  id\n  legacyId\n  lockStatus\n  isProfCurrentUser\n  ...Thumbs_teacher\n}\n\nfragment RatingSuperHeader_teacher on Teacher {\n  firstName\n  lastName\n  legacyId\n  school {\n    name\n    id\n  }\n}\n\nfragment ProfessorNoteSection_teacher on Teacher {\n  ...ProfessorNote_teacher\n  ...ProfessorNoteEditor_teacher\n}\n\nfragment ProfessorNote_teacher on Teacher {\n  ...ProfessorNoteHeader_teacher\n  ...ProfessorNoteFooter_teacher\n}\n\nfragment ProfessorNoteEditor_teacher on Teacher {\n  id\n}\n\nfragment ProfessorNoteHeader_teacher on Teacher {\n  lastName\n}\n\nfragment ProfessorNoteFooter_teacher on Teacher {\n  legacyId\n  isProfCurrentUser\n}\n\nfragment Thumbs_teacher on Teacher {\n  id\n  legacyId\n  lockStatus\n  isProfCurrentUser\n}\n\nfragment SimilarProfessorListItem_teacher on RelatedTeacher {\n  legacyId\n  firstName\n  lastName\n  avgRating\n}\n\nfragment RatingValue_teacher on Teacher {\n  avgRating\n  numRatings\n  ...NumRatingsLink_teacher\n}\n\nfragment NameTitle_teacher on Teacher {\n  id\n  firstName\n  lastName\n  department\n  school {\n    legacyId\n    name\n    id\n  }\n  ...TeacherDepartment_teacher\n  ...TeacherBookmark_teacher\n}\n\nfragment TeacherTags_teacher on Teacher {\n  lastName\n  teacherRatingTags {\n    legacyId\n    tagCount\n    tagName\n    id\n  }\n}\n\nfragment NameLink_teacher on Teacher {\n  isProfCurrentUser\n  id\n  legacyId\n  firstName\n  lastName\n  school {\n    name\n    id\n  }\n}\n\nfragment TeacherFeedback_teacher on Teacher {\n  numRatings\n  avgDifficulty\n  wouldTakeAgainPercent\n}\n\nfragment CompareProfessorLink_teacher on Teacher {\n  legacyId\n}\n\nfragment TeacherDepartment_teacher on Teacher {\n  department\n  departmentId\n  school {\n    legacyId\n    name\n    id\n  }\n}\n\nfragment TeacherBookmark_teacher on Teacher {\n  id\n  isSaved\n}\n\nfragment NumRatingsLink_teacher on Teacher {\n  numRatings\n  ...RateTeacherLink_teacher\n}\n\nfragment RatingDistributionChart_ratingsDistribution on ratingsDistribution {\n  r1\n  r2\n  r3\n  r4\n  r5\n}\n\nfragment HeaderDescription_teacher on Teacher {\n  id\n  firstName\n  lastName\n  department\n  school {\n    legacyId\n    name\n    city\n    state\n    id\n  }\n  ...TeacherTitles_teacher\n  ...TeacherBookmark_teacher\n}\n\nfragment HeaderRateButton_teacher on Teacher {\n  ...RateTeacherLink_teacher\n}\n\nfragment TeacherTitles_teacher on Teacher {\n  department\n  school {\n    legacyId\n    name\n    id\n  }\n}\n",
        "variables": {
            "id": id
        }
    }
    const response = await fetch("https://www.ratemyprofessors.com/graphql", {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + auth,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
            'Referer': 'https://www.ratemyprofessors.com/',
            'Host': 'www.ratemyprofessors.com',
            'Origin': 'https://www.ratemyprofessors.com',
        },
        body: JSON.stringify(payload)
    })
    const json = await response.json()
    let status = [json['data']['node']['avgRating'], json['data']['node']['legacyId']]
    return status
}

async function getProfScore(name)
{
    const prof = name
    const payload = {"query":"query NewSearchTeachersQuery(\n  $query: TeacherSearchQuery!\n  $count: Int\n) {\n  newSearch {\n    teachers(query: $query, first: $count) {\n      didFallback\n      edges {\n        cursor\n        node {\n          id\n          legacyId\n          firstName\n          lastName\n          department\n          departmentId\n          school {\n            legacyId\n            name\n            id\n          }\n          ...CompareProfessorsColumn_teacher\n        }\n      }\n    }\n  }\n}\n\nfragment CompareProfessorsColumn_teacher on Teacher {\n  id\n  legacyId\n  firstName\n  lastName\n  school {\n    legacyId\n    name\n    id\n  }\n  department\n  departmentId\n  avgRating\n  numRatings\n  wouldTakeAgainPercentRounded\n  mandatoryAttendance {\n    yes\n    no\n    neither\n    total\n  }\n  takenForCredit {\n    yes\n    no\n    neither\n    total\n  }\n  ...NoRatingsArea_teacher\n  ...RatingDistributionWrapper_teacher\n}\n\nfragment NoRatingsArea_teacher on Teacher {\n  lastName\n  ...RateTeacherLink_teacher\n}\n\nfragment RatingDistributionWrapper_teacher on Teacher {\n  ...NoRatingsArea_teacher\n  ratingsDistribution {\n    total\n    ...RatingDistributionChart_ratingsDistribution\n  }\n}\n\nfragment RatingDistributionChart_ratingsDistribution on ratingsDistribution {\n  r1\n  r2\n  r3\n  r4\n  r5\n}\n\nfragment RateTeacherLink_teacher on Teacher {\n  legacyId\n  numRatings\n  lockStatus\n}\n","variables":{"query":{"text":`${name}`,"schoolID":"U2Nob29sLTE1NzIz"},"count":10}}
    try {
        const response = await fetch("https://www.ratemyprofessors.com/graphql", {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + auth,
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
                'Referer': 'https://www.ratemyprofessors.com/',
                'Host': 'www.ratemyprofessors.com',
                'Origin': 'https://www.ratemyprofessors.com',
            },
            body: JSON.stringify(payload)
        })
        if(response.ok)
        {
            const json = await response.json()
            try
            {
                let status = json['data']['newSearch']['teachers']['edges'][0]['node']['id']
                return(await realScore(status))
            }
            catch(err) {
                return(["", ""])
            }
        }
    } catch(err) {
        console.log("auth token: '" + auth + "' may be expired. Fetching a new one")
        auth = await getAuth()
        console.log("New auth token: " + auth)
        const response = await fetch("https://www.ratemyprofessors.com/graphql", {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + auth,
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
                'Referer': 'https://www.ratemyprofessors.com/',
                'Host': 'www.ratemyprofessors.com',
                'Origin': 'https://www.ratemyprofessors.com',
            },
            body: JSON.stringify(payload)
        })
        if(response.ok) {
            const json = await response.json()
            try
            {
                let status = json['data']['newSearch']['teachers']['edges'][0]['node']['id']
                return(await realScore(status))
            }
            catch(err){console.log(err)}
        }
    }
}

let lastProf

const timer = ms => new Promise(res => setTimeout(res, ms))

function color(x) {
    switch (true) {
        case (x < 3):
            return "red"
        case (x < 4):
            return "#20aee8"
        default:
            return "#10c829"
            
    }
}

let fetchedScore = []

function rmp() {
    try {
        hasChangedPage = false
        for(const link of document.links) {
            if(link.href.substring(0,23) === "https://search.asu.edu/") {
                try {
                    link.nextElementSibling.remove();
                } catch (err) {}
                lastProf = link
                const a = document.createElement("a")
                if(fetchedScores.findIndex(e => e.name === link.innerText) >= 0) {
                     let profDetails = fetchedScores[fetchedScores.findIndex(e => e.name === teach)]
                    a.innerText = " " + profDetails[0]
                    a.style.fontWeight = "bold"
                    a.style.color = color(details[0])
                    a.style.textDecoration = "none"
                    a.href = "https://www.ratemyprofessors.com/professor/" + profDetails[1]
                    link.after(a)
                } else {
                    let details 
                    getProfScore(link.innerText).then((arr)=>{
                        details = arr;
                        fetchedScore.push({
                            name: link.innerText,
                               rating: details[0],
                            link: details[1]
                        })
                        a.style.fontWeight = "bold"
                        a.style.color = color(details[0])
                        a.style.textDecoration = "none"
                        a.innerText = " " + details[0],
                        a.href = "https://www.ratemyprofessors.com/professor/" + details[1]
                        link.after(a)
                    })
                }
            }
        }
        lastProf.id = "__lastProf"
        async function load () {
            while(document.getElementById("__lastProf") !== null) {
                await timer(1000)
            }
            hasChangedPage = true
        }
        load()
    }
    //an error most likely indicates the user has changed the items in the list, so re-fetch the ratings. Once again, this is the best thing I could come up with so far
    catch(err) {
        console.log(err)
        hasChangedPage = true
    }
}

//Keep checking for list of classes to be loaded in before executing
const interval = setInterval(function() {
    if(document.getElementById("class-results") != null) {
        clearInterval(interval)
        rmp()
    } else {
        console.log("Page not yet loaded, retrying...")
    }
}, 500)


function watch() {
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    var observer = new MutationObserver(function(mutations, observer) {
        if(hasChangedPage) {
            rmp()
        }
    })

    // define what element should be observed by the observer
    // and what types of mutations trigger the callback
    observer.observe(document, {
        subtree: true,
        attributes: true
    })
}

watch()
