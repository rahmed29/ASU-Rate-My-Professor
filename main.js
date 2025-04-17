const auth = "dGVzdDp0ZXN0";

// scrape auth token from website. Though this seems to be unnessary
async function getAuth() {
  const init = await fetch("https://www.ratemyprofessors.com/", {
    method: "GET",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
    },
  });
  if (init.ok) {
    let desired = '"REACT_APP_GRAPHQL_AUTH":"';
    let responseBody = await init.text();
    let str = "";
    let start = responseBody.indexOf(desired) + desired.length;
    let end = start;
    for (let i = start, n = responseBody.length; i < n; i++) {
      if (responseBody.substring(i, i + 1) == '"') {
        str = responseBody.substring(start, end);
        break;
      } else {
        end += 1;
      }
    }
    return str;
  }
  return null;
}

async function realScore(id) {
  const payload = {
    query:
      "query TeacherRatingsPageQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n__typename\n... on Teacher {\n  id\n  legacyId\n  firstName\n  lastName\n  department\n  school {\nlegacyId\nname\ncity\nstate\ncountry\nid\n  }\n  lockStatus\n  ...StickyHeader_teacher\n  ...RatingDistributionWrapper_teacher\n  ...TeacherInfo_teacher\n  ...SimilarProfessors_teacher\n  ...TeacherRatingTabs_teacher\n}\nid\n  }\n}\n\nfragment StickyHeader_teacher on Teacher {\n  ...HeaderDescription_teacher\n  ...HeaderRateButton_teacher\n}\n\nfragment RatingDistributionWrapper_teacher on Teacher {\n  ...NoRatingsArea_teacher\n  ratingsDistribution {\ntotal\n...RatingDistributionChart_ratingsDistribution\n  }\n}\n\nfragment TeacherInfo_teacher on Teacher {\n  id\n  lastName\n  numRatings\n  ...RatingValue_teacher\n  ...NameTitle_teacher\n  ...TeacherTags_teacher\n  ...NameLink_teacher\n  ...TeacherFeedback_teacher\n  ...RateTeacherLink_teacher\n  ...CompareProfessorLink_teacher\n}\n\nfragment SimilarProfessors_teacher on Teacher {\n  department\n  relatedTeachers {\nlegacyId\n...SimilarProfessorListItem_teacher\nid\n  }\n}\n\nfragment TeacherRatingTabs_teacher on Teacher {\n  numRatings\n  courseCodes {\ncourseName\ncourseCount\n  }\n  ...RatingsList_teacher\n  ...RatingsFilter_teacher\n}\n\nfragment RatingsList_teacher on Teacher {\n  id\n  legacyId\n  lastName\n  numRatings\n  school {\nid\nlegacyId\nname\ncity\nstate\navgRating\nnumRatings\n  }\n  ...Rating_teacher\n  ...NoRatingsArea_teacher\n  ratings(first: 20) {\nedges {\n  cursor\n  node {\n...Rating_rating\nid\n__typename\n  }\n}\npageInfo {\n  hasNextPage\n  endCursor\n}\n  }\n}\n\nfragment RatingsFilter_teacher on Teacher {\n  courseCodes {\ncourseCount\ncourseName\n  }\n}\n\nfragment Rating_teacher on Teacher {\n  ...RatingFooter_teacher\n  ...RatingSuperHeader_teacher\n  ...ProfessorNoteSection_teacher\n}\n\nfragment NoRatingsArea_teacher on Teacher {\n  lastName\n  ...RateTeacherLink_teacher\n}\n\nfragment Rating_rating on Rating {\n  comment\n  flagStatus\n  createdByUser\n  teacherNote {\nid\n  }\n  ...RatingHeader_rating\n  ...RatingSuperHeader_rating\n  ...RatingValues_rating\n  ...CourseMeta_rating\n  ...RatingTags_rating\n  ...RatingFooter_rating\n  ...ProfessorNoteSection_rating\n}\n\nfragment RatingHeader_rating on Rating {\n  legacyId\n  date\n  class\n  helpfulRating\n  clarityRating\n  isForOnlineClass\n}\n\nfragment RatingSuperHeader_rating on Rating {\n  legacyId\n}\n\nfragment RatingValues_rating on Rating {\n  helpfulRating\n  clarityRating\n  difficultyRating\n}\n\nfragment CourseMeta_rating on Rating {\n  attendanceMandatory\n  wouldTakeAgain\n  grade\n  textbookUse\n  isForOnlineClass\n  isForCredit\n}\n\nfragment RatingTags_rating on Rating {\n  ratingTags\n}\n\nfragment RatingFooter_rating on Rating {\n  id\n  comment\n  adminReviewedAt\n  flagStatus\n  legacyId\n  thumbsUpTotal\n  thumbsDownTotal\n  thumbs {\nthumbsUp\nthumbsDown\ncomputerId\nid\n  }\n  teacherNote {\nid\n  }\n  ...Thumbs_rating\n}\n\nfragment ProfessorNoteSection_rating on Rating {\n  teacherNote {\n...ProfessorNote_note\nid\n  }\n  ...ProfessorNoteEditor_rating\n}\n\nfragment ProfessorNote_note on TeacherNotes {\n  comment\n  ...ProfessorNoteHeader_note\n  ...ProfessorNoteFooter_note\n}\n\nfragment ProfessorNoteEditor_rating on Rating {\n  id\n  legacyId\n  class\n  teacherNote {\nid\nteacherId\ncomment\n  }\n}\n\nfragment ProfessorNoteHeader_note on TeacherNotes {\n  createdAt\n  updatedAt\n}\n\nfragment ProfessorNoteFooter_note on TeacherNotes {\n  legacyId\n  flagStatus\n}\n\nfragment Thumbs_rating on Rating {\n  id\n  comment\n  adminReviewedAt\n  flagStatus\n  legacyId\n  thumbsUpTotal\n  thumbsDownTotal\n  thumbs {\ncomputerId\nthumbsUp\nthumbsDown\nid\n  }\n  teacherNote {\nid\n  }\n}\n\nfragment RateTeacherLink_teacher on Teacher {\n  legacyId\n  numRatings\n  lockStatus\n}\n\nfragment RatingFooter_teacher on Teacher {\n  id\n  legacyId\n  lockStatus\n  isProfCurrentUser\n  ...Thumbs_teacher\n}\n\nfragment RatingSuperHeader_teacher on Teacher {\n  firstName\n  lastName\n  legacyId\n  school {\nname\nid\n  }\n}\n\nfragment ProfessorNoteSection_teacher on Teacher {\n  ...ProfessorNote_teacher\n  ...ProfessorNoteEditor_teacher\n}\n\nfragment ProfessorNote_teacher on Teacher {\n  ...ProfessorNoteHeader_teacher\n  ...ProfessorNoteFooter_teacher\n}\n\nfragment ProfessorNoteEditor_teacher on Teacher {\n  id\n}\n\nfragment ProfessorNoteHeader_teacher on Teacher {\n  lastName\n}\n\nfragment ProfessorNoteFooter_teacher on Teacher {\n  legacyId\n  isProfCurrentUser\n}\n\nfragment Thumbs_teacher on Teacher {\n  id\n  legacyId\n  lockStatus\n  isProfCurrentUser\n}\n\nfragment SimilarProfessorListItem_teacher on RelatedTeacher {\n  legacyId\n  firstName\n  lastName\n  avgRating\n}\n\nfragment RatingValue_teacher on Teacher {\n  avgRating\n  numRatings\n  ...NumRatingsLink_teacher\n}\n\nfragment NameTitle_teacher on Teacher {\n  id\n  firstName\n  lastName\n  department\n  school {\nlegacyId\nname\nid\n  }\n  ...TeacherDepartment_teacher\n  ...TeacherBookmark_teacher\n}\n\nfragment TeacherTags_teacher on Teacher {\n  lastName\n  teacherRatingTags {\nlegacyId\ntagCount\ntagName\nid\n  }\n}\n\nfragment NameLink_teacher on Teacher {\n  isProfCurrentUser\n  id\n  legacyId\n  firstName\n  lastName\n  school {\nname\nid\n  }\n}\n\nfragment TeacherFeedback_teacher on Teacher {\n  numRatings\n  avgDifficulty\n  wouldTakeAgainPercent\n}\n\nfragment CompareProfessorLink_teacher on Teacher {\n  legacyId\n}\n\nfragment TeacherDepartment_teacher on Teacher {\n  department\n  departmentId\n  school {\nlegacyId\nname\nid\n  }\n}\n\nfragment TeacherBookmark_teacher on Teacher {\n  id\n  isSaved\n}\n\nfragment NumRatingsLink_teacher on Teacher {\n  numRatings\n  ...RateTeacherLink_teacher\n}\n\nfragment RatingDistributionChart_ratingsDistribution on ratingsDistribution {\n  r1\n  r2\n  r3\n  r4\n  r5\n}\n\nfragment HeaderDescription_teacher on Teacher {\n  id\n  firstName\n  lastName\n  department\n  school {\nlegacyId\nname\ncity\nstate\nid\n  }\n  ...TeacherTitles_teacher\n  ...TeacherBookmark_teacher\n}\n\nfragment HeaderRateButton_teacher on Teacher {\n  ...RateTeacherLink_teacher\n}\n\nfragment TeacherTitles_teacher on Teacher {\n  department\n  school {\nlegacyId\nname\nid\n  }\n}\n",
    variables: {
      id: id,
    },
  };
  const response = await fetch("https://www.ratemyprofessors.com/graphql", {
    method: "POST",
    headers: {
      Authorization: "Basic " + auth,
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
      Referer: "https://www.ratemyprofessors.com/",
      Host: "www.ratemyprofessors.com",
      Origin: "https://www.ratemyprofessors.com",
    },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const json = await response.json();
    console.log(json);
    let status = {
      avgRating: json["data"]["node"]["avgRating"],
      legacyId: json["data"]["node"]["legacyId"],
      name: `${json["data"]["node"]["firstName"]} ${json["data"]["node"]["lastName"]}`,
      avgDifficulty: json["data"]["node"]["avgDifficulty"],
      wta: json["data"]["node"]["wouldTakeAgainPercent"],
      numRatings: json["data"]["node"]["numRatings"],
    };
    return status;
  } else {
    throw new Error("Response not ok");
  }
}

async function getProfScore(name) {
  const payload = {
    query:
      "query NewSearchTeachersQuery(\n$query: TeacherSearchQuery!\n$count: Int\n) {\nnewSearch {\nteachers(query: $query, first: $count) {\ndidFallback\nedges {\ncursor\nnode {\nid\nlegacyId\nfirstName\nlastName\ndepartment\ndepartmentId\nschool {\nlegacyId\nname\nid\n}\n...CompareProfessorsColumn_teacher\n}\n}\n}\n}\n}\n\nfragment CompareProfessorsColumn_teacher on Teacher {\nid\nlegacyId\nfirstName\nlastName\nschool {\nlegacyId\nname\nid\n}\ndepartment\ndepartmentId\navgRating\nnumRatings\nwouldTakeAgainPercentRounded\nmandatoryAttendance {\nyes\nno\nneither\ntotal\n}\ntakenForCredit {\nyes\nno\nneither\ntotal\n}\n...NoRatingsArea_teacher\n...RatingDistributionWrapper_teacher\n}\n\nfragment NoRatingsArea_teacher on Teacher {\nlastName\n...RateTeacherLink_teacher\n}\n\nfragment RatingDistributionWrapper_teacher on Teacher {\n...NoRatingsArea_teacher\nratingsDistribution {\ntotal\n...RatingDistributionChart_ratingsDistribution\n}\n}\n\nfragment RatingDistributionChart_ratingsDistribution on ratingsDistribution {\nr1\nr2\nr3\nr4\nr5\n}\n\nfragment RateTeacherLink_teacher on Teacher {\nlegacyId\nnumRatings\nlockStatus\n}\n",
    variables: {
      query: {
        text: name,
        schoolID: "U2Nob29sLTE1NzIz",
      },
      count: 10,
    },
  };
  try {
    const response = await fetch("https://www.ratemyprofessors.com/graphql", {
      method: "POST",
      headers: {
        Authorization: "Basic " + auth,
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
        Referer: "https://www.ratemyprofessors.com/",
        Host: "www.ratemyprofessors.com",
        Origin: "https://www.ratemyprofessors.com",
      },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      const json = await response.json();
      const status = json["data"]["newSearch"]["teachers"]["edges"].find(
        (e) =>
          (e.node.firstName + e.node.lastName).replaceAll(" ", "") ===
          name.replaceAll(" ", "")
      )["node"]["id"];
      return await realScore(status);
    } else {
      return {
        avgRating: undefined,
        legacyId: undefined,
        name: undefined,
        avgDifficulty: undefined,
        wta: undefined,
        numRatings: undefined,
      };
    }
  } catch (err) {
    return {
      avgRating: undefined,
      legacyId: undefined,
      name: undefined,
      avgDifficulty: undefined,
      wta: undefined,
      numRatings: undefined,
    };
  }
}

function color(x) {
  switch (true) {
    case x === undefined:
      return "gray";
    case x < 3:
      return "lightcoral";
    case x < 4:
      return "goldenrod";
    case x < 6:
      return "lightgreen";
  }
}

function diffColor(x) {
  switch (true) {
    case x === undefined:
      return "gray";
    case x < 3.7:
      return "lightgreen";
    case x < 4.1:
      return "goldenrod";
    case x < 6:
      return "lightcoral";
  }
}

let fetchedScores = new Map();
let lastTip;

function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}

function addSpacer(parent) {
  const br = document.createElement("br");
  const spacer = document.createElement("span");
  spacer.innerText = "---";
  spacer.ariaHidden = true;
  parent.appendChild(spacer);
  parent.appendChild(br);
}

function addDetails(parent, statName, stat, color, extra = "") {
  if (isFloat(stat)) {
    stat = stat.toFixed(1);
  }

  const br = document.createElement("br");
  const span = document.createElement("span");
  span.innerText = `${statName}: `;
  const b = document.createElement("b");
  if (stat === undefined) {
    stat = "N/A";
    extra = "";
  }
  b.style.color = color ? color(stat) : "white";
  b.innerText = stat + extra;
  span.appendChild(b);
  parent.appendChild(span);
  parent.appendChild(br);
}

async function rmp(link) {
  if (link.href.substring(0, 23) === "https://search.asu.edu/") {
    // delete the last tooltip
    try {
      lastTip.destroy();
    } catch (err) {}
    lastTip = tippy([link], {
      placement: "right",
      interactive: true,
      allowHTML: true,
      content: "Loading...",
    })[0];

    lastTip.show();

    // set the prof details to cached results
    let profDetails = fetchedScores.get(link.innerText);

    // of no cached result, then get the ratings and such
    if (!profDetails) {
      profDetails = await getProfScore(link.innerText);

      // if there was an error, don't save it to the cached results
      if (profDetails.name !== undefined) {
        fetchedScores.set(link.innerText, profDetails);
      }
    }

    // Create card
    const card = document.createElement("div");
    card.style.minWidth = "150px";
    card.style.fontSize = "1.1em";
    card.style.padding = "10px";
    const profName = document.createElement("b");
    profName.innerText =
      profDetails.name === undefined ? "Professor not found" : profDetails.name;
    const br = document.createElement("br");
    card.appendChild(profName);
    card.appendChild(br);
    addSpacer(card);
    addDetails(card, "Average Rating", profDetails.avgRating, color);
    addDetails(
      card,
      "Average Difficulty",
      profDetails.avgDifficulty,
      diffColor
    );
    addDetails(card, "Would Take Again", profDetails.wta, null, "%");
    addDetails(card, "# of Ratings", profDetails.numRatings, null);
    addSpacer(card);
    if (profDetails.legacyId !== undefined) {
      const a = document.createElement("a");
      a.innerText = "Rate My Professor Page";
      a.href = `https://www.ratemyprofessors.com/professor/${profDetails.legacyId}`;
      a.target = "_blank";
      a.style.color = "lightblue";
      card.appendChild(a);
    }

    // set the professor rating tooltip content
    lastTip.setContent(card);
    lastTip.show();
  }
}

//Keep checking for list of classes to be loaded in before executing
const interval = setInterval(function () {
  if (document.getElementById("class-results") != null) {
    clearInterval(interval);
    lastTip = tippy("#class-results", {
      content:
        "ASU Rate My Professors: Hover over a professor's name for ratings",
    })[0];
    document.addEventListener("mouseover", async (e) => {
      if (e.target.nodeName === "A") {
        await rmp(e.target);
      }
    });
    document.addEventListener("focusin", async (e) => {
      if (e.target.nodeName === "A") {
        await rmp(e.target);
      }
    });
  } else {
    console.log("Page not yet loaded, retrying...");
  }
}, 500);

//
// popper + tippy
//
/**
 * @popperjs/core v2.11.8 - MIT License
 */

!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], t)
    : t(
        ((e =
          "undefined" != typeof globalThis ? globalThis : e || self).Popper =
          {})
      );
})(this, function (e) {
  "use strict";
  function t(e) {
    if (null == e) return window;
    if ("[object Window]" !== e.toString()) {
      var t = e.ownerDocument;
      return (t && t.defaultView) || window;
    }
    return e;
  }
  function n(e) {
    return e instanceof t(e).Element || e instanceof Element;
  }
  function r(e) {
    return e instanceof t(e).HTMLElement || e instanceof HTMLElement;
  }
  function o(e) {
    return (
      "undefined" != typeof ShadowRoot &&
      (e instanceof t(e).ShadowRoot || e instanceof ShadowRoot)
    );
  }
  var i = Math.max,
    a = Math.min,
    s = Math.round;
  function f() {
    var e = navigator.userAgentData;
    return null != e && e.brands && Array.isArray(e.brands)
      ? e.brands
          .map(function (e) {
            return e.brand + "/" + e.version;
          })
          .join(" ")
      : navigator.userAgent;
  }
  function c() {
    return !/^((?!chrome|android).)*safari/i.test(f());
  }
  function p(e, o, i) {
    void 0 === o && (o = !1), void 0 === i && (i = !1);
    var a = e.getBoundingClientRect(),
      f = 1,
      p = 1;
    o &&
      r(e) &&
      ((f = (e.offsetWidth > 0 && s(a.width) / e.offsetWidth) || 1),
      (p = (e.offsetHeight > 0 && s(a.height) / e.offsetHeight) || 1));
    var u = (n(e) ? t(e) : window).visualViewport,
      l = !c() && i,
      d = (a.left + (l && u ? u.offsetLeft : 0)) / f,
      h = (a.top + (l && u ? u.offsetTop : 0)) / p,
      m = a.width / f,
      v = a.height / p;
    return {
      width: m,
      height: v,
      top: h,
      right: d + m,
      bottom: h + v,
      left: d,
      x: d,
      y: h,
    };
  }
  function u(e) {
    var n = t(e);
    return { scrollLeft: n.pageXOffset, scrollTop: n.pageYOffset };
  }
  function l(e) {
    return e ? (e.nodeName || "").toLowerCase() : null;
  }
  function d(e) {
    return (
      (n(e) ? e.ownerDocument : e.document) || window.document
    ).documentElement;
  }
  function h(e) {
    return p(d(e)).left + u(e).scrollLeft;
  }
  function m(e) {
    return t(e).getComputedStyle(e);
  }
  function v(e) {
    var t = m(e),
      n = t.overflow,
      r = t.overflowX,
      o = t.overflowY;
    return /auto|scroll|overlay|hidden/.test(n + o + r);
  }
  function y(e, n, o) {
    void 0 === o && (o = !1);
    var i,
      a,
      f = r(n),
      c =
        r(n) &&
        (function (e) {
          var t = e.getBoundingClientRect(),
            n = s(t.width) / e.offsetWidth || 1,
            r = s(t.height) / e.offsetHeight || 1;
          return 1 !== n || 1 !== r;
        })(n),
      m = d(n),
      y = p(e, c, o),
      g = { scrollLeft: 0, scrollTop: 0 },
      b = { x: 0, y: 0 };
    return (
      (f || (!f && !o)) &&
        (("body" !== l(n) || v(m)) &&
          (g =
            (i = n) !== t(i) && r(i)
              ? { scrollLeft: (a = i).scrollLeft, scrollTop: a.scrollTop }
              : u(i)),
        r(n)
          ? (((b = p(n, !0)).x += n.clientLeft), (b.y += n.clientTop))
          : m && (b.x = h(m))),
      {
        x: y.left + g.scrollLeft - b.x,
        y: y.top + g.scrollTop - b.y,
        width: y.width,
        height: y.height,
      }
    );
  }
  function g(e) {
    var t = p(e),
      n = e.offsetWidth,
      r = e.offsetHeight;
    return (
      Math.abs(t.width - n) <= 1 && (n = t.width),
      Math.abs(t.height - r) <= 1 && (r = t.height),
      { x: e.offsetLeft, y: e.offsetTop, width: n, height: r }
    );
  }
  function b(e) {
    return "html" === l(e)
      ? e
      : e.assignedSlot || e.parentNode || (o(e) ? e.host : null) || d(e);
  }
  function x(e) {
    return ["html", "body", "#document"].indexOf(l(e)) >= 0
      ? e.ownerDocument.body
      : r(e) && v(e)
      ? e
      : x(b(e));
  }
  function w(e, n) {
    var r;
    void 0 === n && (n = []);
    var o = x(e),
      i = o === (null == (r = e.ownerDocument) ? void 0 : r.body),
      a = t(o),
      s = i ? [a].concat(a.visualViewport || [], v(o) ? o : []) : o,
      f = n.concat(s);
    return i ? f : f.concat(w(b(s)));
  }
  function O(e) {
    return ["table", "td", "th"].indexOf(l(e)) >= 0;
  }
  function j(e) {
    return r(e) && "fixed" !== m(e).position ? e.offsetParent : null;
  }
  function E(e) {
    for (var n = t(e), i = j(e); i && O(i) && "static" === m(i).position; )
      i = j(i);
    return i &&
      ("html" === l(i) || ("body" === l(i) && "static" === m(i).position))
      ? n
      : i ||
          (function (e) {
            var t = /firefox/i.test(f());
            if (/Trident/i.test(f()) && r(e) && "fixed" === m(e).position)
              return null;
            var n = b(e);
            for (
              o(n) && (n = n.host);
              r(n) && ["html", "body"].indexOf(l(n)) < 0;

            ) {
              var i = m(n);
              if (
                "none" !== i.transform ||
                "none" !== i.perspective ||
                "paint" === i.contain ||
                -1 !== ["transform", "perspective"].indexOf(i.willChange) ||
                (t && "filter" === i.willChange) ||
                (t && i.filter && "none" !== i.filter)
              )
                return n;
              n = n.parentNode;
            }
            return null;
          })(e) ||
          n;
  }
  var D = "top",
    A = "bottom",
    L = "right",
    P = "left",
    M = "auto",
    k = [D, A, L, P],
    W = "start",
    B = "end",
    H = "viewport",
    T = "popper",
    R = k.reduce(function (e, t) {
      return e.concat([t + "-" + W, t + "-" + B]);
    }, []),
    S = [].concat(k, [M]).reduce(function (e, t) {
      return e.concat([t, t + "-" + W, t + "-" + B]);
    }, []),
    V = [
      "beforeRead",
      "read",
      "afterRead",
      "beforeMain",
      "main",
      "afterMain",
      "beforeWrite",
      "write",
      "afterWrite",
    ];
  function q(e) {
    var t = new Map(),
      n = new Set(),
      r = [];
    function o(e) {
      n.add(e.name),
        []
          .concat(e.requires || [], e.requiresIfExists || [])
          .forEach(function (e) {
            if (!n.has(e)) {
              var r = t.get(e);
              r && o(r);
            }
          }),
        r.push(e);
    }
    return (
      e.forEach(function (e) {
        t.set(e.name, e);
      }),
      e.forEach(function (e) {
        n.has(e.name) || o(e);
      }),
      r
    );
  }
  function C(e, t) {
    var n = t.getRootNode && t.getRootNode();
    if (e.contains(t)) return !0;
    if (n && o(n)) {
      var r = t;
      do {
        if (r && e.isSameNode(r)) return !0;
        r = r.parentNode || r.host;
      } while (r);
    }
    return !1;
  }
  function N(e) {
    return Object.assign({}, e, {
      left: e.x,
      top: e.y,
      right: e.x + e.width,
      bottom: e.y + e.height,
    });
  }
  function I(e, r, o) {
    return r === H
      ? N(
          (function (e, n) {
            var r = t(e),
              o = d(e),
              i = r.visualViewport,
              a = o.clientWidth,
              s = o.clientHeight,
              f = 0,
              p = 0;
            if (i) {
              (a = i.width), (s = i.height);
              var u = c();
              (u || (!u && "fixed" === n)) &&
                ((f = i.offsetLeft), (p = i.offsetTop));
            }
            return { width: a, height: s, x: f + h(e), y: p };
          })(e, o)
        )
      : n(r)
      ? (function (e, t) {
          var n = p(e, !1, "fixed" === t);
          return (
            (n.top = n.top + e.clientTop),
            (n.left = n.left + e.clientLeft),
            (n.bottom = n.top + e.clientHeight),
            (n.right = n.left + e.clientWidth),
            (n.width = e.clientWidth),
            (n.height = e.clientHeight),
            (n.x = n.left),
            (n.y = n.top),
            n
          );
        })(r, o)
      : N(
          (function (e) {
            var t,
              n = d(e),
              r = u(e),
              o = null == (t = e.ownerDocument) ? void 0 : t.body,
              a = i(
                n.scrollWidth,
                n.clientWidth,
                o ? o.scrollWidth : 0,
                o ? o.clientWidth : 0
              ),
              s = i(
                n.scrollHeight,
                n.clientHeight,
                o ? o.scrollHeight : 0,
                o ? o.clientHeight : 0
              ),
              f = -r.scrollLeft + h(e),
              c = -r.scrollTop;
            return (
              "rtl" === m(o || n).direction &&
                (f += i(n.clientWidth, o ? o.clientWidth : 0) - a),
              { width: a, height: s, x: f, y: c }
            );
          })(d(e))
        );
  }
  function _(e, t, o, s) {
    var f =
        "clippingParents" === t
          ? (function (e) {
              var t = w(b(e)),
                o =
                  ["absolute", "fixed"].indexOf(m(e).position) >= 0 && r(e)
                    ? E(e)
                    : e;
              return n(o)
                ? t.filter(function (e) {
                    return n(e) && C(e, o) && "body" !== l(e);
                  })
                : [];
            })(e)
          : [].concat(t),
      c = [].concat(f, [o]),
      p = c[0],
      u = c.reduce(function (t, n) {
        var r = I(e, n, s);
        return (
          (t.top = i(r.top, t.top)),
          (t.right = a(r.right, t.right)),
          (t.bottom = a(r.bottom, t.bottom)),
          (t.left = i(r.left, t.left)),
          t
        );
      }, I(e, p, s));
    return (
      (u.width = u.right - u.left),
      (u.height = u.bottom - u.top),
      (u.x = u.left),
      (u.y = u.top),
      u
    );
  }
  function F(e) {
    return e.split("-")[0];
  }
  function U(e) {
    return e.split("-")[1];
  }
  function z(e) {
    return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
  }
  function X(e) {
    var t,
      n = e.reference,
      r = e.element,
      o = e.placement,
      i = o ? F(o) : null,
      a = o ? U(o) : null,
      s = n.x + n.width / 2 - r.width / 2,
      f = n.y + n.height / 2 - r.height / 2;
    switch (i) {
      case D:
        t = { x: s, y: n.y - r.height };
        break;
      case A:
        t = { x: s, y: n.y + n.height };
        break;
      case L:
        t = { x: n.x + n.width, y: f };
        break;
      case P:
        t = { x: n.x - r.width, y: f };
        break;
      default:
        t = { x: n.x, y: n.y };
    }
    var c = i ? z(i) : null;
    if (null != c) {
      var p = "y" === c ? "height" : "width";
      switch (a) {
        case W:
          t[c] = t[c] - (n[p] / 2 - r[p] / 2);
          break;
        case B:
          t[c] = t[c] + (n[p] / 2 - r[p] / 2);
      }
    }
    return t;
  }
  function Y(e) {
    return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, e);
  }
  function G(e, t) {
    return t.reduce(function (t, n) {
      return (t[n] = e), t;
    }, {});
  }
  function J(e, t) {
    void 0 === t && (t = {});
    var r = t,
      o = r.placement,
      i = void 0 === o ? e.placement : o,
      a = r.strategy,
      s = void 0 === a ? e.strategy : a,
      f = r.boundary,
      c = void 0 === f ? "clippingParents" : f,
      u = r.rootBoundary,
      l = void 0 === u ? H : u,
      h = r.elementContext,
      m = void 0 === h ? T : h,
      v = r.altBoundary,
      y = void 0 !== v && v,
      g = r.padding,
      b = void 0 === g ? 0 : g,
      x = Y("number" != typeof b ? b : G(b, k)),
      w = m === T ? "reference" : T,
      O = e.rects.popper,
      j = e.elements[y ? w : m],
      E = _(n(j) ? j : j.contextElement || d(e.elements.popper), c, l, s),
      P = p(e.elements.reference),
      M = X({ reference: P, element: O, strategy: "absolute", placement: i }),
      W = N(Object.assign({}, O, M)),
      B = m === T ? W : P,
      R = {
        top: E.top - B.top + x.top,
        bottom: B.bottom - E.bottom + x.bottom,
        left: E.left - B.left + x.left,
        right: B.right - E.right + x.right,
      },
      S = e.modifiersData.offset;
    if (m === T && S) {
      var V = S[i];
      Object.keys(R).forEach(function (e) {
        var t = [L, A].indexOf(e) >= 0 ? 1 : -1,
          n = [D, A].indexOf(e) >= 0 ? "y" : "x";
        R[e] += V[n] * t;
      });
    }
    return R;
  }
  var K = { placement: "bottom", modifiers: [], strategy: "absolute" };
  function Q() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    return !t.some(function (e) {
      return !(e && "function" == typeof e.getBoundingClientRect);
    });
  }
  function Z(e) {
    void 0 === e && (e = {});
    var t = e,
      r = t.defaultModifiers,
      o = void 0 === r ? [] : r,
      i = t.defaultOptions,
      a = void 0 === i ? K : i;
    return function (e, t, r) {
      void 0 === r && (r = a);
      var i,
        s,
        f = {
          placement: "bottom",
          orderedModifiers: [],
          options: Object.assign({}, K, a),
          modifiersData: {},
          elements: { reference: e, popper: t },
          attributes: {},
          styles: {},
        },
        c = [],
        p = !1,
        u = {
          state: f,
          setOptions: function (r) {
            var i = "function" == typeof r ? r(f.options) : r;
            l(),
              (f.options = Object.assign({}, a, f.options, i)),
              (f.scrollParents = {
                reference: n(e)
                  ? w(e)
                  : e.contextElement
                  ? w(e.contextElement)
                  : [],
                popper: w(t),
              });
            var s,
              p,
              d = (function (e) {
                var t = q(e);
                return V.reduce(function (e, n) {
                  return e.concat(
                    t.filter(function (e) {
                      return e.phase === n;
                    })
                  );
                }, []);
              })(
                ((s = [].concat(o, f.options.modifiers)),
                (p = s.reduce(function (e, t) {
                  var n = e[t.name];
                  return (
                    (e[t.name] = n
                      ? Object.assign({}, n, t, {
                          options: Object.assign({}, n.options, t.options),
                          data: Object.assign({}, n.data, t.data),
                        })
                      : t),
                    e
                  );
                }, {})),
                Object.keys(p).map(function (e) {
                  return p[e];
                }))
              );
            return (
              (f.orderedModifiers = d.filter(function (e) {
                return e.enabled;
              })),
              f.orderedModifiers.forEach(function (e) {
                var t = e.name,
                  n = e.options,
                  r = void 0 === n ? {} : n,
                  o = e.effect;
                if ("function" == typeof o) {
                  var i = o({ state: f, name: t, instance: u, options: r }),
                    a = function () {};
                  c.push(i || a);
                }
              }),
              u.update()
            );
          },
          forceUpdate: function () {
            if (!p) {
              var e = f.elements,
                t = e.reference,
                n = e.popper;
              if (Q(t, n)) {
                (f.rects = {
                  reference: y(t, E(n), "fixed" === f.options.strategy),
                  popper: g(n),
                }),
                  (f.reset = !1),
                  (f.placement = f.options.placement),
                  f.orderedModifiers.forEach(function (e) {
                    return (f.modifiersData[e.name] = Object.assign(
                      {},
                      e.data
                    ));
                  });
                for (var r = 0; r < f.orderedModifiers.length; r++)
                  if (!0 !== f.reset) {
                    var o = f.orderedModifiers[r],
                      i = o.fn,
                      a = o.options,
                      s = void 0 === a ? {} : a,
                      c = o.name;
                    "function" == typeof i &&
                      (f =
                        i({ state: f, options: s, name: c, instance: u }) || f);
                  } else (f.reset = !1), (r = -1);
              }
            }
          },
          update:
            ((i = function () {
              return new Promise(function (e) {
                u.forceUpdate(), e(f);
              });
            }),
            function () {
              return (
                s ||
                  (s = new Promise(function (e) {
                    Promise.resolve().then(function () {
                      (s = void 0), e(i());
                    });
                  })),
                s
              );
            }),
          destroy: function () {
            l(), (p = !0);
          },
        };
      if (!Q(e, t)) return u;
      function l() {
        c.forEach(function (e) {
          return e();
        }),
          (c = []);
      }
      return (
        u.setOptions(r).then(function (e) {
          !p && r.onFirstUpdate && r.onFirstUpdate(e);
        }),
        u
      );
    };
  }
  var $ = { passive: !0 };
  var ee = {
    name: "eventListeners",
    enabled: !0,
    phase: "write",
    fn: function () {},
    effect: function (e) {
      var n = e.state,
        r = e.instance,
        o = e.options,
        i = o.scroll,
        a = void 0 === i || i,
        s = o.resize,
        f = void 0 === s || s,
        c = t(n.elements.popper),
        p = [].concat(n.scrollParents.reference, n.scrollParents.popper);
      return (
        a &&
          p.forEach(function (e) {
            e.addEventListener("scroll", r.update, $);
          }),
        f && c.addEventListener("resize", r.update, $),
        function () {
          a &&
            p.forEach(function (e) {
              e.removeEventListener("scroll", r.update, $);
            }),
            f && c.removeEventListener("resize", r.update, $);
        }
      );
    },
    data: {},
  };
  var te = {
      name: "popperOffsets",
      enabled: !0,
      phase: "read",
      fn: function (e) {
        var t = e.state,
          n = e.name;
        t.modifiersData[n] = X({
          reference: t.rects.reference,
          element: t.rects.popper,
          strategy: "absolute",
          placement: t.placement,
        });
      },
      data: {},
    },
    ne = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
  function re(e) {
    var n,
      r = e.popper,
      o = e.popperRect,
      i = e.placement,
      a = e.variation,
      f = e.offsets,
      c = e.position,
      p = e.gpuAcceleration,
      u = e.adaptive,
      l = e.roundOffsets,
      h = e.isFixed,
      v = f.x,
      y = void 0 === v ? 0 : v,
      g = f.y,
      b = void 0 === g ? 0 : g,
      x = "function" == typeof l ? l({ x: y, y: b }) : { x: y, y: b };
    (y = x.x), (b = x.y);
    var w = f.hasOwnProperty("x"),
      O = f.hasOwnProperty("y"),
      j = P,
      M = D,
      k = window;
    if (u) {
      var W = E(r),
        H = "clientHeight",
        T = "clientWidth";
      if (
        (W === t(r) &&
          "static" !== m((W = d(r))).position &&
          "absolute" === c &&
          ((H = "scrollHeight"), (T = "scrollWidth")),
        (W = W),
        i === D || ((i === P || i === L) && a === B))
      )
        (M = A),
          (b -=
            (h && W === k && k.visualViewport
              ? k.visualViewport.height
              : W[H]) - o.height),
          (b *= p ? 1 : -1);
      if (i === P || ((i === D || i === A) && a === B))
        (j = L),
          (y -=
            (h && W === k && k.visualViewport ? k.visualViewport.width : W[T]) -
            o.width),
          (y *= p ? 1 : -1);
    }
    var R,
      S = Object.assign({ position: c }, u && ne),
      V =
        !0 === l
          ? (function (e, t) {
              var n = e.x,
                r = e.y,
                o = t.devicePixelRatio || 1;
              return { x: s(n * o) / o || 0, y: s(r * o) / o || 0 };
            })({ x: y, y: b }, t(r))
          : { x: y, y: b };
    return (
      (y = V.x),
      (b = V.y),
      p
        ? Object.assign(
            {},
            S,
            (((R = {})[M] = O ? "0" : ""),
            (R[j] = w ? "0" : ""),
            (R.transform =
              (k.devicePixelRatio || 1) <= 1
                ? "translate(" + y + "px, " + b + "px)"
                : "translate3d(" + y + "px, " + b + "px, 0)"),
            R)
          )
        : Object.assign(
            {},
            S,
            (((n = {})[M] = O ? b + "px" : ""),
            (n[j] = w ? y + "px" : ""),
            (n.transform = ""),
            n)
          )
    );
  }
  var oe = {
    name: "computeStyles",
    enabled: !0,
    phase: "beforeWrite",
    fn: function (e) {
      var t = e.state,
        n = e.options,
        r = n.gpuAcceleration,
        o = void 0 === r || r,
        i = n.adaptive,
        a = void 0 === i || i,
        s = n.roundOffsets,
        f = void 0 === s || s,
        c = {
          placement: F(t.placement),
          variation: U(t.placement),
          popper: t.elements.popper,
          popperRect: t.rects.popper,
          gpuAcceleration: o,
          isFixed: "fixed" === t.options.strategy,
        };
      null != t.modifiersData.popperOffsets &&
        (t.styles.popper = Object.assign(
          {},
          t.styles.popper,
          re(
            Object.assign({}, c, {
              offsets: t.modifiersData.popperOffsets,
              position: t.options.strategy,
              adaptive: a,
              roundOffsets: f,
            })
          )
        )),
        null != t.modifiersData.arrow &&
          (t.styles.arrow = Object.assign(
            {},
            t.styles.arrow,
            re(
              Object.assign({}, c, {
                offsets: t.modifiersData.arrow,
                position: "absolute",
                adaptive: !1,
                roundOffsets: f,
              })
            )
          )),
        (t.attributes.popper = Object.assign({}, t.attributes.popper, {
          "data-popper-placement": t.placement,
        }));
    },
    data: {},
  };
  var ie = {
    name: "applyStyles",
    enabled: !0,
    phase: "write",
    fn: function (e) {
      var t = e.state;
      Object.keys(t.elements).forEach(function (e) {
        var n = t.styles[e] || {},
          o = t.attributes[e] || {},
          i = t.elements[e];
        r(i) &&
          l(i) &&
          (Object.assign(i.style, n),
          Object.keys(o).forEach(function (e) {
            var t = o[e];
            !1 === t
              ? i.removeAttribute(e)
              : i.setAttribute(e, !0 === t ? "" : t);
          }));
      });
    },
    effect: function (e) {
      var t = e.state,
        n = {
          popper: {
            position: t.options.strategy,
            left: "0",
            top: "0",
            margin: "0",
          },
          arrow: { position: "absolute" },
          reference: {},
        };
      return (
        Object.assign(t.elements.popper.style, n.popper),
        (t.styles = n),
        t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
        function () {
          Object.keys(t.elements).forEach(function (e) {
            var o = t.elements[e],
              i = t.attributes[e] || {},
              a = Object.keys(
                t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]
              ).reduce(function (e, t) {
                return (e[t] = ""), e;
              }, {});
            r(o) &&
              l(o) &&
              (Object.assign(o.style, a),
              Object.keys(i).forEach(function (e) {
                o.removeAttribute(e);
              }));
          });
        }
      );
    },
    requires: ["computeStyles"],
  };
  var ae = {
      name: "offset",
      enabled: !0,
      phase: "main",
      requires: ["popperOffsets"],
      fn: function (e) {
        var t = e.state,
          n = e.options,
          r = e.name,
          o = n.offset,
          i = void 0 === o ? [0, 0] : o,
          a = S.reduce(function (e, n) {
            return (
              (e[n] = (function (e, t, n) {
                var r = F(e),
                  o = [P, D].indexOf(r) >= 0 ? -1 : 1,
                  i =
                    "function" == typeof n
                      ? n(Object.assign({}, t, { placement: e }))
                      : n,
                  a = i[0],
                  s = i[1];
                return (
                  (a = a || 0),
                  (s = (s || 0) * o),
                  [P, L].indexOf(r) >= 0 ? { x: s, y: a } : { x: a, y: s }
                );
              })(n, t.rects, i)),
              e
            );
          }, {}),
          s = a[t.placement],
          f = s.x,
          c = s.y;
        null != t.modifiersData.popperOffsets &&
          ((t.modifiersData.popperOffsets.x += f),
          (t.modifiersData.popperOffsets.y += c)),
          (t.modifiersData[r] = a);
      },
    },
    se = { left: "right", right: "left", bottom: "top", top: "bottom" };
  function fe(e) {
    return e.replace(/left|right|bottom|top/g, function (e) {
      return se[e];
    });
  }
  var ce = { start: "end", end: "start" };
  function pe(e) {
    return e.replace(/start|end/g, function (e) {
      return ce[e];
    });
  }
  function ue(e, t) {
    void 0 === t && (t = {});
    var n = t,
      r = n.placement,
      o = n.boundary,
      i = n.rootBoundary,
      a = n.padding,
      s = n.flipVariations,
      f = n.allowedAutoPlacements,
      c = void 0 === f ? S : f,
      p = U(r),
      u = p
        ? s
          ? R
          : R.filter(function (e) {
              return U(e) === p;
            })
        : k,
      l = u.filter(function (e) {
        return c.indexOf(e) >= 0;
      });
    0 === l.length && (l = u);
    var d = l.reduce(function (t, n) {
      return (
        (t[n] = J(e, {
          placement: n,
          boundary: o,
          rootBoundary: i,
          padding: a,
        })[F(n)]),
        t
      );
    }, {});
    return Object.keys(d).sort(function (e, t) {
      return d[e] - d[t];
    });
  }
  var le = {
    name: "flip",
    enabled: !0,
    phase: "main",
    fn: function (e) {
      var t = e.state,
        n = e.options,
        r = e.name;
      if (!t.modifiersData[r]._skip) {
        for (
          var o = n.mainAxis,
            i = void 0 === o || o,
            a = n.altAxis,
            s = void 0 === a || a,
            f = n.fallbackPlacements,
            c = n.padding,
            p = n.boundary,
            u = n.rootBoundary,
            l = n.altBoundary,
            d = n.flipVariations,
            h = void 0 === d || d,
            m = n.allowedAutoPlacements,
            v = t.options.placement,
            y = F(v),
            g =
              f ||
              (y === v || !h
                ? [fe(v)]
                : (function (e) {
                    if (F(e) === M) return [];
                    var t = fe(e);
                    return [pe(e), t, pe(t)];
                  })(v)),
            b = [v].concat(g).reduce(function (e, n) {
              return e.concat(
                F(n) === M
                  ? ue(t, {
                      placement: n,
                      boundary: p,
                      rootBoundary: u,
                      padding: c,
                      flipVariations: h,
                      allowedAutoPlacements: m,
                    })
                  : n
              );
            }, []),
            x = t.rects.reference,
            w = t.rects.popper,
            O = new Map(),
            j = !0,
            E = b[0],
            k = 0;
          k < b.length;
          k++
        ) {
          var B = b[k],
            H = F(B),
            T = U(B) === W,
            R = [D, A].indexOf(H) >= 0,
            S = R ? "width" : "height",
            V = J(t, {
              placement: B,
              boundary: p,
              rootBoundary: u,
              altBoundary: l,
              padding: c,
            }),
            q = R ? (T ? L : P) : T ? A : D;
          x[S] > w[S] && (q = fe(q));
          var C = fe(q),
            N = [];
          if (
            (i && N.push(V[H] <= 0),
            s && N.push(V[q] <= 0, V[C] <= 0),
            N.every(function (e) {
              return e;
            }))
          ) {
            (E = B), (j = !1);
            break;
          }
          O.set(B, N);
        }
        if (j)
          for (
            var I = function (e) {
                var t = b.find(function (t) {
                  var n = O.get(t);
                  if (n)
                    return n.slice(0, e).every(function (e) {
                      return e;
                    });
                });
                if (t) return (E = t), "break";
              },
              _ = h ? 3 : 1;
            _ > 0;
            _--
          ) {
            if ("break" === I(_)) break;
          }
        t.placement !== E &&
          ((t.modifiersData[r]._skip = !0), (t.placement = E), (t.reset = !0));
      }
    },
    requiresIfExists: ["offset"],
    data: { _skip: !1 },
  };
  function de(e, t, n) {
    return i(e, a(t, n));
  }
  var he = {
    name: "preventOverflow",
    enabled: !0,
    phase: "main",
    fn: function (e) {
      var t = e.state,
        n = e.options,
        r = e.name,
        o = n.mainAxis,
        s = void 0 === o || o,
        f = n.altAxis,
        c = void 0 !== f && f,
        p = n.boundary,
        u = n.rootBoundary,
        l = n.altBoundary,
        d = n.padding,
        h = n.tether,
        m = void 0 === h || h,
        v = n.tetherOffset,
        y = void 0 === v ? 0 : v,
        b = J(t, { boundary: p, rootBoundary: u, padding: d, altBoundary: l }),
        x = F(t.placement),
        w = U(t.placement),
        O = !w,
        j = z(x),
        M = "x" === j ? "y" : "x",
        k = t.modifiersData.popperOffsets,
        B = t.rects.reference,
        H = t.rects.popper,
        T =
          "function" == typeof y
            ? y(Object.assign({}, t.rects, { placement: t.placement }))
            : y,
        R =
          "number" == typeof T
            ? { mainAxis: T, altAxis: T }
            : Object.assign({ mainAxis: 0, altAxis: 0 }, T),
        S = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
        V = { x: 0, y: 0 };
      if (k) {
        if (s) {
          var q,
            C = "y" === j ? D : P,
            N = "y" === j ? A : L,
            I = "y" === j ? "height" : "width",
            _ = k[j],
            X = _ + b[C],
            Y = _ - b[N],
            G = m ? -H[I] / 2 : 0,
            K = w === W ? B[I] : H[I],
            Q = w === W ? -H[I] : -B[I],
            Z = t.elements.arrow,
            $ = m && Z ? g(Z) : { width: 0, height: 0 },
            ee = t.modifiersData["arrow#persistent"]
              ? t.modifiersData["arrow#persistent"].padding
              : { top: 0, right: 0, bottom: 0, left: 0 },
            te = ee[C],
            ne = ee[N],
            re = de(0, B[I], $[I]),
            oe = O
              ? B[I] / 2 - G - re - te - R.mainAxis
              : K - re - te - R.mainAxis,
            ie = O
              ? -B[I] / 2 + G + re + ne + R.mainAxis
              : Q + re + ne + R.mainAxis,
            ae = t.elements.arrow && E(t.elements.arrow),
            se = ae ? ("y" === j ? ae.clientTop || 0 : ae.clientLeft || 0) : 0,
            fe = null != (q = null == S ? void 0 : S[j]) ? q : 0,
            ce = _ + ie - fe,
            pe = de(m ? a(X, _ + oe - fe - se) : X, _, m ? i(Y, ce) : Y);
          (k[j] = pe), (V[j] = pe - _);
        }
        if (c) {
          var ue,
            le = "x" === j ? D : P,
            he = "x" === j ? A : L,
            me = k[M],
            ve = "y" === M ? "height" : "width",
            ye = me + b[le],
            ge = me - b[he],
            be = -1 !== [D, P].indexOf(x),
            xe = null != (ue = null == S ? void 0 : S[M]) ? ue : 0,
            we = be ? ye : me - B[ve] - H[ve] - xe + R.altAxis,
            Oe = be ? me + B[ve] + H[ve] - xe - R.altAxis : ge,
            je =
              m && be
                ? (function (e, t, n) {
                    var r = de(e, t, n);
                    return r > n ? n : r;
                  })(we, me, Oe)
                : de(m ? we : ye, me, m ? Oe : ge);
          (k[M] = je), (V[M] = je - me);
        }
        t.modifiersData[r] = V;
      }
    },
    requiresIfExists: ["offset"],
  };
  var me = {
    name: "arrow",
    enabled: !0,
    phase: "main",
    fn: function (e) {
      var t,
        n = e.state,
        r = e.name,
        o = e.options,
        i = n.elements.arrow,
        a = n.modifiersData.popperOffsets,
        s = F(n.placement),
        f = z(s),
        c = [P, L].indexOf(s) >= 0 ? "height" : "width";
      if (i && a) {
        var p = (function (e, t) {
            return Y(
              "number" !=
                typeof (e =
                  "function" == typeof e
                    ? e(Object.assign({}, t.rects, { placement: t.placement }))
                    : e)
                ? e
                : G(e, k)
            );
          })(o.padding, n),
          u = g(i),
          l = "y" === f ? D : P,
          d = "y" === f ? A : L,
          h =
            n.rects.reference[c] +
            n.rects.reference[f] -
            a[f] -
            n.rects.popper[c],
          m = a[f] - n.rects.reference[f],
          v = E(i),
          y = v ? ("y" === f ? v.clientHeight || 0 : v.clientWidth || 0) : 0,
          b = h / 2 - m / 2,
          x = p[l],
          w = y - u[c] - p[d],
          O = y / 2 - u[c] / 2 + b,
          j = de(x, O, w),
          M = f;
        n.modifiersData[r] = (((t = {})[M] = j), (t.centerOffset = j - O), t);
      }
    },
    effect: function (e) {
      var t = e.state,
        n = e.options.element,
        r = void 0 === n ? "[data-popper-arrow]" : n;
      null != r &&
        ("string" != typeof r || (r = t.elements.popper.querySelector(r))) &&
        C(t.elements.popper, r) &&
        (t.elements.arrow = r);
    },
    requires: ["popperOffsets"],
    requiresIfExists: ["preventOverflow"],
  };
  function ve(e, t, n) {
    return (
      void 0 === n && (n = { x: 0, y: 0 }),
      {
        top: e.top - t.height - n.y,
        right: e.right - t.width + n.x,
        bottom: e.bottom - t.height + n.y,
        left: e.left - t.width - n.x,
      }
    );
  }
  function ye(e) {
    return [D, L, A, P].some(function (t) {
      return e[t] >= 0;
    });
  }
  var ge = {
      name: "hide",
      enabled: !0,
      phase: "main",
      requiresIfExists: ["preventOverflow"],
      fn: function (e) {
        var t = e.state,
          n = e.name,
          r = t.rects.reference,
          o = t.rects.popper,
          i = t.modifiersData.preventOverflow,
          a = J(t, { elementContext: "reference" }),
          s = J(t, { altBoundary: !0 }),
          f = ve(a, r),
          c = ve(s, o, i),
          p = ye(f),
          u = ye(c);
        (t.modifiersData[n] = {
          referenceClippingOffsets: f,
          popperEscapeOffsets: c,
          isReferenceHidden: p,
          hasPopperEscaped: u,
        }),
          (t.attributes.popper = Object.assign({}, t.attributes.popper, {
            "data-popper-reference-hidden": p,
            "data-popper-escaped": u,
          }));
      },
    },
    be = Z({ defaultModifiers: [ee, te, oe, ie] }),
    xe = [ee, te, oe, ie, ae, le, he, me, ge],
    we = Z({ defaultModifiers: xe });
  (e.applyStyles = ie),
    (e.arrow = me),
    (e.computeStyles = oe),
    (e.createPopper = we),
    (e.createPopperLite = be),
    (e.defaultModifiers = xe),
    (e.detectOverflow = J),
    (e.eventListeners = ee),
    (e.flip = le),
    (e.hide = ge),
    (e.offset = ae),
    (e.popperGenerator = Z),
    (e.popperOffsets = te),
    (e.preventOverflow = he),
    Object.defineProperty(e, "__esModule", { value: !0 });
});
//# sourceMappingURL=popper.min.js.map

