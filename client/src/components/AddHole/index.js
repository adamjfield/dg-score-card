import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router";
import { ADD_HOLE } from "../../utils/mutations";
import { useLocation } from "react-router-dom";
import { QUERY_ALL_COURSES } from "../../utils/queries";

//holeCount is total number of holes for the course
//holeNumber is a single hole in holeCount
//par is the par for the holeNumber

const AddHole = () => {
  const navigate = useNavigate();

  //information from the createCourse form is stored in [location]
  const location = useLocation();
  useEffect(() => {}, [location]);

  //need to get holeCount, courseName out of location

  //getcourseId from query
  const { loading, data } = useQuery(QUERY_ALL_COURSES);
  const courses = data?.courses || [];
  
  const matchingCourse = courses?.find(
    (course) => course?.courseName === location?.state?.courseName
  );

  //set holeNumber to 1
  const [holeNumber, setHoleNumber] = useState(1);
  const [par, setPar] = useState(3);

  //mutation for addHole
  const [addHole, { error }] = useMutation(ADD_HOLE);

  const handleAddHole = (event) => {
    event.preventDefault();

    try {
      //add holes takes addHole(courseId: $courseId, holeNumber: $holeNumber, par: $par)
      addHole({
        variables: {
          courseId: matchingCourse?._id,
          holeNumber: holeNumber,
          par: parseInt(par),
        },
      });
      //if holeNumber
      if (holeNumber <= matchingCourse?.holeCount - 1) {
        setHoleNumber(holeNumber + 1);
        const par = document.getElementById("par").value
          ? document.getElementById("par").value
          : 3;
        setPar(par);
      } else {
        navigate(`/newround/${matchingCourse?._id}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section>
      <div className="card-heading">
        <h2 className="heading d-flex justify-content-center">
          {location && location.state && location.state.courseName}
        </h2>
        <div>
          <h2 className="sub-heading d-flex justify-content-center">
            Hole Count: {location && location.state && location.state.holeCount}
          </h2>
          <h2 className="d-flex justify-content-center">
            <label
              htmlFor="par1"
              className="sub-heading col col-form-label m-4 p-4"
            >
              Hole #{holeNumber}
            </label>
          </h2>
        </div>
      </div>
      <form>
        <div className="form-group row">
          <h3 className="sub-heading d-flex justify-content-center">
            Enter Pars:
          </h3>

          <div className="col">
            <input
              type="par"
              className="hole-form col col-form-label m-4 p-4"
              id="par"
              placeholder="Par"
              onChange={() => {}}
            />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button
            className="button d-flex justify-content-center m-4"
            onClick={handleAddHole}
          >
            Next Hole
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddHole;
