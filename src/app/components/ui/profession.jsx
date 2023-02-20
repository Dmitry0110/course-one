import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
    getProfessionByIds,
    getProfessionsLoadingStatus
} from "../../store/professions";

const Profession = ({ id }) => {
    const getProfession = useSelector(getProfessionByIds(id));
    const isLoading = useSelector(getProfessionsLoadingStatus());

    if (!isLoading) {
        return <p>{getProfession.name}</p>;
    } else return "Loading...";
};
Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