!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e(require("@popperjs/core")))
    : "function" == typeof define && define.amd
    ? define(["@popperjs/core"], e)
    : ((t = t || self).tippy = e(t.Popper));
})(this, function (t) {
  "use strict";
  var e = "undefined" != typeof window && "undefined" != typeof document,
    n = !!e && !!window.msCrypto,
    r = { passive: !0, capture: !0 },
    o = function () {
      return document.body;
    };
  function i(t, e, n) {
    if (Array.isArray(t)) {
      var r = t[e];
      return null == r ? (Array.isArray(n) ? n[e] : n) : r;
    }
    return t;
  }
  function a(t, e) {
    var n = {}.toString.call(t);
    return 0 === n.indexOf("[object") && n.indexOf(e + "]") > -1;
  }
  function s(t, e) {
    return "function" == typeof t ? t.apply(void 0, e) : t;
  }
  function u(t, e) {
    return 0 === e
      ? t
      : function (r) {
          clearTimeout(n),
            (n = setTimeout(function () {
              t(r);
            }, e));
        };
    var n;
  }
  function p(t, e) {
    var n = Object.assign({}, t);
    return (
      e.forEach(function (t) {
        delete n[t];
      }),
      n
    );
  }
  function c(t) {
    return [].concat(t);
  }
  function f(t, e) {
    -1 === t.indexOf(e) && t.push(e);
  }
  function l(t) {
    return t.split("-")[0];
  }
  function d(t) {
    return [].slice.call(t);
  }
  function v(t) {
    return Object.keys(t).reduce(function (e, n) {
      return void 0 !== t[n] && (e[n] = t[n]), e;
    }, {});
  }
  function m() {
    return document.createElement("div");
  }
  function g(t) {
    return ["Element", "Fragment"].some(function (e) {
      return a(t, e);
    });
  }
  function h(t) {
    return a(t, "MouseEvent");
  }
  function b(t) {
    return !(!t || !t._tippy || t._tippy.reference !== t);
  }
  function y(t) {
    return g(t)
      ? [t]
      : (function (t) {
          return a(t, "NodeList");
        })(t)
      ? d(t)
      : Array.isArray(t)
      ? t
      : d(document.querySelectorAll(t));
  }
  function w(t, e) {
    t.forEach(function (t) {
      t && (t.style.transitionDuration = e + "ms");
    });
  }
  function x(t, e) {
    t.forEach(function (t) {
      t && t.setAttribute("data-state", e);
    });
  }
  function E(t) {
    var e,
      n = c(t)[0];
    return null != n && null != (e = n.ownerDocument) && e.body
      ? n.ownerDocument
      : document;
  }
  function O(t, e, n) {
    var r = e + "EventListener";
    ["transitionend", "webkitTransitionEnd"].forEach(function (e) {
      t[r](e, n);
    });
  }
  function C(t, e) {
    for (var n = e; n; ) {
      var r;
      if (t.contains(n)) return !0;
      n =
        null == n.getRootNode || null == (r = n.getRootNode())
          ? void 0
          : r.host;
    }
    return !1;
  }
  var T = { isTouch: !1 },
    A = 0;
  function L() {
    T.isTouch ||
      ((T.isTouch = !0),
      window.performance && document.addEventListener("mousemove", D));
  }
  function D() {
    var t = performance.now();
    t - A < 20 &&
      ((T.isTouch = !1), document.removeEventListener("mousemove", D)),
      (A = t);
  }
  function k() {
    var t = document.activeElement;
    if (b(t)) {
      var e = t._tippy;
      t.blur && !e.state.isVisible && t.blur();
    }
  }
  var R = Object.assign(
      {
        appendTo: o,
        aria: { content: "auto", expanded: "auto" },
        delay: 0,
        duration: [300, 250],
        getReferenceClientRect: null,
        hideOnClick: !0,
        ignoreAttributes: !1,
        interactive: !1,
        interactiveBorder: 2,
        interactiveDebounce: 0,
        moveTransition: "",
        offset: [0, 10],
        onAfterUpdate: function () {},
        onBeforeUpdate: function () {},
        onCreate: function () {},
        onDestroy: function () {},
        onHidden: function () {},
        onHide: function () {},
        onMount: function () {},
        onShow: function () {},
        onShown: function () {},
        onTrigger: function () {},
        onUntrigger: function () {},
        onClickOutside: function () {},
        placement: "top",
        plugins: [],
        popperOptions: {},
        render: null,
        showOnCreate: !1,
        touch: !0,
        trigger: "mouseenter focus",
        triggerTarget: null,
      },
      { animateFill: !1, followCursor: !1, inlinePositioning: !1, sticky: !1 },
      {
        allowHTML: !1,
        animation: "fade",
        arrow: !0,
        content: "",
        inertia: !1,
        maxWidth: 350,
        role: "tooltip",
        theme: "",
        zIndex: 9999,
      }
    ),
    P = Object.keys(R);
  function j(t) {
    var e = (t.plugins || []).reduce(function (e, n) {
      var r,
        o = n.name,
        i = n.defaultValue;
      o && (e[o] = void 0 !== t[o] ? t[o] : null != (r = R[o]) ? r : i);
      return e;
    }, {});
    return Object.assign({}, t, e);
  }
  function M(t, e) {
    var n = Object.assign(
      {},
      e,
      { content: s(e.content, [t]) },
      e.ignoreAttributes
        ? {}
        : (function (t, e) {
            return (
              e ? Object.keys(j(Object.assign({}, R, { plugins: e }))) : P
            ).reduce(function (e, n) {
              var r = (t.getAttribute("data-tippy-" + n) || "").trim();
              if (!r) return e;
              if ("content" === n) e[n] = r;
              else
                try {
                  e[n] = JSON.parse(r);
                } catch (t) {
                  e[n] = r;
                }
              return e;
            }, {});
          })(t, e.plugins)
    );
    return (
      (n.aria = Object.assign({}, R.aria, n.aria)),
      (n.aria = {
        expanded: "auto" === n.aria.expanded ? e.interactive : n.aria.expanded,
        content:
          "auto" === n.aria.content
            ? e.interactive
              ? null
              : "describedby"
            : n.aria.content,
      }),
      n
    );
  }
  function V(t, e) {
    t.innerHTML = e;
  }
  function I(t) {
    var e = m();
    return (
      !0 === t
        ? (e.className = "tippy-arrow")
        : ((e.className = "tippy-svg-arrow"),
          g(t) ? e.appendChild(t) : V(e, t)),
      e
    );
  }
  function S(t, e) {
    g(e.content)
      ? (V(t, ""), t.appendChild(e.content))
      : "function" != typeof e.content &&
        (e.allowHTML ? V(t, e.content) : (t.textContent = e.content));
  }
  function B(t) {
    var e = t.firstElementChild,
      n = d(e.children);
    return {
      box: e,
      content: n.find(function (t) {
        return t.classList.contains("tippy-content");
      }),
      arrow: n.find(function (t) {
        return (
          t.classList.contains("tippy-arrow") ||
          t.classList.contains("tippy-svg-arrow")
        );
      }),
      backdrop: n.find(function (t) {
        return t.classList.contains("tippy-backdrop");
      }),
    };
  }
  function N(t) {
    var e = m(),
      n = m();
    (n.className = "tippy-box"),
      n.setAttribute("data-state", "hidden"),
      n.setAttribute("tabindex", "-1");
    var r = m();
    function o(n, r) {
      var o = B(e),
        i = o.box,
        a = o.content,
        s = o.arrow;
      r.theme
        ? i.setAttribute("data-theme", r.theme)
        : i.removeAttribute("data-theme"),
        "string" == typeof r.animation
          ? i.setAttribute("data-animation", r.animation)
          : i.removeAttribute("data-animation"),
        r.inertia
          ? i.setAttribute("data-inertia", "")
          : i.removeAttribute("data-inertia"),
        (i.style.maxWidth =
          "number" == typeof r.maxWidth ? r.maxWidth + "px" : r.maxWidth),
        r.role ? i.setAttribute("role", r.role) : i.removeAttribute("role"),
        (n.content === r.content && n.allowHTML === r.allowHTML) ||
          S(a, t.props),
        r.arrow
          ? s
            ? n.arrow !== r.arrow &&
              (i.removeChild(s), i.appendChild(I(r.arrow)))
            : i.appendChild(I(r.arrow))
          : s && i.removeChild(s);
    }
    return (
      (r.className = "tippy-content"),
      r.setAttribute("data-state", "hidden"),
      S(r, t.props),
      e.appendChild(n),
      n.appendChild(r),
      o(t.props, t.props),
      { popper: e, onUpdate: o }
    );
  }
  N.$$tippy = !0;
  var H = 1,
    U = [],
    _ = [];
  function z(e, a) {
    var p,
      g,
      b,
      y,
      A,
      L,
      D,
      k,
      P = M(e, Object.assign({}, R, j(v(a)))),
      V = !1,
      I = !1,
      S = !1,
      N = !1,
      z = [],
      F = u(wt, P.interactiveDebounce),
      W = H++,
      X = (k = P.plugins).filter(function (t, e) {
        return k.indexOf(t) === e;
      }),
      Y = {
        id: W,
        reference: e,
        popper: m(),
        popperInstance: null,
        props: P,
        state: {
          isEnabled: !0,
          isVisible: !1,
          isDestroyed: !1,
          isMounted: !1,
          isShown: !1,
        },
        plugins: X,
        clearDelayTimeouts: function () {
          clearTimeout(p), clearTimeout(g), cancelAnimationFrame(b);
        },
        setProps: function (t) {
          if (Y.state.isDestroyed) return;
          at("onBeforeUpdate", [Y, t]), bt();
          var n = Y.props,
            r = M(e, Object.assign({}, n, v(t), { ignoreAttributes: !0 }));
          (Y.props = r),
            ht(),
            n.interactiveDebounce !== r.interactiveDebounce &&
              (pt(), (F = u(wt, r.interactiveDebounce)));
          n.triggerTarget && !r.triggerTarget
            ? c(n.triggerTarget).forEach(function (t) {
                t.removeAttribute("aria-expanded");
              })
            : r.triggerTarget && e.removeAttribute("aria-expanded");
          ut(), it(), J && J(n, r);
          Y.popperInstance &&
            (Ct(),
            At().forEach(function (t) {
              requestAnimationFrame(t._tippy.popperInstance.forceUpdate);
            }));
          at("onAfterUpdate", [Y, t]);
        },
        setContent: function (t) {
          Y.setProps({ content: t });
        },
        show: function () {
          var t = Y.state.isVisible,
            e = Y.state.isDestroyed,
            n = !Y.state.isEnabled,
            r = T.isTouch && !Y.props.touch,
            a = i(Y.props.duration, 0, R.duration);
          if (t || e || n || r) return;
          if (et().hasAttribute("disabled")) return;
          if ((at("onShow", [Y], !1), !1 === Y.props.onShow(Y))) return;
          (Y.state.isVisible = !0), tt() && ($.style.visibility = "visible");
          it(), dt(), Y.state.isMounted || ($.style.transition = "none");
          if (tt()) {
            var u = rt(),
              p = u.box,
              c = u.content;
            w([p, c], 0);
          }
          (L = function () {
            var t;
            if (Y.state.isVisible && !N) {
              if (
                ((N = !0),
                $.offsetHeight,
                ($.style.transition = Y.props.moveTransition),
                tt() && Y.props.animation)
              ) {
                var e = rt(),
                  n = e.box,
                  r = e.content;
                w([n, r], a), x([n, r], "visible");
              }
              st(),
                ut(),
                f(_, Y),
                null == (t = Y.popperInstance) || t.forceUpdate(),
                at("onMount", [Y]),
                Y.props.animation &&
                  tt() &&
                  (function (t, e) {
                    mt(t, e);
                  })(a, function () {
                    (Y.state.isShown = !0), at("onShown", [Y]);
                  });
            }
          }),
            (function () {
              var t,
                e = Y.props.appendTo,
                n = et();
              t =
                (Y.props.interactive && e === o) || "parent" === e
                  ? n.parentNode
                  : s(e, [n]);
              t.contains($) || t.appendChild($);
              (Y.state.isMounted = !0), Ct();
            })();
        },
        hide: function () {
          var t = !Y.state.isVisible,
            e = Y.state.isDestroyed,
            n = !Y.state.isEnabled,
            r = i(Y.props.duration, 1, R.duration);
          if (t || e || n) return;
          if ((at("onHide", [Y], !1), !1 === Y.props.onHide(Y))) return;
          (Y.state.isVisible = !1),
            (Y.state.isShown = !1),
            (N = !1),
            (V = !1),
            tt() && ($.style.visibility = "hidden");
          if ((pt(), vt(), it(!0), tt())) {
            var o = rt(),
              a = o.box,
              s = o.content;
            Y.props.animation && (w([a, s], r), x([a, s], "hidden"));
          }
          st(),
            ut(),
            Y.props.animation
              ? tt() &&
                (function (t, e) {
                  mt(t, function () {
                    !Y.state.isVisible &&
                      $.parentNode &&
                      $.parentNode.contains($) &&
                      e();
                  });
                })(r, Y.unmount)
              : Y.unmount();
        },
        hideWithInteractivity: function (t) {
          nt().addEventListener("mousemove", F), f(U, F), F(t);
        },
        enable: function () {
          Y.state.isEnabled = !0;
        },
        disable: function () {
          Y.hide(), (Y.state.isEnabled = !1);
        },
        unmount: function () {
          Y.state.isVisible && Y.hide();
          if (!Y.state.isMounted) return;
          Tt(),
            At().forEach(function (t) {
              t._tippy.unmount();
            }),
            $.parentNode && $.parentNode.removeChild($);
          (_ = _.filter(function (t) {
            return t !== Y;
          })),
            (Y.state.isMounted = !1),
            at("onHidden", [Y]);
        },
        destroy: function () {
          if (Y.state.isDestroyed) return;
          Y.clearDelayTimeouts(),
            Y.unmount(),
            bt(),
            delete e._tippy,
            (Y.state.isDestroyed = !0),
            at("onDestroy", [Y]);
        },
      };
    if (!P.render) return Y;
    var q = P.render(Y),
      $ = q.popper,
      J = q.onUpdate;
    $.setAttribute("data-tippy-root", ""),
      ($.id = "tippy-" + Y.id),
      (Y.popper = $),
      (e._tippy = Y),
      ($._tippy = Y);
    var G = X.map(function (t) {
        return t.fn(Y);
      }),
      K = e.hasAttribute("aria-expanded");
    return (
      ht(),
      ut(),
      it(),
      at("onCreate", [Y]),
      P.showOnCreate && Lt(),
      $.addEventListener("mouseenter", function () {
        Y.props.interactive && Y.state.isVisible && Y.clearDelayTimeouts();
      }),
      $.addEventListener("mouseleave", function () {
        Y.props.interactive &&
          Y.props.trigger.indexOf("mouseenter") >= 0 &&
          nt().addEventListener("mousemove", F);
      }),
      Y
    );
    function Q() {
      var t = Y.props.touch;
      return Array.isArray(t) ? t : [t, 0];
    }
    function Z() {
      return "hold" === Q()[0];
    }
    function tt() {
      var t;
      return !(null == (t = Y.props.render) || !t.$$tippy);
    }
    function et() {
      return D || e;
    }
    function nt() {
      var t = et().parentNode;
      return t ? E(t) : document;
    }
    function rt() {
      return B($);
    }
    function ot(t) {
      return (Y.state.isMounted && !Y.state.isVisible) ||
        T.isTouch ||
        (y && "focus" === y.type)
        ? 0
        : i(Y.props.delay, t ? 0 : 1, R.delay);
    }
    function it(t) {
      void 0 === t && (t = !1),
        ($.style.pointerEvents = Y.props.interactive && !t ? "" : "none"),
        ($.style.zIndex = "" + Y.props.zIndex);
    }
    function at(t, e, n) {
      var r;
      (void 0 === n && (n = !0),
      G.forEach(function (n) {
        n[t] && n[t].apply(n, e);
      }),
      n) && (r = Y.props)[t].apply(r, e);
    }
    function st() {
      var t = Y.props.aria;
      if (t.content) {
        var n = "aria-" + t.content,
          r = $.id;
        c(Y.props.triggerTarget || e).forEach(function (t) {
          var e = t.getAttribute(n);
          if (Y.state.isVisible) t.setAttribute(n, e ? e + " " + r : r);
          else {
            var o = e && e.replace(r, "").trim();
            o ? t.setAttribute(n, o) : t.removeAttribute(n);
          }
        });
      }
    }
    function ut() {
      !K &&
        Y.props.aria.expanded &&
        c(Y.props.triggerTarget || e).forEach(function (t) {
          Y.props.interactive
            ? t.setAttribute(
                "aria-expanded",
                Y.state.isVisible && t === et() ? "true" : "false"
              )
            : t.removeAttribute("aria-expanded");
        });
    }
    function pt() {
      nt().removeEventListener("mousemove", F),
        (U = U.filter(function (t) {
          return t !== F;
        }));
    }
    function ct(t) {
      if (!T.isTouch || (!S && "mousedown" !== t.type)) {
        var n = (t.composedPath && t.composedPath()[0]) || t.target;
        if (!Y.props.interactive || !C($, n)) {
          if (
            c(Y.props.triggerTarget || e).some(function (t) {
              return C(t, n);
            })
          ) {
            if (T.isTouch) return;
            if (Y.state.isVisible && Y.props.trigger.indexOf("click") >= 0)
              return;
          } else at("onClickOutside", [Y, t]);
          !0 === Y.props.hideOnClick &&
            (Y.clearDelayTimeouts(),
            Y.hide(),
            (I = !0),
            setTimeout(function () {
              I = !1;
            }),
            Y.state.isMounted || vt());
        }
      }
    }
    function ft() {
      S = !0;
    }
    function lt() {
      S = !1;
    }
    function dt() {
      var t = nt();
      t.addEventListener("mousedown", ct, !0),
        t.addEventListener("touchend", ct, r),
        t.addEventListener("touchstart", lt, r),
        t.addEventListener("touchmove", ft, r);
    }
    function vt() {
      var t = nt();
      t.removeEventListener("mousedown", ct, !0),
        t.removeEventListener("touchend", ct, r),
        t.removeEventListener("touchstart", lt, r),
        t.removeEventListener("touchmove", ft, r);
    }
    function mt(t, e) {
      var n = rt().box;
      function r(t) {
        t.target === n && (O(n, "remove", r), e());
      }
      if (0 === t) return e();
      O(n, "remove", A), O(n, "add", r), (A = r);
    }
    function gt(t, n, r) {
      void 0 === r && (r = !1),
        c(Y.props.triggerTarget || e).forEach(function (e) {
          e.addEventListener(t, n, r),
            z.push({ node: e, eventType: t, handler: n, options: r });
        });
    }
    function ht() {
      var t;
      Z() &&
        (gt("touchstart", yt, { passive: !0 }),
        gt("touchend", xt, { passive: !0 })),
        ((t = Y.props.trigger), t.split(/\s+/).filter(Boolean)).forEach(
          function (t) {
            if ("manual" !== t)
              switch ((gt(t, yt), t)) {
                case "mouseenter":
                  gt("mouseleave", xt);
                  break;
                case "focus":
                  gt(n ? "focusout" : "blur", Et);
                  break;
                case "focusin":
                  gt("focusout", Et);
              }
          }
        );
    }
    function bt() {
      z.forEach(function (t) {
        var e = t.node,
          n = t.eventType,
          r = t.handler,
          o = t.options;
        e.removeEventListener(n, r, o);
      }),
        (z = []);
    }
    function yt(t) {
      var e,
        n = !1;
      if (Y.state.isEnabled && !Ot(t) && !I) {
        var r = "focus" === (null == (e = y) ? void 0 : e.type);
        (y = t),
          (D = t.currentTarget),
          ut(),
          !Y.state.isVisible &&
            h(t) &&
            U.forEach(function (e) {
              return e(t);
            }),
          "click" === t.type &&
          (Y.props.trigger.indexOf("mouseenter") < 0 || V) &&
          !1 !== Y.props.hideOnClick &&
          Y.state.isVisible
            ? (n = !0)
            : Lt(t),
          "click" === t.type && (V = !n),
          n && !r && Dt(t);
      }
    }
    function wt(t) {
      var e = t.target,
        n = et().contains(e) || $.contains(e);
      ("mousemove" === t.type && n) ||
        ((function (t, e) {
          var n = e.clientX,
            r = e.clientY;
          return t.every(function (t) {
            var e = t.popperRect,
              o = t.popperState,
              i = t.props.interactiveBorder,
              a = l(o.placement),
              s = o.modifiersData.offset;
            if (!s) return !0;
            var u = "bottom" === a ? s.top.y : 0,
              p = "top" === a ? s.bottom.y : 0,
              c = "right" === a ? s.left.x : 0,
              f = "left" === a ? s.right.x : 0,
              d = e.top - r + u > i,
              v = r - e.bottom - p > i,
              m = e.left - n + c > i,
              g = n - e.right - f > i;
            return d || v || m || g;
          });
        })(
          At()
            .concat($)
            .map(function (t) {
              var e,
                n = null == (e = t._tippy.popperInstance) ? void 0 : e.state;
              return n
                ? {
                    popperRect: t.getBoundingClientRect(),
                    popperState: n,
                    props: P,
                  }
                : null;
            })
            .filter(Boolean),
          t
        ) &&
          (pt(), Dt(t)));
    }
    function xt(t) {
      Ot(t) ||
        (Y.props.trigger.indexOf("click") >= 0 && V) ||
        (Y.props.interactive ? Y.hideWithInteractivity(t) : Dt(t));
    }
    function Et(t) {
      (Y.props.trigger.indexOf("focusin") < 0 && t.target !== et()) ||
        (Y.props.interactive &&
          t.relatedTarget &&
          $.contains(t.relatedTarget)) ||
        Dt(t);
    }
    function Ot(t) {
      return !!T.isTouch && Z() !== t.type.indexOf("touch") >= 0;
    }
    function Ct() {
      Tt();
      var n = Y.props,
        r = n.popperOptions,
        o = n.placement,
        i = n.offset,
        a = n.getReferenceClientRect,
        s = n.moveTransition,
        u = tt() ? B($).arrow : null,
        p = a
          ? {
              getBoundingClientRect: a,
              contextElement: a.contextElement || et(),
            }
          : e,
        c = [
          { name: "offset", options: { offset: i } },
          {
            name: "preventOverflow",
            options: { padding: { top: 2, bottom: 2, left: 5, right: 5 } },
          },
          { name: "flip", options: { padding: 5 } },
          { name: "computeStyles", options: { adaptive: !s } },
          {
            name: "$$tippy",
            enabled: !0,
            phase: "beforeWrite",
            requires: ["computeStyles"],
            fn: function (t) {
              var e = t.state;
              if (tt()) {
                var n = rt().box;
                ["placement", "reference-hidden", "escaped"].forEach(function (
                  t
                ) {
                  "placement" === t
                    ? n.setAttribute("data-placement", e.placement)
                    : e.attributes.popper["data-popper-" + t]
                    ? n.setAttribute("data-" + t, "")
                    : n.removeAttribute("data-" + t);
                }),
                  (e.attributes.popper = {});
              }
            },
          },
        ];
      tt() &&
        u &&
        c.push({ name: "arrow", options: { element: u, padding: 3 } }),
        c.push.apply(c, (null == r ? void 0 : r.modifiers) || []),
        (Y.popperInstance = t.createPopper(
          p,
          $,
          Object.assign({}, r, { placement: o, onFirstUpdate: L, modifiers: c })
        ));
    }
    function Tt() {
      Y.popperInstance &&
        (Y.popperInstance.destroy(), (Y.popperInstance = null));
    }
    function At() {
      return d($.querySelectorAll("[data-tippy-root]"));
    }
    function Lt(t) {
      Y.clearDelayTimeouts(), t && at("onTrigger", [Y, t]), dt();
      var e = ot(!0),
        n = Q(),
        r = n[0],
        o = n[1];
      T.isTouch && "hold" === r && o && (e = o),
        e
          ? (p = setTimeout(function () {
              Y.show();
            }, e))
          : Y.show();
    }
    function Dt(t) {
      if (
        (Y.clearDelayTimeouts(), at("onUntrigger", [Y, t]), Y.state.isVisible)
      ) {
        if (
          !(
            Y.props.trigger.indexOf("mouseenter") >= 0 &&
            Y.props.trigger.indexOf("click") >= 0 &&
            ["mouseleave", "mousemove"].indexOf(t.type) >= 0 &&
            V
          )
        ) {
          var e = ot(!1);
          e
            ? (g = setTimeout(function () {
                Y.state.isVisible && Y.hide();
              }, e))
            : (b = requestAnimationFrame(function () {
                Y.hide();
              }));
        }
      } else vt();
    }
  }
  function F(t, e) {
    void 0 === e && (e = {});
    var n = R.plugins.concat(e.plugins || []);
    document.addEventListener("touchstart", L, r),
      window.addEventListener("blur", k);
    var o = Object.assign({}, e, { plugins: n }),
      i = y(t).reduce(function (t, e) {
        var n = e && z(e, o);
        return n && t.push(n), t;
      }, []);
    return g(t) ? i[0] : i;
  }
  (F.defaultProps = R),
    (F.setDefaultProps = function (t) {
      Object.keys(t).forEach(function (e) {
        R[e] = t[e];
      });
    }),
    (F.currentInput = T);
  var W = Object.assign({}, t.applyStyles, {
      effect: function (t) {
        var e = t.state,
          n = {
            popper: {
              position: e.options.strategy,
              left: "0",
              top: "0",
              margin: "0",
            },
            arrow: { position: "absolute" },
            reference: {},
          };
        Object.assign(e.elements.popper.style, n.popper),
          (e.styles = n),
          e.elements.arrow && Object.assign(e.elements.arrow.style, n.arrow);
      },
    }),
    X = { mouseover: "mouseenter", focusin: "focus", click: "click" };
  var Y = {
    name: "animateFill",
    defaultValue: !1,
    fn: function (t) {
      var e;
      if (null == (e = t.props.render) || !e.$$tippy) return {};
      var n = B(t.popper),
        r = n.box,
        o = n.content,
        i = t.props.animateFill
          ? (function () {
              var t = m();
              return (t.className = "tippy-backdrop"), x([t], "hidden"), t;
            })()
          : null;
      return {
        onCreate: function () {
          i &&
            (r.insertBefore(i, r.firstElementChild),
            r.setAttribute("data-animatefill", ""),
            (r.style.overflow = "hidden"),
            t.setProps({ arrow: !1, animation: "shift-away" }));
        },
        onMount: function () {
          if (i) {
            var t = r.style.transitionDuration,
              e = Number(t.replace("ms", ""));
            (o.style.transitionDelay = Math.round(e / 10) + "ms"),
              (i.style.transitionDuration = t),
              x([i], "visible");
          }
        },
        onShow: function () {
          i && (i.style.transitionDuration = "0ms");
        },
        onHide: function () {
          i && x([i], "hidden");
        },
      };
    },
  };
  var q = { clientX: 0, clientY: 0 },
    $ = [];
  function J(t) {
    var e = t.clientX,
      n = t.clientY;
    q = { clientX: e, clientY: n };
  }
  var G = {
    name: "followCursor",
    defaultValue: !1,
    fn: function (t) {
      var e = t.reference,
        n = E(t.props.triggerTarget || e),
        r = !1,
        o = !1,
        i = !0,
        a = t.props;
      function s() {
        return "initial" === t.props.followCursor && t.state.isVisible;
      }
      function u() {
        n.addEventListener("mousemove", f);
      }
      function p() {
        n.removeEventListener("mousemove", f);
      }
      function c() {
        (r = !0), t.setProps({ getReferenceClientRect: null }), (r = !1);
      }
      function f(n) {
        var r = !n.target || e.contains(n.target),
          o = t.props.followCursor,
          i = n.clientX,
          a = n.clientY,
          s = e.getBoundingClientRect(),
          u = i - s.left,
          p = a - s.top;
        (!r && t.props.interactive) ||
          t.setProps({
            getReferenceClientRect: function () {
              var t = e.getBoundingClientRect(),
                n = i,
                r = a;
              "initial" === o && ((n = t.left + u), (r = t.top + p));
              var s = "horizontal" === o ? t.top : r,
                c = "vertical" === o ? t.right : n,
                f = "horizontal" === o ? t.bottom : r,
                l = "vertical" === o ? t.left : n;
              return {
                width: c - l,
                height: f - s,
                top: s,
                right: c,
                bottom: f,
                left: l,
              };
            },
          });
      }
      function l() {
        t.props.followCursor &&
          ($.push({ instance: t, doc: n }),
          (function (t) {
            t.addEventListener("mousemove", J);
          })(n));
      }
      function d() {
        0 ===
          ($ = $.filter(function (e) {
            return e.instance !== t;
          })).filter(function (t) {
            return t.doc === n;
          }).length &&
          (function (t) {
            t.removeEventListener("mousemove", J);
          })(n);
      }
      return {
        onCreate: l,
        onDestroy: d,
        onBeforeUpdate: function () {
          a = t.props;
        },
        onAfterUpdate: function (e, n) {
          var i = n.followCursor;
          r ||
            (void 0 !== i &&
              a.followCursor !== i &&
              (d(),
              i ? (l(), !t.state.isMounted || o || s() || u()) : (p(), c())));
        },
        onMount: function () {
          t.props.followCursor && !o && (i && (f(q), (i = !1)), s() || u());
        },
        onTrigger: function (t, e) {
          h(e) && (q = { clientX: e.clientX, clientY: e.clientY }),
            (o = "focus" === e.type);
        },
        onHidden: function () {
          t.props.followCursor && (c(), p(), (i = !0));
        },
      };
    },
  };
  var K = {
    name: "inlinePositioning",
    defaultValue: !1,
    fn: function (t) {
      var e,
        n = t.reference;
      var r = -1,
        o = !1,
        i = [],
        a = {
          name: "tippyInlinePositioning",
          enabled: !0,
          phase: "afterWrite",
          fn: function (o) {
            var a = o.state;
            t.props.inlinePositioning &&
              (-1 !== i.indexOf(a.placement) && (i = []),
              e !== a.placement &&
                -1 === i.indexOf(a.placement) &&
                (i.push(a.placement),
                t.setProps({
                  getReferenceClientRect: function () {
                    return (function (t) {
                      return (function (t, e, n, r) {
                        if (n.length < 2 || null === t) return e;
                        if (2 === n.length && r >= 0 && n[0].left > n[1].right)
                          return n[r] || e;
                        switch (t) {
                          case "top":
                          case "bottom":
                            var o = n[0],
                              i = n[n.length - 1],
                              a = "top" === t,
                              s = o.top,
                              u = i.bottom,
                              p = a ? o.left : i.left,
                              c = a ? o.right : i.right;
                            return {
                              top: s,
                              bottom: u,
                              left: p,
                              right: c,
                              width: c - p,
                              height: u - s,
                            };
                          case "left":
                          case "right":
                            var f = Math.min.apply(
                                Math,
                                n.map(function (t) {
                                  return t.left;
                                })
                              ),
                              l = Math.max.apply(
                                Math,
                                n.map(function (t) {
                                  return t.right;
                                })
                              ),
                              d = n.filter(function (e) {
                                return "left" === t
                                  ? e.left === f
                                  : e.right === l;
                              }),
                              v = d[0].top,
                              m = d[d.length - 1].bottom;
                            return {
                              top: v,
                              bottom: m,
                              left: f,
                              right: l,
                              width: l - f,
                              height: m - v,
                            };
                          default:
                            return e;
                        }
                      })(
                        l(t),
                        n.getBoundingClientRect(),
                        d(n.getClientRects()),
                        r
                      );
                    })(a.placement);
                  },
                })),
              (e = a.placement));
          },
        };
      function s() {
        var e;
        o ||
          ((e = (function (t, e) {
            var n;
            return {
              popperOptions: Object.assign({}, t.popperOptions, {
                modifiers: [].concat(
                  (
                    (null == (n = t.popperOptions) ? void 0 : n.modifiers) || []
                  ).filter(function (t) {
                    return t.name !== e.name;
                  }),
                  [e]
                ),
              }),
            };
          })(t.props, a)),
          (o = !0),
          t.setProps(e),
          (o = !1));
      }
      return {
        onCreate: s,
        onAfterUpdate: s,
        onTrigger: function (e, n) {
          if (h(n)) {
            var o = d(t.reference.getClientRects()),
              i = o.find(function (t) {
                return (
                  t.left - 2 <= n.clientX &&
                  t.right + 2 >= n.clientX &&
                  t.top - 2 <= n.clientY &&
                  t.bottom + 2 >= n.clientY
                );
              }),
              a = o.indexOf(i);
            r = a > -1 ? a : r;
          }
        },
        onHidden: function () {
          r = -1;
        },
      };
    },
  };
  var Q = {
    name: "sticky",
    defaultValue: !1,
    fn: function (t) {
      var e = t.reference,
        n = t.popper;
      function r(e) {
        return !0 === t.props.sticky || t.props.sticky === e;
      }
      var o = null,
        i = null;
      function a() {
        var s = r("reference")
            ? (t.popperInstance
                ? t.popperInstance.state.elements.reference
                : e
              ).getBoundingClientRect()
            : null,
          u = r("popper") ? n.getBoundingClientRect() : null;
        ((s && Z(o, s)) || (u && Z(i, u))) &&
          t.popperInstance &&
          t.popperInstance.update(),
          (o = s),
          (i = u),
          t.state.isMounted && requestAnimationFrame(a);
      }
      return {
        onMount: function () {
          t.props.sticky && a();
        },
      };
    },
  };
  function Z(t, e) {
    return (
      !t ||
      !e ||
      t.top !== e.top ||
      t.right !== e.right ||
      t.bottom !== e.bottom ||
      t.left !== e.left
    );
  }
  return (
    e &&
      (function (t) {
        var e = document.createElement("style");
        (e.textContent = t), e.setAttribute("data-tippy-stylesheet", "");
        var n = document.head,
          r = document.querySelector("head>style,head>link");
        r ? n.insertBefore(e, r) : n.appendChild(e);
      })(
        '.tippy-box[data-animation=fade][data-state=hidden]{opacity:0}[data-tippy-root]{max-width:calc(100vw - 10px)}.tippy-box{position:relative;background-color:#333;color:#fff;border-radius:4px;font-size:14px;line-height:1.4;white-space:normal;outline:0;transition-property:transform,visibility,opacity}.tippy-box[data-placement^=top]>.tippy-arrow{bottom:0}.tippy-box[data-placement^=top]>.tippy-arrow:before{bottom:-7px;left:0;border-width:8px 8px 0;border-top-color:initial;transform-origin:center top}.tippy-box[data-placement^=bottom]>.tippy-arrow{top:0}.tippy-box[data-placement^=bottom]>.tippy-arrow:before{top:-7px;left:0;border-width:0 8px 8px;border-bottom-color:initial;transform-origin:center bottom}.tippy-box[data-placement^=left]>.tippy-arrow{right:0}.tippy-box[data-placement^=left]>.tippy-arrow:before{border-width:8px 0 8px 8px;border-left-color:initial;right:-7px;transform-origin:center left}.tippy-box[data-placement^=right]>.tippy-arrow{left:0}.tippy-box[data-placement^=right]>.tippy-arrow:before{left:-7px;border-width:8px 8px 8px 0;border-right-color:initial;transform-origin:center right}.tippy-box[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}.tippy-arrow{width:16px;height:16px;color:#333}.tippy-arrow:before{content:"";position:absolute;border-color:transparent;border-style:solid}.tippy-content{position:relative;padding:5px 9px;z-index:1}'
      ),
    F.setDefaultProps({ plugins: [Y, G, K, Q], render: N }),
    (F.createSingleton = function (t, e) {
      var n;
      void 0 === e && (e = {});
      var r,
        o = t,
        i = [],
        a = [],
        s = e.overrides,
        u = [],
        f = !1;
      function l() {
        a = o
          .map(function (t) {
            return c(t.props.triggerTarget || t.reference);
          })
          .reduce(function (t, e) {
            return t.concat(e);
          }, []);
      }
      function d() {
        i = o.map(function (t) {
          return t.reference;
        });
      }
      function v(t) {
        o.forEach(function (e) {
          t ? e.enable() : e.disable();
        });
      }
      function g(t) {
        return o.map(function (e) {
          var n = e.setProps;
          return (
            (e.setProps = function (o) {
              n(o), e.reference === r && t.setProps(o);
            }),
            function () {
              e.setProps = n;
            }
          );
        });
      }
      function h(t, e) {
        var n = a.indexOf(e);
        if (e !== r) {
          r = e;
          var u = (s || []).concat("content").reduce(function (t, e) {
            return (t[e] = o[n].props[e]), t;
          }, {});
          t.setProps(
            Object.assign({}, u, {
              getReferenceClientRect:
                "function" == typeof u.getReferenceClientRect
                  ? u.getReferenceClientRect
                  : function () {
                      var t;
                      return null == (t = i[n])
                        ? void 0
                        : t.getBoundingClientRect();
                    },
            })
          );
        }
      }
      v(!1), d(), l();
      var b = {
          fn: function () {
            return {
              onDestroy: function () {
                v(!0);
              },
              onHidden: function () {
                r = null;
              },
              onClickOutside: function (t) {
                t.props.showOnCreate && !f && ((f = !0), (r = null));
              },
              onShow: function (t) {
                t.props.showOnCreate && !f && ((f = !0), h(t, i[0]));
              },
              onTrigger: function (t, e) {
                h(t, e.currentTarget);
              },
            };
          },
        },
        y = F(
          m(),
          Object.assign({}, p(e, ["overrides"]), {
            plugins: [b].concat(e.plugins || []),
            triggerTarget: a,
            popperOptions: Object.assign({}, e.popperOptions, {
              modifiers: [].concat(
                (null == (n = e.popperOptions) ? void 0 : n.modifiers) || [],
                [W]
              ),
            }),
          })
        ),
        w = y.show;
      (y.show = function (t) {
        if ((w(), !r && null == t)) return h(y, i[0]);
        if (!r || null != t) {
          if ("number" == typeof t) return i[t] && h(y, i[t]);
          if (o.indexOf(t) >= 0) {
            var e = t.reference;
            return h(y, e);
          }
          return i.indexOf(t) >= 0 ? h(y, t) : void 0;
        }
      }),
        (y.showNext = function () {
          var t = i[0];
          if (!r) return y.show(0);
          var e = i.indexOf(r);
          y.show(i[e + 1] || t);
        }),
        (y.showPrevious = function () {
          var t = i[i.length - 1];
          if (!r) return y.show(t);
          var e = i.indexOf(r),
            n = i[e - 1] || t;
          y.show(n);
        });
      var x = y.setProps;
      return (
        (y.setProps = function (t) {
          (s = t.overrides || s), x(t);
        }),
        (y.setInstances = function (t) {
          v(!0),
            u.forEach(function (t) {
              return t();
            }),
            (o = t),
            v(!1),
            d(),
            l(),
            (u = g(y)),
            y.setProps({ triggerTarget: a });
        }),
        (u = g(y)),
        y
      );
    }),
    (F.delegate = function (t, e) {
      var n = [],
        o = [],
        i = !1,
        a = e.target,
        s = p(e, ["target"]),
        u = Object.assign({}, s, { trigger: "manual", touch: !1 }),
        f = Object.assign({ touch: R.touch }, s, { showOnCreate: !0 }),
        l = F(t, u);
      function d(t) {
        if (t.target && !i) {
          var n = t.target.closest(a);
          if (n) {
            var r =
              n.getAttribute("data-tippy-trigger") || e.trigger || R.trigger;
            if (
              !n._tippy &&
              !(
                ("touchstart" === t.type && "boolean" == typeof f.touch) ||
                ("touchstart" !== t.type && r.indexOf(X[t.type]) < 0)
              )
            ) {
              var s = F(n, f);
              s && (o = o.concat(s));
            }
          }
        }
      }
      function v(t, e, r, o) {
        void 0 === o && (o = !1),
          t.addEventListener(e, r, o),
          n.push({ node: t, eventType: e, handler: r, options: o });
      }
      return (
        c(l).forEach(function (t) {
          var e = t.destroy,
            a = t.enable,
            s = t.disable;
          (t.destroy = function (t) {
            void 0 === t && (t = !0),
              t &&
                o.forEach(function (t) {
                  t.destroy();
                }),
              (o = []),
              n.forEach(function (t) {
                var e = t.node,
                  n = t.eventType,
                  r = t.handler,
                  o = t.options;
                e.removeEventListener(n, r, o);
              }),
              (n = []),
              e();
          }),
            (t.enable = function () {
              a(),
                o.forEach(function (t) {
                  return t.enable();
                }),
                (i = !1);
            }),
            (t.disable = function () {
              s(),
                o.forEach(function (t) {
                  return t.disable();
                }),
                (i = !0);
            }),
            (function (t) {
              var e = t.reference;
              v(e, "touchstart", d, r),
                v(e, "mouseover", d),
                v(e, "focusin", d),
                v(e, "click", d);
            })(t);
        }),
        l
      );
    }),
    (F.hideAll = function (t) {
      var e = void 0 === t ? {} : t,
        n = e.exclude,
        r = e.duration;
      _.forEach(function (t) {
        var e = !1;
        if ((n && (e = b(n) ? t.reference === n : t.popper === n.popper), !e)) {
          var o = t.props.duration;
          t.setProps({ duration: r }),
            t.hide(),
            t.state.isDestroyed || t.setProps({ duration: o });
        }
      });
    }),
    (F.roundArrow =
      '<svg width="16" height="6" xmlns="http://www.w3.org/2000/svg"><path d="M0 6s1.796-.013 4.67-3.615C5.851.9 6.93.006 8 0c1.07-.006 2.148.887 3.343 2.385C14.233 6.005 16 6 16 6H0z"></svg>'),
    F
  );
});
//# sourceMappingURL=tippy-bundle.umd.min.js.map
