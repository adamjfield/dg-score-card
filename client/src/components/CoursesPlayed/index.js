import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function CoursesPlayed({ courses, allCourses }) {
  let removeRepeatCourses = [...new Set(courses)];

  const FindCourseId = (cntCourseName) => {
    for (let i = 0; i < allCourses.length; i++) {
      const course = allCourses[i];
      if (cntCourseName === course.courseName) {
        return course._id;
      }
    }
  };
  return (
    <ul className='d-flex align-items-center list-group list-group-flush text-center mt-3'>
      <h2 className='fw-bold bg-white text-decoration-underline'>
        Recently Played Courses
      </h2>
      {removeRepeatCourses
        .slice(0)
        .reverse()
        .slice(0, 5)
        .map((course, i) => (
          <div
            key={i}
            className='d-flex align-items-center animate__animated animate__fadeIn animate__slow'
          >
            <Link to={`/newround/${FindCourseId(course)}`}>
              <button
                className='favCourse-link list-group-item fs-5 my-2 fw-bold justify-content-between'
                datatype={FindCourseId(course)}
              >
                {course}
                <FontAwesomeIcon icon={faArrowRight} className='ps-2' />
              </button>
            </Link>
          </div>
        ))}
    </ul>
  );
}

export default CoursesPlayed;
